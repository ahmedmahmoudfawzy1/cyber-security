import { $, $$ } from '../modules/dom.js';

/**
 * The SECURITY rail tracks the curriculum: the active chapter's letter lights
 * gold, completed letters stay lit, and a circuit line fills with progress.
 * Works in every mode (including reduced motion — it is navigation, not decoration).
 */
export function initRail({ ScrollTrigger }) {
  const rail = $('[data-rail]');
  const journey = $('[data-journey]');
  if (!rail || !journey) return;

  const items = $$('[data-rail-item]', rail);
  const progress = $('[data-rail-progress]', rail);
  const chapters = $$('[data-chapter]', journey);
  let active = -1;

  function setActive(index) {
    if (index === active) return;
    active = index;
    items.forEach((item, i) => {
      item.classList.toggle('is-active', i === index);
      item.classList.toggle('is-done', i < index);
      if (i === index) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    chapters.forEach((chapter, i) => chapter.classList.toggle('is-active', i === index));
    if (index >= 0 && index < chapters.length) {
      document.dispatchEvent(new CustomEvent('chapter:active', { detail: { index, chapter: chapters[index] } }));
    }
  }

  chapters.forEach((chapter, i) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) setActive(i);
        else if (active === i) setActive(self.direction > 0 ? (i === chapters.length - 1 ? chapters.length : i + 1) : i - 1);
      },
    });
  });

  ScrollTrigger.create({
    trigger: journey,
    start: 'top 55%',
    end: 'bottom 55%',
    onUpdate: (self) => progress?.style.setProperty('--p', self.progress.toFixed(4)),
    onLeave: () => progress?.style.setProperty('--p', '1'),
    onLeaveBack: () => progress?.style.setProperty('--p', '0'),
  });

  // The rail belongs to the curriculum: step aside once the journey ends
  // (the letters return in the finale, re-assembling the word).
  ScrollTrigger.create({
    trigger: journey,
    start: 'bottom 45%',
    onEnter: () => rail.classList.add('is-away'),
    onLeaveBack: () => rail.classList.remove('is-away'),
  });

  return () => {
    rail.classList.remove('is-away');
    setActive(-1);
  };
}
