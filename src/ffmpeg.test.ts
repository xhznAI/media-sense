import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, readdir, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FfmpegManager, ffmpegCandidates } from './ffmpeg.ts';
import { FFMPEG_RELEASE } from './ffmpeg-assets.ts';
import { FFMPEG_MIRRORS, downloadFfmpegAsset, type FfmpegAsset } from './ffmpeg-download.ts';

const roots: string[] = [];
const managers: FfmpegManager[] = [];
afterEach(async () => { for (const manager of managers.splice(0)) manager.dispose(); for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true }); });
const hash = (data: Buffer) => createHash('sha256').update(data).digest('hex');
async function fixture(system: ('ffmpeg' | 'ffprobe')[] = [], requestOverride?: typeof fetch) {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'media-sense-ffmpeg-'))); roots.push(root);
  const bin = join(root, 'system'); await mkdir(bin);
  for (const tool of system) await writeFile(join(bin, tool), 'existing');
  const bodies = new Map<string, Buffer>();
  const assets: FfmpegAsset[] = (['ffmpeg', 'ffprobe', 'LICENSE', 'README'] as const).map(tool => {
    const raw = Buffer.from(`verified ${tool}`), compressed = gzipSync(raw), filename = `${tool}.gz`;
    bodies.set(filename, compressed);
    return { tool, filename, bytes: compressed.length, sha256: hash(compressed), outputBytes: raw.length, outputSha256: hash(raw) };
  });
  const request = vi.fn(requestOverride ?? (async (url: string | URL | Request) => new Response(new Uint8Array(bodies.get(String(url).split('/').at(-1)!)!))) as typeof fetch);
  const probe = vi.fn(async (file: string) => file.startsWith(root) ? '6.1.1' : undefined);
  const directory = join(root, 'managed');
  const options = { directory, platform: 'linux' as const, arch: 'x64', env: { PATH: bin }, probe, request, assets };
  const manager = new FfmpegManager(options); managers.push(manager);
  return { root, bin, directory, assets, bodies, request, probe, manager, options, installed: join(directory, 'linux-x64', FFMPEG_RELEASE) };
}

describe('Omni FFmpeg 检测与安装', () => {
  it('优先复用系统程序，读取状态和准备工具均不下载', async () => {
    const f = await fixture(['ffmpeg', 'ffprobe']);
    expect((await f.manager.refresh()).state).toBe('ready');
    const ready = await f.manager.ensure();
    expect(ready.ffmpeg).toMatchObject({ path: join(f.bin, 'ffmpeg'), source: 'system' });
    expect(ready.ffprobe.source).toBe('system');
    expect(f.request).not.toHaveBeenCalled();
  });
  it('仅补齐缺失的 FFprobe，保留本机 FFmpeg；重启后复用已校验的缓存', async () => {
    const f = await fixture(['ffmpeg']);
    expect((await f.manager.refresh()).state).toBe('missing');
    expect(f.request).not.toHaveBeenCalled();
    const ready = await f.manager.ensure();
    expect(ready.ffmpeg.source).toBe('system'); expect(ready.ffprobe.source).toBe('managed');
    expect(f.request.mock.calls.map(call => String(call[0]))).toEqual(['ffprobe.gz', 'LICENSE.gz', 'README.gz'].map(file => `${FFMPEG_MIRRORS[0]}/${FFMPEG_RELEASE}/${file}`));
    expect(await readFile(join(f.bin, 'ffmpeg'), 'utf8')).toBe('existing');
    const restarted = new FfmpegManager(f.options); managers.push(restarted);
    expect((await restarted.refresh()).ffprobe?.source).toBe('managed');
    await restarted.ensure(); expect(f.request).toHaveBeenCalledTimes(3);
    expect(await readFile(join(f.installed, 'LICENSE'), 'utf8')).toBe('verified LICENSE');
  });
  it('并发请求共享下载，一个调用取消不会取消另一个调用', async () => {
    const f = await fixture();
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    f.request.mockImplementationOnce(async url => { await gate; return new Response(new Uint8Array(f.bodies.get(String(url).split('/').at(-1)!)!)); });
    const abort = new AbortController();
    const first = f.manager.ensure(abort.signal), second = f.manager.ensure();
    const rejection = expect(first).rejects.toThrow(); abort.abort(); await rejection;
    expect((await f.manager.refresh()).state).toBe('installing');
    release(); const ready = await second;
    expect(ready.ffmpeg.source).toBe('managed'); expect(ready.ffprobe.source).toBe('managed');
    expect(f.request).toHaveBeenCalledTimes(4);
    expect(f.manager.snapshot().downloadedBytes).toBe(f.manager.snapshot().totalBytes);
  });
  it('下载摘要错误时不执行或提交新文件，清理临时目录后允许重试', async () => {
    const f = await fixture();
    const original = f.request.getMockImplementation()!;
    const wrong = gzipSync(Buffer.from('corrupted'));
    f.request.mockImplementation(async () => new Response(wrong));
    await expect(f.manager.ensure()).rejects.toThrow('校验失败');
    expect(f.manager.snapshot().state).toBe('error');
    expect(f.probe.mock.calls.some(([file]) => file.includes('.install-'))).toBe(false);
    expect(await readdir(f.installed)).toEqual([]);
    f.request.mockImplementation(original);
    await f.manager.ensure(); expect(f.manager.snapshot().state).toBe('ready');
  });
  it('缓存被修改后不执行该文件，重新下载并校验', async () => {
    const f = await fixture(); await f.manager.ensure();
    const file = join(f.installed, 'ffprobe'); await writeFile(file, 'tampered'); f.probe.mockClear();
    expect((await f.manager.refresh()).ffprobe).toBeUndefined();
    expect(f.probe.mock.calls.some(([candidate]) => candidate === file)).toBe(false);
    await f.manager.ensure(); expect(await readFile(file, 'utf8')).toBe('verified ffprobe');
  });
  it('下载中卸载插件会终止请求并清理临时文件', async () => {
    const f = await fixture();
    let started!: () => void;
    const ready = new Promise<void>(resolve => { started = resolve; });
    f.request.mockImplementation((_url, init) => new Promise((_resolve, reject) => {
      started(); init?.signal?.addEventListener('abort', () => reject(init.signal?.reason), { once: true });
    }));
    const pending = f.manager.ensure(); const rejection = expect(pending).rejects.toThrow();
    await ready; f.manager.dispose(); await rejection;
    expect(await readdir(f.installed)).toEqual([]);
  });
  it('不支持的平台仍复用本机工具，缺失时不尝试下载错误架构', async () => {
    const f = await fixture(['ffmpeg', 'ffprobe']);
    const { assets: _assets, ...options } = f.options;
    const manager = new FfmpegManager({ ...options, platform: 'freebsd', arch: 'riscv64' }); managers.push(manager);
    expect((await manager.ensure()).ffmpeg.source).toBe('system');
    await rm(join(f.bin, 'ffprobe'));
    await expect(manager.ensure()).rejects.toThrow('暂不支持');
    expect(f.request).not.toHaveBeenCalled();
  });
  it('Windows 支持大小写 PATH 和标准目录，忽略当前工作目录及相对 PATH', async () => {
    const candidates = await ffmpegCandidates('ffmpeg', 'win32', { Path: '"C:\\Tools";.;relative', ProgramFiles: 'C:\\Program Files' });
    expect(candidates).toContain('C:\\Tools\\ffmpeg.exe');
    expect(candidates).toContain('C:\\Program Files\\FFmpeg\\bin\\ffmpeg.exe');
    expect(candidates.every(value => /^[A-Z]:\\/u.test(value))).toBe(true);
  });
});

describe('国内镜像下载与字节校验', () => {
  it('首个地址失败后尝试另一个国内入口，始终不携带账户凭据', async () => {
    const f = await fixture(); const asset = f.assets[0]!;
    f.request.mockImplementationOnce(async () => new Response('', { status: 503 }));
    await downloadFfmpegAsset(asset, join(f.root, 'download'), new AbortController().signal, () => {}, f.request);
    expect(f.request.mock.calls.map(call => String(call[0]))).toEqual(FFMPEG_MIRRORS.map(mirror => `${mirror}/${FFMPEG_RELEASE}/${asset.filename}`));
    expect(f.request.mock.calls.every(call => !call[1]?.headers)).toBe(true);
  });
  it('压缩包摘要正确但解压摘要错误也拒绝，下载体积超限同样拒绝', async () => {
    const f = await fixture();
    for (const asset of [{ ...f.assets[0]!, outputSha256: '0'.repeat(64) }, { ...f.assets[0]!, bytes: 1 }])
      await expect(downloadFfmpegAsset(asset, join(f.root, 'download'), new AbortController().signal, () => {}, f.request)).rejects.toThrow('校验失败');
    expect((await readdir(f.root)).includes('download')).toBe(false);
  });
});
