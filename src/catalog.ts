import { mediaSenseModel, mediaSenseModelWriteSchema, omniSupports, type MediaSenseModel, type OmniKind, type OmniPreferences } from './api/index.js';
import { sourceOf, type RuntimeConfig, type LocalModel, type ModelSource } from './config.ts';

export type MediaModel = MediaSenseModel & { upstreamModelId?: string; local?: LocalModel };
export function localCatalog(config: RuntimeConfig): MediaModel[] {
  return (config.localModels?.get() ?? []).map(local => {
    const checked = mediaSenseModelWriteSchema.parse(local);
    return { ...mediaSenseModel(checked), local: { ...checked, apiKey: checked.apiKey ?? '' } };
  });
}

export async function readCatalog(config: RuntimeConfig, signal?: AbortSignal, source: ModelSource = sourceOf(config)): Promise<MediaModel[]> {
  signal?.throwIfAborted();
  return source === 'local' ? localCatalog(config) : readHostCatalog(config, signal);
}

/** 动态来源自行读取目录并验证访问权限；插件只使用公开的来源接口。 */
export async function readHostCatalog(config: RuntimeConfig, signal?: AbortSignal): Promise<MediaSenseModel[]> {
  if (!config.externalSource?.available) throw new Error('此模型来源暂不可用，请重新连接或选择自配模型。');
  return config.externalSource.listModels(signal);
}

/** 未配置时按目录顺序选择第一项，已保存的选择即使失效也保留。 */
export function resolveOmniPreferences(models: MediaSenseModel[], preferences: OmniPreferences): OmniPreferences {
  return {
    ...preferences,
    audioModelId: preferences.audioModelId || models.find(model => omniSupports(model, 'audio'))?.id || '',
    videoModelId: preferences.videoModelId || models.find(model => omniSupports(model, 'video'))?.id || '',
  };
}

/** 设置页与工具使用相同默认值，混合输入不能静默切换到其他模型。 */
export function selectOmniModel(models: MediaModel[], preferences: OmniPreferences, kinds: readonly OmniKind[]): MediaModel {
  const kind: OmniKind = kinds.includes('video') ? 'video' : 'audio';
  const resolved = resolveOmniPreferences(models, preferences);
  const id = kind === 'video' ? resolved.videoModelId : resolved.audioModelId;
  if (!id) throw new Error(`暂无可用的${kind === 'video' ? '视频' : '音频'}模型，请在「设置 → Media Sense」检查模型列表。`);
  const model = models.find(candidate => candidate.id === id);
  if (!model || !kinds.every(input => omniSupports(model, input)))
    throw new Error('已选择的 Media Sense 模型不可用或不能处理这些附件，请在「设置 → Media Sense」调整选择。');
  return model;
}
