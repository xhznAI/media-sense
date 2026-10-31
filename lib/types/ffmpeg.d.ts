import type { OmniFfmpegReady, OmniFfmpegStatus } from './api/index.js';
import { type FfmpegAsset } from './ffmpeg-download.ts';
type Binary = 'ffmpeg' | 'ffprobe';
type Probe = (file: string, tool: Binary, signal: AbortSignal) => Promise<string | undefined>;
export declare function probeFfmpeg(file: string, tool: Binary, signal: AbortSignal): Promise<string | undefined>;
/** 系统环境优先；补齐桌面启动时 PATH 常遗漏的标准安装目录。 */
export declare function ffmpegCandidates(tool: Binary, platform: string, env: NodeJS.ProcessEnv): Promise<string[]>;
interface Options {
    directory?: string;
    platform?: NodeJS.Platform;
    arch?: string;
    env?: NodeJS.ProcessEnv;
    probe?: Probe;
    request?: typeof fetch;
    assets?: readonly FfmpegAsset[];
}
export declare class FfmpegManager {
    private readonly platform;
    private readonly env;
    private readonly directory;
    private readonly assets;
    private readonly probe;
    private readonly request;
    private readonly lifetime;
    private operation;
    private refreshing;
    private value;
    constructor(options?: Options);
    snapshot(): OmniFfmpegStatus;
    dispose(): void;
    private filename;
    private discover;
    refresh(): Promise<OmniFfmpegStatus>;
    /** 设置页与工具共用同一安装任务；单个调用取消只停止等待，插件卸载则终止下载。 */
    ensure(signal?: AbortSignal): Promise<OmniFfmpegReady>;
    private install;
}
export {};
