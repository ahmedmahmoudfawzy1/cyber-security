import { $, $$ } from '../modules/dom.js';

/** Mission statement: words light up as the reader scrolls through them. */
export function missionText({ gsap, SplitText, env }) {
  const el = $('[data-scrub-text]');
  if (!el || env.reduce || !SplitText) return;
  // Inline spans keep the Unicode bidi order intact for mixed Arabic/English text.
  const split = SplitText.create(el, { type: 'words', tag: 'span', wordsClass: 'scrub-word' });
  gsap.fromTo(
    split.words,
    { opacity: 0.14 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
    },
  );
  return () => split.revert();
}

/** Generic reveals — a single ScrollTrigger.batch for the whole page. */
export function reveals({ gsap, ScrollTrigger, env }) {
  if (env.reduce) return;
  const items = [...$$('[data-reveal]'), ...$$('[data-reveal-group] [data-reveal-item]')];
  if (!items.length) return;
  const distance = env.desktop ? 48 : 26;
  gsap.set(items, { autoAlpha: 0, y: distance });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: env.desktop ? 1 : 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      }),
  });
  return () => gsap.set(items, { clearProps: 'opacity,visibility,transform' });
}

/** "What you'll learn": a circuit line fills, nodes light up, the counter follows. */
export function outcomes({ gsap, ScrollTrigger, env }) {
  const section = $('[data-outcomes]');
  if (!section) return;
  const list = $('[data-outcomes-list]', section);
  const line = $('[data-outcomes-line]', section);
  const items = $$('[data-outcome]', section);
  const count = $('[data-outcomes-count]', section);
  const aside = $('[data-outcomes-aside]', section);

  const light = (n) => {
    items.forEach((item, i) => item.classList.toggle('is-lit', i < n));
    if (count) count.textContent = String(Math.max(1, n)).padStart(2, '0');
  };

  if (env.reduce) {
    light(items.length);
    return () => light(0);
  }

  let thresholds = [];
  const measure = () => {
    const h = list.offsetHeight || 1;
    thresholds = items.map((item) => (item.offsetTop + 36) / h);
  };
  measure();

  gsap.fromTo(
    line,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: list,
        start: 'top 62%',
        end: 'bottom 62%',
        scrub: 0.6,
        onRefresh: measure,
        onUpdate: (self) => light(thresholds.filter((t) => t <= self.progress + 0.001).length),
      },
    },
  );

  if (env.desktop && aside) {
    const offset = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 5) * 16 + 48;
    ScrollTrigger.create({
      trigger: aside,
      start: () => `top ${offset()}px`,
      endTrigger: list,
      end: () => `bottom ${offset() + aside.offsetHeight}px`,
      pin: aside,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
  }
  return () => light(0);
}

/** Certification share meters fill once in view. */
export function meters({ gsap, ScrollTrigger, env }) {
  const fills = $$('[data-meter]');
  if (!fills.length || env.reduce) return;
  gsap.set(fills, { scaleX: 0 });
  ScrollTrigger.batch(fills, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      batch.forEach((el, i) =>
        gsap.to(el, { scaleX: parseFloat(el.style.getPropertyValue('--p')) || 1, duration: 1.4, delay: i * 0.12, ease: 'power3.out' }),
      ),
  });
  return () => gsap.set(fills, { clearProps: 'transform' });
}
