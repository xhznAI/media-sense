import type { Context } from '@deepseek-ai/cordis';
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';
import { type RuntimeConfig } from './config.ts';
export declare function omniTool(ctx: Context, config: RuntimeConfig): ToolDefinition;
