import type { Context } from '@deepseek-ai/cordis';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import { z } from 'zod';
import { omniCallResponseSchema, omniReasoningParams, omniMediaLimitMB } from './api/index.js';
import { preferencesOf, sourceOf, type RuntimeConfig } from './config.ts';
import { readCatalog, selectOmniModel } from './catalog.ts';
import { mediaKind, mediaType, inspectMedia } from './attachments.ts';
import { callLocalModel } from './local-client.ts';

const argumentsSchema = z.object({ files: z.array(z.string().min(1).max(4096)).min(1), instruction: z.string().trim().min(1).max(12_000) }).strict();
export function omniTool(ctx: Context, config: RuntimeConfig): ToolDefinition {
  return {
    name: 'media_sense_call',
    description: '调用 Media Sense 模型解决本地音视频的语音转写（含带时间戳转写）、字幕生成、语音或事件的时间点定位、声音辨识、连续动作分析和音画时序理解等问题。仅在任务需要这些能力时调用，使用 Media Sense 设置中的模型并返回文字结果；不执行媒体参数查询、转码、剪辑或图片处理。'
      + '在保留任务所需信息的前提下，以最小文件体积提交音视频；例如纯语音转写仅提交音轨。附件原始字节合计遵循所选模型的上传上限，默认 25 MB，用户可在设置中修改。返回 JSON { modelId, text, truncated }；truncated 为 true 表示结果不完整，不能作为完整字幕或完整转写，应缩小素材范围或分段后重试。',
    parameters: { type: 'object', additionalProperties: false, properties: {
      files: { type: 'array', minItems: 1, items: { type: 'string' }, description: '本地音频或视频文件路径，相对路径基于当前会话的工作目录。在保留任务所需信息的前提下，以最小文件体积提交；纯语音转写仅提交音轨。多文件按原始字节累加，使用设置中当前模型的上传上限（默认 25 MB，可修改）。超限请压缩或分段；格式、数量、时长与编码大小还受模型接口限制。' },
      instruction: { type: 'string', description: '针对所提供音视频的具体问题、关注范围和输出要求。字幕任务可要求 SRT/VTT 格式和逐句起止时间；需要时间戳或时间点时明确返回的是相对附件还是原素材的时间，附件为片段且需返回原素材时间时提供片段起点。' },
    }, required: ['files', 'instruction'] },
    output: {
      schema: { type: 'object', additionalProperties: false, properties: {
        modelId: { type: 'string' }, text: { type: 'string' }, truncated: { type: 'boolean' },
      }, required: ['modelId', 'text', 'truncated'] },
      render: (_args, value) => {
        const result = omniCallResponseSchema.parse(value);
        // Agent 看到的是 render 结果，须保留来源和截断标志，不能只呈现正文。
        return [{ type: 'text', text: JSON.stringify(result) }];
      },
    },
    async execute(value, exec) {
      const args = argumentsSchema.parse(value);
      const kinds = args.files.map(file => mediaKind(mediaType(file)));
      const signal = AbortSignal.any([exec.signal, AbortSignal.timeout(2 * 60 * 60 * 1000)]);
      const selectedSource = sourceOf(config);
      const callConfig: RuntimeConfig = Object.create(config, {
        externalSource: { value: config.externalSource },
        source: { value: { get: () => selectedSource } },
      });
      const preferences = preferencesOf(callConfig);
      const models = await readCatalog(callConfig, signal);
      const model = selectOmniModel(models, preferences, kinds);
      const kind = kinds.includes('video') ? 'video' : 'audio';
      const effort = preferences[kind === 'video' ? 'videoReasoningEffort' : 'audioReasoningEffort'];
      omniReasoningParams(model, effort);
      const reasoningEffort = effort === 'default' ? undefined : effort;
      const local = await inspectMedia(ctx, args.files, { ...exec, signal }, omniMediaLimitMB(preferences, model.id, kind));
      if (model.local) return callLocalModel(ctx, { ...model, local: model.local }, args.instruction, local, signal, effort);
      const source = callConfig.externalSource;
      if (!source?.available) throw new Error('此模型来源暂不可用，请重新连接或选择自配模型。');
      return source.call(model, args.instruction, local.map(file => ({
        name: file.name, mimeType: file.mimeType, size: file.size,
        read: signal => ctx.fs.readBytes(file.target, signal, file.size),
        readRange: (offset, length, signal) => ctx.fs.readByteRange(file.target, { offset, length }, signal),
        verify: async signal => {
          const after = await ctx.fs.stat(file.target, signal);
          if (after?.size !== file.size || after.version !== file.version) throw new Error(`文件在读取期间发生变化：${file.name}`);
        },
      })), signal, reasoningEffort);
    },
    isConcurrencySafe: () => true,
  };
}
