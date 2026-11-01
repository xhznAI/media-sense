import { z } from 'zod'
import { modelVendorId } from './model-vendors.js'
import { omniReasoningEffortSchema, omniReasoningPreferenceSchema } from './omni-reasoning.js'

/** 用户可按模型调整原始素材总量；默认 25 MB，按十进制计量。 */
export const OMNI_DEFAULT_MEDIA_MB = 25
/** 传输安全上限独立于用户偏好；大文件只能经支持的分块接口发送。 */
export const OMNI_MAX_MEDIA_BYTES = 2_000_000_000
export const OMNI_MAX_INLINE_MEDIA_BYTES = 75_000_000
export const OMNI_MEDIA_SIZE_MESSAGE = '原始音视频素材合计超过传输上限 2,000 MB，请压缩或分段后重试。'
export const OMNI_REQUEST_SIZE_MESSAGE = '音视频请求内容过大，请减少附件数量或缩短指令后重试。'
export const OMNI_GEMINI_MAX_VIDEOS = 10
/** 分块大小只是传输窗口，不是文件大小限制。 */
export const OMNI_CHUNK_BYTES = 4 * 1024 * 1024
/** Gemini 通用输入文档以完整请求体计 100 MB，包含 base64 和 JSON 文本。 */
export const MODEL_MAX_REQUEST_BYTES = 100_000_000
/** 音频专页仍规定 20 MB；含独立音频文件的 Gemini 请求遵循该更具体的额度。 */
export const OMNI_GOOGLE_AUDIO_REQUEST_BYTES = 20_000_000
export const OMNI_MAX_RESULT_CHARS = 32_000
export const omniKindSchema = z.enum(['audio', 'video'])
export type OmniKind = z.infer<typeof omniKindSchema>
export const omniMimeTypes = [
  'audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/aac', 'audio/flac', 'audio/ogg', 'audio/webm', 'audio/aiff', 'audio/opus',
  'video/mp4', 'video/webm', 'video/quicktime', 'video/mpeg', 'video/x-msvideo', 'video/x-flv', 'video/3gpp', 'video/x-ms-wmv', 'video/x-matroska',
] as const
const mediaLimitsSchema = z.record(z.string().min(1).max(300), z.number().int().min(1).max(OMNI_MAX_MEDIA_BYTES / 1_000_000))
export const omniPreferencesSchema = z.object({
  audioModelId: z.string().max(300).default(''),
  videoModelId: z.string().max(300).default(''),
  audioReasoningEffort: omniReasoningPreferenceSchema.optional(),
  videoReasoningEffort: omniReasoningPreferenceSchema.optional(),
  modelMaxMediaMB: mediaLimitsSchema.optional(),
  audioModelMaxMediaMB: mediaLimitsSchema.optional(),
  videoModelMaxMediaMB: mediaLimitsSchema.optional(),
}).strict()
export type OmniPreferences = z.infer<typeof omniPreferencesSchema>

/** 旧版共用上限作为各类型未单独设置时的默认值。 */
export function omniMediaLimitMB(preferences: OmniPreferences, modelId: string, kind?: OmniKind): number {
  const limits = kind === 'audio' ? preferences.audioModelMaxMediaMB : kind === 'video' ? preferences.videoModelMaxMediaMB : undefined
  if (limits && Object.hasOwn(limits, modelId)) return limits[modelId]!
  const legacy = preferences.modelMaxMediaMB
  return legacy && Object.hasOwn(legacy, modelId) ? legacy[modelId]! : OMNI_DEFAULT_MEDIA_MB
}

export interface OmniModelCapabilities {
  id?: string | undefined
  upstreamModelId?: string | undefined
  protocol: string
  inputModalities: readonly string[]
  vendorLabel?: string | undefined
}

type MediaIdentity = Pick<OmniModelCapabilities, 'id' | 'upstreamModelId' | 'vendorLabel'>
function hasModelId(model: MediaIdentity, pattern: RegExp): boolean {
  return [model.id, model.upstreamModelId].some(id => id !== undefined && pattern.test(id))
}

/** 厂商与模型身份只用于选择请求格式，不能补造目录没有声明的输入能力。 */
export function isQwenOmni(model: MediaIdentity): boolean {
  return hasModelId(model, /^(?:qwen[/-])?qwen/iu) ||
    /^(?:qwen-token-plan|alibaba)(?:-|$)/u.test(modelVendorId(model.vendorLabel ?? ''))
}

/** MiMo 可经兼容渠道发布，未设置厂商标签时仍按公开模型 ID 识别。 */
export function isMimoOmni(model: MediaIdentity): boolean {
  return hasModelId(model, /^(?:xiaomi[/-])?mimo-/iu) ||
    /^xiaomi(?:-token-plan(?:-|$)|$)/u.test(modelVendorId(model.vendorLabel ?? ''))
}

export function isKimiVideo(model: MediaIdentity): boolean {
  return hasModelId(model, /^(?:moonshotai[/-])?(?:kimi|moonshot)-/iu) ||
    /^(?:moonshotai(?:-|$)|moonshot(?: ai)?$|kimi(?:-coding|$))/u.test(modelVendorId(model.vendorLabel ?? ''))
}

export function isGlmVideo(model: MediaIdentity): boolean {
  return hasModelId(model, /^(?:(?:z-ai|zai|zhipuai)[/-])?glm-/iu) ||
    /^(?:zai|zhipuai)(?:-|$)/u.test(modelVendorId(model.vendorLabel ?? '')) || model.vendorLabel?.toLowerCase() === 'z.ai'
}

/** 只有模型声明和已实现的接口同时满足，才向设置页提供该能力。 */
export function omniSupports(model: OmniModelCapabilities, kind: OmniKind): boolean {
  return model.inputModalities.includes(kind) && (
    model.protocol === 'google-generative-ai' ||
    (model.protocol === 'openai-completions' && (kind === 'audio' || isQwenOmni(model) || isMimoOmni(model) || isKimiVideo(model) || isGlmVideo(model)))
  )
}

export function omniByteLength(base64: string): number {
  return base64.length / 4 * 3 - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0)
}

export const omniFileMetadataSchema = z.object({
  name: z.string().min(1).max(255),
  mimeType: z.enum(omniMimeTypes),
  size: z.number().int().positive().max(OMNI_MAX_MEDIA_BYTES, OMNI_MEDIA_SIZE_MESSAGE),
}).strict()
export type OmniFileMetadata = z.infer<typeof omniFileMetadataSchema>

/** 避免大块 base64 的嵌套正则回溯，同时拒绝宽松解码产生的歧义。 */
function base64Schema(maxBytes: number) {
  return z.string().min(4).max(Math.ceil(maxBytes / 3) * 4).refine(value =>
    value.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/u.test(value) && omniByteLength(value) <= maxBytes,
  '无效的文件编码')
}
export const omniFileSchema = omniFileMetadataSchema.omit({ size: true }).extend({
  data: base64Schema(OMNI_MAX_INLINE_MEDIA_BYTES),
}).strict()
export type OmniFile = z.infer<typeof omniFileSchema>
const omniCallBase = z.object({
  modelId: z.string().min(1).max(300),
  protocol: z.enum(['google-generative-ai', 'openai-completions']),
  instruction: z.string().trim().min(1).max(12_000),
  reasoningEffort: omniReasoningEffortSchema.optional(),
})
const omniInlineRequestSchema = omniCallBase.extend({
  files: z.array(omniFileSchema).min(1),
}).strict().superRefine((request, ctx) => {
  const files = request.files.map(file => ({ name: file.name, mimeType: file.mimeType, size: omniByteLength(file.data) }))
  if (omniInlineSizes({ id: request.modelId, protocol: request.protocol }, request.instruction, files).gateway > MODEL_MAX_REQUEST_BYTES)
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['files'], message: OMNI_REQUEST_SIZE_MESSAGE })
})
export type OmniInlineRequest = z.infer<typeof omniInlineRequestSchema>
export const omniCallRequestSchema = z.union([
  omniInlineRequestSchema,
  omniCallBase.extend({ protocol: z.literal('google-generative-ai'), uploadId: z.string().uuid() }).strict(),
])
export type OmniCallRequest = z.infer<typeof omniCallRequestSchema>

export const omniUploadRequestSchema = omniCallBase.pick({ modelId: true }).extend({
  files: z.array(omniFileMetadataSchema).min(1),
}).strict().superRefine((value, ctx) => {
  if (value.files.reduce((sum, file) => sum + file.size, 0) > OMNI_MAX_MEDIA_BYTES)
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['files'], message: OMNI_MEDIA_SIZE_MESSAGE })
  if (value.files.filter(file => file.mimeType.startsWith('video/')).length > OMNI_GEMINI_MAX_VIDEOS)
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['files'], message: 'Gemini 每次最多接收 10 个视频。' })
})
export type OmniUploadRequest = z.infer<typeof omniUploadRequestSchema>
export const omniUploadResponseSchema = z.object({ uploadId: z.string().uuid(), chunkBytes: z.literal(OMNI_CHUNK_BYTES) }).strict()
export const omniChunkRequestSchema = z.object({ offset: z.number().int().nonnegative(), data: base64Schema(OMNI_CHUNK_BYTES) }).strict()
export const omniUploadStatusSchema = z.object({ ready: z.boolean() }).strict()
/** 上游文件元数据仅供 Server 校验，不将供应商引用返回客户端。 */
export const omniGoogleFileSchema = z.object({
  name: z.string().regex(/^files\/[A-Za-z0-9_-]+$/u), uri: z.string().url(), state: z.enum(['PROCESSING', 'ACTIVE', 'FAILED']),
})
export const omniGoogleUploadSchema = z.object({ file: omniGoogleFileSchema })
export const omniCallResponseSchema = z.object({
  modelId: z.string().min(1),
  text: z.string().min(1).max(OMNI_MAX_RESULT_CHARS),
  truncated: z.boolean(),
}).strict()
export type OmniCallResponse = z.infer<typeof omniCallResponseSchema>

/** 设置页仅接收安全模型摘要和当前来源的偏好。 */
export const omniSettingsResponseSchema = z.object({
  preferences: omniPreferencesSchema,
  models: z.array(z.object({ id: z.string(), name: z.string(), audio: z.boolean(), video: z.boolean(), protocol: z.string(), reasoningEfforts: z.array(omniReasoningEffortSchema).default([]) })),
  message: z.string(),
})
export type OmniSettingsResponse = z.infer<typeof omniSettingsResponseSchema>

type PromptModel = MediaIdentity & { id: string; protocol: string }
export type OmniPromptFile = OmniFile | { name: string; mimeType: OmniFile['mimeType']; uri: string }

export function omniAudioFormat(mimeType: string): string {
  return ({ 'audio/wav': 'wav', 'audio/mpeg': 'mp3', 'audio/mp3': 'mp3', 'audio/mp4': 'm4a' } as Record<string, string>)[mimeType] ?? mimeType.slice(6)
}

/** Kimi 的视频 MIME 名称与文件系统常用名称不同。 */
function videoMimeType(model: MediaIdentity, mimeType: string): string {
  return isKimiVideo(model) ? ({ 'video/quicktime': 'video/mov', 'video/x-msvideo': 'video/avi', 'video/x-ms-wmv': 'video/wmv' } as Record<string, string>)[mimeType] ?? mimeType : mimeType
}

/** Host 的大小预检与 Server 的实际请求使用同一格式，避免漏算编码和封装。 */
export function omniPromptBody(model: PromptModel, instruction: string, files: readonly OmniPromptFile[]): Record<string, unknown> {
  if (model.protocol === 'google-generative-ai') return {
    contents: [{ role: 'user', parts: [
      { text: instruction },
      ...files.flatMap(file => [{ text: `文件：${file.name}` }, 'uri' in file
        ? { fileData: { mimeType: file.mimeType, fileUri: file.uri } }
        : { inlineData: { mimeType: file.mimeType, data: file.data } }]),
    ] }], generationConfig: { maxOutputTokens: 8192, responseModalities: ['TEXT'] },
  }
  const qwen = isQwenOmni(model)
  const mimo = isMimoOmni(model)
  const content: unknown[] = [{ type: 'text', text: instruction }]
  for (const file of files) {
    if (!('data' in file)) throw new Error('此接口不支持 Gemini 文件引用。')
    content.push({ type: 'text', text: `文件：${file.name}` })
    content.push(file.mimeType.startsWith('video/')
      ? { type: 'video_url', video_url: { url: `data:${qwen ? '' : videoMimeType(model, file.mimeType)};base64,${file.data}` } }
      : { type: 'input_audio', input_audio: mimo
        ? { data: `data:${file.mimeType};base64,${file.data}` }
        : { data: qwen ? `data:;base64,${file.data}` : file.data, format: omniAudioFormat(file.mimeType) } })
  }
  if (isGlmVideo(model) && hasModelId(model, /(?:^|\/)glm-4v-plus-0111$/iu)) {
    const index = content.findIndex(part => (part as { type: string }).type === 'video_url')
    if (index > 0) content.unshift(...content.splice(index, 1))
  }
  // Kimi、GLM 的视觉接口不发送 OpenAI 音频输出参数和存储参数。
  if (isKimiVideo(model) || isGlmVideo(model)) return { model: model.upstreamModelId ?? model.id, messages: [{ role: 'user', content }], stream: true }
  return { model: model.upstreamModelId ?? model.id, messages: [{ role: 'user', content }], modalities: ['text'],
    stream: true, stream_options: { include_usage: true }, ...(qwen ? {} : { store: false }) }
}

/** 不读取文件即可计算完整 JSON 的 UTF-8 字节数；base64 内容只含 ASCII 且不需要转义。 */
export function omniInlineSizes(model: PromptModel, instruction: string, files: readonly OmniFileMetadata[]): { gateway: number; provider: number } {
  const emptyFiles = files.map(file => ({ name: file.name, mimeType: file.mimeType, data: '' }))
  const encodedBytes = files.reduce((sum, file) => sum + Math.ceil(file.size / 3) * 4, 0)
  const jsonSize = (body: unknown): number => new TextEncoder().encode(JSON.stringify(body)).length
  return {
    gateway: jsonSize({ modelId: model.id, protocol: model.protocol, instruction, files: emptyFiles }) + encodedBytes,
    provider: jsonSize(omniPromptBody(model, instruction, emptyFiles)) + encodedBytes,
  }
}

export function omniInlineRequestLimit(protocol: string, files: readonly Pick<OmniFileMetadata, 'mimeType'>[]): number {
  return protocol === 'google-generative-ai' && files.some(file => file.mimeType.startsWith('audio/'))
    ? OMNI_GOOGLE_AUDIO_REQUEST_BYTES : MODEL_MAX_REQUEST_BYTES
}

export function omniFitsInline(model: PromptModel, instruction: string, files: readonly OmniFileMetadata[]): boolean {
  const sizes = omniInlineSizes(model, instruction, files)
  return sizes.gateway <= MODEL_MAX_REQUEST_BYTES && sizes.provider <= omniInlineRequestLimit(model.protocol, files)
}

/** 已实现的本地文件发送方式不能绕过供应商的编码大小限制。 */
export function omniInlineFileError(model: PromptModel, files: readonly OmniFileMetadata[]): string | undefined {
  if (model.protocol === 'openai-completions' && !isQwenOmni(model)) {
    const formats = isMimoOmni(model) ? ['wav', 'mp3', 'flac', 'm4a', 'ogg'] : ['wav', 'mp3']
    if (files.some(file => file.mimeType.startsWith('audio/') && !formats.includes(omniAudioFormat(file.mimeType))))
      return isMimoOmni(model) ? 'MiMo 音频接口支持 WAV、MP3、FLAC、M4A、OGG，请使用 FFmpeg 转换后重试。'
        : '此音频接口仅支持 WAV、MP3，请使用 FFmpeg 转换后重试。'
  }
  if (model.protocol === 'openai-completions' && isGlmVideo(model)) {
    if (files.some(file => file.mimeType.startsWith('video/') && !['video/mp4', 'video/quicktime', 'video/x-matroska'].includes(file.mimeType)))
      return 'GLM 视频接口支持 MP4、MOV、MKV，请使用 FFmpeg 转换后重试。'
    if (hasModelId(model, /(?:^|\/)glm-4v-plus(?:-|$)/iu) && files.some(file => file.size > 20_000_000))
      return 'GLM-4V-Plus 单个视频不能超过 20 MB，请压缩或分段后重试。'
  }
  if (model.protocol === 'openai-completions' && isKimiVideo(model) && files.some(file => file.mimeType === 'video/x-matroska'))
    return 'Kimi 视频接口不支持 MKV，请使用 FFmpeg 转换为 MP4 后重试。'
  if (model.protocol === 'openai-completions' && isMimoOmni(model) && files.some(file => Math.ceil(file.size / 3) * 4 + `data:${file.mimeType};base64,`.length > 50_000_000))
    return 'MiMo 每个附件编码后不能超过 50 MB（原文件约 37.5 MB），请压缩或分段后重试。'
  return undefined
}
