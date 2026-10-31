import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-host-webserver';
import type {} from '@deepseek-ai/dsh-settings';
import type {} from '@deepseek-ai/dsh-tools';
import { mediaSenseSettingsWriteSchema, omniSupports, omniReasoningEfforts, omniReasoningParams, type MediaSenseSettingsResponse, type MediaSenseSettingsWrite, type MediaSenseSources, type MediaSenseModelSource } from './api/index.js';
import { Config, SETTINGS_ID, preferenceScope, preferencesOf, sourceOf, type RuntimeConfig } from './config.ts';
import { readHostCatalog, localCatalog, resolveOmniPreferences, type MediaModel } from './catalog.ts';
import { omniTool } from './call-tool.ts';
import { installFfmpeg } from './ffmpeg-integration.ts';
import { openSettings } from './settings-store.ts';

export { Config };
export const name = SETTINGS_ID;
export const inject = ['workingDirectory', 'tools', 'fs', 'settings', 'webServer'];

export async function settingsState(config: RuntimeConfig): Promise<MediaSenseSettingsResponse> {
  let hostMessage = '';
  const host = config.externalSource?.available ? await readHostCatalog(config).catch((error: unknown) => {
    hostMessage = error instanceof Error ? error.message : '模型目录暂时不可用'; return [];
  }) : [];
  if (!config.externalSource?.available) hostMessage = '此模型来源暂不可用，请重新连接或选择自配模型。';
  const local = localCatalog(config);
  const source = sourceOf(config);
  const summary = (catalog: MediaModel[]) => catalog.filter(model => omniSupports(model, 'audio') || omniSupports(model, 'video'))
    .map(model => ({ id: model.id, name: model.name, protocol: model.protocol, audio: omniSupports(model, 'audio'), video: omniSupports(model, 'video'), reasoningEfforts: omniReasoningEfforts(model) }));
  const preferencesBySource = {
    local: resolveOmniPreferences(local, preferencesOf(config, 'local')),
    host: resolveOmniPreferences(host, preferencesOf(config, 'host')),
  };
  return {
    ...(config.externalSource ? { hostSource: { label: config.externalSource.label, available: config.externalSource.available } } : {}),
    source, preferences: preferencesBySource[source], preferencesBySource,
    models: summary(source === 'local' ? local : host), hostModels: summary(host), hostMessage,
    localModels: (config.localModels?.get() ?? []).map(({ apiKey, ...model }) => ({ ...model, hasApiKey: !!apiKey })),
    message: source === 'host' ? hostMessage : '',
  };
}

/** 更新在同一队列内读取旧值，空白密钥不能意外覆盖已保存的凭据。 */
export async function saveSettings(ctx: Context, config: RuntimeConfig, input: MediaSenseSettingsWrite): Promise<void> {
  const hostSource = config.externalSource;
  const hostScope = preferenceScope(config, 'host');
  let hostUpdated = false;
  if (input.source === 'host' && !config.externalSource?.available) throw new Error('此模型来源暂不可用，请重新连接或选择自配模型。');
  const previousModels = config.localModels?.get() ?? [];
  const localModels = input.localModels.map(({ apiKey, ...model }) => ({ ...model,
    apiKey: apiKey ?? previousModels.find(previous => previous.id === model.id)?.apiKey ?? '',
  }));
  const nextPreferences = { ...config.preferences.get() };
  const updates = { ...input.preferencesBySource, [input.source]: input.preferences };
  for (const source of ['local', 'host'] as const) {
    const preferences = updates[source];
    if (!preferences) continue;
    const previous = preferencesOf(config, source);
    if (source !== input.source && JSON.stringify(preferences) === JSON.stringify(previous)) continue;
    if (source === 'host' && !config.externalSource?.available) continue;
    const models = source === 'local' ? localCatalog({ ...config, localModels: { get: () => localModels } as NonNullable<Config['localModels']> }) : await readHostCatalog(Object.create(config, { externalSource: { value: hostSource } }));
    const resolved = resolveOmniPreferences(models, preferences);
    for (const kind of ['audio', 'video'] as const) {
      const field = kind === 'audio' ? 'audioModelId' : 'videoModelId';
      const id = preferences[field];
      if (id && id !== previous[field] && !models.some(model => model.id === id && omniSupports(model, kind)))
        throw new Error(`所选${kind === 'audio' ? '音频' : '视频'}模型不可用。`);
      const effort = preferences[kind === 'audio' ? 'audioReasoningEffort' : 'videoReasoningEffort'];
      if (effort && effort !== 'default') {
        const model = models.find(model => model.id === resolved[field]);
        if (!model) throw new Error('所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。');
        omniReasoningParams(model, effort);
      }
    }
    if (source === 'host') hostUpdated = true;
    nextPreferences[source === 'local' ? 'local' : hostScope] = preferences;
  }
  if (hostUpdated && (!config.externalSource?.available || preferenceScope(config, 'host') !== hostScope))
    throw new Error('模型来源已变化，请重新加载设置后再保存。');
  await writeSettings(ctx, config, { source: input.source, localModels,
    preferences: nextPreferences });
}

function writeSettings(ctx: Context, config: RuntimeConfig, patch: object): Promise<void> {
  return config.write ? config.write(patch) : ctx.settings.update(config.settingsId ?? SETTINGS_ID, patch);
}

/** 工具注册不依赖网络或模型配置，缺少模型时仅影响当前工具调用。 */
declare module '@deepseek-ai/cordis' { interface Context { mediaSenseSources: MediaSenseSources } }

export async function apply(ctx: Context, initial: Config): Promise<void> {
  const settings = await openSettings(initial);
  let externalSource: MediaSenseModelSource | undefined;
  const config: RuntimeConfig = Object.create(settings, { externalSource: { get: () => externalSource } });
  let writes = Promise.resolve();
  ctx.provide('mediaSenseSources', {
    current: () => externalSource,
    register(source: MediaSenseModelSource) {
      if (externalSource) throw new Error('已存在动态媒体模型来源');
      externalSource = source;
      // 仅保存隔离标识；来源断开后仍可显示之前的选择，不自动换来源。
      const write = writes.then(() => source.available ? writeSettings(ctx, config, { lastSourceScope: source.scope,
        ...(!settings.source?.get() ? { source: 'host' } : {}),
      }) : undefined);
      writes = write.catch(error => ctx.logger.warn('保存媒体模型来源失败：%s', error instanceof Error ? error.message : '未知错误'));
      return () => { if (externalSource === source) externalSource = undefined; };
    },
  });
  ctx.effect(() => ctx.settings.configure({ auto: false }, ctx.fiber));
  ctx.tools.register(omniTool(ctx, config));
  installFfmpeg(ctx);
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact', path: '/media-sense/settings',
    async handler(request, response) {
      response.setHeader('content-type', 'application/json; charset=utf-8');
      response.setHeader('cache-control', 'no-store');
      try {
        if (request.method === 'PUT') {
          if (request.headers['sec-fetch-site'] === 'cross-site' || request.headers.origin && request.headers.origin !== `http://${request.headers.host}`) {
            response.statusCode = 403; response.end(JSON.stringify({ message: '请求来源无效' })); return;
          }
          if (!request.headers['content-type']?.startsWith('application/json')) {
            response.statusCode = 415; response.end(JSON.stringify({ message: '请求格式无效' })); return;
          }
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of request) {
            const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
            size += data.length;
            if (size > 1024 * 1024) throw new Error('设置请求过大');
            chunks.push(data);
          }
          const input = mediaSenseSettingsWriteSchema.parse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
          const write = writes.then(() => saveSettings(ctx, config, input));
          writes = write.then(() => undefined, () => undefined);
          await write;
        } else if (request.method !== 'GET') {
          response.statusCode = 405; response.setHeader('allow', 'GET, PUT'); response.end(); return;
        }
        response.end(JSON.stringify(await settingsState(config)));
      } catch (error) {
        response.statusCode = 400;
        response.end(JSON.stringify({ message: error instanceof Error ? error.message : 'Media Sense 设置读取失败' }));
      }
    },
  }));
}
