import { useState } from 'react';
import { IconChevronDownOutlineRegular, Menu } from '@deepseek-ai/dsh-client-ui-primitives';
import type { OmniKind, OmniReasoningEffort, OmniReasoningPreference } from '../api/index.js';
import { tr, useLocale } from './i18n.ts';

// 思考强度沿用模型的英文档位名称，不随界面语言翻译。
const labels: Record<OmniReasoningPreference, string> = {
  default: 'Default', off: 'Off', minimal: 'Minimal', low: 'Low', medium: 'Medium', high: 'High', xhigh: 'XHigh', max: 'Max',
};

export function ReasoningPicker({ kind, value = 'default', efforts, disabled, onChange }: {
  kind: OmniKind; value?: OmniReasoningPreference; efforts: OmniReasoningEffort[]; disabled: boolean;
  onChange: (effort: OmniReasoningPreference) => void;
}) {
  useLocale();
  const [open, setOpen] = useState(false);
  const unavailable = value !== 'default' && !efforts.includes(value);
  return <div className="media-sense__reasoning">
    <span>Reasoning effort</span>
    <Menu open={open && !disabled} portal autoFocus className="media-sense__picker" listClassName="media-sense__menu"
      selectedId={value} onClose={() => setOpen(false)}
      onSelect={id => { onChange(id as OmniReasoningPreference); setOpen(false); }}
      items={(['default', ...efforts] as OmniReasoningPreference[]).map(id => ({ id, label: labels[id] }))}
      anchor={<button type="button" className="media-sense__select" aria-label={kind === 'audio' ? 'Audio reasoning effort' : 'Video reasoning effort'}
        aria-haspopup="menu" aria-expanded={open && !disabled} disabled={disabled || (!efforts.length && !unavailable)} onClick={() => setOpen(value => !value)}>
        <span>{labels[value]}</span><IconChevronDownOutlineRegular size={14}/>
      </button>} />
    {unavailable && <p className="media-sense__warning">{tr('所选模型不支持此思考强度，请在 Media Sense 设置中重新选择。')}</p>}
  </div>;
}
