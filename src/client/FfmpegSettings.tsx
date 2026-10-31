import { useEffect, useState } from 'react';
import { Button, IconChevronDownOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { omniFfmpegInstallRequestSchema, omniFfmpegStatusSchema, type OmniFfmpegStatus } from '../api/index.js';
import { tr, message, useLocale } from './i18n.ts';

async function request(install: boolean, signal: AbortSignal): Promise<OmniFfmpegStatus> {
  const response = await fetch('/media-sense/ffmpeg', { signal, ...(install ? {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify(omniFfmpegInstallRequestSchema.parse({ action: 'install' })),
  } : {}) });
  const body: unknown = await response.json();
  if (!response.ok) throw new Error(body && typeof body === 'object' && 'message' in body ? String(body.message) : 'FFmpeg 请求失败，请重试。');
  return omniFfmpegStatusSchema.parse(body);
}

export function FfmpegSettings() {
  useLocale();
  const [state, setState] = useState<OmniFfmpegStatus>();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [action, setAction] = useState({ attempt: 0, install: false });
  useEffect(() => {
    const abort = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = async (install: boolean) => {
      try {
        const next = await request(install, abort.signal);
        if (abort.signal.aborted) return;
        setState(next); setError(''); setBusy(false);
        timer = setTimeout(() => { void update(false); }, next.state === 'installing' ? 1000 : 5000);
      } catch (cause) {
        if (!abort.signal.aborted) { setError(cause instanceof Error ? cause.message : String(cause)); setBusy(false); }
      }
    };
    setBusy(true); setError(''); void update(action.install);
    return () => { abort.abort(); clearTimeout(timer); };
  }, [action]);
  const installing = state?.state === 'installing' && !error;
  const disabled = busy || installing;
  const progress = state?.totalBytes ? Math.min(100, Math.floor(state.downloadedBytes / state.totalBytes * 100)) : 0;
  const ready = state?.state === 'ready' && !error;
  const status = error || state?.state === 'error' ? tr('检测失败') : busy ? tr('检测中…') : installing ? tr('正在安装…') : ready ? tr('已就绪') : tr('未检测到');
  return <section className="media-sense__group media-sense__tools-section" data-media-sense-ffmpeg aria-busy={disabled}>
    <h3>{tr('媒体处理')}</h3>
    <div className="media-sense__tool-panel">
      <div className="media-sense__tool-row">
        <span className="media-sense__media-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 17h16"/><rect x="7" y="4" width="4" height="6" rx="1"/><rect x="14" y="14" width="4" height="6" rx="1"/></svg></span>
        <div className="media-sense__tool-copy"><div><strong>FFmpeg</strong><span className="media-sense__badge" data-ready={ready} role="status">{status}</span></div><p>{tr('音视频处理与媒体信息分析')}</p></div>
        <div className="media-sense__ffmpeg-actions">
          <Button size="sm" disabled={disabled} onClick={() => setAction(value => ({ attempt: value.attempt + 1, install: false }))}>{tr('重新检测')}</Button>
          {state?.canInstall && state.state !== 'ready' && <Button size="sm" variant="outline" disabled={disabled}
            onClick={() => setAction(value => ({ attempt: value.attempt + 1, install: true }))}>{installing ? tr('正在安装…') : state.state === 'error' ? tr('重试安装') : tr('一键安装')}</Button>}
          {(state?.ffmpeg || state?.ffprobe) && <button type="button" className="media-sense__details-toggle" aria-label={tr('版本与路径')} aria-expanded={expanded} aria-controls="media-sense-ffmpeg-details" onClick={() => setExpanded(value => !value)}><IconChevronDownOutlineRegular size={16}/></button>}
        </div>
      </div>
      {!ready && !installing && !busy && !error && !state?.message && <p className="media-sense__hint media-sense__tool-note">{tr('可在这里安装，也可在任务需要时自动安装。')}</p>}
      {expanded && (state?.ffmpeg || state?.ffprobe) && <div className="media-sense__ffmpeg-details" id="media-sense-ffmpeg-details">
        {(['ffmpeg', 'ffprobe'] as const).map(tool => <div key={tool}><div><strong>{tool === 'ffmpeg' ? 'FFmpeg' : 'FFprobe'}</strong><span>{state[tool] ? `${state[tool].version} · ${state[tool].source === 'system' ? tr('本机已有') : tr('Media Sense 已安装')}` : tr('未检测到')}</span></div>
          {state[tool] && <code>{state[tool].path}</code>}</div>)}
      </div>}
    {installing && <div className="media-sense__ffmpeg-progress" role="status"><span>{state?.totalBytes ? tr('正在下载安装… {percent}%', { percent: progress }) : tr('正在检查本机工具…')}</span>
      <progress max={100} value={progress} aria-label={tr('FFmpeg 安装进度')}/></div>}
    {(error || state?.message) && <p className="media-sense__warning" role="alert">{message(error || state?.message || '')}</p>}
    </div>
  </section>;
}
