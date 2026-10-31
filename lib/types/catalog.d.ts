import { type MediaSenseModel, type OmniKind, type OmniPreferences } from './api/index.js';
import { type RuntimeConfig, type LocalModel, type ModelSource } from './config.ts';
export type MediaModel = MediaSenseModel & {
    upstreamModelId?: string;
    local?: LocalModel;
};
export declare function localCatalog(config: RuntimeConfig): MediaModel[];
export declare function readCatalog(config: RuntimeConfig, signal?: AbortSignal, source?: ModelSource): Promise<MediaModel[]>;
/** 动态来源自行读取目录并验证访问权限；插件只使用公开的来源接口。 */
export declare function readHostCatalog(config: RuntimeConfig, signal?: AbortSignal): Promise<MediaSenseModel[]>;
/** 未配置时按目录顺序选择第一项，已保存的选择即使失效也保留。 */
export declare function resolveOmniPreferences(models: MediaSenseModel[], preferences: OmniPreferences): OmniPreferences;
/** 设置页与工具使用相同默认值，混合输入不能静默切换到其他模型。 */
export declare function selectOmniModel(models: MediaModel[], preferences: OmniPreferences, kinds: readonly OmniKind[]): MediaModel;
