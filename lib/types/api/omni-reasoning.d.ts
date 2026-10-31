import { z } from 'zod';
export declare const omniReasoningEffortSchema: z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>;
export declare const omniReasoningPreferenceSchema: z.ZodUnion<[z.ZodLiteral<"default">, z.ZodEnum<["off", "minimal", "low", "medium", "high", "xhigh", "max"]>]>;
export type OmniReasoningEffort = z.infer<typeof omniReasoningEffortSchema>;
export type OmniReasoningPreference = z.infer<typeof omniReasoningPreferenceSchema>;
type Model = {
    id: string;
    name: string;
    provider: string;
    protocol: string;
    vendorLabel?: string | undefined;
    upstreamModelId?: string | undefined;
};
export declare function omniReasoningEfforts(model: Model): OmniReasoningEffort[];
/** 默认不添加参数；明确选择的无效档位必须提示，不能静默使用另一个强度。 */
export declare function omniReasoningParams(model: Model, effort?: OmniReasoningPreference): Record<string, unknown>;
export {};
