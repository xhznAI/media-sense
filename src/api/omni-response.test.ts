import { describe, expect, it } from 'vitest';
import { readOmniProviderResponse } from './omni-response.js';

const model = 'gemini-3.8-flash';
describe('Media Sense 响应诊断', () => {
  it('正文只保留公开回答，思考内容不会混入字幕', async () => {
    const response = Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [
      { thought: true, text: 'private-thought' }, { text: '00:01 测试配音' },
    ] } }] });
    expect(await readOmniProviderResponse(response, model)).toEqual({ modelId: model, text: '00:01 测试配音', truncated: false });
  });
  it('空结果区分思考内容和输出额度耗尽，并提供实际模型和结束原因', async () => {
    for (const [finishReason, message] of [['STOP', '仅返回思考内容'], ['MAX_TOKENS', '输出额度已用尽']]) {
      const response = Response.json({ candidates: [{ finishReason, content: { parts: [{ thought: true, text: 'private-thought' }] } }] });
      const error = await readOmniProviderResponse(response, model).catch(error => error as Error);
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain(model);
      expect((error as Error).message).toContain(message);
      expect((error as Error).message).toContain(finishReason);
      expect((error as Error).message).not.toContain('private-thought');
    }
  });
  it('HTTP 200 的错误信封和无效 JSON 不伪装成空输出，不泄露原始响应', async () => {
    for (const response of [Response.json({ error: { message: 'provider-secret' } }), new Response('provider-secret')]) {
      const error = await readOmniProviderResponse(response, model).catch(error => error as Error);
      expect((error as Error).message).toMatch(/返回了错误|无效 JSON/u);
      expect((error as Error).message).not.toContain('provider-secret');
    }
    await expect(readOmniProviderResponse(Response.json({ unexpected: 'provider-secret' }), model)).rejects.toThrow('响应格式不受支持');
  });
  it('非文字返回和内容限制保留可用诊断', async () => {
    await expect(readOmniProviderResponse(Response.json({ candidates: [{ content: { parts: [{ inlineData: { mimeType: 'audio/wav', data: 'AAAA' } }] } }] }), model)).rejects.toThrow('非文字内容');
    await expect(readOmniProviderResponse(Response.json({ promptFeedback: { blockReason: 'SAFETY' } }), model)).rejects.toThrow('结束原因：SAFETY');
  });
  it('流式空输出保留 length 原因，跨字节分块的中文正文正常合并', async () => {
    const empty = new Response('data: {"choices":[{"delta":{"reasoning_content":"private-thought"},"finish_reason":"length"}]}\n\ndata: [DONE]\n\n', { headers: { 'content-type': 'text/event-stream' } });
    await expect(readOmniProviderResponse(empty, 'mimo')).rejects.toThrow('输出额度已用尽');
    const bytes = new TextEncoder().encode('data: {"choices":[{"delta":{"content":"测试字幕"}}]}\r\n\r\ndata: [DONE]\n\n');
    const body = new ReadableStream({ start(controller) { for (let i = 0; i < bytes.length; i++) controller.enqueue(bytes.slice(i, i + 1)); controller.close(); } });
    expect(await readOmniProviderResponse(new Response(body, { headers: { 'content-type': 'text/event-stream' } }), 'mimo')).toEqual({ modelId: 'mimo', text: '测试字幕', truncated: false });
  });
});
