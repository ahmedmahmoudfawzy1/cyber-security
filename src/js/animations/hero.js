import { $, $$, flightTo } from '../modules/dom.js';

const CIPHER = '01<>/\\{}[]#$%&*+=?';

/**
 * Load intro — "decrypt the signal": circuits draw in, the EraaSecurity
 * letters resolve from cipher glyphs. Runs once (not tied to breakpoints).
 */
export function heroIntro({ gsap, reduce }) {
  const hero = $('[data-hero]');
  if (!hero) return;
  const word = $('[data-hero-word]', hero);
  gsap.set(word, { opacity: 1 });
  if (reduce) return;

  const glyphs = $$('.hw-glyph', hero);
  const lines = $$('[data-circuit-line]', hero);
  const nodes = $$('[data-circuit-node]', hero);
  const copy = $$('.hero__copy, .hero__side', hero);
  const eyebrow = $('[data-hero-eyebrow]', hero);

  // Lock glyph widths so cipher characters never shift the layout.
  glyphs.forEach((g) => {
    g.dataset.text = g.textContent;
    g.style.width = `${g.offsetWidth}px`;
    g.style.textAlign = 'center';
  });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => glyphs.forEach((g) => g.style.removeProperty('width')),
  });

  tl.from(lines, { drawSVG: 0, duration: 1.8, stagger: 0.08, ease: 'power2.inOut' }, 0)
    .from(nodes, { scale: 0, opacity: 0, transformOrigin: '50% 50%', duration: 0.6, stagger: 0.07, ease: 'back.out(2.2)' }, 1)
    .from(glyphs, { yPercent: 45, opacity: 0, duration: 0.9, stagger: 0.045 }, 0.1);

  glyphs.forEach((g, i) => {
    tl.to(g, { duration: 1.2, scrambleText: { text: g.dataset.text, chars: CIPHER, revealDelay: 0.5, speed: 0.55 } }, 0.1 + i * 0.05);
  });

  if (eyebrow) {
    tl.to(eyebrow, { duration: 1.4, scrambleText: { text: eyebrow.textContent, chars: 'lowerCase', speed: 0.5 } }, 0.2);
  }
  tl.from(copy, { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, 0.85);
  return tl;
}

/**
 * Scroll behaviour.
 * Desktop: the hero pins; "Eraa" lifts away while each letter of "Security"
 * decrypts to uppercase and flies into its slot on the SECURITY rail.
 * Mobile / reduced motion: a light parallax, rail strip fades in after the hero.
 */
export function heroScroll({ gsap, ScrollTrigger, env }) {
  const hero = $('[data-hero]');
  const rail = $('[data-rail]');
  if (!hero || !rail) return;

  const word = $('[data-hero-word]', hero);
  const railLetters = $$('[data-rail-letter]', rail);

  if (!env.desktop || env.reduce) {
    if (!env.reduce) {
      gsap.to(word, {
        yPercent: -25,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom 35%',
      onEnter: () => rail.classList.add('is-visible'),
      onLeaveBack: () => rail.classList.remove('is-visible'),
    });
    return () => rail.classList.remove('is-visible');
  }

  const eraa = $$('[data-char="eraa"]', hero);
  const sec = $$('[data-char="sec"]', hero);
  const secGlyphs = sec.map((c) => $('.hw-glyph', c));
  const fading = $$('.hero__eyebrow, .hero__bottom, .hero__cue', hero);
  const bg = $('.hero__bg', hero);

  gsap.set(rail, { autoAlpha: 0 });
  gsap.set(railLetters, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(fading, { y: -60, autoAlpha: 0, duration: 0.25, stagger: 0.03, ease: 'power2.in' }, 0)
    .to(bg, { opacity: 0.3, scale: 1.1, duration: 1.1, ease: 'none' }, 0)
    .to(eraa, { yPercent: -130, rotationX: -80, transformPerspective: 800, autoAlpha: 0, duration: 0.35, stagger: 0.04, ease: 'power2.in' }, 0.05);

  sec.forEach((el, i) => {
    const at = 0.2 + i * 0.035;
    tl.to(
      el,
      {
        x: () => flightTo(el, hero, railLetters[i]).x,
        y: () => flightTo(el, hero, railLetters[i]).y,
        scale: () => flightTo(el, hero, railLetters[i]).scale,
        duration: 0.62,
        ease: 'power3.inOut',
      },
      at,
    );
    tl.to(
      secGlyphs[i],
      { duration: 0.3, scrambleText: { text: secGlyphs[i].textContent.toUpperCase(), chars: 'upperCase', speed: 1 } },
      at + 0.2,
    );
  });

  tl.to(rail, { autoAlpha: 1, duration: 0.15 }, 0.85)
    .set(railLetters, { opacity: 1 }, 1.06)
    .set(sec, { opacity: 0 }, 1.06)
    .to({}, { duration: 0.08 });

  return () => gsap.set([rail, ...railLetters], { clearProps: 'opacity,visibility' });
}
