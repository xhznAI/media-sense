import { readFile, mkdir, writeFile, rename, unlink } from 'node:fs/promises';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { mediaSenseModelWriteSchema, omniPreferencesSchema } from './api/index.js';
import type { Config, RuntimeConfig } from './config.ts';

const schema = z.object({
  version: z.literal(1), source: z.enum(['', 'local', 'host']), lastSourceScope: z.string(),
  preferences: z.record(omniPreferencesSchema), localModels: z.array(mediaSenseModelWriteSchema).max(50),
}).strict();

/** 可选共享存储让 不同 profile 共用媒体配置，凭据只写本机私有文件。 */
export async function openSettings(config: Config): Promise<RuntimeConfig> {
  if (!config.storagePath) return config;
  const path = config.storagePath;
  let state = schema.parse({ version: 1, source: config.source?.get() ?? '', lastSourceScope: config.lastSourceScope?.get() ?? '',
    preferences: config.preferences.get(), localModels: config.localModels?.get() ?? [] });
  try {
    const stored = schema.parse(JSON.parse(await readFile(path, 'utf8')));
    // 旧 profile 的来源偏好仅补齐缺失项，不覆盖共享文件中较新的选择。
    state = { ...stored, preferences: { ...state.preferences, ...stored.preferences } };
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw new Error('媒体配置读取失败，请检查本地配置文件。', { cause: error }); }
  const runtime = Object.create(config) as RuntimeConfig;
  const properties = {
    source: { get: () => state.source }, lastSourceScope: { get: () => state.lastSourceScope },
    preferences: { get: () => state.preferences }, localModels: { get: () => state.localModels.map(model => ({ ...model, apiKey: model.apiKey ?? '' })) },
    async write(patch: object) {
      const next = schema.parse({ ...state, ...patch });
      await mkdir(dirname(path), { recursive: true, mode: 0o700 });
      const temporary = `${path}.${randomUUID()}.tmp`;
      try {
        await writeFile(temporary, JSON.stringify(next) + '\n', { encoding: 'utf8', mode: 0o600, flag: 'wx' });
        await rename(temporary, path);
        state = next;
      } finally {
        try { await unlink(temporary); }
        catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
      }
    },
  };
  Object.defineProperties(runtime, Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, { value }])));
  return runtime;
}
