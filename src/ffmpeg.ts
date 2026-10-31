import { execFile } from 'node:child_process';
import { constants } from 'node:fs';
import { access, chmod, mkdir, mkdtemp, readdir, realpath, rename, rm } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import hostProcess from 'node:process';
import { promisify } from 'node:util';
import type { OmniFfmpegReady, OmniFfmpegStatus } from './api/index.js';
import { FFMPEG_ASSETS, FFMPEG_RELEASE } from './ffmpeg-assets.ts';
import { downloadFfmpegAsset, fileMatches, type FfmpegAsset } from './ffmpeg-download.ts';

const process = hostProcess as unknown as NodeJS.Process;
const execute = promisify(execFile);
type Binary = 'ffmpeg' | 'ffprobe';
type Found = Partial<OmniFfmpegReady>;
type Probe = (file: string, tool: Binary, signal: AbortSignal) => Promise<string | undefined>;
const binaries: readonly Binary[] = ['ffmpeg', 'ffprobe'];

export async function probeFfmpeg(file: string, tool: Binary, signal: AbortSignal): Promise<string | undefined> {
  signal.throwIfAborted();
  try {
    await access(file, constants.X_OK);
    const { stdout } = await execute(file, ['-version'], { timeout: 5000, maxBuffer: 64 * 1024, windowsHide: true, signal });
    return new RegExp(`^${tool} version ([^\\s]+)`, 'u').exec(stdout)?.[1];
  } catch { signal.throwIfAborted(); return undefined; }
}

/** 系统环境优先；补齐桌面启动时 PATH 常遗漏的标准安装目录。 */
export async function ffmpegCandidates(tool: Binary, platform: string, env: NodeJS.ProcessEnv): Promise<string[]> {
  const windows = platform === 'win32', paths = windows ? path.win32 : path.posix;
  const value = Object.entries(env).find(([name]) => windows ? name.toLowerCase() === 'path' : name === 'PATH')?.[1] ?? '';
  const directories = value.split(windows ? ';' : ':').map(value => value.trim().replace(/^"|"$/gu, '')).filter(value => paths.isAbsolute(value));
  if (windows) {
    for (const root of [env.ProgramFiles, env.LOCALAPPDATA && paths.join(env.LOCALAPPDATA, 'Programs')])
      if (root) directories.push(paths.join(root, 'FFmpeg', 'bin'));
    if (env.USERPROFILE) directories.push(paths.join(env.USERPROFILE, 'scoop', 'apps', 'ffmpeg', 'current', 'bin'));
    if (env.ChocolateyInstall) directories.push(paths.join(env.ChocolateyInstall, 'bin'));
    if (env.LOCALAPPDATA) {
      directories.push(paths.join(env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Links'));
      const packages = paths.join(env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages');
      for (const entry of await readdir(packages, { withFileTypes: true }).catch(() => [])) {
        if (!entry.isDirectory() || !/^(Gyan|BtbN)\.FFmpeg/iu.test(entry.name)) continue;
        const root = paths.join(packages, entry.name);
        directories.push(paths.join(root, 'bin'));
        for (const child of await readdir(root, { withFileTypes: true }).catch(() => []))
          if (child.isDirectory()) directories.push(paths.join(root, child.name, 'bin'));
      }
    }
  } else directories.push('/opt/homebrew/bin', '/usr/local/bin', '/usr/bin', '/bin');
  return [...new Set(directories)].map(directory => paths.join(directory, `${tool}${windows ? '.exe' : ''}`));
}

interface Options {
  directory?: string;
  platform?: NodeJS.Platform;
  arch?: string;
  env?: NodeJS.ProcessEnv;
  probe?: Probe;
  request?: typeof fetch;
  assets?: readonly FfmpegAsset[];
}

export class FfmpegManager {
  private readonly platform: NodeJS.Platform;
  private readonly env: NodeJS.ProcessEnv;
  private readonly directory: string;
  private readonly assets: readonly FfmpegAsset[] | undefined;
  private readonly probe: Probe;
  private readonly request: typeof fetch;
  private readonly lifetime = new AbortController();
  private operation: Promise<OmniFfmpegReady> | undefined;
  private refreshing: Promise<OmniFfmpegStatus> | undefined;
  private value: OmniFfmpegStatus;

  constructor(options: Options = {}) {
    this.platform = options.platform ?? process.platform;
    this.env = options.env ?? process.env;
    const platform = `${this.platform}-${options.arch ?? process.arch}`;
    this.assets = options.assets ?? FFMPEG_ASSETS[platform as keyof typeof FFMPEG_ASSETS];
    this.directory = path.resolve(options.directory ?? path.join(this.env.DSH_HOME || path.join(homedir(), '.dsh'), 'tools', 'omni-ffmpeg'), platform, FFMPEG_RELEASE);
    this.probe = options.probe ?? probeFfmpeg;
    this.request = options.request ?? fetch;
    this.value = { state: 'missing', platform, canInstall: !!this.assets, downloadedBytes: 0, totalBytes: 0, message: '' };
  }

  snapshot(): OmniFfmpegStatus { return { ...this.value }; }
  dispose(): void { this.lifetime.abort(); }
  private filename(tool: string): string { return `${tool}${this.platform === 'win32' && binaries.includes(tool as Binary) ? '.exe' : ''}`; }

  private async discover(signal: AbortSignal): Promise<Found> {
    const found: Found = {};
    for (const tool of binaries) {
      const candidates = await ffmpegCandidates(tool, this.platform, this.env);
      if (tool === 'ffprobe' && found.ffmpeg?.source === 'system') candidates.unshift(path.join(path.dirname(found.ffmpeg.path), this.filename(tool)));
      for (const candidate of [...new Set(candidates)]) {
        const resolved = await realpath(candidate).catch(() => undefined);
        if (!resolved) continue;
        const version = await this.probe(resolved, tool, signal);
        if (version) { found[tool] = { path: resolved, version, source: 'system' }; break; }
      }
      if (found[tool]) continue;
      const asset = this.assets?.find(asset => asset.tool === tool), file = path.join(this.directory, this.filename(tool));
      if (asset && await fileMatches(file, asset)) {
        const version = await this.probe(file, tool, signal);
        if (version) found[tool] = { path: file, version, source: 'managed' };
      }
    }
    return found;
  }

  refresh(): Promise<OmniFfmpegStatus> {
    if (this.operation) return Promise.resolve(this.snapshot());
    if (!this.refreshing) this.refreshing = this.discover(this.lifetime.signal).then(found => {
      if (!this.operation) this.value = { ...this.value, ffmpeg: found.ffmpeg, ffprobe: found.ffprobe,
        state: found.ffmpeg && found.ffprobe ? 'ready' : !this.assets ? 'unsupported' : this.value.state === 'error' ? 'error' : 'missing',
        message: found.ffmpeg && found.ffprobe ? '' : !this.assets ? '当前系统暂不支持自动安装，请安装 FFmpeg 和 FFprobe 后重新检测。' : this.value.message };
      return this.snapshot();
    }).finally(() => { this.refreshing = undefined; });
    return this.refreshing;
  }

  /** 设置页与工具共用同一安装任务；单个调用取消只停止等待，插件卸载则终止下载。 */
  ensure(signal?: AbortSignal): Promise<OmniFfmpegReady> {
    signal?.throwIfAborted(); this.lifetime.signal.throwIfAborted();
    if (!this.operation) {
      this.value = { ...this.value, state: 'installing', message: '', downloadedBytes: 0, totalBytes: 0 };
      this.operation = this.install().then(result => {
        this.value = { ...this.value, ...result, state: 'ready', message: '' };
        return result;
      }, error => {
        this.value = { ...this.value, state: this.assets ? 'error' : 'unsupported', message: error instanceof Error ? error.message : 'FFmpeg 安装失败，请重试。' };
        throw error;
      }).finally(() => { this.operation = undefined; });
    }
    const operation = this.operation;
    if (!signal) return operation;
    return new Promise((resolve, reject) => {
      const abort = () => reject(signal.reason);
      signal.addEventListener('abort', abort, { once: true });
      operation.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort));
    });
  }

  private async install(): Promise<OmniFfmpegReady> {
    const signal = AbortSignal.any([this.lifetime.signal, AbortSignal.timeout(15 * 60_000)]);
    const found = await this.discover(signal);
    this.value = { ...this.value, ffmpeg: found.ffmpeg, ffprobe: found.ffprobe };
    if (found.ffmpeg && found.ffprobe) return found as OmniFfmpegReady;
    if (!this.assets) throw new Error('当前系统暂不支持自动安装，请安装 FFmpeg 和 FFprobe 后重新检测。');
    const pending = this.assets.filter(asset => !binaries.includes(asset.tool as Binary) || !found[asset.tool as Binary]);
    this.value.totalBytes = pending.reduce((sum, asset) => sum + asset.bytes, 0);
    await mkdir(this.directory, { recursive: true });
    const stage = await mkdtemp(path.join(this.directory, '.install-'));
    try {
      let completed = 0;
      const installed: Found = {};
      for (const asset of pending) {
        const file = path.join(stage, this.filename(asset.tool));
        await downloadFfmpegAsset(asset, file, signal, bytes => { this.value.downloadedBytes = completed + bytes; }, this.request);
        completed += asset.bytes;
        if (binaries.includes(asset.tool as Binary)) {
          await chmod(file, 0o755);
          const version = await this.probe(file, asset.tool as Binary, signal);
          if (!version) throw new Error('FFmpeg 无法运行，请检查系统兼容性后重试。');
          installed[asset.tool as Binary] = { path: path.join(this.directory, this.filename(asset.tool)), version, source: 'managed' };
        }
      }
      signal.throwIfAborted();
      for (const asset of pending) {
        const target = path.join(this.directory, this.filename(asset.tool));
        // 其他 Host 可能已完成相同安装；已校验的副本无需替换。
        if (!await fileMatches(target, asset)) await rename(path.join(stage, this.filename(asset.tool)), target);
      }
      return { ...found, ...installed } as OmniFfmpegReady;
    } catch (error) {
      if ((error as NodeJS.ErrnoException)?.code === 'ENOSPC') throw new Error('磁盘空间不足，请清理空间后重试。');
      throw error;
    } finally { await rm(stage, { recursive: true, force: true }); }
  }
}
