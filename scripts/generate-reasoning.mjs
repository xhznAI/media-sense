import './generate-model-vendors.mjs';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// 仅离线构造 SDK 请求，在发送前截获；不读取真实凭据，不访问供应商。
const sdk = new URL('../', import.meta.resolve('@earendil-works/pi-ai'));
const { getBuiltinProviders, getBuiltinModels } = await import(new URL('dist/providers/all.js', sdk).href);
const { getSupportedThinkingLevels } = await import(new URL('dist/models.js', sdk).href);
const { streamSimple: chat } = await import(new URL('dist/api/openai-completions.js', sdk).href);
const { streamSimple: google } = await import(new URL('dist/api/google-generative-ai.js', sdk).href);
const { version } = JSON.parse(await readFile(new URL('package.json', sdk), 'utf8'));
globalThis.fetch = async () => { throw new Error('生成思考配置时禁止网络请求'); };
const keys = ['thinking', 'reasoning_effort', 'enable_thinking', 'chat_template_kwargs', 'chat_template_args', 'reasoning', 'thinking_budget', 'thinking_token_budget'];
const profiles = [], entries = [];
for (const model of getBuiltinProviders().flatMap(getBuiltinModels)) {
  if (!model.reasoning || !['openai-completions', 'google-generative-ai'].includes(model.api)) continue;
  const choices = {};
  for (const level of getSupportedThinkingLevels(model)) {
    let payload;
    const stream = (model.api === 'google-generative-ai' ? google : chat)(model, {
      messages: [{ role: 'user', content: 'Omni', timestamp: 0 }],
    }, { apiKey: 'offline-catalog-placeholder', reasoning: level, maxTokens: 8192,
      onPayload(value) { payload = value; throw new Error('请求已截获，不发送'); },
    });
    const result = await stream.result();
    assert.ok(payload, `${model.provider}/${model.id}/${level}: ${result.errorMessage}`);
    let patch;
    if (model.api === 'google-generative-ai') {
      const { includeThoughts: _ignored, ...thinkingConfig } = payload.config?.thinkingConfig ?? {};
      if (!Object.keys(thinkingConfig).length) continue;
      patch = { generationConfig: { thinkingConfig,
        // 给思考和正文预留总输出额度，避免高档位预算超过原来的正文额度。
        maxOutputTokens: Math.min(model.maxTokens, 8192 + Math.max(0, thinkingConfig.thinkingBudget ?? 0)),
      } };
    } else {
      patch = Object.fromEntries(keys.filter(key => payload[key] !== undefined).map(key => [key, payload[key]]));
      if (!Object.keys(patch).length) continue;
    }
    choices[level] = patch;
  }
  if (!Object.keys(choices).length) continue;
  const signature = JSON.stringify(choices);
  let profile = profiles.findIndex(item => JSON.stringify(item) === signature);
  if (profile < 0) { profile = profiles.length; profiles.push(choices); }
  entries.push([model.provider, model.id, model.api, profile]);
}
const source = `// 由 scripts/generate-reasoning.mjs 离线截获固定 AI 包参数生成，请勿手动编辑。\nexport const omniReasoningSdkVersion = ${JSON.stringify(version)};\nexport const omniReasoningProfiles: ReadonlyArray<Record<string, Record<string, unknown>>> = ${JSON.stringify(profiles, null, 2)};\nexport const omniReasoningModels: ReadonlyArray<readonly [string, string, string, number]> = [\n${entries.map(entry => `  ${JSON.stringify(entry)}`).join(',\n')}\n];\n`;
const output = new URL('../src/api/omni-reasoning.generated.ts', import.meta.url);
if (process.argv.includes('--check')) assert.equal((await readFile(output, 'utf8')).replace(/\r\n/g, '\n'), source, 'Omni 思考配置已过期，请运行 corepack pnpm reasoning:update');
else await writeFile(output, source);
console.log(`[omni] pi-ai ${version}: ${entries.length} models, ${profiles.length} reasoning profiles${process.argv.includes('--check') ? ' verified' : ' exported'}`);
