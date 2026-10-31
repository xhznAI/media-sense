import { OMNI_MAX_RESULT_CHARS, type OmniCallResponse } from './omni.js';

/** 只提取公开回答，思考内容及供应商调用信息不进入工具结果。 */
function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
function first(value: unknown): Record<string, unknown> { return record(Array.isArray(value) ? value[0] : undefined); }
function textOf(value: unknown): string {
  const payload = record(value);
  if (Array.isArray(payload.candidates)) {
    const parts = record(first(payload.candidates).content).parts;
    return Array.isArray(parts) ? parts.map(record).filter(part => part.thought !== true && typeof part.text === 'string').map(part => part.text).join('') : '';
  }
  const choice = first(payload.choices);
  const content = record(choice.delta).content ?? record(choice.message).content;
  return typeof content === 'string' ? content : Array.isArray(content)
    ? content.map(record).filter(part => part.type === 'text' && typeof part.text === 'string').map(part => part.text).join('') : '';
}
function outputLimited(value: unknown): boolean {
  const payload = record(value);
  return first(payload.candidates).finishReason === 'MAX_TOKENS' || first(payload.choices).finish_reason === 'length';
}

/** 仅允许协议枚举进入诊断，不回传上游错误正文或思考文本。 */
const finishReasons = new Set(['STOP', 'MAX_TOKENS', 'SAFETY', 'RECITATION', 'OTHER', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'SPII', 'MALFORMED_FUNCTION_CALL', 'IMAGE_SAFETY', 'UNEXPECTED_TOOL_CALL', 'NO_IMAGE', 'stop', 'length', 'content_filter', 'tool_calls', 'function_call']);

export async function readOmniProviderResponse(response: Response, modelId: string, signal?: AbortSignal): Promise<OmniCallResponse> {
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(`音视频模型请求失败（HTTP ${response.status}）`);
  }
  let text = '';
  let truncated = false;
  let finishReason = '';
  let thoughts = false;
  let recognized = false;
  let nonTextOutput = false;
  const append = (value: string): void => {
    const room = OMNI_MAX_RESULT_CHARS - text.length;
    if (value.length > room) truncated = true;
    text += value.slice(0, room);
  };
  const consume = (value: unknown): void => {
    const payload = record(value);
    if (payload.error) throw new Error(`音视频模型 ${modelId} 返回了错误，请检查接口状态。`);
    recognized ||= Array.isArray(payload.candidates) || Array.isArray(payload.choices) || !!payload.promptFeedback;
    const candidate = first(payload.candidates);
    const choice = first(payload.choices);
    const reason = candidate.finishReason ?? choice.finish_reason ?? record(payload.promptFeedback).blockReason;
    if (typeof reason === 'string' && finishReasons.has(reason)) finishReason = reason;
    const parts = record(candidate.content).parts;
    if (Array.isArray(parts)) for (const part of parts.map(record)) {
      thoughts ||= part.thought === true && typeof part.text === 'string' && part.text.length > 0;
      nonTextOutput ||= !!part.inlineData || !!part.fileData || !!part.functionCall;
    }
    const message = record(choice.delta ?? choice.message);
    thoughts ||= typeof message.reasoning_content === 'string' && message.reasoning_content.length > 0;
    truncated ||= outputLimited(value);
    append(textOf(value));
  };
  const parse = (data: string): unknown => {
    try { return JSON.parse(data); }
    catch { throw new Error(`音视频模型 ${modelId} 返回了无效 JSON，请检查接口协议。`); }
  };
  if (response.headers.get('content-type')?.includes('text/event-stream')) {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('音视频模型没有返回内容');
    const decoder = new TextDecoder();
    let pending = '';
    const event = (chunk: string): void => {
      const data = chunk.split(/\r?\n/u).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
      if (!data || data === '[DONE]') return;
      consume(parse(data));
    };
    try {
      for (;;) {
        signal?.throwIfAborted();
        const next = await reader.read();
        pending += decoder.decode(next.value, { stream: !next.done });
        if (pending.length > 2 * 1024 * 1024) throw new Error('音视频模型响应片段过大');
        let match: RegExpExecArray | null;
        while ((match = /\r?\n\r?\n/u.exec(pending))) {
          event(pending.slice(0, match.index));
          pending = pending.slice(match.index + match[0].length);
        }
        if (next.done) { if (pending.trim()) event(pending); break; }
      }
    } finally { await reader.cancel().catch(() => undefined); reader.releaseLock(); }
  } else {
    consume(parse(await response.text()));
  }
  signal?.throwIfAborted();
  if (!text.trim()) {
    const detail = truncated ? '输出额度已用尽，未生成正文，请降低思考强度或分段处理。'
      : !recognized ? '响应格式不受支持，请检查接口协议。'
        : nonTextOutput ? '返回了非文字内容，请检查模型是否支持文字输出。'
          : thoughts ? '仅返回思考内容，未生成正文。' : '上游没有提供正文。';
    throw new Error(`音视频模型 ${modelId} 没有返回文字结果：${detail}${finishReason ? `（结束原因：${finishReason}）` : ''}`);
  }
  return { modelId, text, truncated };
}
