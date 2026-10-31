import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// 从固定版本 AI 包读取公开名称和标识，不导出连接地址、认证配置或凭据。
const sdkRoot = new URL('../', import.meta.resolve('@earendil-works/pi-ai'));
const { builtinProviders } = await import(new URL('dist/providers/all.js', sdkRoot).href);
const { version } = JSON.parse(await readFile(new URL('package.json', sdkRoot), 'utf8'));
const vendors = builtinProviders().map(({ id, name }) => ({ id, name })).sort((a, b) => a.id.localeCompare(b.id, 'en'));
assert.equal(new Set(vendors.map(vendor => vendor.id)).size, vendors.length);
assert.equal(new Set(vendors.map(vendor => vendor.name)).size, vendors.length);
const source = `// 由 scripts/generate-model-vendors.mjs 从固定版本 AI 包生成，请勿手动编辑。\nexport const modelVendorSdkVersion = ${JSON.stringify(version)};\nexport const modelVendors = ${JSON.stringify(vendors, null, 2)} as const;\n`;
const output = new URL('../src/api/model-vendors.generated.ts', import.meta.url);
if (process.argv.includes('--check')) {
  assert.equal((await readFile(output, 'utf8')).replace(/\r\n/g, '\n'), source, '厂商目录已过期，请运行 corepack pnpm reasoning:update');
} else {
  await writeFile(output, source);
}
console.log(`[vendors] pi-ai ${version}: ${vendors.length} providers${process.argv.includes('--check') ? ' verified' : ' exported'}`);
