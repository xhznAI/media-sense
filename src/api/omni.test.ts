import { describe, expect, it } from 'vitest';
import { omniCallRequestSchema, omniSupports, omniPromptBody, omniByteLength, omniUploadRequestSchema, omniFitsInline, omniInlineSizes, omniInlineFileError, omniMediaLimitMB, omniPreferencesSchema, OMNI_MAX_MEDIA_BYTES, OMNI_MAX_INLINE_MEDIA_BYTES, MODEL_MAX_REQUEST_BYTES, OMNI_GOOGLE_AUDIO_REQUEST_BYTES } from './omni.js';

describe('Omni 契约', () => {
  it.each(['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp4', 'audio/ogg'] as const)('MiMo %s 音频使用带 MIME 的数据 URL，兼容渠道别名', mimeType => {
    const model = { id: 'custom-audio', vendorLabel: 'Xiaomi', protocol: 'openai-completions' };
    const file = { name: 'speech', mimeType, data: 'UklGRg==' };
    expect(omniPromptBody(model, '转写', [file])).toMatchObject({ messages: [{ content: expect.arrayContaining([
      { type: 'input_audio', input_audio: { data: `data:${mimeType};base64,UklGRg==` } },
    ]) }] });
    expect(omniInlineFileError(model, [{ ...file, size: 4 }])).toBeUndefined();
    expect(omniInlineSizes(model, '转写', [{ ...file, size: 4 }]).provider)
      .toBe(new TextEncoder().encode(JSON.stringify(omniPromptBody(model, '转写', [file]))).length);
    expect(omniInlineFileError(model, [{ ...file, mimeType: 'audio/webm', size: 4 }])).toContain('FLAC、M4A、OGG');
  });
  it('AI 包的厂商名称保持 Omni 格式识别', () => {
    const model = { id: 'custom-model', protocol: 'openai-completions', inputModalities: ['video'] };
    expect(omniSupports({ ...model, vendorLabel: 'Xiaomi Token Plan CN' }, 'video')).toBe(true);
    for (const vendorLabel of ['Qwen', 'Qwen Token Plan', 'Qwen Token Plan CN']) {
      expect(omniSupports({ ...model, vendorLabel }, 'video')).toBe(true);
      const body = omniPromptBody({ ...model, vendorLabel }, '分析', [{ name: 'clip.mp4', mimeType: 'video/mp4', data: 'AAAA' }]);
      expect(JSON.stringify(body)).toContain('data:;base64,AAAA');
    }
  });
  it('仅允许已实现协议的音视频模型，不把兼容协议等同于视频支持', () => {
    const base = { protocol: 'google-generative-ai', inputModalities: ['text', 'audio', 'video'] };
    expect(omniSupports(base, 'audio')).toBe(true);
    expect(omniSupports(base, 'video')).toBe(true);
    expect(omniSupports({ ...base, protocol: 'openai-responses' }, 'audio')).toBe(false);
    expect(omniSupports({ ...base, protocol: 'openai-completions' }, 'video')).toBe(false);
    expect(omniSupports({ ...base, protocol: 'openai-completions', vendorLabel: 'Qwen' }, 'video')).toBe(true);
    expect(omniSupports({ ...base, inputModalities: ['text', 'image'] }, 'audio')).toBe(false);
  });
  it.each(['mimo-v2.6-pro', 'mimo-v2.6-flash'])('MiMo %s 必须声明视频能力，视频请求保留 MIME 类型', id => {
    const model = { id, protocol: 'openai-completions', inputModalities: ['audio', 'video'] };
    expect(omniSupports(model, 'video')).toBe(true);
    expect(omniSupports({ ...model, inputModalities: ['audio'] }, 'video')).toBe(false);
    expect(omniSupports({ ...model, protocol: 'openai-responses' }, 'video')).toBe(false);
    expect(omniSupports({ ...model, id: 'custom-model', vendorLabel: 'Xiaomi' }, 'video')).toBe(true);
    const files = [{ name: 'clip.mp4', mimeType: 'video/mp4' as const, data: 'UklGRg==' }];
    const body = omniPromptBody(model, '描述视频', files);
    expect(body).toMatchObject({ messages: [{ content: expect.arrayContaining([
      { type: 'video_url', video_url: { url: 'data:video/mp4;base64,UklGRg==' } },
    ]) }] });
    expect(omniInlineSizes(model, '描述视频', [{ ...files[0]!, size: 4 }]).provider)
      .toBe(new TextEncoder().encode(JSON.stringify(body)).length);
  });
  it.each([
    ['kimi-k3', 'Moonshot AI'], ['kimi-k3.1-pro', 'moonshotai-cn'], ['custom-kimi', 'Kimi'],
    ['glm-5.3-flash', 'Zhipu AI'], ['glm-4.6v', 'zai'], ['custom-glm', 'zhipuai'],
  ])('%s 按目录模态分别筛选音频和视频，厂商身份不会补造能力', (id, vendorLabel) => {
    const model = { id, vendorLabel, protocol: 'openai-completions', inputModalities: ['text', 'image', 'video'] };
    expect(omniSupports(model, 'video')).toBe(true);
    expect(omniSupports(model, 'audio')).toBe(false);
    expect(omniSupports({ ...model, inputModalities: ['text', 'image'] }, 'video')).toBe(false);
    expect(omniSupports({ ...model, protocol: 'anthropic-messages' }, 'video')).toBe(false);
    const file = { name: '片段.mp4', mimeType: 'video/mp4' as const, data: 'UklGRg==' };
    const body = omniPromptBody(model, '描述画面', [file]);
    expect(body).toEqual({ model: id, stream: true, messages: [{ role: 'user', content: [
      { type: 'text', text: '描述画面' }, { type: 'text', text: '文件：片段.mp4' },
      { type: 'video_url', video_url: { url: 'data:video/mp4;base64,UklGRg==' } },
    ] }] });
    expect(omniInlineSizes(model, '描述画面', [{ ...file, size: 4 }]).provider).toBe(new TextEncoder().encode(JSON.stringify(body)).length);
  });
  it('公开别名与上游模型均可匹配格式，实际请求使用上游 ID', () => {
    for (const [id, upstreamModelId] of [['public-alias', 'kimi-k3'], ['glm-5.3-flash', 'private-alias']]) {
      const model = { id: id!, upstreamModelId: upstreamModelId!, protocol: 'openai-completions', inputModalities: ['video'] };
      expect(omniSupports(model, 'video')).toBe(true);
      expect(omniPromptBody(model, '描述', [{ name: 'a.mp4', mimeType: 'video/mp4', data: 'AAAA' }]))
        .toMatchObject({ model: upstreamModelId, stream: true });
    }
  });
  it('视频格式和大小在读取前检查，Kimi 的 MOV 使用供应商 MIME 名称', () => {
    const kimi = { id: 'kimi-k3', protocol: 'openai-completions' };
    const glm = { id: 'glm-5.3-flash', protocol: 'openai-completions' };
    const file = { name: 'a.mov', mimeType: 'video/quicktime' as const, size: 32_000_000 };
    expect(JSON.stringify(omniPromptBody(kimi, '描述', [{ ...file, data: 'AAAA' }]))).toContain('data:video/mov;base64,AAAA');
    expect(omniInlineFileError(glm, [file])).toBeUndefined();
    expect(omniInlineFileError(glm, [{ ...file, mimeType: 'video/webm' }])).toContain('MP4、MOV、MKV');
    expect(omniInlineFileError(kimi, [{ ...file, mimeType: 'video/x-matroska' }])).toContain('不支持 MKV');
    const legacy = { ...glm, id: 'glm-4v-plus-0111' };
    expect(omniInlineFileError(legacy, [file])).toContain('20 MB');
    expect(omniPromptBody(legacy, '描述', [{ ...file, data: 'AAAA' }])).toMatchObject({ messages: [{ content: [
      { type: 'video_url' }, { type: 'text', text: '描述' }, { type: 'text', text: '文件：a.mov' },
    ] }] });
  });
  it('拒绝空附件、图片、模型工具参数和无效编码', () => {
    const base = { modelId: 'omni', protocol: 'google-generative-ai', instruction: '描述声音', files: [{ name: 'sample.wav', mimeType: 'audio/wav', data: 'UklGRg==' }] };
    expect(omniCallRequestSchema.safeParse(base).success).toBe(true);
    for (const body of [{ ...base, files: [] }, { ...base, tools: [] }, { ...base, files: [{ ...base.files[0], mimeType: 'image/png' }] }, { ...base, files: [{ ...base.files[0], data: 'not base64' }] }])
      expect(omniCallRequestSchema.safeParse(body).success).toBe(false);
    expect(omniByteLength('UklGRg==')).toBe(4);
  });
  it('上传允许超过默认值，保留 2 GB 传输上限和视频个数限制', () => {
    const file = { name: 'clip.wav', mimeType: 'audio/wav', size: OMNI_MAX_MEDIA_BYTES };
    expect(omniUploadRequestSchema.safeParse({ modelId: 'gemini', files: [file] }).success).toBe(true);
    expect(omniUploadRequestSchema.safeParse({ modelId: 'gemini', files: [{ ...file, size: file.size + 1 }] }).success).toBe(false);
    expect(omniUploadRequestSchema.safeParse({ modelId: 'gemini', files: Array.from({ length: 40 }, () => ({ ...file, size: 1024 })) }).success).toBe(true);
    const half = { ...file, size: OMNI_MAX_MEDIA_BYTES / 2 };
    expect(omniUploadRequestSchema.safeParse({ modelId: 'gemini', files: [half, half] }).success).toBe(true);
    expect(omniUploadRequestSchema.safeParse({ modelId: 'gemini', files: [half, { ...half, size: half.size + 1 }] }).success).toBe(false);
    expect(omniUploadRequestSchema.safeParse({ modelId: 'gemini', files: Array.from({ length: 11 }, () => ({ ...file, mimeType: 'video/mp4', size: 1024 })) }).success).toBe(false);
  });
  it.each(['google-generative-ai', 'openai-completions'])('%s 内联允许超过 25 MB，仍限制编码后的完整请求', protocol => {
    const encoded = (size: number) => 'AAAA'.repeat(Math.floor(size / 3)) + ['', 'AA==', 'AAA='][size % 3];
    const file = { name: 'clip.mp4', mimeType: 'video/mp4', data: encoded(16_000_000) };
    const request = { modelId: 'omni', protocol, instruction: '描述', files: [file, file] };
    expect(omniCallRequestSchema.safeParse(request).success).toBe(true);
    expect(omniCallRequestSchema.safeParse({ ...request, files: Array(5).fill(file) }).success).toBe(false);
    expect(omniCallRequestSchema.safeParse({ ...request, files: [{ ...file, data: encoded(OMNI_MAX_INLINE_MEDIA_BYTES + 1) }] }).success).toBe(false);
  });
  it('每个模型默认 25 MB，配置独立且拒绝无效上限', () => {
    const prefs = omniPreferencesSchema.parse({ modelMaxMediaMB: { small: 1, large: 2000 } });
    expect(omniMediaLimitMB(prefs, 'unconfigured')).toBe(25);
    expect(omniMediaLimitMB(prefs, 'constructor')).toBe(25);
    expect(omniMediaLimitMB(prefs, 'small')).toBe(1);
    expect(omniMediaLimitMB(prefs, 'large')).toBe(2000);
    for (const limit of [0, -1, 1.5, 2001, NaN, Infinity, '64'])
      expect(omniPreferencesSchema.safeParse({ modelMaxMediaMB: { model: limit } }).success).toBe(false);
  });
  it('MiMo 单文件按 Base64 及前缀限制，而非原文件字节', () => {
    const model = { id: 'mimo-v2.6-pro', protocol: 'openai-completions' };
    const file = { name: 'clip.mp4', mimeType: 'video/mp4' as const, size: 32_000_000 };
    expect(omniInlineFileError(model, [file])).toBeUndefined();
    expect(omniInlineFileError(model, [{ ...file, size: 37_500_000 }])).toContain('50 MB');
    expect(omniInlineFileError({ ...model, id: 'alias', vendorLabel: 'Xiaomi' }, [{ ...file, size: 40_000_000 }])).toContain('50 MB');
  });
  it('直接发送包含 Base64、UTF-8 指令与 JSON 开销，不把原文件大小当作请求大小', () => {
    const model = { id: 'gemini', protocol: 'google-generative-ai' };
    const file = { name: '视频.mp4', mimeType: 'video/mp4' as const, size: 32 * 1024 * 1024 };
    expect(omniFitsInline(model, '描述视频', [file])).toBe(true);
    expect(omniFitsInline(model, '描述视频', [{ ...file, size: 75_000_000 }])).toBe(false);
    const largeInstruction = '\\n视频😀'.repeat(1000);
    const sizes = omniInlineSizes(model, largeInstruction, [file]);
    expect(sizes.gateway).toBe(new TextEncoder().encode(JSON.stringify({ modelId: model.id, protocol: model.protocol, instruction: largeInstruction, files: [{ name: file.name, mimeType: file.mimeType, data: '' }] })).byteLength + Math.ceil(file.size / 3) * 4);
    const empty = omniInlineSizes(model, '', [{ ...file, size: 0 }]);
    const fits = Math.floor((MODEL_MAX_REQUEST_BYTES - Math.max(empty.gateway, empty.provider)) / 4) * 3;
    expect(omniFitsInline(model, '', [{ ...file, size: fits }])).toBe(true);
    expect(omniFitsInline(model, '更长的中文指令', [{ ...file, size: fits }])).toBe(false);
    const audio = { ...file, name: 'voice.wav', mimeType: 'audio/wav' as const, size: OMNI_GOOGLE_AUDIO_REQUEST_BYTES };
    expect(omniFitsInline(model, '', [audio])).toBe(false);
    expect(omniFitsInline({ ...model, protocol: 'openai-completions' }, '', [{ ...audio, size: 32 * 1024 * 1024 }])).toBe(true);
  });
});
