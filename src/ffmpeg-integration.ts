import type { Context } from '@deepseek-ai/cordis';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import type {} from '@deepseek-ai/dsh-host-webserver';
import { z } from 'zod';
import { omniFfmpegInstallRequestSchema, omniFfmpegReadySchema, omniFfmpegStatusSchema } from './api/index.js';
import { FfmpegManager } from './ffmpeg.ts';

const empty = z.object({}).strict();
export function prepareFfmpegTool(manager: FfmpegManager): ToolDefinition {
  return {
    name: 'media_sense_prepare_ffmpeg',
    description: '准备本地音视频处理所需的 FFmpeg 和 FFprobe。优先复用本机已有程序，缺失时自动从国内镜像下载校验后的固定版本，无需用户先进入设置。返回两个程序的绝对路径、版本和来源；后续媒体命令使用返回的绝对路径。本工具只准备运行环境，不读取或改动媒体，也不调用音视频理解模型。',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    timeoutMs: 16 * 60_000,
    output: { schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => [{ type: 'text', text: JSON.stringify(omniFfmpegReadySchema.parse(value)) }] },
    isConcurrencySafe: () => true,
    async execute(args, exec) { empty.parse(args); return manager.ensure(exec.signal); },
  };
}

export function installFfmpeg(ctx: Context, manager = new FfmpegManager()): void {
  ctx.effect(() => () => manager.dispose());
  ctx.tools.register(prepareFfmpegTool(manager));
  ctx.effect(() => ctx.webServer.register({ kind: 'exact', path: '/media-sense/ffmpeg', async handler(request, response) {
    response.setHeader('content-type', 'application/json; charset=utf-8');
    response.setHeader('cache-control', 'no-store');
    const reply = (status: number, value: unknown) => { response.statusCode = status; response.end(JSON.stringify(value)); };
    try {
      if (request.headers['sec-fetch-site'] === 'cross-site' || request.headers.origin && request.headers.origin !== `http://${request.headers.host}`) {
        reply(403, { message: '请求来源无效' }); return;
      }
      if (request.method === 'GET') { reply(200, omniFfmpegStatusSchema.parse(await manager.refresh())); return; }
      if (request.method !== 'POST') { response.setHeader('allow', 'GET, POST'); reply(405, { message: '请求方法不支持' }); return; }
      if (!request.headers['content-type']?.startsWith('application/json')) { reply(415, { message: '请求格式无效' }); return; }
      let size = 0;
      const chunks: Buffer[] = [];
      for await (const chunk of request) {
        const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += data.length;
        if (size > 1024) { reply(413, { message: '设置请求过大' }); return; }
        chunks.push(data);
      }
      omniFfmpegInstallRequestSchema.parse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      // HTTP 请求只启动任务；下载状态由 GET 获取，关闭设置页不会中断其他调用。
      void manager.ensure().catch(() => {});
      reply(202, omniFfmpegStatusSchema.parse(manager.snapshot()));
    } catch { reply(400, { message: 'FFmpeg 请求失败，请重试。' }); }
  } }));
}
