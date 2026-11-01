import { mkdtemp, readFile, writeFile, rm, stat, readdir } from 'node:fs/promises';
import { tmpdir, platform } from 'node:os';
import { join } from 'node:path';
import { afterEach, expect, it } from 'vitest';
import { openSettings } from './settings-store.ts';
import { preferencesOf, sourceOf, type Config } from './config.ts';
import { omniMediaLimitMB } from './api/index.js';

const directories: string[] = [];
afterEach(async () => { await Promise.all(directories.splice(0).map(path => rm(path, { recursive: true, force: true }))); });
async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), 'media-sense-settings-')); directories.push(directory);
  const storagePath = join(directory, 'media-sense.json');
  const config = Object.freeze({ storagePath, preferences: { get: () => ({ 'user-a': { audioModelId: 'old-audio', videoModelId: '' } }) } }) as Config;
  return { directory, storagePath, config };
}

it('本地和账号 profile 共用配置，退出后保留来源与选择，密钥仅存储在私有文件中', async () => {
  const { storagePath, directory, config } = await fixture();
  const runtime = await openSettings(config);
  await runtime.write!({ source: 'host', lastSourceScope: 'user-a', localModels: [{
    id: 'e3ef64e4-b1cd-4e41-b873-9cd87872a7ca', name: 'Local audio', modelId: 'audio',
    baseUrl: 'http://localhost:9000/v1', adapter: 'openai-completions', audio: true, video: false, apiKey: 'fixture-private-key',
  }], preferences: { 'user-a': { audioModelId: 'new-audio', videoModelId: '', modelMaxMediaMB: { 'new-audio': 64 } }, local: { audioModelId: '', videoModelId: '', modelMaxMediaMB: { custom: 128 } } } });
  const restored = await openSettings(config);
  expect(sourceOf(restored)).toBe('host');
  expect(preferencesOf(restored).audioModelId).toBe('new-audio');
  expect(preferencesOf(restored).modelMaxMediaMB).toEqual({ 'new-audio': 64 });
  expect(preferencesOf(restored, 'local').modelMaxMediaMB).toEqual({ custom: 128 });
  expect(restored.localModels!.get()[0]!.apiKey).toBe('fixture-private-key');
  if (platform() !== 'win32') expect((await stat(storagePath)).mode & 0o777).toBe(0o600);
  expect(await readdir(directory)).toEqual(['media-sense.json']);
});

it('配置损坏时保留文件并明确报错，不能静默清空模型或密钥', async () => {
  const { storagePath, config } = await fixture();
  await writeFile(storagePath, '{invalid');
  await expect(openSettings(config)).rejects.toThrow('媒体配置读取失败');
  expect(await readFile(storagePath, 'utf8')).toBe('{invalid');
});

it('旧版上限可分别覆盖并在重新打开后保留', async () => {
  const { config } = await fixture();
  const runtime = await openSettings(config);
  await runtime.write!({ preferences: { local: { audioModelId: 'shared', videoModelId: 'shared', modelMaxMediaMB: { shared: 64 } } } });
  const restored = await openSettings(config);
  const legacy = preferencesOf(restored, 'local');
  expect(omniMediaLimitMB(legacy, 'shared', 'audio')).toBe(64);
  expect(omniMediaLimitMB(legacy, 'shared', 'video')).toBe(64);
  await restored.write!({ preferences: { local: { ...legacy, audioModelMaxMediaMB: { shared: 32 }, videoModelMaxMediaMB: { shared: 128 } } } });
  const updated = preferencesOf(await openSettings(config), 'local');
  expect(omniMediaLimitMB(updated, 'shared', 'audio')).toBe(32);
  expect(omniMediaLimitMB(updated, 'shared', 'video')).toBe(128);
});

it('独立安装不要求共享存储或账号适配器', async () => {
  const config = { preferences: { get: () => ({}) } } as Config;
  expect(await openSettings(config)).toBe(config);
  expect(sourceOf(config)).toBe('local');
});
