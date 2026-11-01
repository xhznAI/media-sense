import type { Volatile } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import { omniPreferencesSchema, type OmniPreferences, type MediaSenseLocalModel, type MediaSenseModelSource } from './api/index.js';

// 宿主可指定已有设置条目，独立安装使用插件自己的标识。
export const SETTINGS_ID = 'media-sense';
export type LocalModel = MediaSenseLocalModel & { apiKey: string };
export type ModelSource = 'local' | 'host';
export interface Config {
  storagePath?: string;
  settingsId?: string;
  preferences: Volatile<Record<string, OmniPreferences>>;
  source?: Volatile<ModelSource | ''>;
  localModels?: Volatile<LocalModel[]>;
  lastSourceScope?: Volatile<string>;
}
export interface RuntimeConfig extends Config {
  externalSource?: MediaSenseModelSource | undefined;
  write?: (patch: object) => Promise<void>;
}
const reasoning = z.union(['default', 'off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']);
export const Config: z = z.object({
  storagePath: z.string(),
  settingsId: z.string().default(SETTINGS_ID),
  preferences: z.dict(z.object({ audioModelId: z.string().default(''), videoModelId: z.string().default(''),
    audioReasoningEffort: reasoning, videoReasoningEffort: reasoning,
    modelMaxMediaMB: z.dict(z.number()), audioModelMaxMediaMB: z.dict(z.number()), videoModelMaxMediaMB: z.dict(z.number()),
  })).default({}).volatile(),
  source: z.union(['', 'local', 'host']).default('').volatile(),
  lastSourceScope: z.string().default('').volatile(),
  localModels: z.array(z.object({
    id: z.string(), name: z.string(), modelId: z.string(), baseUrl: z.string(),
    adapter: z.union(['google-generative-ai', 'openai-completions', 'qwen-omni', 'mimo-omni', 'kimi-video', 'glm-video']),
    audio: z.boolean(), video: z.boolean(), apiKey: z.string().role('secret').default(''),
  })).default([]).volatile(),
});
export function sourceOf(config: RuntimeConfig): ModelSource {
  return config.source?.get() || (config.externalSource?.available || config.lastSourceScope?.get() ? 'host' : 'local');
}
export function preferenceScope(config: RuntimeConfig, source: ModelSource): string {
  return source === 'local' ? 'local' : config.externalSource?.scope || config.lastSourceScope?.get() || 'unavailable';
}
export function preferencesOf(config: RuntimeConfig, source = sourceOf(config)): OmniPreferences {
  return omniPreferencesSchema.parse(config.preferences.get()[preferenceScope(config, source)] ?? {});
}
