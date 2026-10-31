import { z } from 'zod';
import { modelVendorId, modelVendorLabel } from './model-vendors.js';
import { omniReasoningModels, omniReasoningProfiles } from './omni-reasoning.generated.js';

export const omniReasoningEffortSchema = z.enum(['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max']);
export const omniReasoningPreferenceSchema = z.union([z.literal('default'), omniReasoningEffortSchema]);
export type OmniReasoningEffort = z.infer<typeof omniReasoningEffortSchema>;
export type OmniReasoningPreference = z.infer<typeof omniReasoningPreferenceSchema>;
type Model = { id: string; name: string; provider: string; protocol: string; vendorLabel?: string | undefined; upstreamModelId?: string | undefined };

function profile(model: Model): Record<string, Record<string, unknown>> | undefined {
  // 先匹配管理员配置的厂商，再兼容旧标签；必须同模型、同协议才继承参数。
  for (const id of [...new Set([model.id, model.upstreamModelId].filter((value): value is string => !!value))]) {
    for (const vendor of [model.vendorLabel, modelVendorLabel(id, model.name, model.provider)]) {
      if (!vendor) continue;
      const entry = omniReasoningModels.find(entry => entry[0] === modelVendorId(vendor) && entry[1] === id && entry[2] === model.protocol);
      if (entry) return omniReasoningProfiles[entry[3]];
    }
  }
  return undefined;
}

export function omniReasoningEfforts(model: Model): OmniReasoningEffort[] {
  const available = profile(model);
  return omniReasoningEffortSchema.options.filter(level => available?.[level] !== undefined);
}

/** 默认不添加参数；明确选择的无效档位必须提示，不能静默使用另一个强度。 */
export function omniReasoningParams(model: Model, effort?: OmniReasoningPreference): Record<string, unknown> {
  if (!effort || effort === 'default') return {};
  const params = profile(model)?.[effort];
  if (!params) throw new Error('所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。');
  return structuredClone(params);
}
