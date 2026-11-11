import { esc, icon, join } from '../utils.mjs';
import { brand } from '../../content/shared.mjs';

/** Circuit lines inspired by the EraaSoft mark (branches ending in gold nodes). */
const CIRCUITS = [
  { d: 'M0 150H90L150 210H240', node: [240, 210] },
  { d: 'M0 700H70L130 760H220', node: [220, 760] },
  { d: 'M0 870H300L340 830H460', node: [460, 830] },
  { d: 'M1440 130H1330L1270 190H1170', node: [1170, 190] },
  { d: 'M1440 700H1370L1310 760H1230', node: [1230, 760] },
  { d: 'M1440 880H1160L1120 840H990', node: [990, 840] },
  { d: 'M1010 0V40L1060 90V120', node: [1060, 120] },
  { d: 'M520 900V880L570 830V810', node: [570, 810] },
];

function circuits() {
  return `
  <svg class="hero__circuits" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g class="circuit-lines" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      ${join(CIRCUITS, (c) => `<path d="${c.d}" data-circuit-line/>`)}
    </g>
    <g class="circuit-nodes">
      ${join(
        CIRCUITS,
        (c) =>
          `<g data-circuit-node><circle cx="${c.node[0]}" cy="${c.node[1]}" r="14" class="node-ring"/><circle cx="${c.node[0]}" cy="${c.node[1]}" r="5.5" class="node-dot"/></g>`,
      )}
    </g>
  </svg>`;
}

function wordChars(text, part) {
  return [...text]
    .map(
      (ch, i) =>
        `<span class="hw-char" data-char="${part}"${part === 'sec' ? ` data-sec-index="${i}"` : ''}><span class="hw-glyph">${ch}</span></span>`,
    )
    .join('');
}

export function hero(t) {
  const h = t.hero;
  return `
  <section id="top" class="hero" data-hero aria-labelledby="hero-title">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__grid"></div>
      <div class="hero__glow"></div>
      ${circuits()}
    </div>

    <div class="hero__inner shell">
      <p class="eyebrow hero__eyebrow" data-hero-fade>
        <span class="status-dot" aria-hidden="true"></span>
        <span data-hero-eyebrow>${esc(h.eyebrow)}</span>
      </p>

      <div class="hero-word" aria-hidden="true" dir="ltr" data-hero-word>
        <span class="hero-word__eraa">${wordChars(brand.prefix, 'eraa')}</span><span class="hero-word__sec">${wordChars(brand.suffix, 'sec')}</span>
      </div>

      <div class="hero__bottom">
        <div class="hero__copy" data-hero-fade>
          <h1 id="hero-title" class="hero__title"><span class="sr-only">${esc(brand.word)} — </span>${esc(h.title)}</h1>
          <p class="hero__lead">${esc(h.lead)}</p>
        </div>
        <div class="hero__side" data-hero-fade>
          <ul class="hero__stats">
            ${join(
              h.stats,
              (s) => `<li><span class="hero__stat-value" dir="ltr">${esc(s.value)}</span><span class="hero__stat-label">${esc(s.label)}</span></li>`,
            )}
          </ul>
          <div class="flex flex-wrap gap-3">
            <a class="btn btn-primary" href="#journey">${esc(h.ctaPrimary)}${icon('arrowDown', 'h-5 w-5')}</a>
            <a class="btn btn-ghost" href="#contact">${esc(h.ctaSecondary)}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__cue" aria-hidden="true" data-hero-fade>
      <span class="hero__cue-line"></span>
      <span class="hero__cue-text">${esc(h.scroll)}</span>
    </div>
  </section>`;
}
