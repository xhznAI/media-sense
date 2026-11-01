import { z } from 'zod';
import type { OmniCallResponse, OmniFileMetadata } from './omni.js';
import type { OmniReasoningPreference } from './omni-reasoning.js';
export interface MediaSenseModel {
    id: string;
    name: string;
    provider: string;
    protocol: string;
    inputModalities: readonly string[];
    vendorLabel?: string | undefined;
    upstreamModelId?: string;
}
/** 文件内容通过当前调用的文件权限读取，扩展来源不能绕过附件访问边界。 */
export interface MediaSenseFile extends OmniFileMetadata {
    read(signal: AbortSignal): Promise<Uint8Array>;
    readRange(offset: number, length: number, signal: AbortSignal): Promise<Uint8Array>;
    verify(signal: AbortSignal): Promise<void>;
}
/** Host 动态接入接口：目录、来源隔离标识和调用属于同一个来源实例。 */
export interface MediaSenseModelSource {
    readonly label: {
        zh: string;
        en: string;
    };
    readonly available: boolean;
    readonly scope: string;
    listModels(signal?: AbortSignal): Promise<MediaSenseModel[]>;
    call(model: MediaSenseModel, instruction: string, files: MediaSenseFile[], signal: AbortSignal, effort?: OmniReasoningPreference): Promise<OmniCallResponse>;
}
export interface MediaSenseSources {
    register(source: MediaSenseModelSource): () => void;
    current(): MediaSenseModelSource | undefined;
}
export declare const mediaSenseSourceSchema: z.ZodEnum<["local", "host"]>;
export declare const mediaSenseAdapterSchema: z.ZodEnum<["google-generative-ai", "openai-completions", "qwen-omni", "mimo-omni", "kimi-video", "glm-video"]>;
export declare const mediaSenseLocalModelSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    modelId: z.ZodString;
    baseUrl: z.ZodEffects<z.ZodString, string, string>;
    adapter: z.ZodEnum<["google-generative-ai", "openai-completions", "qwen-omni", "mimo-omni", "kimi-video", "glm-video"]>;
    audio: z.ZodBoolean;
    video: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    audio: boolean;
    video: boolean;
    id: string;
    name: string;
    modelId: string;
    baseUrl: string;
    adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
}, {
    audio: boolean;
    video: boolean;
    id: string;
    name: string;
    modelId: string;
    baseUrl: string;
    adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
}>;
export type MediaSenseLocalModel = z.infer<typeof mediaSenseLocalModelSchema>;
export declare const mediaSenseModelWriteSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    modelId: z.ZodString;
    baseUrl: z.ZodEffects<z.ZodString, string, string>;
    adapter: z.ZodEnum<["google-generative-ai", "openai-completions", "qwen-omni", "mimo-omni", "kimi-video", "glm-video"]>;
    audio: z.ZodBoolean;
    video: z.ZodBoolean;
} & {
    apiKey: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    audio: boolean;
    video: boolean;
    id: string;
    name: string;
    modelId: string;
    baseUrl: string;
    adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
    apiKey?: string | undefined;
}, {
    audio: boolean;
    video: boolean;
    id: string;
    name: string;
    modelId: string;
    baseUrl: string;
    adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
    apiKey?: string | undefined;
}>, {
    audio: boolean;
    video: boolean;
    id: string;
    name: string;
    modelId: string;
    baseUrl: string;
    adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
    apiKey?: string | undefined;
}, {
    audio: boolean;
    video: boolean;
    id: string;
    name: string;
    modelId: string;
    baseUrl: string;
    adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
    apiKey?: string | undefined;
}>;
export declare const mediaSenseSettingsWriteSchema: z.ZodEffects<z.ZodObject<{
    source: z.ZodEnum<["local", "host"]>;
    preferences: z.ZodObject<{
        audioModelId: z.ZodDefault<z.ZodString>;
        videoModelId: z.ZodDefault<z.ZodString>;
        audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
        videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
        modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        audioModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        videoModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    }, {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    }>;
    preferencesBySource: z.ZodOptional<z.ZodObject<{
        local: z.ZodObject<{
            audioModelId: z.ZodDefault<z.ZodString>;
            videoModelId: z.ZodDefault<z.ZodString>;
            audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            audioModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            videoModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }, {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }>;
        host: z.ZodObject<{
            audioModelId: z.ZodDefault<z.ZodString>;
            videoModelId: z.ZodDefault<z.ZodString>;
            audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            audioModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            videoModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }, {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        local: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    }, {
        local: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    }>>;
    localModels: z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        modelId: z.ZodString;
        baseUrl: z.ZodEffects<z.ZodString, string, string>;
        adapter: z.ZodEnum<["google-generative-ai", "openai-completions", "qwen-omni", "mimo-omni", "kimi-video", "glm-video"]>;
        audio: z.ZodBoolean;
        video: z.ZodBoolean;
    } & {
        apiKey: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }, {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }>, {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }, {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    preferences: {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    };
    source: "local" | "host";
    localModels: {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }[];
    preferencesBySource?: {
        local: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    } | undefined;
}, {
    preferences: {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    };
    source: "local" | "host";
    localModels: {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }[];
    preferencesBySource?: {
        local: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    } | undefined;
}>, {
    preferences: {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    };
    source: "local" | "host";
    localModels: {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }[];
    preferencesBySource?: {
        local: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    } | undefined;
}, {
    preferences: {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    };
    source: "local" | "host";
    localModels: {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        apiKey?: string | undefined;
    }[];
    preferencesBySource?: {
        local: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    } | undefined;
}>;
export type MediaSenseSettingsWrite = z.infer<typeof mediaSenseSettingsWriteSchema>;
export declare const mediaSenseSettingsResponseSchema: z.ZodObject<{
    preferences: z.ZodObject<{
        audioModelId: z.ZodDefault<z.ZodString>;
        videoModelId: z.ZodDefault<z.ZodString>;
        audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
        videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
        modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        audioModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        videoModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    }, {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
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
} & {
    source: z.ZodEnum<["local", "host"]>;
    hostSource: z.ZodOptional<z.ZodObject<{
        label: z.ZodObject<{
            zh: z.ZodString;
            en: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            zh: string;
            en: string;
        }, {
            zh: string;
            en: string;
        }>;
        available: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        label: {
            zh: string;
            en: string;
        };
        available: boolean;
    }, {
        label: {
            zh: string;
            en: string;
        };
        available: boolean;
    }>>;
    localModels: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        modelId: z.ZodString;
        baseUrl: z.ZodEffects<z.ZodString, string, string>;
        adapter: z.ZodEnum<["google-generative-ai", "openai-completions", "qwen-omni", "mimo-omni", "kimi-video", "glm-video"]>;
        audio: z.ZodBoolean;
        video: z.ZodBoolean;
    } & {
        hasApiKey: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        hasApiKey: boolean;
    }, {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        hasApiKey: boolean;
    }>, "many">;
    hostModels: z.ZodArray<z.ZodObject<{
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
    hostMessage: z.ZodString;
    preferencesBySource: z.ZodObject<{
        local: z.ZodObject<{
            audioModelId: z.ZodDefault<z.ZodString>;
            videoModelId: z.ZodDefault<z.ZodString>;
            audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            audioModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            videoModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }, {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }>;
        host: z.ZodObject<{
            audioModelId: z.ZodDefault<z.ZodString>;
            videoModelId: z.ZodDefault<z.ZodString>;
            audioReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            videoReasoningEffort: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>>;
            modelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            audioModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            videoModelMaxMediaMB: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }, {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        local: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    }, {
        local: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    message: string;
    preferences: {
        audioModelId: string;
        videoModelId: string;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    };
    models: {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[];
    }[];
    source: "local" | "host";
    preferencesBySource: {
        local: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId: string;
            videoModelId: string;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    };
    localModels: {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        hasApiKey: boolean;
    }[];
    hostModels: {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[];
    }[];
    hostMessage: string;
    hostSource?: {
        label: {
            zh: string;
            en: string;
        };
        available: boolean;
    } | undefined;
}, {
    message: string;
    preferences: {
        audioModelId?: string | undefined;
        videoModelId?: string | undefined;
        audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
        modelMaxMediaMB?: Record<string, number> | undefined;
        audioModelMaxMediaMB?: Record<string, number> | undefined;
        videoModelMaxMediaMB?: Record<string, number> | undefined;
    };
    models: {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts?: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[] | undefined;
    }[];
    source: "local" | "host";
    preferencesBySource: {
        local: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
        host: {
            audioModelId?: string | undefined;
            videoModelId?: string | undefined;
            audioReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            videoReasoningEffort?: "high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max" | "default" | undefined;
            modelMaxMediaMB?: Record<string, number> | undefined;
            audioModelMaxMediaMB?: Record<string, number> | undefined;
            videoModelMaxMediaMB?: Record<string, number> | undefined;
        };
    };
    localModels: {
        audio: boolean;
        video: boolean;
        id: string;
        name: string;
        modelId: string;
        baseUrl: string;
        adapter: "openai-completions" | "google-generative-ai" | "qwen-omni" | "mimo-omni" | "kimi-video" | "glm-video";
        hasApiKey: boolean;
    }[];
    hostModels: {
        audio: boolean;
        video: boolean;
        id: string;
        protocol: string;
        name: string;
        reasoningEfforts?: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[] | undefined;
    }[];
    hostMessage: string;
    hostSource?: {
        label: {
            zh: string;
            en: string;
        };
        available: boolean;
    } | undefined;
}>;
export type MediaSenseSettingsResponse = z.infer<typeof mediaSenseSettingsResponseSchema>;
/** 模型身份与输入能力来自独立配置，适配器决定可发送的协议格式。 */
export declare function mediaSenseModel(model: MediaSenseLocalModel): {
    id: string;
    name: string;
    upstreamModelId: string;
    provider: "google" | "openai";
    protocol: "openai-completions" | "google-generative-ai";
    vendorLabel: string;
    inputModalities: ("audio" | "video" | "text")[];
};
export declare function mediaSenseModelSummary(local: MediaSenseLocalModel): {
    id: string;
    name: string;
    protocol: "openai-completions" | "google-generative-ai";
    audio: boolean;
    video: boolean;
    reasoningEfforts: ("high" | "xhigh" | "low" | "medium" | "off" | "minimal" | "max")[];
};
