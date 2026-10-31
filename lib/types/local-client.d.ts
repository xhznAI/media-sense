import type { Context } from '@deepseek-ai/cordis';
import { type OmniReasoningPreference } from './api/index.js';
import { type LocalMedia } from './attachments.ts';
import type { MediaModel } from './catalog.ts';
import type { LocalModel } from './config.ts';
export declare function callLocalModel(ctx: Context, model: MediaModel & {
    local: LocalModel;
}, instruction: string, files: LocalMedia[], signal: AbortSignal, effort?: OmniReasoningPreference): Promise<{
    modelId: string;
    text: string;
    truncated: boolean;
}>;
