import { tr, useLocale, message, localeTag } from './i18n.ts';
import { useEffect, useState } from 'react';
import { Button, IconCheckOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { mediaSenseSettingsResponseSchema, mediaSenseSettingsWriteSchema, mediaSenseModelSummary, omniMediaLimitMB, OMNI_DEFAULT_MEDIA_MB, OMNI_MAX_MEDIA_BYTES, type OmniPreferences, type MediaSenseSettingsResponse } from '../api/index.js';
import { ModelPicker } from './ModelPicker.tsx';
import { ReasoningPicker } from './ReasoningPicker.tsx';
import { FfmpegSettings } from './FfmpegSettings.tsx';
import { LocalModels, type LocalDraft } from './LocalModels.tsx';

type Source = 'local' | 'host';
type Preferences = Record<Source, OmniPreferences>;
const empty = (): Preferences => ({ local: { audioModelId: '', videoModelId: '' }, host: { audioModelId: '', videoModelId: '' } });
async function request(input?: unknown, signal?: AbortSignal): Promise<MediaSenseSettingsResponse> {
  const response = await fetch('/media-sense/settings', {
    ...(input ? { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) } : {}), ...(signal ? { signal } : {}),
  });
  const body: unknown = await response.json();
  if (!response.ok) throw new Error(body && typeof body === 'object' && 'message' in body ? String(body.message) : tr('Media Sense 设置暂时不可用'));
  return mediaSenseSettingsResponseSchema.parse(body);
}

export function OmniSettings() {
  useLocale();
  const [state, setState] = useState<MediaSenseSettingsResponse>();
  const [source, setSource] = useState<Source>('local');
  const [preferences, setPreferences] = useState<Preferences>(empty);
  const [localModels, setLocalModels] = useState<LocalDraft[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const accept = (value: MediaSenseSettingsResponse) => {
    setState(value); setSource(value.source); setPreferences(value.preferencesBySource); setLocalModels(value.localModels);
  };
  useEffect(() => {
    const abort = new AbortController();
    setLoading(true); setError(''); setSaved(false);
    void request(undefined, abort.signal).then(value => { if (!abort.signal.aborted) accept(value); })
      .catch(cause => { if (!abort.signal.aborted) setError(String(cause.message ?? cause)); })
      .finally(() => { if (!abort.signal.aborted) setLoading(false); });
    return () => abort.abort();
  }, [attempt]);
  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);
  const save = async () => {
    setBusy(true); setError(''); setSaved(false);
    try {
      const input = mediaSenseSettingsWriteSchema.parse({ source, preferences: preferences[source],
        preferencesBySource: preferences,
        localModels: localModels.map(({ hasApiKey: _hasApiKey, ...model }) => model) });
      accept(await request(input)); setSaved(true);
    } catch (cause) {
      setError(cause && typeof cause === 'object' && 'issues' in cause ? tr('请检查模型名称、模型 ID、接口地址和输入能力。') : cause instanceof Error ? cause.message : String(cause));
    } finally { setBusy(false); }
  };
  const disabled = loading || busy || !state;
  const changed = !!state && (source !== state.source || JSON.stringify(preferences) !== JSON.stringify(state.preferencesBySource) || JSON.stringify(localModels) !== JSON.stringify(state.localModels));
  const limitsValid = Object.values(preferences).every(value =>
    [value.modelMaxMediaMB, value.audioModelMaxMediaMB, value.videoModelMaxMediaMB].every(limits =>
      Object.values(limits ?? {}).every(limit => Number.isInteger(limit) && limit >= 1 && limit <= OMNI_MAX_MEDIA_BYTES / 1_000_000)));
  const models = source === 'local' ? localModels.map(mediaSenseModelSummary) : state?.hostModels ?? [];
  const sources: Source[] = state?.hostSource || source === 'host' ? ['local', 'host'] : ['local'];
  const hostLabel = state?.hostSource?.label[localeTag() === 'zh-CN' ? 'zh' : 'en'] ?? tr('外部模型');
  const change = () => { setSaved(false); setError(''); };
  const updateModels = (next: LocalDraft[]) => {
    setLocalModels(next); change();
    setPreferences(previous => {
      const local = { ...previous.local };
      for (const field of ['modelMaxMediaMB', 'audioModelMaxMediaMB', 'videoModelMaxMediaMB'] as const) {
        if (local[field]) local[field] = Object.fromEntries(Object.entries(local[field]).filter(([id]) => next.some(model => model.id === id)));
      }
      for (const kind of ['audio', 'video'] as const) {
        const field = kind === 'audio' ? 'audioModelId' : 'videoModelId';
        const effort = kind === 'audio' ? 'audioReasoningEffort' : 'videoReasoningEffort';
        const before = localModels.find(model => model.id === local[field]);
        const after = next.find(model => model.id === local[field]);
        if (before && (!after || !after[kind])) { local[field] = ''; local[effort] = 'default'; }
        else if (before && after && (before.modelId !== after.modelId || before.adapter !== after.adapter)) local[effort] = 'default';
      }
      return { ...previous, local };
    });
  };
  return <section className="media-sense" data-media-sense-settings aria-busy={loading || busy}>
    <header className="media-sense__header"><h2>Media Sense</h2><p>{tr('音视频理解与媒体工具')}</p></header>
    <FfmpegSettings/>
    {error && <div className="media-sense__notice media-sense__error" role="alert"><span>{message(error)}</span>{!state && <Button size="sm" variant="outline" disabled={loading} onClick={() => setAttempt(value => value + 1)}>{tr('重试')}</Button>}</div>}
    <section className="media-sense__group">
      <div className="media-sense__source-row"><h3>{tr('模型来源')}</h3><div className="media-sense__sources" role="radiogroup" aria-label={tr('模型来源')}>
        {sources.map(value => <button type="button" key={value} role="radio" aria-checked={source === value} disabled={disabled || value === 'host' && !state?.hostSource?.available}
          onClick={() => { setSource(value); change(); }}>{value === 'local' ? tr('自配模型') : hostLabel}</button>)}
      </div></div>
      {source === 'host' && state?.hostMessage && <div className="media-sense__notice" role="status"><span>{message(state.hostMessage)}</span><Button size="sm" variant="outline" disabled={loading || changed} onClick={() => setAttempt(value => value + 1)}>{tr('重新加载')}</Button></div>}
      <div className="media-sense__models">{(['audio', 'video'] as const).map(kind => {
        const field = kind === 'audio' ? 'audioModelId' : 'videoModelId';
        const effortField = kind === 'audio' ? 'audioReasoningEffort' : 'videoReasoningEffort';
        const limitField = kind === 'audio' ? 'audioModelMaxMediaMB' : 'videoModelMaxMediaMB';
        const candidates = models.filter(model => model[kind]);
        const selected = preferences[source][field] ? candidates.find(model => model.id === preferences[source][field]) : candidates[0];
        const limit = omniMediaLimitMB(preferences[source], selected?.id ?? '', kind);
        const limitValid = Number.isInteger(limit) && limit >= 1 && limit <= OMNI_MAX_MEDIA_BYTES / 1_000_000;
        return <ModelPicker key={kind} kind={kind} value={preferences[source][field]} models={candidates} disabled={disabled} loading={loading}
          onChange={value => { setPreferences(previous => ({ ...previous, [source]: { ...previous[source], [field]: value, [effortField]: 'default' } })); change(); }}>
          <ReasoningPicker kind={kind} value={preferences[source][effortField] ?? 'default'} efforts={selected?.reasoningEfforts ?? []} disabled={disabled || !selected}
            onChange={value => { setPreferences(previous => ({ ...previous, [source]: { ...previous[source], [effortField]: value } })); change(); }}/>
          <label className="media-sense__upload-limit"><span>{tr('上传上限')}</span><span className="media-sense__number"><input type="number" inputMode="numeric" min={1} max={OMNI_MAX_MEDIA_BYTES / 1_000_000} step={1}
            aria-label={kind === 'audio' ? tr('音频模型上传上限') : tr('视频模型上传上限')} aria-invalid={!limitValid}
            disabled={disabled || !selected} value={Number.isFinite(limit) ? limit : ''} onChange={event => {
              if (!selected) return;
              const value = event.target.valueAsNumber;
              setPreferences(previous => ({ ...previous, [source]: { ...previous[source], [limitField]: { ...previous[source][limitField], [selected.id]: value } } })); change();
            }}/><span>MB</span></span></label>
          {!limitValid && <p className="media-sense__warning">{tr('请输入 1–2000 的整数。')}</p>}
        </ModelPicker>;
      })}</div>
      <p className="media-sense__hint">{tr('默认 {size} MB，音频和视频分别设置；包含视频时，按视频上限计算全部附件。', { size: OMNI_DEFAULT_MEDIA_MB })}<br/>{tr('同时受模型的格式、时长与接口额度限制。')}</p>
    </section>
    {source === 'local' && <LocalModels models={localModels} disabled={disabled} onChange={updateModels}/>}
    <footer className="media-sense__footer">
      <span className="media-sense__status" role="status" data-pending={changed}>{saved ? <><IconCheckOutlineRegular size={14}/>{tr('已保存')}</> : changed ? tr('有未保存的更改') : null}</span>
      {changed && <Button disabled={busy || loading} onClick={() => { if (state) accept(state); change(); }}>{tr('撤销更改')}</Button>}
      <Button size="sm" variant="primary" onClick={() => { void save(); }} disabled={disabled || !changed || !limitsValid}>{busy ? tr('正在保存…') : tr('保存更改')}</Button>
    </footer>
  </section>;
}
