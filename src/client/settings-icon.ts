const NAVIGATION = '[role="dialog"][aria-modal="true"] nav';
const ATTRIBUTE = 'data-media-sense-nav-icon';
const ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="3" width="13" height="10" rx="2"/><path d="M5 7v2M8 5.5v5M11 6.5v3"/></g></svg>';

/** 设置导航暂不接收自定义图标；只标记本插件的导航项并沿用原生文字与交互。 */
export function installSettingsIcon(): () => void {
  const style = document.createElement('style');
  style.dataset.mediaSenseNavIcon = '';
  const mask = `url("data:image/svg+xml,${encodeURIComponent(ICON)}") center/16px 16px no-repeat`;
  style.textContent = `
    button[${ATTRIBUTE}]>svg{display:none}
    button[${ATTRIBUTE}]::before{content:"";display:block;flex:0 0 16px;width:16px;height:16px;background:currentColor;mask:${mask};-webkit-mask:${mask}}
  `;
  document.head.append(style);

  const navigations = new Map<Element, MutationObserver>();
  const mark = (navigation: Element) => {
    for (const button of navigation.querySelectorAll<HTMLButtonElement>('button')) {
      if (button.querySelector(':scope > span')?.textContent?.trim() === 'Media Sense') button.setAttribute(ATTRIBUTE, '');
      else button.removeAttribute(ATTRIBUTE);
    }
  };
  const discover = (root: ParentNode) => {
    const targets = [...root.querySelectorAll(NAVIGATION)];
    if (root instanceof Element && root.matches(NAVIGATION)) targets.push(root);
    for (const target of targets) {
      if (navigations.has(target)) continue;
      mark(target);
      const observer = new MutationObserver(() => mark(target));
      observer.observe(target, { childList: true, subtree: true, characterData: true });
      navigations.set(target, observer);
    }
  };
  const observer = new MutationObserver(records => {
    for (const record of records) {
      const target = record.target instanceof Element ? record.target : record.target.parentElement;
      if (target?.closest(`${NAVIGATION},[data-chat-flow]`)) continue;
      for (const node of record.addedNodes) if (node instanceof Element) discover(node);
    }
    for (const [target, navigation] of navigations) if (!target.isConnected) { navigation.disconnect(); navigations.delete(target); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  discover(document);

  return () => {
    observer.disconnect(); style.remove();
    for (const navigation of navigations.values()) navigation.disconnect();
    for (const button of document.querySelectorAll(`[${ATTRIBUTE}]`)) button.removeAttribute(ATTRIBUTE);
  };
}
