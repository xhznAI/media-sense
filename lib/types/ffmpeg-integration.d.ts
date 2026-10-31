import type { Context } from '@deepseek-ai/cordis';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import { FfmpegManager } from './ffmpeg.ts';
export declare function prepareFfmpegTool(manager: FfmpegManager): ToolDefinition;
export declare function installFfmpeg(ctx: Context, manager?: FfmpegManager): void;
