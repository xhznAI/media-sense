import { Button } from '@deepseek-ai/dsh-client-ui-primitives';
import { useState } from 'react';
import type { MediaSenseSettingsWrite } from '../api/index.js';
import { tr } from './i18n.ts';

export type LocalDraft = MediaSenseSettingsWrite['localModels'][number] & { hasApiKey?: boolean };

export function LocalModels({ models, disabled, onChange }: { models: LocalDraft[]; disabled: boolean; onChange: (models: LocalDraft[]) => void }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const update = (id: string, patch: Partial<LocalDraft>) => onChange(models.map(model => model.id === id ? { ...model, ...patch } : model));
  return <section className="media-sense__group" aria-label={tr('自配模型')}>
    <div className="media-sense__group-heading"><h3>{tr('自配模型')}</h3><Button size="sm" variant="outline" disabled={disabled || models.length >= 50}
      onClick={() => { const id = crypto.randomUUID(); setExpanded(previous => [...previous, id]); onChange([...models, { id, name: '', modelId: '', baseUrl: '', adapter: 'google-generative-ai', audio: true, video: true }]); }}>{tr('添加模型')}</Button></div>
    {!models.length && <p className="media-sense__empty">{tr('添加支持音频或视频理解的模型。')}</p>}
    <div className="media-sense__model-list">{models.map(model => <details className="media-sense__editor" key={model.id} open={expanded.includes(model.id)} onToggle={event => {
      const open = event.currentTarget.open;
      setExpanded(previous => open ? previous.includes(model.id) ? previous : [...previous, model.id] : previous.filter(id => id !== model.id));
    }}>
      <summary><span>{model.name || model.modelId || tr('新模型')}</span><small>{model.modelId || tr('填写接口与模型信息')}</small></summary>
      <fieldset disabled={disabled}>
        <div className="media-sense__fields">
          <label>{tr('显示名称')}<input value={model.name} maxLength={100} onChange={event => update(model.id, { name: event.target.value })}/></label>
          <label>{tr('模型 ID')}<input value={model.modelId} maxLength={300} placeholder="gemini-2.5-flash" onChange={event => update(model.id, { modelId: event.target.value })}/></label>
          <label>{tr('接口格式')}<select value={model.adapter} onChange={event => {
            const adapter = event.target.value as LocalDraft['adapter']; update(model.id, { adapter,
              ...(adapter === 'openai-completions' ? { video: false, audio: true } : ['kimi-video', 'glm-video'].includes(adapter) ? { video: true, audio: false } : {}) });
          }}>
            <option value="google-generative-ai">Google Gemini</option><option value="openai-completions">OpenAI Chat Completions</option>
            <option value="qwen-omni">Qwen Omni</option><option value="mimo-omni">MiMo Omni</option>
            <option value="kimi-video">Kimi Video</option><option value="glm-video">GLM Video</option>
          </select></label>
          <label>{tr('接口地址')}<input type="url" value={model.baseUrl} placeholder={model.adapter === 'google-generative-ai' ? 'https://generativelanguage.googleapis.com' : 'https://api.example.com/v1'}
            onChange={event => update(model.id, { baseUrl: event.target.value })}/></label>
          <label className="media-sense__wide">API Key<input type="password" autoComplete="new-password" value={model.apiKey ?? ''}
            placeholder={model.hasApiKey && model.apiKey === undefined ? tr('已保存，留空保持不变') : tr('无需认证的本地服务可留空')}
            onChange={event => update(model.id, { apiKey: event.target.value || undefined })}/></label>
        </div>
        <div className="media-sense__capabilities"><span>{tr('输入能力')}</span>
          <label><input type="checkbox" checked={model.audio} disabled={disabled || ['kimi-video', 'glm-video'].includes(model.adapter)} onChange={event => update(model.id, { audio: event.target.checked })}/>{tr('音频')}</label>
          <label><input type="checkbox" checked={model.video} disabled={disabled || model.adapter === 'openai-completions'} onChange={event => update(model.id, { video: event.target.checked })}/>{tr('视频')}</label>
        </div>
        <p className="media-sense__hint">{tr('请按模型实际支持的能力选择；接口格式决定可发送的音视频格式。')}</p>
        <div className="media-sense__editor-actions">
          {model.hasApiKey && <Button size="sm" disabled={disabled || model.apiKey === ''} onClick={() => update(model.id, { apiKey: '' })}>{model.apiKey === '' ? tr('保存后清除密钥') : tr('清除密钥')}</Button>}
          <Button size="sm" disabled={disabled} onClick={() => onChange(models.filter(item => item.id !== model.id))}>{tr('移除模型')}</Button>
        </div>
      </fieldset>
    </details>)}</div>
  </section>;
}
