/**
 * EraaSecurity — entry point.
 * UI behaviour (menu, tabs, FAQ, anchors) works without GSAP;
 * motion is layered on top when GSAP is available.
 */
import { initHeader, initMenu, initAnchors, initLangSwitch, scrollToTarget } from './modules/navigation.js';
import { initTabs } from './modules/tabs.js';
import { initFaq } from './modules/faq.js';
import { initMotion } from './animations/index.js';

function fontsReady(timeout = 2500) {
  if (!document.fonts?.ready) return Promise.resolve();
  return Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, timeout))]);
}

function boot() {
  initHeader();
  initMenu();
  initAnchors();
  initLangSwitch();
  initTabs();
  initFaq();

  const motion = initMotion();
  if (!motion) {
    document.querySelector('[data-rail]')?.classList.add('is-visible');
    return;
  }

  fontsReady().then(() => {
    motion.ScrollTrigger.refresh();
    motion.startIntro();
    // Deep links (#section) must land correctly once pins have been measured.
    if (location.hash.length > 1) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(() => scrollToTarget(target, { focus: false }));
    }
  });
}

boot();
