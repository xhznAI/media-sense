import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

// 校验值只取上游发布页；国内镜像提供文件大小，运行时再次校验实际字节和摘要。
const release = 'b6.1.1';
const platforms = ['win32-x64', 'darwin-x64', 'darwin-arm64', 'linux-x64', 'linux-arm64'];
async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  assert.ok(response.ok, `HTTP ${response.status}: ${url}`);
  return response;
}
const [page, listing] = await Promise.all([
  request(`https://github.com/eugeneware/ffmpeg-static/releases/expanded_assets/${release}`).then(r => r.text()),
  request(`https://registry.npmmirror.com/-/binary/ffmpeg-static/${release}/`).then(r => r.json()),
]);
const digests = new Map(page.split('<li ').flatMap(row => {
  const name = row.match(/href="[^"\n]*\/download\/[^/]+\/([^"\n]+)"/)?.[1];
  const hash = row.match(/sha256:([0-9a-f]{64})/)?.[1];
  return name && hash ? [[name, hash]] : [];
}));
const sizes = new Map(listing.map(row => [row.name, row.size]));
const assets = {};
for (const platform of platforms) {
  assets[platform] = ['ffmpeg', 'ffprobe', 'LICENSE', 'README'].map(tool => {
    const binary = tool === 'ffmpeg' || tool === 'ffprobe';
    const raw = binary ? `${tool}-${platform}` : `${platform}.${tool}`;
    const filename = `${raw}.gz`;
    assert.ok(digests.has(filename) && digests.has(raw) && sizes.get(filename) > 0 && sizes.get(raw) > 0, filename);
    return { tool, filename, sha256: digests.get(filename), bytes: sizes.get(filename),
      outputSha256: digests.get(raw), outputBytes: sizes.get(raw) };
  });
}
await writeFile(new URL('../src/ffmpeg-assets.ts', import.meta.url),
  `// 由 corepack pnpm ffmpeg:update 生成，摘要来自上游发布页。\nexport const FFMPEG_RELEASE = ${JSON.stringify(release)};\nexport const FFMPEG_ASSETS = ${JSON.stringify(assets, null, 2)} as const;\n`);
console.log(`[omni-ffmpeg] Pinned ${platforms.length} platforms from ${release}.`);
