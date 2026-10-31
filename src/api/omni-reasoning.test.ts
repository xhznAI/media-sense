import { describe, expect, it } from 'vitest';
import { omniReasoningEfforts, omniReasoningParams } from './omni-reasoning.js';
import { omniCallRequestSchema, omniPreferencesSchema } from './omni.js';

const mimo = { id: 'mimo-v2.6-pro', name: 'MiMo', provider: 'openai' as const, protocol: 'openai-completions', vendorLabel: 'Xiaomi' };
const gemini = { id: 'gemini-3.8-flash', name: 'Gemini', provider: 'google' as const, protocol: 'google-generative-ai' };

describe('Omni 思考强度', () => {
  it('旧偏好和默认请求不强行设置思考档位', () => {
    expect(omniPreferencesSchema.parse({})).toEqual({ audioModelId: '', videoModelId: '' });
    expect(omniReasoningParams(mimo)).toEqual({});
    expect(omniReasoningParams(mimo, 'default')).toEqual({});
  });
  it('MiMo 按 SDK 档位生成开关和强度，不将关闭当作默认', () => {
    expect(omniReasoningEfforts(mimo)).toEqual(['off', 'minimal', 'low', 'medium', 'high']);
    expect(omniReasoningParams(mimo, 'high')).toEqual({ thinking: { type: 'enabled' }, reasoning_effort: 'high' });
    expect(omniReasoningParams(mimo, 'off')).toEqual({ thinking: { type: 'disabled' } });
    expect(() => omniReasoningParams(mimo, 'max')).toThrow('不支持');
  });
  it('Gemini 档位和预算跟随 SDK 定义，高预算保留正文空间', () => {
    expect(omniReasoningEfforts(gemini)).toEqual(['low', 'medium', 'high']);
    expect(omniReasoningParams(gemini, 'high')).toEqual({ generationConfig: { thinkingConfig: { thinkingLevel: 'HIGH' }, maxOutputTokens: 8192 } });
    expect(omniReasoningParams({ ...gemini, id: 'gemini-2.5-flash' }, 'high')).toEqual({ generationConfig: { thinkingConfig: { thinkingBudget: 24576 }, maxOutputTokens: 32768 } });
    expect(() => omniReasoningParams(gemini, 'off')).toThrow('不支持');
  });
  it('未知模型或不匹配的协议不虚构档位', () => {
    expect(omniReasoningEfforts({ ...mimo, id: 'private-model' })).toEqual([]);
    expect(omniReasoningEfforts({ ...mimo, protocol: 'google-generative-ai' })).toEqual([]);
    expect(() => omniReasoningParams({ ...mimo, id: 'private-model' }, 'high')).toThrow('不支持');
  });
  it('内联和上传引用请求都接受同一个档位字段，拒绝任意扩展参数', () => {
    const request = { modelId: gemini.id, protocol: gemini.protocol, instruction: '描述', reasoningEffort: 'high' };
    expect(omniCallRequestSchema.parse({ ...request, files: [{ name: 'a.wav', mimeType: 'audio/wav', data: 'AAAA' }] }).reasoningEffort).toBe('high');
    expect(omniCallRequestSchema.parse({ ...request, uploadId: '4c2b9ef0-9a83-49d1-a4d5-29443f78b001' }).reasoningEffort).toBe('high');
    expect(omniCallRequestSchema.safeParse({ ...request, reasoningEffort: 'invalid', files: [] }).success).toBe(false);
  });
});
