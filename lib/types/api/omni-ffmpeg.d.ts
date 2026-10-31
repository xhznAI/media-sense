import { z } from 'zod';
export declare const omniFfmpegBinarySchema: z.ZodObject<{
    path: z.ZodString;
    version: z.ZodString;
    source: z.ZodEnum<["system", "managed"]>;
}, "strict", z.ZodTypeAny, {
    path: string;
    version: string;
    source: "system" | "managed";
}, {
    path: string;
    version: string;
    source: "system" | "managed";
}>;
export type OmniFfmpegBinary = z.infer<typeof omniFfmpegBinarySchema>;
export declare const omniFfmpegReadySchema: z.ZodObject<{
    ffmpeg: z.ZodObject<{
        path: z.ZodString;
        version: z.ZodString;
        source: z.ZodEnum<["system", "managed"]>;
    }, "strict", z.ZodTypeAny, {
        path: string;
        version: string;
        source: "system" | "managed";
    }, {
        path: string;
        version: string;
        source: "system" | "managed";
    }>;
    ffprobe: z.ZodObject<{
        path: z.ZodString;
        version: z.ZodString;
        source: z.ZodEnum<["system", "managed"]>;
    }, "strict", z.ZodTypeAny, {
        path: string;
        version: string;
        source: "system" | "managed";
    }, {
        path: string;
        version: string;
        source: "system" | "managed";
    }>;
}, "strict", z.ZodTypeAny, {
    ffmpeg: {
        path: string;
        version: string;
        source: "system" | "managed";
    };
    ffprobe: {
        path: string;
        version: string;
        source: "system" | "managed";
    };
}, {
    ffmpeg: {
        path: string;
        version: string;
        source: "system" | "managed";
    };
    ffprobe: {
        path: string;
        version: string;
        source: "system" | "managed";
    };
}>;
export type OmniFfmpegReady = z.infer<typeof omniFfmpegReadySchema>;
export declare const omniFfmpegStatusSchema: z.ZodObject<{
    state: z.ZodEnum<["missing", "installing", "ready", "error", "unsupported"]>;
    platform: z.ZodString;
    canInstall: z.ZodBoolean;
    ffmpeg: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
        version: z.ZodString;
        source: z.ZodEnum<["system", "managed"]>;
    }, "strict", z.ZodTypeAny, {
        path: string;
        version: string;
        source: "system" | "managed";
    }, {
        path: string;
        version: string;
        source: "system" | "managed";
    }>>;
    ffprobe: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
        version: z.ZodString;
        source: z.ZodEnum<["system", "managed"]>;
    }, "strict", z.ZodTypeAny, {
        path: string;
        version: string;
        source: "system" | "managed";
    }, {
        path: string;
        version: string;
        source: "system" | "managed";
    }>>;
    downloadedBytes: z.ZodNumber;
    totalBytes: z.ZodNumber;
    message: z.ZodString;
}, "strict", z.ZodTypeAny, {
    message: string;
    state: "ready" | "error" | "missing" | "installing" | "unsupported";
    platform: string;
    canInstall: boolean;
    downloadedBytes: number;
    totalBytes: number;
    ffmpeg?: {
        path: string;
        version: string;
        source: "system" | "managed";
    } | undefined;
    ffprobe?: {
        path: string;
        version: string;
        source: "system" | "managed";
    } | undefined;
}, {
    message: string;
    state: "ready" | "error" | "missing" | "installing" | "unsupported";
    platform: string;
    canInstall: boolean;
    downloadedBytes: number;
    totalBytes: number;
    ffmpeg?: {
        path: string;
        version: string;
        source: "system" | "managed";
    } | undefined;
    ffprobe?: {
        path: string;
        version: string;
        source: "system" | "managed";
    } | undefined;
}>;
export type OmniFfmpegStatus = z.infer<typeof omniFfmpegStatusSchema>;
export declare const omniFfmpegInstallRequestSchema: z.ZodObject<{
    action: z.ZodLiteral<"install">;
}, "strict", z.ZodTypeAny, {
    action: "install";
}, {
    action: "install";
}>;
