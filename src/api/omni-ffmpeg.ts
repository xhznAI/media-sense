import { z } from 'zod'

export const omniFfmpegBinarySchema = z.object({
  path: z.string().min(1), version: z.string().min(1), source: z.enum(['system', 'managed']),
}).strict()
export type OmniFfmpegBinary = z.infer<typeof omniFfmpegBinarySchema>
export const omniFfmpegReadySchema = z.object({ ffmpeg: omniFfmpegBinarySchema, ffprobe: omniFfmpegBinarySchema }).strict()
export type OmniFfmpegReady = z.infer<typeof omniFfmpegReadySchema>
export const omniFfmpegStatusSchema = z.object({
  state: z.enum(['missing', 'installing', 'ready', 'error', 'unsupported']),
  platform: z.string(), canInstall: z.boolean(),
  ffmpeg: omniFfmpegBinarySchema.optional(), ffprobe: omniFfmpegBinarySchema.optional(),
  downloadedBytes: z.number().int().nonnegative(), totalBytes: z.number().int().nonnegative(),
  message: z.string(),
}).strict()
export type OmniFfmpegStatus = z.infer<typeof omniFfmpegStatusSchema>
export const omniFfmpegInstallRequestSchema = z.object({ action: z.literal('install') }).strict()
