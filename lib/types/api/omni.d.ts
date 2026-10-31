import { z } from 'zod';
/** 用户可按模型调整原始素材总量；默认 25 MB，按十进制计量。 */
export declare const OMNI_DEFAULT_MEDIA_MB = 25;
/** 传输安全上限独立于用户偏好；大文件只能经支持的分块接口发送。 */
export declare const OMNI_MAX_MEDIA_BYTES = 2000000000;
export declare const OMNI_MAX_INLINE_MEDIA_BYTES = 75000000;
export declare const OMNI_MEDIA_SIZE_MESSAGE = "\u539F\u59CB\u97F3\u89C6\u9891\u7D20\u6750\u5408\u8BA1\u8D85\u8FC7\u4F20\u8F93\u4E0A\u9650 2,000 MB\uFF0C\u8BF7\u538B\u7F29\u6216\u5206\u6BB5\u540E\u91CD\u8BD5\u3002";
export declare const OMNI_REQUEST_SIZE_MESSAGE = "\u97F3\u89C6\u9891\u8BF7\u6C42\u5185\u5BB9\u8FC7\u5927\uFF0C\u8BF7\u51CF\u5C11\u9644\u4EF6\u6570\u91CF\u6216\u7F29\u77ED\u6307\u4EE4\u540E\u91CD\u8BD5\u3002";
export declare const OMNI_GEMINI_MAX_VIDEOS = 10;
/** 分块大小只是传输窗口，不是文件大小限制。 */
export declare const OMNI_CHUNK_BYTES: number;
/** Gemini 通用输入文档以完整请求体计 100 MB，包含 base64 和 JSON 文本。 */
export declare const MODEL_MAX_REQUEST_BYTES = 100000000;
/** 音频专页仍规定 20 MB；含独立音频文件的 Gemini 请求遵循该更具体的额度。 */
export declare const OMNI_GOOGLE_AUDIO_REQUEST_BYTES = 20000000;
export declare const OMNI_MAX_RESULT_CHARS = 32000;
export declare const omniKindSchema: z.ZodEnum<["audio", "video"]>;
export type OmniKind = z.infer<typeof omniKindSchema>;
export declare const omniMimeTypes: readonly ["audio/wav", "audio/mpeg", "audio/mp3", "audio/mp4", "audio/m4a", "audio/aac", "audio/flac", "audio/ogg", "audio/webm", "audio/aiff", "audio/opus", "video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-msvideo", "video/x-flv", "video/3gpp", "video/x-ms-wmv", "video/x-matroska"];
export declare const omniPreferencesSchema: z.ZodObject<{
    audioModelId: z.ZodDefault<z.ZodString>;
    videoModelId: z.ZodDefault<z.ZodString>;
    audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
    videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
    modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    audioModelId: string;
    videoModelId: string;
    audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
    videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
    modelMaxMediaMB?: Record<string, number> | undefined;
}, {
    audioModelId?: string | undefined;
    videoModelId?: string | undefined;
    audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
    videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
    modelMaxMediaMB?: Record<string, number> | undefined;
}>;
export type OmniPreferences = z.infer<typeof omniPreferencesSchema>;
export declare function omniMediaLimitMB(preferences: OmniPreferences, modelId: string): number;
export interface OmniModelCapabilities {
    id?: string | undefined;
    upstreamModelId?: string | undefined;
    protocol: string;
    inputModalities: readonly string[];
    vendorLabel?: string | undefined;
}
type MediaIdentity = Pick<OmniModelCapabilities, 'id' | 'upstreamModelId' | 'vendorLabel'>;
/** 厂商与模型身份只用于选择请求格式，不能补造目录没有声明的输入能力。 */
export declare function isQwenOmni(model: MediaIdentity): boolean;
/** MiMo 可经兼容渠道发布，未设置厂商标签时仍按公开模型 ID 识别。 */
export declare function isMimoOmni(model: MediaIdentity): boolean;
export declare function isKimiVideo(model: MediaIdentity): boolean;
export declare function isGlmVideo(model: MediaIdentity): boolean;
/** 只有模型声明和已实现的接口同时满足，才向设置页提供该能力。 */
export declare function omniSupports(model: OmniModelCapabilities, kind: OmniKind): boolean;
export declare function omniByteLength(base64: string): number;
export declare const omniFileMetadataSchema: z.ZodObject<{
    name: z.ZodString;
    mimeType: z.ZodEnum<["audio/wav", "audio/mpeg", "audio/mp3", "audio/mp4", "audio/m4a", "audio/aac", "audio/flac", "audio/ogg", "audio/webm", "audio/aiff", "audio/opus", "video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-msvideo", "video/x-flv", "video/3gpp", "video/x-ms-wmv", "video/x-matroska"]>;
    size: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    name: string;
    mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
    size: number;
}, {
    name: string;
    mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
    size: number;
}>;
export type OmniFileMetadata = z.infer<typeof omniFileMetadataSchema>;
export declare const omniFileSchema: z.ZodObject<Omit<{
    name: z.ZodString;
    mimeType: z.ZodEnum<["audio/wav", "audio/mpeg", "audio/mp3", "audio/mp4", "audio/m4a", "audio/aac", "audio/flac", "audio/ogg", "audio/webm", "audio/aiff", "audio/opus", "video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-msvideo", "video/x-flv", "video/3gpp", "video/x-ms-wmv", "video/x-matroska"]>;
    size: z.ZodNumber;
}, "size"> & {
    data: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    name: string;
    mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
    data: string;
}, {
    name: string;
    mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
    data: string;
}>;
export type OmniFile = z.infer<typeof omniFileSchema>;
declare const omniInlineRequestSchema: z.ZodEffects<z.ZodObject<{
    modelId: z.ZodString;
    protocol: z.ZodEnum<["google-generative-ai", "openai-completions"]>;
    instruction: z.ZodString;
    reasoningEffort: z.ZodOptional<z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>>;
} & {
    files: z.ZodArray<z.ZodObject<Omit<{
        name: z.ZodString;
        mimeType: z.ZodEnum<["audio/wav", "audio/mpeg", "audio/mp3", "audio/mp4", "audio/m4a", "audio/aac", "audio/flac", "audio/ogg", "audio/webm", "audio/aiff", "audio/opus", "video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-msvideo", "video/x-flv", "video/3gpp", "video/x-ms-wmv", "video/x-matroska"]>;
        size: z.ZodNumber;
    }, "size"> & {
        data: z.ZodEffects<z.ZodString, string, string>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }, {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}>, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}>;
export type OmniInlineRequest = z.infer<typeof omniInlineRequestSchema>;
export declare const omniCallRequestSchema: z.ZodUnion<[z.ZodEffects<z.ZodObject<{
    modelId: z.ZodString;
    protocol: z.ZodEnum<["google-generative-ai", "openai-completions"]>;
    instruction: z.ZodString;
    reasoningEffort: z.ZodOptional<z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>>;
} & {
    files: z.ZodArray<z.ZodObject<Omit<{
        name: z.ZodString;
        mimeType: z.ZodEnum<["audio/wav", "audio/mpeg", "audio/mp3", "audio/mp4", "audio/m4a", "audio/aac", "audio/flac", "audio/ogg", "audio/webm", "audio/aiff", "audio/opus", "video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-msvideo", "video/x-flv", "video/3gpp", "video/x-ms-wmv", "video/x-matroska"]>;
        size: z.ZodNumber;
    }, "size"> & {
        data: z.ZodEffects<z.ZodString, string, string>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }, {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}>, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}, {
    protocol: "openai-completions" | "google-generative-ai";
    modelId: string;
    instruction: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        data: string;
    }[];
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}>, z.ZodObject<{
    modelId: z.ZodString;
    instruction: z.ZodString;
    reasoningEffort: z.ZodOptional<z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>>;
} & {
    protocol: z.ZodLiteral<"google-generative-ai">;
    uploadId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    protocol: "google-generative-ai";
    modelId: string;
    instruction: string;
    uploadId: string;
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}, {
    protocol: "google-generative-ai";
    modelId: string;
    instruction: string;
    uploadId: string;
    reasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | undefined;
}>]>;
export type OmniCallRequest = z.infer<typeof omniCallRequestSchema>;
export declare const omniUploadRequestSchema: z.ZodEffects<z.ZodObject<Pick<{
    modelId: z.ZodString;
    protocol: z.ZodEnum<["google-generative-ai", "openai-completions"]>;
    instruction: z.ZodString;
    reasoningEffort: z.ZodOptional<z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>>;
}, "modelId"> & {
    files: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        mimeType: z.ZodEnum<["audio/wav", "audio/mpeg", "audio/mp3", "audio/mp4", "audio/m4a", "audio/aac", "audio/flac", "audio/ogg", "audio/webm", "audio/aiff", "audio/opus", "video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-msvideo", "video/x-flv", "video/3gpp", "video/x-ms-wmv", "video/x-matroska"]>;
        size: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        size: number;
    }, {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        size: number;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    modelId: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        size: number;
    }[];
}, {
    modelId: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        size: number;
    }[];
}>, {
    modelId: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        size: number;
    }[];
}, {
    modelId: string;
    files: {
        name: string;
        mimeType: "audio/wav" | "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/m4a" | "audio/aac" | "audio/flac" | "audio/ogg" | "audio/webm" | "audio/aiff" | "audio/opus" | "video/mp4" | "video/webm" | "video/quicktime" | "video/mpeg" | "video/x-msvideo" | "video/x-flv" | "video/3gpp" | "video/x-ms-wmv" | "video/x-matroska";
        size: number;
    }[];
}>;
export type OmniUploadRequest = z.infer<typeof omniUploadRequestSchema>;
export declare const omniUploadResponseSchema: z.ZodObject<{
    uploadId: z.ZodString;
    chunkBytes: z.ZodLiteral<number>;
}, "strict", z.ZodTypeAny, {
    uploadId: string;
    chunkBytes: number;
}, {
    uploadId: string;
    chunkBytes: number;
}>;
export declare const omniChunkRequestSchema: z.ZodObject<{
    offset: z.ZodNumber;
    data: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    data: string;
    offset: number;
}, {
    data: string;
    offset: number;
}>;
export declare const omniUploadStatusSchema: z.ZodObject<{
    ready: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    ready: boolean;
}, {
    ready: boolean;
}>;
/** 上游文件元数据仅供 Server 校验，不将供应商引用返回客户端。 */
export declare const omniGoogleFileSchema: z.ZodObject<{
    name: z.ZodString;
    uri: z.ZodString;
    state: z.ZodEnum<["PROCESSING", "ACTIVE", "FAILED"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    uri: string;
    state: "PROCESSING" | "ACTIVE" | "FAILED";
}, {
    name: string;
    uri: string;
    state: "PROCESSING" | "ACTIVE" | "FAILED";
}>;
export declare const omniGoogleUploadSchema: z.ZodObject<{
    file: z.ZodObject<{
        name: z.ZodString;
        uri: z.ZodString;
        state: z.ZodEnum<["PROCESSING", "ACTIVE", "FAILED"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        uri: string;
        state: "PROCESSING" | "ACTIVE" | "FAILED";
    }, {
        name: string;
        uri: string;
        state: "PROCESSING" | "ACTIVE" | "FAILED";
    }>;
}, "strip", z.ZodTypeAny, {
    file: {
        name: string;
        uri: string;
        state: "PROCESSING" | "ACTIVE" | "FAILED";
    };
}, {
    file: {
        name: string;
        uri: string;
        state: "PROCESSING" | "ACTIVE" | "FAILED";
    };
}>;
export declare const omniCallResponseSchema: z.ZodObject<{
    modelId: z.ZodString;
    text: z.ZodString;
    truncated: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    modelId: string;
    text: string;
    truncated: boolean;
}, {
    modelId: string;
    text: string;
    truncated: boolean;
}>;
export type OmniCallResponse = z.infer<typeof omniCallResponseSchema>;
/** 设置页仅接收安全模型摘要和当前来源的偏好。 */
export declare const omniSettingsResponseSchema: z.ZodObject<{
    preferences: z.ZodObject<{
        audioModelId: z.ZodDefault<z.ZodString>;
        videoModelId: z.ZodDefault<z.ZodString>;
        audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
        videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
        modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
    }, {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
    }>;
    models: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        audio: z.ZodBoolean;
        video: z.ZodBoolean;
        protocol: z.ZodString;
        reasoningEfforts: z.ZodDefault<z.ZodArray<z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[];
    }, {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts?: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[] | undefined;
    }>, "many">;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    preferences: {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
    };
    models: {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[];
    }[];
}, {
    message: string;
    preferences: {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
    };
    models: {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts?: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[] | undefined;
    }[];
}>;
export type OmniSettingsResponse = z.infer<typeof omniSettingsResponseSchema>;
type PromptModel = MediaIdentity & {
    id: string;
    protocol: string;
};
export type OmniPromptFile = OmniFile | {
    name: string;
    mimeType: OmniFile['mimeType'];
    uri: string;
};
export declare function omniAudioFormat(mimeType: string): string;
/** Host 的大小预检与 Server 的实际请求使用同一格式，避免漏算编码和封装。 */
export declare function omniPromptBody(model: PromptModel, instruction: string, files: readonly OmniPromptFile[]): Record<string, unknown>;
/** 不读取文件即可计算完整 JSON 的 UTF-8 字节数；base64 内容只含 ASCII 且不需要转义。 */
export declare function omniInlineSizes(model: PromptModel, instruction: string, files: readonly OmniFileMetadata[]): {
    gateway: number;
    provider: number;
};
export declare function omniInlineRequestLimit(protocol: string, files: readonly Pick<OmniFileMetadata, 'mimeType'>[]): number;
export declare function omniFitsInline(model: PromptModel, instruction: string, files: readonly OmniFileMetadata[]): boolean;
/** 已实现的本地文件发送方式不能绕过供应商的编码大小限制。 */
export declare function omniInlineFileError(model: PromptModel, files: readonly OmniFileMetadata[]): string | undefined;
export {};
