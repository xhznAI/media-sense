import type { Context } from '@deepseek-ai/cordis';
import { type MediaSenseSettingsResponse, type MediaSenseSettingsWrite, type MediaSenseSources } from './api/index.js';
import { Config, type RuntimeConfig } from './config.ts';
export { Config };
export declare const name = "media-sense";
export declare const inject: string[];
export declare function settingsState(config: RuntimeConfig): Promise<MediaSenseSettingsResponse>;
/** 更新在同一队列内读取旧值，空白密钥不能意外覆盖已保存的凭据。 */
export declare function saveSettings(ctx: Context, config: RuntimeConfig, input: MediaSenseSettingsWrite): Promise<void>;
/** 工具注册不依赖网络或模型配置，缺少模型时仅影响当前工具调用。 */
declare module '@deepseek-ai/cordis' {
    interface Context {
        mediaSenseSources: MediaSenseSources;
    }
}
export declare function apply(ctx: Context, initial: Config): Promise<void>;
