import { esc, icon, join, pad, sectionHead } from '../utils.mjs';

export function mission(t) {
  const m = t.mission;
  return `
  <section id="mission" class="section section--mission" aria-labelledby="mission-title">
    <div class="shell grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <div class="flex flex-col gap-5" data-reveal-group>
          <p class="eyebrow" data-reveal-item>${esc(m.eyebrow)}</p>
          <h2 id="mission-title" class="h-sub" data-reveal-item>${esc(m.title)}</h2>
        </div>
      </div>
      <div class="flex flex-col gap-10 lg:col-span-8">
        <p class="mission__lead" data-scrub-text>${esc(m.lead)}</p>
        <p class="mission__body" data-reveal>${esc(m.body)}</p>
        <ul class="pillars" data-reveal-group>
          ${join(
            m.pillars,
            (p, i) => `<li class="pillar" data-reveal-item><span class="pillar__n" dir="ltr">${pad(i + 1)}</span><span>${esc(p)}</span></li>`,
          )}
        </ul>
      </div>
    </div>
  </section>`;
}

export function audience(t) {
  const a = t.audience;
  return `
  <section id="audience" class="section" aria-labelledby="audience-title">
    <div class="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-7">
        ${sectionHead({ id: 'audience-title', eyebrow: a.eyebrow, title: a.title })}
        <ol class="audience-list" data-reveal-group>
          ${join(
            a.items,
            (item, i) => `
            <li class="audience-item" data-reveal-item>
              <span class="audience-item__n" dir="ltr">${pad(i + 1)}</span>
              <p>${esc(item)}</p>
            </li>`,
          )}
        </ol>
      </div>

      <div class="flex flex-col gap-6 lg:col-span-5 lg:pt-24">
        <article class="callout callout--gold" data-reveal aria-labelledby="beginner-title">
          <h3 id="beginner-title" class="callout__title">${esc(a.beginner.title)}</h3>
          <p>${esc(a.beginner.answer)}</p>
        </article>

        <article class="term-card" data-reveal aria-labelledby="prereq-title">
          <div class="term-card__bar" aria-hidden="true"><span></span><span></span><span></span><em dir="ltr">prerequisites.txt</em></div>
          <div class="term-card__body">
            <h3 id="prereq-title" class="callout__title">${esc(a.prereq.title)}</h3>
            <p class="text-sm text-muted">${esc(a.prereq.note)}</p>
            <h4 class="term-card__subtitle">${esc(a.prereq.subtitle)}</h4>
            <ul class="checklist">
              ${join(a.prereq.items, (p) => `<li>${icon('check', 'checklist__icon')}<span>${esc(p)}</span></li>`)}
            </ul>
            <p class="term-card__foot">${esc(a.prereq.footnote)}</p>
          </div>
        </article>
      </div>
    </div>
  </section>`;
}

export function outcomes(t) {
  const o = t.outcomes;
  return `
  <section id="outcomes" class="section" aria-labelledby="outcomes-title" data-outcomes>
    <div class="shell grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <div class="outcomes__aside" data-outcomes-aside>
          ${sectionHead({ id: 'outcomes-title', eyebrow: o.eyebrow, title: o.title, intro: o.intro })}
          <p class="outcomes__counter" aria-hidden="true" dir="ltr"><span data-outcomes-count>01</span><span class="text-muted">/${pad(o.items.length)}</span></p>
        </div>
      </div>
      <div class="outcomes__list lg:col-span-7" data-outcomes-list>
        <span class="outcomes__line" aria-hidden="true"><span class="outcomes__line-fill" data-outcomes-line></span></span>
        <ol class="flex flex-col">
        ${join(
          o.items,
          (item, i) => `
          <li class="outcome" data-outcome="${i}">
            <span class="outcome__node" aria-hidden="true"></span>
            <span class="outcome__n" dir="ltr">${pad(i + 1)}</span>
            <h3 class="outcome__title">${esc(item.title)}</h3>
            <p class="outcome__text">${esc(item.text)}</p>
          </li>`,
        )}
        </ol>
      </div>
    </div>
  </section>`;
}
