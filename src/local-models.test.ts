import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Context } from '@deepseek-ai/cordis';
import type { ToolRunContext } from '@deepseek-ai/dsh-tools';
import { mediaSenseModelWriteSchema, mediaSenseSettingsResponseSchema, mediaSenseSettingsWriteSchema, OMNI_DEFAULT_MEDIA_MB, type OmniPreferences } from './api/index.js';
import { preferencesOf, sourceOf, type RuntimeConfig as Config, type LocalModel } from './config.ts';
import { readCatalog, selectOmniModel } from './catalog.ts';
import { settingsState, saveSettings } from './index.ts';
import { omniTool } from './call-tool.ts';

const DEFAULT_MEDIA_BYTES = OMNI_DEFAULT_MEDIA_MB * 1_000_000;
const id = 'e3ef64e4-b1cd-4e41-b873-9cd87872a7ca';
const model: LocalModel = { id, name: 'My Gemini', modelId: 'gemini-2.5-flash', baseUrl: 'https://provider.invalid/v1beta', adapter: 'google-generative-ai', audio: true, video: true, apiKey: 'private-local-key' };
function fixture(models: LocalModel[] = [model]) {
  const values = { source: 'local' as 'local' | 'host', localModels: models, preferences: { local: { audioModelId: id, videoModelId: id } } as Record<string, OmniPreferences> };
  const config = {
    preferences: { get: () => values.preferences }, source: { get: () => values.source }, localModels: { get: () => values.localModels },
  } as Config;
  const ctx = { settings: { update: vi.fn(async (_ns: string, patch: object) => { Object.assign(values, patch); }) },
    workingDirectory: { get: () => '/workspace' }, fs: {
      resolve: vi.fn(async (path: string) => ({ displayPath: path })),
      stat: vi.fn(async () => ({ type: 'file', size: 4, version: 'v1' })),
      readBytes: vi.fn(async () => new Uint8Array([82, 73, 70, 70])),
      readByteRange: vi.fn(async (_target: unknown, range: { length: number }) => new Uint8Array(range.length)),
    },
  } as unknown as Context;
  const exec = { signal: new AbortController().signal } as ToolRunContext;
  return { values, config, ctx, exec };
}
afterEach(() => { vi.unstubAllGlobals(); });

describe('Media Sense 独立配置', () => {
  it('同一模型按音视频类型执行独立上限，混合输入按视频上限检查总量', async () => {
    const { config, ctx, exec, values } = fixture();
    values.source = 'host';
    values.preferences['host-a'] = { audioModelId: 'shared', videoModelId: 'shared', modelMaxMediaMB: { shared: 8 },
      audioModelMaxMediaMB: { shared: 1 }, videoModelMaxMediaMB: { shared: 3 } };
    const call = vi.fn(async () => ({ modelId: 'shared', text: 'OK', truncated: false }));
    config.externalSource = { label: { zh: '测试来源', en: 'Test source' }, available: true, scope: 'host-a',
      listModels: async () => [{ id: 'shared', name: 'Shared', provider: 'google', protocol: 'google-generative-ai', inputModalities: ['audio', 'video'] }], call };
    vi.mocked(ctx.fs.stat).mockResolvedValue({ type: 'file', size: 1_600_000, version: 'v1' } as never);
    const tool = omniTool(ctx, config);
    await expect(tool.execute({ files: ['voice.wav'], instruction: '分析' }, exec)).rejects.toThrow('1 MB');
    await expect(tool.execute({ files: ['clip.mp4'], instruction: '分析' }, exec)).resolves.toMatchObject({ text: 'OK' });
    await expect(tool.execute({ files: ['voice.wav', 'clip.mp4'], instruction: '分析' }, exec)).rejects.toThrow('3 MB');
    values.preferences['host-a']!.audioModelMaxMediaMB = { shared: 2 };
    values.preferences['host-a']!.videoModelMaxMediaMB = { shared: 1 };
    await expect(tool.execute({ files: ['voice.wav'], instruction: '分析' }, exec)).resolves.toMatchObject({ text: 'OK' });
    await expect(tool.execute({ files: ['clip.mp4'], instruction: '分析' }, exec)).rejects.toThrow('1 MB');
    expect(call).toHaveBeenCalledTimes(2);
    expect(ctx.fs.readBytes).not.toHaveBeenCalled();
  });
  it('保存期间切换宿主账号时不能将旧选择写到新账号', async () => {
    const { config, ctx, values } = fixture();
    values.source = 'host';
    let release!: (models: Awaited<ReturnType<typeof readCatalog>>) => void;
    config.externalSource = { label: { zh: '工作台', en: 'Workbench' }, available: true, scope: 'user-a',
      listModels: () => new Promise(resolve => { release = resolve; }), call: vi.fn() };
    const saving = saveSettings(ctx, config, { source: 'host', preferences: { audioModelId: '', videoModelId: '' }, localModels: [] });
    config.externalSource = { ...config.externalSource, scope: 'user-b' };
    release([]);
    await expect(saving).rejects.toThrow('模型来源已变化');
    expect(ctx.settings.update).not.toHaveBeenCalled();
  });
  it('通用宿主接口无需 Nex 目录；调用期间更换来源仍使用开始时的来源和选择', async () => {
    const { config, ctx, exec, values } = fixture();
    let release!: (models: Awaited<ReturnType<typeof readCatalog>>) => void;
    const call = vi.fn(async () => ({ modelId: 'host-audio', text: 'Host result', truncated: false }));
    values.source = 'host';
    values.preferences['host-a'] = { audioModelId: 'host-audio', videoModelId: '' };
    config.externalSource = { label: { zh: '其他工作台', en: 'Another workbench' }, available: true, scope: 'host-a',
      listModels: () => new Promise(resolve => { release = resolve; }), call };
    const pending = omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '描述' }, exec);
    values.source = 'local';
    config.externalSource = undefined;
    release([{ id: 'host-audio', name: 'Host audio', provider: 'openai', protocol: 'openai-completions', inputModalities: ['text', 'audio'] }]);
    expect(await pending).toMatchObject({ modelId: 'host-audio', text: 'Host result' });
    expect(call).toHaveBeenCalledOnce();
  });
  it('未登录时直接使用自配目录，并且不回显已保存的密钥', async () => {
    const { config } = fixture();
    expect(sourceOf(config)).toBe('local');
    const catalog = await readCatalog(config);
    expect(selectOmniModel(catalog, preferencesOf(config), ['audio', 'video']).local?.modelId).toBe(model.modelId);
    const state = mediaSenseSettingsResponseSchema.parse(await settingsState(config));
    expect(state).toMatchObject({ source: 'local', message: '', localModels: [{ hasApiKey: true }], models: [{ audio: true, video: true }] });
    expect(JSON.stringify(state)).not.toContain(model.apiKey);
    expect(state.models[0]!.reasoningEfforts).toContain('high');
  });
  it('登录与退出保留来源和各自选择，不静默切换自配模型或其他账号', () => {
    const { config, values } = fixture();
    const signedIn = { ...config, externalSource: { label: { zh: '测试来源', en: 'Test source' }, available: true, scope: 'user-a', listModels: async () => [], call: vi.fn() }, lastSourceScope: { get: () => 'user-a' } } as Config;
    values.preferences['user-a'] = { audioModelId: 'account-audio', videoModelId: 'account-video' };
    expect(preferencesOf(signedIn).audioModelId).toBe(id);
    values.source = 'host';
    expect(preferencesOf(signedIn).audioModelId).toBe('account-audio');
    const signedOut = { ...signedIn, externalSource: undefined };
    expect(sourceOf(signedOut)).toBe('host');
    expect(preferencesOf(signedOut).audioModelId).toBe('account-audio');
    expect(preferencesOf({ ...signedIn, externalSource: { ...signedIn.externalSource!, scope: 'user-b' } }).audioModelId).toBe('');
  });
  it('保存、保留、替换和清除密钥，并在删除模型后清理该凭据', async () => {
    const { config, ctx, values } = fixture();
    const { apiKey: _key, ...plain } = model;
    const input = mediaSenseSettingsWriteSchema.parse({ source: 'local', preferences: { audioModelId: id }, localModels: [plain] });
    await saveSettings(ctx, config, input);
    expect(values.localModels[0]!.apiKey).toBe('private-local-key');
    await saveSettings(ctx, config, { ...input, localModels: [{ ...plain, apiKey: 'replacement' }] });
    expect(values.localModels[0]!.apiKey).toBe('replacement');
    await saveSettings(ctx, config, { ...input, localModels: [{ ...plain, apiKey: '' }] });
    expect(values.localModels[0]!.apiKey).toBe('');
    await saveSettings(ctx, config, { ...input, preferences: { audioModelId: '', videoModelId: '' }, localModels: [] });
    expect(values.localModels).toEqual([]);
  });
  it('拒绝未知协议能力、错误地址和重复标识，账号来源仍需登录', async () => {
    expect(mediaSenseModelWriteSchema.safeParse({ ...model, adapter: 'openai-completions' }).success).toBe(false);
    expect(mediaSenseModelWriteSchema.safeParse({ ...model, audio: false, video: false }).success).toBe(false);
    expect(mediaSenseModelWriteSchema.safeParse({ ...model, baseUrl: 'https://secret@provider.invalid' }).success).toBe(false);
    expect(mediaSenseModelWriteSchema.safeParse({ ...model, baseUrl: 'https://provider.invalid?key=secret' }).success).toBe(false);
    expect(mediaSenseSettingsWriteSchema.safeParse({ source: 'local', preferences: {}, localModels: [model, model] }).success).toBe(false);
    const { config, ctx } = fixture();
    await expect(saveSettings(ctx, config, { source: 'host', preferences: { audioModelId: '', videoModelId: '' }, localModels: [] })).rejects.toThrow('暂不可用');
    expect(ctx.settings.update).not.toHaveBeenCalled();
  });
});

describe('Media Sense 直连模型', () => {
  it('调高上限后直接发送超过 25 MB 的视频，降低后在读取前拒绝', async () => {
    const { config, ctx, exec, values } = fixture();
    const bytes = new Uint8Array(32_000_000);
    vi.mocked(ctx.fs.stat).mockResolvedValue({ type: 'file', size: bytes.length, version: 'v1' } as never);
    vi.mocked(ctx.fs.readBytes).mockResolvedValue(bytes);
    const request = vi.fn(async () => Response.json({ candidates: [{ content: { parts: [{ text: 'large video' }] } }] }));
    vi.stubGlobal('fetch', request);
    await expect(omniTool(ctx, config).execute({ files: ['clip.mp4'], instruction: '描述' }, exec)).rejects.toThrow('25 MB');
    expect(ctx.fs.readBytes).not.toHaveBeenCalled();
    values.preferences.local!.modelMaxMediaMB = { [id]: 64 };
    expect(await omniTool(ctx, config).execute({ files: ['clip.mp4'], instruction: '描述' }, exec)).toMatchObject({ text: 'large video' });
    expect(request).toHaveBeenCalledOnce();
    values.preferences.local!.modelMaxMediaMB = { [id]: 1 };
    await expect(omniTool(ctx, config).execute({ files: ['clip.mp4'], instruction: '描述' }, exec)).rejects.toThrow('1 MB 上限');
    expect(ctx.fs.readBytes).toHaveBeenCalledOnce();
  });
  it.each([
    { adapter: 'mimo-omni' as const, size: 40_000_000, error: '50 MB' },
    { adapter: 'qwen-omni' as const, size: 80_000_000, error: '100 MB' },
  ])('$adapter 提高用户上限仍需遵守接口大小限制，预检不读取文件', async ({ adapter, size, error }) => {
    const { config, ctx, exec, values } = fixture([{ ...model, adapter }]);
    values.preferences.local!.modelMaxMediaMB = { [id]: 128 };
    vi.mocked(ctx.fs.stat).mockResolvedValue({ type: 'file', size, version: 'v1' } as never);
    const request = vi.fn(); vi.stubGlobal('fetch', request);
    await expect(omniTool(ctx, config).execute({ files: ['clip.mp4'], instruction: '描述' }, exec)).rejects.toThrow(error);
    expect(ctx.fs.readBytes).not.toHaveBeenCalled();
    expect(ctx.fs.readByteRange).not.toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
  });
  it('使用独立模型 ID、密钥和原始音频调用 Gemini，保留文字和截断状态', async () => {
    const { config, ctx, exec, values } = fixture();
    values.preferences.local!.audioReasoningEffort = 'high';
    const fetch = vi.fn(async () => Response.json({ candidates: [{ content: { parts: [{ thought: true, text: 'hidden' }, { text: 'transcription' }] }, finishReason: 'MAX_TOKENS' }] }));
    vi.stubGlobal('fetch', fetch);
    const result = await omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '听写' }, exec);
    expect(result).toEqual({ modelId: model.modelId, text: 'transcription', truncated: true });
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://provider.invalid/v1beta/models/gemini-2.5-flash:generateContent');
    expect(init.headers).toMatchObject({ 'x-goog-api-key': model.apiKey });
    expect(init.redirect).toBe('error');
    expect(JSON.parse(String(init.body)).contents[0].parts).toContainEqual({ inlineData: { mimeType: 'audio/wav', data: 'UklGRg==' } });
    expect(JSON.parse(String(init.body)).generationConfig).toEqual({ maxOutputTokens: 32768, responseModalities: ['TEXT'], thinkingConfig: { thinkingBudget: 24576 } });
    expect(fetch).toHaveBeenCalledOnce();
  });
  it.each(['qwen-omni', 'mimo-omni', 'kimi-video', 'glm-video'] as const)('%s 显式适配视频扩展，未知模型别名也能使用', async adapter => {
    const local = { ...model, adapter, audio: !['kimi-video', 'glm-video'].includes(adapter), modelId: 'my-custom-alias', baseUrl: 'https://provider.invalid/compatible-mode/v1' };
    const { config, ctx, exec } = fixture([local]);
    const fetch = vi.fn(async () => new Response('data: {"choices":[{"delta":{"reasoning_content":"hidden","content":"video result"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n', { headers: { 'content-type': 'text/event-stream' } }));
    vi.stubGlobal('fetch', fetch);
    expect(await omniTool(ctx, config).execute({ files: ['clip.mp4'], instruction: '描述' }, exec)).toEqual({ modelId: local.modelId, text: 'video result', truncated: false });
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://provider.invalid/compatible-mode/v1/chat/completions');
    expect(init.headers).toMatchObject({ authorization: `Bearer ${local.apiKey}` });
    const body = JSON.parse(String(init.body));
    expect(body.model).toBe(local.modelId);
    expect(body.messages[0].content).toContainEqual({ type: 'video_url', video_url: { url: `data:${adapter === 'qwen-omni' ? '' : 'video/mp4'};base64,UklGRg==` } });
    if (adapter === 'kimi-video' || adapter === 'glm-video') {
      expect(body).not.toHaveProperty('modalities'); expect(body).not.toHaveProperty('store'); expect(body).not.toHaveProperty('stream_options');
      expect(mediaSenseModelWriteSchema.safeParse({ ...local, audio: true }).success).toBe(false);
      await expect(omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '听写' }, exec)).rejects.toThrow('不能处理');
      expect(fetch).toHaveBeenCalledOnce();
    }
  });
  it('无需认证的服务不发送账号或空认证头，标准音频限制在读取前检查', async () => {
    const local = { ...model, adapter: 'openai-completions' as const, baseUrl: 'http://127.0.0.1:9000', apiKey: '', video: false };
    const { config, ctx, exec } = fixture([local]);
    const fetch = vi.fn(async () => Response.json({ choices: [{ message: { content: 'audio result' } }] })); vi.stubGlobal('fetch', fetch);
    await expect(omniTool(ctx, config).execute({ files: ['voice.flac'], instruction: '描述' }, exec)).rejects.toThrow('WAV、MP3');
    expect(ctx.fs.readBytes).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled();
    await omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '描述' }, exec);
    const [url, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('http://127.0.0.1:9000/v1/chat/completions');
    expect(init.headers).toEqual({ 'content-type': 'application/json' });
  });
  it('MiMo 自配别名接受 FLAC，使用完整数据 URL，提前拒绝未支持格式', async () => {
    const local = { ...model, modelId: 'private-audio', adapter: 'mimo-omni' as const };
    const { config, ctx, exec } = fixture([local]);
    const request = vi.fn(async () => Response.json({ choices: [{ message: { content: '转写结果' } }] }));
    vi.stubGlobal('fetch', request);
    await expect(omniTool(ctx, config).execute({ files: ['voice.aac'], instruction: '转写' }, exec)).rejects.toThrow('FLAC、M4A、OGG');
    expect(ctx.fs.readBytes).not.toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
    await omniTool(ctx, config).execute({ files: ['voice.flac'], instruction: '转写' }, exec);
    const [, init] = request.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(String(init.body)).messages[0].content).toContainEqual({ type: 'input_audio', input_audio: { data: 'data:audio/flac;base64,UklGRg==' } });
  });
  it('较大 Gemini 音频分块上传并在调用后删除，上传地址不能跨域', async () => {
    const { config, ctx, exec, values } = fixture();
    values.preferences.local!.modelMaxMediaMB = { [id]: 64 };
    vi.mocked(ctx.fs.stat).mockResolvedValue({ type: 'file', size: 32_000_000, version: 'v1' } as never);
    const calls: { url: string; init: RequestInit }[] = [];
    const remote = { name: 'files/test', uri: 'https://provider.invalid/v1beta/files/test', state: 'ACTIVE' };
    vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      if (url.endsWith('/upload/v1beta/files')) return new Response(null, { headers: { 'x-goog-upload-url': 'https://provider.invalid/upload/session' } });
      if (url.endsWith('/upload/session')) return init.headers && (init.headers as Record<string, string>)['x-goog-upload-command'] === 'upload, finalize' ? Response.json({ file: remote }) : new Response(null);
      if (init.method === 'DELETE') return new Response(null);
      return Response.json({ candidates: [{ content: { parts: [{ text: 'uploaded result' }] } }] });
    }));
    expect(await omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '听写' }, exec)).toMatchObject({ text: 'uploaded result' });
    expect(calls.filter(call => call.url.endsWith('/upload/session'))).toHaveLength(8);
    expect(calls.at(-1)).toMatchObject({ url: remote.uri, init: { method: 'DELETE' } });
    expect(ctx.fs.readBytes).not.toHaveBeenCalled();
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { headers: { 'x-goog-upload-url': 'https://untrusted.invalid/upload' } })));
    await expect(omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '听写' }, exec)).rejects.toThrow('不受信任');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('读取已上传文件发现变化时清理文件，不发起模型调用', async () => {
    const { config, ctx, exec } = fixture();
    vi.mocked(ctx.fs.stat).mockResolvedValueOnce({ type: 'file', size: DEFAULT_MEDIA_BYTES, version: 'v1' } as never).mockResolvedValue({ type: 'file', size: 0, version: 'v2' } as never);
    const calls: string[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
      calls.push(`${init.method} ${url}`);
      if (url.endsWith('/upload/v1beta/files')) return new Response(null, { headers: { 'x-goog-upload-url': 'https://provider.invalid/upload/session' } });
      if (init.method === 'DELETE') return new Response(null);
      return Response.json({ file: { name: 'files/test', uri: 'https://provider.invalid/v1beta/files/test', state: 'ACTIVE' } });
    }));
    await expect(omniTool(ctx, config).execute({ files: ['voice.wav'], instruction: '听写' }, exec)).rejects.toThrow('文件在上传期间发生变化');
    expect(calls.at(-1)).toBe('DELETE https://provider.invalid/v1beta/files/test');
    expect(calls.some(url => url.includes('generateContent'))).toBe(false);
  });
});
