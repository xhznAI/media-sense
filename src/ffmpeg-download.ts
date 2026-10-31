import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { stat, rm } from 'node:fs/promises';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import { FFMPEG_RELEASE } from './ffmpeg-assets.ts';

export interface FfmpegAsset {
  readonly tool: 'ffmpeg' | 'ffprobe' | 'LICENSE' | 'README';
  readonly filename: string;
  readonly sha256: string;
  readonly bytes: number;
  readonly outputSha256: string;
  readonly outputBytes: number;
}
export const FFMPEG_MIRRORS = [
  'https://cdn.npmmirror.com/binaries/ffmpeg-static',
  'https://registry.npmmirror.com/-/binary/ffmpeg-static',
] as const;

export async function fileMatches(path: string, asset: FfmpegAsset): Promise<boolean> {
  try {
    if ((await stat(path)).size !== asset.outputBytes) return false;
    const hash = createHash('sha256');
    for await (const chunk of createReadStream(path)) hash.update(chunk);
    return hash.digest('hex') === asset.outputSha256;
  } catch { return false; }
}

/** 固定地址、固定文件名与双重摘要；不解压归档路径，也不运行安装脚本。 */
export async function downloadFfmpegAsset(asset: FfmpegAsset, target: string, signal: AbortSignal,
  progress: (bytes: number) => void, request: typeof fetch = fetch): Promise<void> {
  let failure: unknown;
  for (const mirror of FFMPEG_MIRRORS) {
    signal.throwIfAborted();
    progress(0);
    try {
      const attempt = AbortSignal.any([signal, AbortSignal.timeout(5 * 60_000)]);
      const response = await request(`${mirror}/${FFMPEG_RELEASE}/${asset.filename}`, { signal: attempt });
      if (!response.ok || !response.body) { await response.body?.cancel(); throw new Error(`HTTP ${response.status}`); }
      let compressed = 0, expanded = 0;
      const inputHash = createHash('sha256'), outputHash = createHash('sha256');
      await pipeline(Readable.fromWeb(response.body as import('node:stream/web').ReadableStream),
        new Transform({ transform(chunk: Buffer, _encoding, callback) {
          compressed += chunk.length;
          if (compressed > asset.bytes) { callback(new Error('FFmpeg 下载文件大小不符')); return; }
          inputHash.update(chunk); progress(compressed); callback(null, chunk);
        } }), createGunzip(),
        new Transform({ transform(chunk: Buffer, _encoding, callback) {
          expanded += chunk.length;
          if (expanded > asset.outputBytes) { callback(new Error('FFmpeg 解压文件大小不符')); return; }
          outputHash.update(chunk); callback(null, chunk);
        } }), createWriteStream(target, { flags: 'wx', mode: 0o600 }), { signal: attempt });
      if (compressed !== asset.bytes || expanded !== asset.outputBytes || inputHash.digest('hex') !== asset.sha256 || outputHash.digest('hex') !== asset.outputSha256)
        throw new Error('FFmpeg 下载校验失败，请重试。');
      return;
    } catch (error) {
      failure = error;
      await rm(target, { force: true });
      signal.throwIfAborted();
      if ((error as NodeJS.ErrnoException)?.code === 'ENOSPC') throw error;
    }
  }
  throw new Error('FFmpeg 下载或校验失败，请检查网络后重试。', { cause: failure });
}
