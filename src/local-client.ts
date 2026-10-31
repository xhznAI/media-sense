import { setTimeout as delay } from 'node:timers/promises';
import type { Context } from '@deepseek-ai/cordis';
import {
  OMNI_CHUNK_BYTES, omniFitsInline, omniInlineFileError, omniGoogleFileSchema, omniGoogleUploadSchema,
  omniPromptBody, omniReasoningParams, readOmniProviderResponse, type OmniFileMetadata,
  type OmniPromptFile, type OmniReasoningPreference,
} from './api/index.js';
import { readMedia, type LocalMedia } from './attachments.ts';
import type { MediaModel } from './catalog.ts';
import type { LocalModel } from './config.ts';

/** 自配模型的凭据只在 Host 发给用户指定的地址。 */
async function providerFetch(url: string, init: RequestInit): Promise<Response> {
  const response = await fetch(url, { ...init, redirect: 'error' });
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(`音视频模型请求失败（HTTP ${response.status}）`);
  }
  return response;
}

function googleRoot(local: LocalModel): string { return local.baseUrl.replace(/\/+$/u, '').replace(/\/v1beta$/u, ''); }

/** 在读取字节或开始上传之前检查协议限制，避免无效请求消耗网络和额度。 */
function validateFiles(local: LocalModel, files: OmniFileMetadata[]): void {
  if (local.adapter === 'google-generative-ai') {
    const version = /gemini-(\d+(?:\.\d+)?)/iu.exec(local.modelId);
    const limit = version && Number(version[1]) < 2.5 ? 1 : 10;
    if (files.filter(file => file.mimeType.startsWith('video/')).length > limit)
      throw new Error(`此 Gemini 模型每次最多接收 ${limit} 个视频。`);
  }
}

export async function callLocalModel(ctx: Context, model: MediaModel & { local: LocalModel }, instruction: string, files: LocalMedia[], signal: AbortSignal, effort?: OmniReasoningPreference) {
  const local = model.local;
  const identity = { ...model, id: local.modelId };
  const reasoning = omniReasoningParams(model, effort);
  validateFiles(local, files);
  const sizeError = omniInlineFileError(identity, files);
  if (sizeError) throw new Error(sizeError);
  const generate = async (media: OmniPromptFile[]) => {
    signal.throwIfAborted();
    const google = local.adapter === 'google-generative-ai';
    const base = local.baseUrl.replace(/\/+$/u, '');
    const endpoint = google ? `${googleRoot(local)}/v1beta/models/${encodeURIComponent(local.modelId)}:generateContent`
      : `${new URL(base).pathname === '/' ? `${base}/v1` : base}/chat/completions`;
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (local.apiKey) headers[google ? 'x-goog-api-key' : 'authorization'] = google ? local.apiKey : `Bearer ${local.apiKey}`;
    const prompt = omniPromptBody(identity, instruction, media);
    const body = { ...prompt, ...reasoning, ...(google ? { generationConfig: {
      ...(prompt.generationConfig as Record<string, unknown>), ...(reasoning.generationConfig as Record<string, unknown> | undefined),
    } } : {}) };
    const response = await providerFetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body), signal });
    return readOmniProviderResponse(response, local.modelId, signal);
  };
  if (omniFitsInline(identity, instruction, files)) return generate(await readMedia(ctx, files, signal));
  if (local.adapter !== 'google-generative-ai') throw new Error('此接口仅支持直接发送，编码后的完整请求不能超过 100 MB；请压缩或分段后重试。');
  return withGoogleFiles(ctx, local, files, signal, generate);
}

/** 大音频复用 Gemini Files API；处理完成、失败或取消后都尝试删除本次远端文件。 */
async function withGoogleFiles<T>(ctx: Context, local: LocalModel, files: LocalMedia[], signal: AbortSignal, run: (files: OmniPromptFile[]) => Promise<T>): Promise<T> {
  const root = googleRoot(local);
  const headers: Record<string, string> = local.apiKey ? { 'x-goog-api-key': local.apiKey } : {};
  const uploaded: { name: string; mimeType: LocalMedia['mimeType']; remote: ReturnType<typeof omniGoogleFileSchema.parse> }[] = [];
  try {
    for (const file of files) {
      signal.throwIfAborted();
      const start = await providerFetch(`${root}/upload/v1beta/files`, { method: 'POST', signal,
        headers: { ...headers, 'content-type': 'application/json', 'x-goog-upload-protocol': 'resumable', 'x-goog-upload-command': 'start',
          'x-goog-upload-header-content-length': String(file.size), 'x-goog-upload-header-content-type': file.mimeType },
        body: JSON.stringify({ file: { display_name: file.name } }),
      });
      const location = start.headers.get('x-goog-upload-url');
      await start.body?.cancel();
      if (!location) throw new Error('所选接口未提供 Gemini Files API 上传地址。');
      const upload = new URL(location, root);
      if (upload.origin !== new URL(root).origin || upload.username || upload.password)
        throw new Error('接口返回了不受信任的文件上传地址。');
      for (let offset = 0; offset < file.size; offset += OMNI_CHUNK_BYTES) {
        signal.throwIfAborted();
        const length = Math.min(OMNI_CHUNK_BYTES, file.size - offset);
        const bytes = await ctx.fs.readByteRange(file.target, { offset, length }, signal);
        if (bytes.length !== length) throw new Error(`文件在读取期间发生变化：${file.name}`);
        const final = offset + length === file.size;
        const response = await providerFetch(upload.href, { method: 'POST', signal,
          headers: { 'content-type': 'application/octet-stream', 'x-goog-upload-offset': String(offset), 'x-goog-upload-command': final ? 'upload, finalize' : 'upload' },
          body: new Uint8Array(bytes),
        });
        if (final) uploaded.push({ name: file.name, mimeType: file.mimeType, remote: omniGoogleUploadSchema.parse(await response.json()).file });
        else await response.body?.cancel();
      }
      const after = await ctx.fs.stat(file.target, signal);
      if (after?.size !== file.size || after.version !== file.version) throw new Error(`文件在上传期间发生变化：${file.name}`);
    }
    for (const file of uploaded) {
      while (file.remote.state === 'PROCESSING') {
        await delay(2000, undefined, { signal });
        const response = await providerFetch(`${root}/v1beta/${file.remote.name}`, { headers, signal });
        const remote = omniGoogleFileSchema.parse(await response.json());
        if (remote.name !== file.remote.name) throw new Error('接口返回了无效的文件状态。');
        file.remote = remote;
      }
      if (file.remote.state !== 'ACTIVE') throw new Error('Gemini 文件处理失败，请检查音视频格式。');
    }
    return await run(uploaded.map(file => ({ name: file.name, mimeType: file.mimeType, uri: file.remote.uri })));
  } finally {
    await Promise.all(uploaded.map(async file => {
      try { const response = await providerFetch(`${root}/v1beta/${file.remote.name}`, { method: 'DELETE', headers, signal: AbortSignal.timeout(10_000) }); await response.body?.cancel(); }
      catch { /* 清理失败的远端文件由 Gemini 的过期策略回收。 */ }
    }));
  }
}
