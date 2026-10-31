import { useSyncExternalStore } from 'react';
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-client-locale/client';

/** 文案原文作为类型化键，动态内容通过参数传入，不改写用户内容。 */
export const en = {
  "音视频理解与媒体工具": "Audio and video understanding and media tools",
  "模型来源": "Model source",
  "模型来源已变化，请重新加载设置后再保存。": "The model source changed. Reload settings before saving.",
  "自配模型": "Custom models",
  "外部模型": "External models",
  "此模型来源暂不可用，请重新连接或选择自配模型。": "This model source is unavailable. Reconnect or choose custom models.",
  "添加模型": "Add model",
  "添加支持音频或视频理解的模型。": "Add a model that supports audio or video understanding.",
  "新模型": "New model",
  "填写接口与模型信息": "Configure the endpoint and model",
  "显示名称": "Display name",
  "模型 ID": "Model ID",
  "接口格式": "API format",
  "接口地址": "Base URL",
  "已保存，留空保持不变": "Saved; leave blank to keep the key",
  "无需认证的本地服务可留空": "Optional for local services without authentication",
  "输入能力": "Input capabilities",
  "音频": "Audio",
  "视频": "Video",
  "请按模型实际支持的能力选择；接口格式决定可发送的音视频格式。": "Select the inputs your model supports. Available media formats depend on the API format.",
  "清除密钥": "Clear key",
  "保存后清除密钥": "Key will be cleared on save",
  "移除模型": "Remove model",
  "请检查模型名称、模型 ID、接口地址和输入能力。": "Check the model name, model ID, base URL and input capabilities.",
  "已就绪": "Ready",
  "检测失败": "Check failed",
  "版本与路径": "Version and path",
  "本机已有": "Installed on this computer",
  "Media Sense 已安装": "Installed by Media Sense",
  "检测中…": "Checking…",
  "未检测到": "Not detected",
  "正在下载安装… {percent}%": "Downloading and installing… {percent}%",
  "正在检查本机工具…": "Checking local tools…",
  "FFmpeg 安装进度": "FFmpeg installation progress",
  "重新检测": "Check again",
  "正在安装…": "Installing…",
  "重试安装": "Retry installation",
  "一键安装": "Install",
  "FFmpeg 请求失败，请重试。": "FFmpeg request failed. Please try again.",
  "当前系统暂不支持自动安装，请安装 FFmpeg 和 FFprobe 后重新检测。": "Automatic installation is not available on this platform. Install FFmpeg and FFprobe, then check again.",
  "FFmpeg 下载或校验失败，请检查网络后重试。": "FFmpeg download or verification failed. Check your connection and try again.",
  "FFmpeg 无法运行，请检查系统兼容性后重试。": "FFmpeg could not run. Check system compatibility and try again.",
  "磁盘空间不足，请清理空间后重试。": "Not enough disk space. Free up space and try again.",
  "FFmpeg 安装失败，请重试。": "FFmpeg installation failed. Please try again.",
  "此模型暂无可配置的思考强度。": "No configurable reasoning effort is available for this model.",
  "所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。": "The selected model does not support this reasoning effort. Choose another in Media Sense settings.",
  "音频模型": "Audio model",
  "视频模型": "Video model",
  "正在读取模型…": "Loading models…",
  "自动选择（列表第一项）": "Automatic (first available model)",
  "暂无可用模型": "No models available",
  "语音转写与音频内容理解": "Transcription and audio understanding",
  "画面分析与视频片段理解": "Visual analysis and video understanding",
  "已选模型不可用，请重新选择。": "The selected model is unavailable. Please choose another.",
  "Media Sense 设置暂时不可用": "Media Sense settings are temporarily unavailable",
  "选择音频与视频理解使用的模型。": "Choose models for audio and video understanding.",
  "重新加载": "Reload",
  "重试": "Retry",
  "上传上限": "Upload limit",
  "音频模型上传上限": "Audio model upload limit",
  "视频模型上传上限": "Video model upload limit",
  "请输入 1–2000 的整数。": "Enter a whole number from 1 to 2000.",
  "默认 {size} MB，可按模型修改；同一次调用的所有附件合计。": "Defaults to {size} MB per model, adjustable for the total attachments in one call.",
  "同时受模型的格式、时长与接口额度限制。": "Model format, duration and API limits also apply.",
  "有未保存的更改": "Unsaved changes",
  "媒体处理": "Media processing",
  "音视频处理与媒体信息分析": "Audio and video processing and media inspection",
  "可在这里安装，也可在任务需要时自动安装。": "Install here, or automatically when a task needs it.",
  "已保存": "Saved",
  "撤销更改": "Discard changes",
  "正在保存…": "Saving…",
  "保存更改": "Save changes",
  "模型目录暂时不可用": "The model catalog is unavailable",
  "请求来源无效": "Invalid request origin",
  "设置请求过大": "The settings request is too large",
  "所选音频模型不可用。": "The selected audio model is unavailable.",
  "所选视频模型不可用。": "The selected video model is unavailable.",
  "Media Sense 设置读取失败": "Failed to load Media Sense settings"
} as const;
export type CopyKey = keyof typeof en;
export const zh = Object.fromEntries(Object.keys(en).map(key => [key, key])) as Record<CopyKey, string>;
declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap { 'media-sense': CopyKey }
}
let locale: Context['locale'] | undefined;
const subscribe = (listener: () => void) => locale?.subscribe(listener) ?? (() => {});
const snapshot = () => locale?.getSnapshot().revision ?? 0;
export function useLocale(): void { useSyncExternalStore(subscribe, snapshot); }
export function installLocale(ctx: Context): void {
  locale = ctx.locale;
  ctx.effect(() => ctx.locale.register('media-sense', { zh, en }));
  ctx.effect(() => () => { if (locale === ctx.locale) locale = undefined; });
}
export function tr(key: CopyKey, params: Record<string, unknown> = {}): string {
  const values = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
  return locale ? locale.bind('media-sense')(key, values) : key.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}
/** 仅供本插件产生的状态和错误使用，外部诊断原样保留。 */
export function message(value: string): string {
  const prefix = value.startsWith('Error: ') ? 'Error: ' : '';
  const body = value.slice(prefix.length);
  for (const key of Object.keys(en) as CopyKey[]) {
    if (body === key || body === en[key]) return prefix + tr(key);
  }
  for (const key of Object.keys(en) as CopyKey[]) {
    for (const template of [key, en[key]]) {
      const names: string[] = [];
      const parts = template.split(/(\{\w+\})/g).map(part => {
        if (/^\{\w+\}$/.test(part)) { names.push(part.slice(1, -1)); return '([\\s\\S]*?)'; }
        return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      });
      if (!names.length) continue;
      const match = new RegExp('^' + parts.join('') + '$').exec(body);
      if (match) return prefix + tr(key, Object.fromEntries(names.map((name, index) => [name, match[index + 1]])));
    }
  }
  return value;
}
export function localeTag(): string { return locale?.getSnapshot().active === 'zh' ? 'zh-CN' : 'en-US'; }
