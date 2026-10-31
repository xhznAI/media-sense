import type { Config, RuntimeConfig } from './config.ts';
/** 可选共享存储让 不同 profile 共用媒体配置，凭据只写本机私有文件。 */
export declare function openSettings(config: Config): Promise<RuntimeConfig>;
