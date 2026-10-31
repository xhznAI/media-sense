import { z } from 'zod';
import { omniPreferencesSchema, omniSettingsResponseSchema, omniSupports } from './omni.js';
import { omniReasoningEfforts } from './omni-reasoning.js';
import type { OmniCallResponse, OmniFileMetadata } from './omni.js';
import type { OmniReasoningPreference } from './omni-reasoning.js';

export interface MediaSenseModel {
  id: string; name: string; provider: string; protocol: string; inputModalities: readonly string[];
  vendorLabel?: string | undefined; upstreamModelId?: string;
}
/** 文件内容通过当前调用的文件权限读取，扩展来源不能绕过附件访问边界。 */
export interface MediaSenseFile extends OmniFileMetadata {
  read(signal: AbortSignal): Promise<Uint8Array>;
  readRange(offset: number, length: number, signal: AbortSignal): Promise<Uint8Array>;
  verify(signal: AbortSignal): Promise<void>;
}
/** Host 动态接入接口：目录、来源隔离标识和调用属于同一个来源实例。 */
export interface MediaSenseModelSource {
  readonly label: { zh: string; en: string };
  readonly available: boolean;
  readonly scope: string;
  listModels(signal?: AbortSignal): Promise<MediaSenseModel[]>;
  call(model: MediaSenseModel, instruction: string, files: MediaSenseFile[], signal: AbortSignal, effort?: OmniReasoningPreference): Promise<OmniCallResponse>;
}
export interface MediaSenseSources {
  register(source: MediaSenseModelSource): () => void;
  current(): MediaSenseModelSource | undefined;
}

export const mediaSenseSourceSchema = z.enum(['local', 'host']);
export const mediaSenseAdapterSchema = z.enum(['google-generative-ai', 'openai-completions', 'qwen-omni', 'mimo-omni', 'kimi-video', 'glm-video']);
export const mediaSenseLocalModelSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
  modelId: z.string().trim().min(1).max(300),
  baseUrl: z.string().trim().url().max(2048).refine(value => {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password && !url.search && !url.hash;
  }, '请填写不含密钥、查询参数或片段的 HTTP(S) 接口地址。'),
  adapter: mediaSenseAdapterSchema,
  audio: z.boolean(),
  video: z.boolean(),
}).strict();
export type MediaSenseLocalModel = z.infer<typeof mediaSenseLocalModelSchema>;

export const mediaSenseModelWriteSchema = mediaSenseLocalModelSchema.extend({
  // 省略时保留已有密钥；空字符串明确清除。GET 仅返回是否已配置。
  apiKey: z.string().trim().max(8192).optional(),
}).superRefine((value, ctx) => {
  if (!value.audio && !value.video) ctx.addIssue({ code: z.ZodIssueCode.custom, message: '请至少选择一种输入能力。' });
  if (value.adapter === 'openai-completions' && value.video)
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: '标准 Chat Completions 不支持视频，请选择对应的音视频适配器。' });
  if (['kimi-video', 'glm-video'].includes(value.adapter) && value.audio)
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Kimi、GLM 视频适配器不支持音频输入。' });
});
export const mediaSenseSettingsWriteSchema = z.object({
  source: mediaSenseSourceSchema,
  preferences: omniPreferencesSchema,
  preferencesBySource: z.object({ local: omniPreferencesSchema, host: omniPreferencesSchema }).optional(),
  localModels: z.array(mediaSenseModelWriteSchema).max(50),
}).strict().refine(value => new Set(value.localModels.map(model => model.id)).size === value.localModels.length, '模型标识不能重复。');
export type MediaSenseSettingsWrite = z.infer<typeof mediaSenseSettingsWriteSchema>;
export const mediaSenseSettingsResponseSchema = omniSettingsResponseSchema.extend({
  source: mediaSenseSourceSchema,
  hostSource: z.object({ label: z.object({ zh: z.string(), en: z.string() }), available: z.boolean() }).optional(),
  localModels: z.array(mediaSenseLocalModelSchema.extend({ hasApiKey: z.boolean() })),
  hostModels: omniSettingsResponseSchema.shape.models,
  hostMessage: z.string(),
  preferencesBySource: z.object({ local: omniPreferencesSchema, host: omniPreferencesSchema }),
});
export type MediaSenseSettingsResponse = z.infer<typeof mediaSenseSettingsResponseSchema>;

/** 模型身份与输入能力来自独立配置，适配器决定可发送的协议格式。 */
export function mediaSenseModel(model: MediaSenseLocalModel) {
  const inputModalities: ('text' | 'audio' | 'video')[] = ['text'];
  if (model.audio) inputModalities.push('audio');
  if (model.video) inputModalities.push('video');
  return {
    id: model.id, name: model.name, upstreamModelId: model.modelId,
    provider: model.adapter === 'google-generative-ai' ? 'google' as const : 'openai' as const,
    protocol: model.adapter === 'google-generative-ai' ? 'google-generative-ai' as const : 'openai-completions' as const,
    vendorLabel: ({ 'qwen-omni': 'qwen-token-plan', 'mimo-omni': 'xiaomi', 'kimi-video': 'moonshotai', 'glm-video': 'zai' } as Record<string, string>)[model.adapter] ?? '',
    inputModalities,
  };
}

export function mediaSenseModelSummary(local: MediaSenseLocalModel) {
  const model = mediaSenseModel(local);
  return { id: model.id, name: model.name, protocol: model.protocol,
    audio: omniSupports(model, 'audio'), video: omniSupports(model, 'video'), reasoningEfforts: omniReasoningEfforts(model) };
}
