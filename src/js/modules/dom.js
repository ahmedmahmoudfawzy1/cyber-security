/** Tiny DOM + environment helpers shared by all modules. */
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export const isRTL = () => document.documentElement.dir === 'rtl';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** GSAP globals (UMD builds loaded with defer before this module). */
export function getGsap() {
  const { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, ScrambleTextPlugin } = window;
  if (!gsap || !ScrollTrigger) return null;
  return { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, ScrambleTextPlugin };
}

/** Shared runtime state (e.g. the active ScrollSmoother instance). */
export const state = {
  smoother: null,
};

/**
 * Layout offset of `el` inside `ancestor` (transform-independent: uses offsetLeft/Top).
 * Used to compute letter flight paths that stay correct after refresh/resize.
 */
export function offsetWithin(el, ancestor) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y };
}

/**
 * Translation + scale that moves `el` (laid out inside a section pinned at the
 * viewport top) onto a fixed-position `target` element.
 */
export function flightTo(el, section, target) {
  const rect = target.getBoundingClientRect();
  const { x, y } = offsetWithin(el, section);
  const scale = parseFloat(getComputedStyle(target).fontSize) / parseFloat(getComputedStyle(el).fontSize);
  return {
    x: rect.left + rect.width / 2 - (x + el.offsetWidth / 2),
    y: rect.top + rect.height / 2 - (y + el.offsetHeight / 2),
    scale,
  };
}

/** Debounce helper. */
export function debounce(fn, wait = 150) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), wait);
  };
}

/** Ask ScrollTrigger to recalculate after layout changes (tabs, accordions…). */
export const requestRefresh = debounce(() => {
  window.ScrollTrigger?.refresh();
}, 120);
