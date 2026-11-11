import { $, $$, state, prefersReducedMotion } from './dom.js';

/** Header background once the page is scrolled. */
export function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/** Full-screen mobile menu with focus management and Escape support. */
export function initMenu() {
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  if (!toggle || !menu) return;
  const closeBtn = $('[data-menu-close]', menu);

  const focusables = () => $$('a, button', menu).filter((el) => !el.hasAttribute('disabled'));

  function open() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    state.smoother?.paused(true);
    const gsap = window.gsap;
    if (gsap && !prefersReducedMotion()) {
      gsap.fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo($$('.mobile-link', menu), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.05 });
    }
    focusables()[1]?.focus();
  }

  function close({ restoreFocus = true } = {}) {
    if (menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    state.smoother?.paused(false);
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', open);
  closeBtn?.addEventListener('click', () => close());
  $$('[data-menu-link]', menu).forEach((link) => link.addEventListener('click', () => close({ restoreFocus: false })));

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab') return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && close({ restoreFocus: false }));
}

/**
 * In-page anchors: works with ScrollSmoother (desktop) and native smooth scroll.
 * Moves focus to the target for keyboard and screen-reader users.
 */
export function initAnchors() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.pushState(null, '', hash);
  });
}

export function scrollToTarget(target, { focus = true } = {}) {
  const smoother = state.smoother;
  // Pinned scenes (e.g. the finale) should be entered at their resolved end state.
  const sceneEnd = target.dataset.scrollEnd && window.ScrollTrigger?.getById(target.dataset.scrollEnd);
  if (sceneEnd) {
    if (smoother) smoother.scrollTo(sceneEnd.end, true);
    else window.scrollTo({ top: sceneEnd.end, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  } else if (smoother) {
    const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 || 80;
    smoother.scrollTo(target, true, `top ${offset + 16}px`);
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
  if (focus) {
    if (!target.matches('a, button, input, [tabindex]')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}

/** Language switch keeps the current section (ids are identical on both pages). */
export function initLangSwitch() {
  $$('[data-lang-switch]').forEach((link) => {
    link.addEventListener('click', () => {
      if (location.hash) link.setAttribute('href', link.getAttribute('href').split('#')[0] + location.hash);
    });
  });
}
