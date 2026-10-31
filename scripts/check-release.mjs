import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
assert.equal(pkg.license, 'MIT');
assert.equal(pkg.dsh.client.platform, 'web');
assert.ok(pkg.dsh.bundle.patch);

// Git 安装直接使用随仓库提交的产物，不在用户机器上构建。
for (const hook of ['prepare', 'preinstall', 'install', 'postinstall', 'prepack']) {
  assert.ok(!pkg.scripts[hook], `Git distribution must not require ${hook}`);
}
for (const name of ['lib/index.js', 'lib/client.js', 'lib/api.js', 'lib/types/index.d.ts',
  'lib/types/client/index.d.ts', 'lib/types/api/index.d.ts', 'cordis.patch.yml',
  'locale/en.json', 'locale/zh.json', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) {
  assert.ok((await stat(resolve(root, name))).isFile(), `Missing release file: ${name}`);
}
const files = await readdir(resolve(root, 'lib'), { recursive: true });
assert.ok(!files.some(name => name.endsWith('.map')), 'Release build contains source maps');
for (const name of files.filter(name => name.endsWith('.js'))) {
  const source = await readFile(resolve(root, 'lib', name), 'utf8');
  assert.ok(!source.includes('sourceMappingURL'), `Source map reference in ${name}`);
}
const client = await readFile(resolve(root, 'lib/client.js'), 'utf8');
assert.ok(client.includes('window.__ModuleLoader__.load('), 'Missing DSH client registration');
assert.ok(client.includes(pkg.name), 'Client module ID differs from package name');

// 提交前检查，防止配置、日志或本机缓存被误纳入公开仓库。
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0').filter(Boolean);
assert.ok(tracked.includes('lib/client.js'), 'Built client is not staged or tracked');
assert.ok(tracked.every(name => !/(^|\/)(?:node_modules|\.cache|release|\.env(?:\.[^/]*)?|\.npmrc)(?:\/|$)|\.map$/.test(name)),
  'Private or unnecessary files are staged');
console.log(`Release files ready: ${pkg.name}@${pkg.version}; ${tracked.length} Git files, no install hooks or source maps.`);
