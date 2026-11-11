import { $$, requestRefresh } from './dom.js';

/**
 * Accessible tabs (WAI-ARIA Tabs pattern, automatic activation).
 * Dispatches a `tabs:change` event on the [data-tabs] container.
 */
export function initTabs() {
  $$('[data-tabs]').forEach((container) => {
    const tablist = container.querySelector('[data-tablist]');
    const tabs = $$('[data-tab]', tablist);
    const vertical = () => tablist.getAttribute('aria-orientation') === 'vertical' && window.matchMedia('(min-width: 1024px)').matches;

    function select(tab, { focus = false } = {}) {
      const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
      if (current === tab) return;
      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
      });
      if (focus) tab.focus();
      tab.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      container.dispatchEvent(new CustomEvent('tabs:change', { detail: { tab, panel } }));
      requestRefresh();
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (event) => {
        const i = tabs.indexOf(tab);
        const rtl = document.documentElement.dir === 'rtl';
        const keys = vertical()
          ? { next: 'ArrowDown', prev: 'ArrowUp' }
          : { next: rtl ? 'ArrowLeft' : 'ArrowRight', prev: rtl ? 'ArrowRight' : 'ArrowLeft' };
        let target = null;
        if (event.key === keys.next || (!vertical() && event.key === 'ArrowDown')) target = tabs[(i + 1) % tabs.length];
        if (event.key === keys.prev || (!vertical() && event.key === 'ArrowUp')) target = tabs[(i - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') target = tabs[0];
        if (event.key === 'End') target = tabs[tabs.length - 1];
        if (target) {
          event.preventDefault();
          select(target, { focus: true });
        }
      });
    });
  });

  // Tool chips in the curriculum ("Security+ Exam Q&A") open the matching tool.
  $$('[data-tool-link]').forEach((link) => {
    link.addEventListener('click', () => {
      document.getElementById(`tool-tab-${link.dataset.toolLink}`)?.click();
    });
  });
}
