import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { once } from 'node:events';
import type { Context } from '@deepseek-ai/cordis';
import { expect, it, vi } from 'vitest';
import { apply } from './index.ts';
import type { Config } from './config.ts';

it('仅使用通用 Host 服务启动，直接配置模型，不需要外部模型来源', async () => {
  const values = { source: '', preferences: {}, localModels: [] };
  const config = Object.fromEntries(Object.keys(values).map(key => [key, { get: () => values[key as keyof typeof values] }])) as unknown as Config;
  const routes = new Map<string, (req: IncomingMessage, res: ServerResponse) => Promise<void>>();
  const effects: (() => void)[] = [];
  const register = vi.fn();
  const update = vi.fn(async (_id: string, patch: object) => { Object.assign(values, patch); });
  const ctx = {
    provide(key: string, service: unknown) { Object.assign(this, { [key]: service }); },
    effect(fn: () => (() => void)) { effects.push(fn()); },
    tools: { register }, settings: { update, configure: () => () => {} }, logger: { warn: vi.fn() },
    webServer: { register(route: { path: string; handler: (req: IncomingMessage, res: ServerResponse) => Promise<void> }) {
      routes.set(route.path, route.handler); return () => { routes.delete(route.path); };
    } },
  } as unknown as Context;
  await apply(ctx, config);
  const server = createServer((req, res) => { const handler = routes.get(req.url!); if (handler) void handler(req, res); else { res.statusCode = 404; res.end(); } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address(); if (!address || typeof address === 'string') throw new Error('测试端口无效');
  const origin = `http://127.0.0.1:${address.port}`;
  try {
    expect(register.mock.calls.map(([tool]) => tool.name)).toEqual(['media_sense_call', 'media_sense_prepare_ffmpeg']);
    expect(ctx.mediaSenseSources.current()).toBeUndefined();
    expect(await (await fetch(`${origin}/media-sense/settings`)).json()).toMatchObject({ source: 'local', localModels: [], models: [] });
    const response = await fetch(`${origin}/media-sense/settings`, { method: 'PUT', headers: { origin, 'content-type': 'application/json' },
      body: JSON.stringify({ source: 'local', preferences: { audioModelId: '', videoModelId: '' }, localModels: [{
        id: 'e3ef64e4-b1cd-4e41-b873-9cd87872a7ca', name: 'My audio', modelId: 'custom-audio', baseUrl: 'http://localhost:9000/v1',
        adapter: 'openai-completions', audio: true, video: false, apiKey: 'private-fixture-key',
      }] }),
    });
    expect(response.status).toBe(200);
    const state = await response.json();
    expect(state).toMatchObject({ source: 'local', localModels: [{ hasApiKey: true }], models: [{ audio: true, video: false }] });
    expect(state.hostSource).toBeUndefined();
    expect(JSON.stringify(state)).not.toContain('private-fixture-key');
    expect(update.mock.calls[0]?.[0]).toBe('media-sense');
  } finally {
    server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve()));
    for (const effect of effects.reverse()) effect();
  }
});
