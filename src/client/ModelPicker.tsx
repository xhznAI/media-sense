import { tr, useLocale } from './i18n.ts';
import { useId, useState, type ReactNode } from 'react';
import { IconChevronDownOutlineRegular, Menu } from '@deepseek-ai/dsh-client-ui-primitives';
import type { OmniKind, OmniSettingsResponse } from '../api/index.js';

export function MediaIcon({ kind }: { kind: OmniKind }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'audio' ? <path d="M3 9v6M7.5 5v14M12 3v18M16.5 7v10M21 9v6"/> : <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 8 6 4-6 4V8Z"/></>}
  </svg>;
}

type Model = OmniSettingsResponse['models'][number];
const nameOf = (model: Model) => model.name.trim() || model.id;

/** 复用客户端菜单的焦点、键盘和弹层定位，模型名称与重复的 ID 不再拼接。 */
export function ModelPicker({ kind, models, value, disabled, loading, onChange, children }: {
  kind: OmniKind; models: Model[]; value: string; disabled: boolean; loading: boolean; onChange: (id: string) => void; children?: ReactNode;
}) {
  useLocale();
  const [open, setOpen] = useState(false);
  const id = useId(), label = kind === 'audio' ? tr("音频模型") : tr("视频模型");
  const model = models.find(model => model.id === value), missing = !!value && !model;
  const display = model ? nameOf(model) : missing ? value : loading ? tr("正在读取模型…") : models.length ? tr("自动选择（列表第一项）") : tr("暂无可用模型");
  return <div className="media-sense__model-row" data-omni-kind={kind}>
    <div className="media-sense__card-header">
      <span className="media-sense__media-icon"><MediaIcon kind={kind}/></span>
      <div><h3 id={`${id}-label`}>{label}</h3><p>{kind === 'audio' ? tr("语音转写与音频内容理解") : tr("画面分析与视频片段理解")}</p></div>
    </div>
    <div className="media-sense__model-controls"><Menu open={open && !disabled} portal autoFocus className="media-sense__picker" listClassName="media-sense__menu"
      selectedId={value} onClose={() => setOpen(false)} onSelect={id => { onChange(id); setOpen(false); }}
      items={models.map(model => ({ id: model.id, label: <span className="media-sense__option" title={model.id}>
        <span>{nameOf(model)}</span>{models.some(other => other.id !== model.id && nameOf(other) === nameOf(model)) && <small>{model.id}</small>}
      </span> }))}
      footer={[{ id: '', label: tr("自动选择（列表第一项）") }]}
      anchor={<button type="button" className="media-sense__select" aria-labelledby={`${id}-label ${id}-value`} aria-label={label}
        aria-haspopup="menu" aria-expanded={open && !disabled} aria-describedby={missing ? `${id}-missing` : undefined}
        disabled={disabled || (!models.length && !value)} onClick={() => setOpen(value => !value)} title={display}>
        <span id={`${id}-value`} data-placeholder={!value}>{display}</span><IconChevronDownOutlineRegular size={14}/>
      </button>}/>
    {missing && !loading && <p id={`${id}-missing`} className="media-sense__warning">{tr("已选模型不可用，请重新选择。")}</p>}
    <div className="media-sense__parameters">{children}</div>
    </div>
  </div>;
}
