import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { once } from 'node:events';
import type { Context } from '@deepseek-ai/cordis';
import type { ToolRunContext } from '@deepseek-ai/dsh-tools';
import { describe, expect, it, vi } from 'vitest';
import { installFfmpeg, prepareFfmpegTool } from './ffmpeg-integration.ts';
import { FfmpegManager } from './ffmpeg.ts';

const ready = { ffmpeg: { path: '/tools/ffmpeg', version: '6.1.1', source: 'system' as const }, ffprobe: { path: '/tools/ffprobe', version: '6.1.1', source: 'managed' as const } };
describe('FFmpeg 设置接口与原生工具', () => {
  it('工具共享管理器，返回路径和来源，拒绝额外下载地址', async () => {
    const manager = new FfmpegManager();
    const ensure = vi.spyOn(manager, 'ensure').mockResolvedValue(ready);
    const tool = prepareFfmpegTool(manager), signal = new AbortController().signal;
    const exec = { signal } as ToolRunContext;
    const result = await tool.execute({}, exec);
    expect(result).toEqual(ready);
    expect(ensure).toHaveBeenCalledWith(signal);
    expect(await tool.output.render({}, ready)).toEqual([{ type: 'text', text: JSON.stringify(ready) }]);
    await expect(tool.execute({ url: 'https://untrusted.invalid/script' }, exec)).rejects.toThrow();
    expect(ensure).toHaveBeenCalledTimes(1);
    manager.dispose();
  });
  it('GET 不安装，合法 POST 启动共享任务，拒绝跨站、超大和非契约请求', async () => {
    const manager = new FfmpegManager();
    const state = { state: 'missing' as const, platform: 'darwin-arm64', canInstall: true, downloadedBytes: 0, totalBytes: 0, message: '' };
    vi.spyOn(manager, 'refresh').mockResolvedValue(state);
    vi.spyOn(manager, 'snapshot').mockReturnValue({ ...state, state: 'installing' });
    const ensure = vi.spyOn(manager, 'ensure').mockResolvedValue(ready);
    const effects: (() => void)[] = [];
    const register = vi.fn();
    let handler!: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
    const ctx = { effect: (effect: () => (() => void)) => { effects.push(effect()); }, tools: { register },
      webServer: { register: (route: { handler: typeof handler }) => { handler = route.handler; return () => {}; } } } as unknown as Context;
    installFfmpeg(ctx, manager);
    const server = createServer((req, res) => { void handler(req, res); }); server.listen(0, '127.0.0.1'); await once(server, 'listening');
    const address = server.address(); if (!address || typeof address === 'string') throw new Error('测试端口无效');
    const origin = `http://127.0.0.1:${address.port}`, url = `${origin}/media-sense/ffmpeg`;
    try {
      expect(register.mock.calls[0]?.[0].name).toBe('media_sense_prepare_ffmpeg');
      expect(await (await fetch(url)).json()).toEqual(state); expect(ensure).not.toHaveBeenCalled();
      const post = (body: string, extra: Record<string, string> = {}) => fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', origin, ...extra }, body });
      expect((await post('{"action":"install"}', { origin: 'https://untrusted.invalid' })).status).toBe(403);
      expect((await post('{"action":"install"}', { 'sec-fetch-site': 'cross-site' })).status).toBe(403);
      expect((await post('{"action":"install"}', { 'content-type': 'text/plain' })).status).toBe(415);
      expect((await post('x'.repeat(1025))).status).toBe(413);
      expect((await post('{"action":"install","url":"https://untrusted.invalid"}')).status).toBe(400);
      expect(ensure).not.toHaveBeenCalled();
      const response = await post('{"action":"install"}'); expect(response.status).toBe(202);
      expect((await response.json()).state).toBe('installing'); expect(ensure).toHaveBeenCalledTimes(1);
      const unsupported = await fetch(url, { method: 'DELETE' }); expect(unsupported.status).toBe(405); expect(unsupported.headers.get('allow')).toBe('GET, POST');
    } finally { server.closeAllConnections(); server.close(); for (const effect of effects.reverse()) effect(); }
  });
});
