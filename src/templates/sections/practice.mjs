import { esc, en, icon, join, pad, sectionHead } from '../utils.mjs';
import { tools, projects } from '../../content/shared.mjs';

export function toolkit(t) {
  const k = t.toolkit;
  return `
  <section id="toolkit" class="section section--toolkit" aria-labelledby="toolkit-title">
    <div class="shell flex flex-col gap-14">
      ${sectionHead({ id: 'toolkit-title', eyebrow: k.eyebrow, title: k.title, intro: k.intro })}
      <div class="toolkit" data-tabs data-toolkit>
        <div class="toolkit__list" role="tablist" aria-label="${esc(k.title)}" aria-orientation="vertical" data-tablist>
          ${join(
            tools,
            (tool, i) => `
            <button type="button" role="tab" class="tool-tab" id="tool-tab-${tool.id}" aria-controls="tool-panel-${tool.id}"
                    aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab data-tool="${tool.id}">
              <span class="tool-tab__n" dir="ltr">${pad(i + 1)}</span>
              <span class="tool-tab__name">${en(tool.name)}</span>
              <span class="tool-tab__cmd" dir="ltr" aria-hidden="true">$ ${tool.cmd}</span>
            </button>`,
          )}
        </div>
        <div class="terminal toolkit__terminal">
          <div class="terminal__bar" dir="ltr"><span class="editor__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="editor__file" aria-hidden="true">${esc(k.terminalTitle)}</span></div>
          <div class="terminal__body toolkit__screen">
            ${join(
              tools,
              (tool, i) => `
              <div role="tabpanel" class="tool-panel" id="tool-panel-${tool.id}" aria-labelledby="tool-tab-${tool.id}" tabindex="0" data-tabpanel ${i === 0 ? '' : 'hidden'}>
                <p class="terminal__line" dir="ltr" aria-hidden="true"><span class="text-gold">eraasecurity@lab</span><span class="text-muted">:~$</span> <span data-type-cmd>${tool.cmd}</span><span class="caret"></span></p>
                <h3 class="tool-panel__name" dir="ltr">${esc(tool.label)}</h3>
                <p class="tool-panel__desc" data-type-out>${esc(k.descriptions[tool.id])}</p>
                <span class="tool-panel__glyph" aria-hidden="true" dir="ltr">${esc(tool.name.split(' ')[0])}</span>
              </div>`,
            )}
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function labs(t) {
  const l = t.labs;
  return `
  <section id="labs" class="section section--labs" aria-labelledby="labs-title" data-labs>
    <div class="shell grid gap-10 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-7">${sectionHead({ id: 'labs-title', eyebrow: l.eyebrow, title: l.title, intro: l.intro })}</div>
      <aside class="rules lg:col-span-5" data-reveal aria-labelledby="rules-title">
        <h3 id="rules-title" class="rules__title">${icon('lock', 'h-5 w-5 shrink-0')}${esc(l.rulesTitle)}</h3>
        <p>${esc(l.rules)}</p>
      </aside>
    </div>

    <div class="labs__pin" data-labs-pin>
      <div class="labs__viewport" data-labs-viewport>
        <ol class="labs__track" data-labs-track>
          ${join(
            projects,
            (p, i) => `
            <li class="ticket" data-ticket>
              <div class="ticket__top">
                <span class="ticket__label" dir="ltr">${esc(l.labLabel)}</span>
                <span class="ticket__num" dir="ltr">${pad(p.n)}</span>
              </div>
              <p class="ticket__title">${esc(l.titles[i])}</p>
              ${p.tags.length ? `<ul class="ticket__tags" dir="ltr">${join(p.tags, (tag) => `<li>${esc(tag)}</li>`)}</ul>` : '<span></span>'}
            </li>`,
          )}
          <li class="ticket ticket--final" data-ticket>
            <div class="ticket__top">
              <span class="ticket__label" dir="ltr">${esc(l.finalLabel)}</span>
              <span class="ticket__num" dir="ltr">∞</span>
            </div>
            <p class="ticket__title">${esc(l.final)}</p>
            <ul class="ticket__tags" dir="ltr"><li>Python</li><li>Framework</li></ul>
          </li>
        </ol>
      </div>
      <div class="shell labs__progress" aria-hidden="true">
        <span class="labs__progress-text" dir="ltr"><span data-labs-count>01</span> / ${pad(projects.length + 1)}</span>
        <span class="labs__bar"><span class="labs__bar-fill" data-labs-bar></span></span>
        <span class="labs__hint">${esc(l.dragHint)}</span>
      </div>
    </div>
  </section>`;
}

export function careers(t) {
  const c = t.careers;
  return `
  <section id="careers" class="section" aria-labelledby="careers-title">
    <div class="shell flex flex-col gap-14">
      ${sectionHead({ id: 'careers-title', eyebrow: c.eyebrow, title: c.title, intro: c.note })}
      <ol class="careers" data-reveal-group>
        ${join(
          c.items,
          (item, i) => `
          <li class="career" data-reveal-item>
            <span class="career__n" dir="ltr">${pad(i + 1)}</span>
            <div class="career__head">
              <h3 class="career__title">${en(item.title)}</h3>
              ${item.tag ? `<span class="meta-pill">${esc(item.tag)}</span>` : ''}
            </div>
            <p class="career__text">${esc(item.text)}</p>
          </li>`,
        )}
      </ol>

      <div class="grid gap-6 lg:grid-cols-12">
        <article class="limits lg:col-span-7" data-reveal aria-labelledby="limits-title">
          <h3 id="limits-title" class="callout__title">${icon('alert', 'h-5 w-5 shrink-0 text-gold')}${esc(c.limitsTitle)}</h3>
          <ul class="limits__list">${join(c.limits, (x) => `<li>${esc(x)}</li>`)}</ul>
        </article>
        <blockquote class="outcome-quote lg:col-span-5" data-reveal>
          <p>${esc(c.outcome)}</p>
        </blockquote>
      </div>
    </div>
  </section>`;
}
