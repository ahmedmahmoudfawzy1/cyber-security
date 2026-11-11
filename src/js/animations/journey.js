import { $, $$ } from '../modules/dom.js';

/**
 * Curriculum journey:
 *  - the outlined SECURITY word rises letter by letter,
 *  - each chapter's giant letter drifts (parallax) and decrypts when the
 *    chapter becomes active on the rail,
 *  - network "layers" slide in from the reading start edge,
 *  - Security+ objectives cascade when a domain tab is chosen.
 */
export function journey({ gsap, ScrollTrigger, env }) {
  const root = $('[data-journey]');
  if (!root) return;
  const cleanups = [];

  if (env.reduce) return;

  const wordChars = $$('.journey__word-char', root);
  gsap.from(wordChars, {
    yPercent: 110,
    opacity: 0,
    stagger: 0.07,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.journey__word', start: 'top 95%', end: 'top 50%', scrub: env.desktop ? 1 : 0.5 },
  });

  const drift = env.desktop ? 18 : 8;
  $$('[data-chapter]', root).forEach((chapter) => {
    const letter = $('[data-chapter-letter]', chapter);
    gsap.fromTo(
      letter,
      { yPercent: drift },
      { yPercent: -drift, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  // Decrypt the giant letter the first time its chapter becomes active.
  const decrypted = new Set();
  const onActive = ({ detail: { index, chapter } }) => {
    if (decrypted.has(index)) return;
    decrypted.add(index);
    const letter = $('[data-chapter-letter]', chapter);
    gsap.to(letter, { duration: 1.1, scrambleText: { text: letter.textContent, chars: '01#$%&<>/', speed: 0.45, revealDelay: 0.3 } });
  };
  document.addEventListener('chapter:active', onActive);
  cleanups.push(() => document.removeEventListener('chapter:active', onActive));

  const layers = $$('[data-layer]', root);
  if (layers.length) {
    const fromX = env.rtl ? 70 : -70;
    gsap.set(layers, { x: fromX, autoAlpha: 0 });
    ScrollTrigger.batch(layers, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { x: 0, autoAlpha: 1, stagger: 0.14, duration: 1, ease: 'power3.out' }),
    });
    cleanups.push(() => gsap.set(layers, { clearProps: 'transform,opacity,visibility' }));
  }

  const domains = $('.domains[data-tabs]', root);
  if (domains) {
    const onTab = ({ detail: { panel } }) => {
      gsap.fromTo(
        $$('[data-objective]', panel),
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out', overwrite: true },
      );
    };
    domains.addEventListener('tabs:change', onTab);
    cleanups.push(() => domains.removeEventListener('tabs:change', onTab));
  }

  return () => cleanups.forEach((fn) => fn());
}
