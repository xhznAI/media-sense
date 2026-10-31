import { basename, extname } from 'node:path';
import type { Context } from '@deepseek-ai/cordis';
import type { FsTarget, FsVersion } from '@deepseek-ai/dsh-fs';
import type { ToolExecution } from '@deepseek-ai/dsh-tools';
import type {} from '@deepseek-ai/dsh-working-directory';
import { OMNI_DEFAULT_MEDIA_MB, OMNI_MAX_INLINE_MEDIA_BYTES, OMNI_REQUEST_SIZE_MESSAGE, omniUploadRequestSchema, type OmniFile, type OmniKind, type OmniFileMetadata } from './api/index.js';

const MIME: Record<string, OmniFile['mimeType']> = {
  '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.flac': 'audio/flac',
  '.ogg': 'audio/ogg', '.opus': 'audio/opus', '.weba': 'audio/webm', '.aif': 'audio/aiff', '.aiff': 'audio/aiff',
  '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.mpeg': 'video/mpeg', '.mpg': 'video/mpeg',
  '.avi': 'video/x-msvideo', '.flv': 'video/x-flv', '.3gp': 'video/3gpp', '.wmv': 'video/x-ms-wmv',
  '.mkv': 'video/x-matroska',
};
export function mediaType(path: string): OmniFile['mimeType'] {
  const mime = MIME[extname(path).toLowerCase()];
  if (!mime || /^(?:https?|data):/iu.test(path)) throw new Error('Media Sense 只接受本地音频或视频文件。');
  return mime;
}
export function mediaKind(mime: string): OmniKind { return mime.startsWith('video/') ? 'video' : 'audio'; }

export interface LocalMedia extends OmniFileMetadata { target: FsTarget; version: FsVersion }
export function mediaMetadata(file: LocalMedia): OmniFileMetadata { return { name: file.name, mimeType: file.mimeType, size: file.size }; }

/** 只检查元信息，大文件内容由文件服务分块读取，沿用原有访问边界。 */
export async function inspectMedia(ctx: Context, paths: string[], exec: ToolExecution, limitMB = OMNI_DEFAULT_MEDIA_MB): Promise<LocalMedia[]> {
  const result: LocalMedia[] = [];
  let totalBytes = 0;
  for (const path of paths) {
    exec.signal.throwIfAborted();
    const mimeType = mediaType(path);
    const cwd = (exec.agent ? ctx.workingDirectory.get(exec.agent.session) : undefined);
    const target = await ctx.fs.resolve(path, { ...(cwd ? { cwd } : {}), signal: exec.signal });
    const info = await ctx.fs.stat(target, exec.signal);
    if (info?.type !== 'file') throw new Error(`不是可读取的音视频文件：${path}`);
    if (!info.size || !Number.isSafeInteger(info.size)) throw new Error(`音视频文件为空或无法读取大小：${path}`);
    totalBytes += info.size;
    if (totalBytes > limitMB * 1_000_000) throw new Error(`本次素材合计 ${(totalBytes / 1_000_000).toFixed(2)} MB，超过此模型设置的 ${limitMB} MB 上限。可在「设置 → Media Sense」调整上传上限，或压缩、分段后重试。`);
    result.push({ name: basename(path), mimeType, size: info.size, target, version: info.version });
  }
  const parsed = omniUploadRequestSchema.safeParse({ modelId: 'metadata-check', files: result.map(mediaMetadata) });
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? '音视频文件元信息无效。');
  return result;
}

export async function readMedia(ctx: Context, files: LocalMedia[], signal: AbortSignal): Promise<OmniFile[]> {
  if (files.reduce((sum, file) => sum + file.size, 0) > OMNI_MAX_INLINE_MEDIA_BYTES)
    throw new Error(OMNI_REQUEST_SIZE_MESSAGE);
  const result: OmniFile[] = [];
  for (const file of files) {
    signal.throwIfAborted();
    const bytes = await ctx.fs.readBytes(file.target, signal, file.size);
    const after = await ctx.fs.stat(file.target, signal);
    if (bytes.byteLength !== file.size || after?.version !== file.version) throw new Error(`文件在读取期间发生变化：${file.name}`);
    result.push({ name: file.name, mimeType: file.mimeType, data: Buffer.from(bytes).toString('base64') });
  }
  return result;
}
