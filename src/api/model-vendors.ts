import { modelVendors } from './model-vendors.generated.js';
export { modelVendors, modelVendorSdkVersion } from './model-vendors.generated.js';

// 兼容已有配置中的展示名称；新目录的名称和标识直接使用 AI 包定义。
const aliases: Record<string, string> = {
  'zhipu ai': 'zai', '智谱': 'zai',
  'qwen': 'qwen-token-plan', '阿里云': 'qwen-token-plan',
  'mimo': 'xiaomi', 'xiaomi mimo': 'xiaomi', '小米': 'xiaomi',
};

export function modelVendorId(value: string): string {
  const key = value.trim().toLowerCase();
  return modelVendors.find(vendor => vendor.id === key || vendor.name.toLowerCase() === key)?.id ?? aliases[key] ?? key;
}

/** 模型厂商的展示名称，独立于请求适配器和协议。 */
export function modelVendorLabel(id: string, name: string, provider: string): string {
  const identity = `${id} ${name}`.toLowerCase()
  if (/(?:^|[^a-z])mimo(?:[-\s\d.]|$)/u.test(identity)) return 'Xiaomi'
  if (/(?:^|[^a-z])doubao(?:[-\s\d.]|$)/u.test(identity)) return 'Doubao'
  if (/(?:^|[^a-z])qwen(?:[-\s\d.]|$)/u.test(identity)) return 'Qwen'
  if (/(?:^|[^a-z])(?:kimi|moonshotai|moonshot)(?:[-\s\d.]|$)/u.test(identity)) return 'Moonshot AI'
  if (/(?:^|[^a-z])minimax(?:[-\s\d.]|$)/u.test(identity)) return 'MiniMax'
  if (/(?:^|[^a-z])mistral(?:[-\s\d.]|$)/u.test(identity)) return 'Mistral'
  if (/(?:^|[^a-z])grok(?:[-\s\d.]|$)/u.test(identity)) return 'xAI'
  if (/(?:^|[^a-z])glm(?:[-\s\d.]|$)/u.test(identity)) return 'Zhipu AI'
  if (/(?:^|[^a-z])deepseek(?:[-\s\d.]|$)/u.test(identity)) return 'DeepSeek'
  if (/(?:^|[^a-z])gemini(?:[-\s\d.]|$)/u.test(identity)) return 'Google'
  if (/(?:^|[^a-z])(?:gpt|chatgpt|o[1-9])(?:[-\s\d.]|$)/u.test(identity)) return 'OpenAI'
  if (/(?:^|[^a-z])claude(?:[-\s\d.]|$)/u.test(identity)) return 'Anthropic'
  return ({ anthropic: 'Anthropic', google: 'Google', openai: 'OpenAI', xai: 'xAI', deepseek: 'DeepSeek' } as Record<string, string>)[provider] ?? provider
}
