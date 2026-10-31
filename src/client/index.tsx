import { installLocale } from './i18n.ts';
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client';
import type {} from '@deepseek-ai/dsh-client-ui-settings/client';
import { OmniSettings } from './OmniSettings.tsx';
import { OMNI_STYLES } from './styles.ts';

export const inject = ['locale', 'slots'];
export function apply(ctx: Context): void {
  installLocale(ctx);
  ctx.effect(() => {
    const style = document.createElement('style'); style.dataset.plugin = '@nex-assistant/media-sense'; style.textContent = OMNI_STYLES; document.head.append(style);
    return () => style.remove();
  }, 'media-sense: settings styles');
  ctx.slots.inject('settings.section', () => ctx.slots.register(
    { name: 'settings.section', id: 'media-sense', order: 19, label: 'Media Sense' }, OmniSettings,
  ));
}
