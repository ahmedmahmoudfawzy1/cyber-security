import { esc, en, icon, join, pad, sectionHead } from '../utils.mjs';
import { curriculum, tools, countTopics } from '../../content/shared.mjs';

function sectionTopicCount(s) {
  if (s.groups) return s.groups.reduce((n, g) => n + g.items.length, 0);
  if (s.parts) return s.parts.reduce((n, p) => n + p.groups.reduce((a, g) => a + g.items.length, 0), 0);
  if (s.libraries) return s.libraries.length + s.projects.length;
  if (s.tracks) return s.tracks.length;
  if (s.layout === 'tools') return tools.length;
  return 0;
}

function certBadge(t, cert) {
  if (!cert) return '';
  return `<p class="cert-badge">${icon('cert', 'h-4 w-4 shrink-0')}<span>${esc(t.journey.cert[cert.key](cert.percent))}</span></p>`;
}

/* ---------- layouts ---------- */

function layoutList(s) {
  const items = s.groups[0].items;
  return `
    <ol class="topic-grid" data-reveal-group>
      ${join(
        items,
        (item, i) => `<li class="topic" data-reveal-item><span class="topic__n" dir="ltr">${pad(i + 1)}</span><span class="topic__name">${en(item)}</span></li>`,
      )}
    </ol>`;
}

function layoutCode(s) {
  const files = ['fundamentals.py', 'data_structures.py'];
  let line = 0;
  return `
    <div class="grid gap-6 lg:grid-cols-2" data-reveal-group>
      ${join(
        s.groups,
        (g, gi) => `
        <div class="editor" dir="ltr" data-reveal-item>
          <div class="editor__bar" dir="ltr"><span class="editor__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="editor__file" aria-hidden="true">${files[gi]}</span></div>
          <h4 class="editor__title">${en(g.title)}</h4>
          <ol class="editor__lines" dir="ltr">
            ${join(g.items, (item) => {
              line += 1;
              return `<li><span class="editor__ln" aria-hidden="true">${pad(line)}</span><span class="editor__code">${esc(item)}</span></li>`;
            })}
          </ol>
        </div>`,
      )}
    </div>`;
}

function layoutLayers(s) {
  return `
    <div class="layers" data-layers>
      ${join(
        s.groups,
        (g, gi) => `
        <div class="layer layer--${gi + 1}" data-layer>
          <div class="layer__head">
            <span class="layer__n" dir="ltr">L${gi + 1}</span>
            <h4 class="layer__title">${en(g.title)}</h4>
            <span class="layer__count" dir="ltr">${g.items.length}</span>
          </div>
          <ul class="layer__items">
            ${join(g.items, (item) => `<li class="chip">${en(item)}</li>`)}
          </ul>
        </div>`,
      )}
    </div>`;
}

function groupBlock(g) {
  return `
    <div class="os-group">
      <h5 class="os-group__title">${en(g.title)}</h5>
      <ul class="os-group__items">${join(g.items, (item) => `<li>${en(item)}</li>`)}</ul>
    </div>`;
}

function layoutSplit(t, s) {
  return `
    <div class="grid gap-6 lg:grid-cols-12" data-reveal-group>
      ${join(
        s.parts,
        (p) => `
        <div class="os-panel os-panel--${p.id} ${p.id === 'windows' ? 'lg:col-span-5' : 'lg:col-span-7'}" data-reveal-item>
          <div class="os-panel__head">
            <h4 class="os-panel__title">${en(p.title)}</h4>
            ${certBadge(t, p.cert)}
          </div>
          <div class="os-panel__groups ${p.id === 'linux' ? 'sm:grid-cols-2' : ''}">${join(p.groups, groupBlock)}</div>
        </div>`,
      )}
    </div>`;
}

function layoutDomains(t, s) {
  const tr = t.journey.objectives; // null on the English page
  return `
    <div class="domains" data-tabs>
      <p class="domains__hint">${esc(t.journey.domainsHint)}</p>
      <div class="domains__tabs" role="tablist" aria-label="Security+ domains" data-tablist>
        ${join(
          s.groups,
          (g, i) => `
          <button type="button" role="tab" class="domain-tab" id="tab-${g.id}" aria-controls="panel-${g.id}"
                  aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab>
            <span class="domain-tab__n" dir="ltr">${pad(i + 1)}</span>
            <span class="domain-tab__name">${en(g.title)}</span>
            <span class="domain-tab__count" dir="ltr">${g.items.length}</span>
          </button>`,
        )}
      </div>
      <div class="domains__panels">
        ${join(
          s.groups,
          (g, i) => `
          <div role="tabpanel" class="domain-panel" id="panel-${g.id}" aria-labelledby="tab-${g.id}" tabindex="0" data-tabpanel ${i === 0 ? '' : 'hidden'}>
            <h4 class="domain-panel__title">${en(g.title)}</h4>
            <ol class="objectives">
              ${join(
                g.items,
                (item, j) => `
                <li class="objective" data-objective>
                  <span class="objective__n" dir="ltr">${i + 1}.${j + 1}</span>
                  <span class="flex flex-col gap-1">
                    <span class="objective__en" lang="en">${en(item)}</span>
                    ${tr ? `<span class="objective__ar">${esc(tr[g.id][j])}</span>` : ''}
                  </span>
                </li>`,
              )}
            </ol>
          </div>`,
        )}
      </div>
    </div>`;
}

function layoutTerminal(t, s) {
  const libs = t.journey.libraries;
  return `
    <div class="grid gap-6 lg:grid-cols-12" data-reveal-group>
      <div class="terminal lg:col-span-7" data-reveal-item>
        <div class="terminal__bar" dir="ltr"><span class="editor__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="editor__file" aria-hidden="true">python3</span></div>
        <div class="terminal__body">
          <p class="terminal__line" dir="ltr" aria-hidden="true"><span class="text-gold">$</span> pip install ${s.libraries.map((l) => l.name.toLowerCase()).join(' ')}</p>
          <h4 class="terminal__heading">${en(libs.title)}</h4>
          <dl class="libs">
            ${join(
              s.libraries,
              (l) => `<div class="lib"><dt class="lib__name" dir="ltr">${esc(l.name)}</dt><dd class="lib__desc">${esc(libs[l.key])}</dd></div>`,
            )}
          </dl>
        </div>
      </div>
      <div class="flex flex-col gap-4 lg:col-span-5" data-reveal-item>
        <h4 class="group-title">${en(t.journey.projectsTitle)}</h4>
        <ol class="flex flex-col gap-4">
          ${join(
            s.projects,
            (p, i) => `<li class="build-card"><span class="build-card__n" dir="ltr">${pad(i + 1)}</span><span>${en(p)}</span></li>`,
          )}
        </ol>
      </div>
    </div>`;
}

function layoutTracks(t, s) {
  return `
    <div class="flex flex-col gap-6">
      <p class="based-on" data-reveal><span class="status-dot" aria-hidden="true"></span>${en(s.basedOn)}</p>
      <ol class="grid gap-6 md:grid-cols-2" data-reveal-group>
        ${join(
          s.tracks,
          (name, i) => `
          <li class="track" data-reveal-item>
            <span class="track__label" dir="ltr">${esc(t.journey.trackLabel)} ${pad(i + 1)}</span>
            <h4 class="track__name">${en(name)}</h4>
            <p class="track__cert">${icon('cert', 'h-5 w-5 shrink-0 text-gold')}<span>${esc(t.journey.trackCert)}</span></p>
            <span class="track__glyph" aria-hidden="true" dir="ltr">${i === 0 ? '{ }' : '101'}</span>
          </li>`,
        )}
      </ol>
      <p class="text-sm text-muted" data-reveal>${esc(t.journey.trackNote)}</p>
    </div>`;
}

function layoutTools(t, s) {
  return `
    <div class="flex flex-col gap-6" data-reveal-group>
      <h4 class="group-title" data-reveal-item>${en(s.groupTitle)}</h4>
      <ul class="flex flex-wrap gap-3" data-reveal-item>
        ${join(tools, (tool) => `<li><a class="chip chip--link" href="#toolkit" data-tool-link="${tool.id}">${en(tool.label)}</a></li>`)}
      </ul>
      <a class="link-arrow" href="#toolkit" data-reveal-item>${esc(t.journey.toolsLink)}${icon('arrow', 'h-4 w-4 flip-rtl')}</a>
    </div>`;
}

function chapterBody(t, s) {
  switch (s.layout) {
    case 'list': return layoutList(s);
    case 'code': return layoutCode(s);
    case 'layers': return layoutLayers(s);
    case 'split': return layoutSplit(t, s);
    case 'domains': return layoutDomains(t, s);
    case 'terminal': return layoutTerminal(t, s);
    case 'tracks': return layoutTracks(t, s);
    case 'tools': return layoutTools(t, s);
    default: return '';
  }
}

function chapter(t, s, i) {
  const total = curriculum.length;
  const subtitle = t.journey.subtitles[s.id];
  return `
  <article id="chapter-${s.id}" class="chapter chapter--${s.layout}" data-chapter="${i}" aria-labelledby="chapter-${s.id}-title">
    <span class="chapter__letter" aria-hidden="true" data-chapter-letter>${s.letter}</span>
    <div class="shell relative">
      <header class="chapter__head" data-reveal-group>
        <p class="chapter__index" dir="ltr" data-reveal-item>
          <span class="chapter__index-letter">${s.letter}</span>
          <span>${esc(t.journey.sectionLabel)} ${pad(i + 1)}</span><span class="text-muted">/ ${pad(total)}</span>
        </p>
        <h3 id="chapter-${s.id}-title" class="chapter__title" data-reveal-item>${en(s.title)}</h3>
        ${subtitle ? `<p class="chapter__subtitle" data-reveal-item>${esc(subtitle)}</p>` : ''}
        <div class="chapter__meta" data-reveal-item>
          <span class="meta-pill" dir="auto">${esc(t.journey.topicsLabel(sectionTopicCount(s)))}</span>
          ${certBadge(t, s.cert)}
        </div>
      </header>
      <div class="chapter__body">${chapterBody(t, s)}</div>
    </div>
  </article>`;
}

export function journey(t) {
  const j = t.journey;
  return `
  <section id="journey" class="journey" aria-labelledby="journey-title" data-journey>
    <div class="shell pb-10 pt-28 md:pt-36">
      ${sectionHead({ id: 'journey-title', eyebrow: j.eyebrow, title: j.title, intro: j.intro(curriculum.length, countTopics()) })}
      <div class="journey__word" aria-hidden="true" dir="ltr">${join([...'SECURITY'], (c) => `<span class="journey__word-char">${c}</span>`)}</div>
      <p class="cert-note" data-reveal>${icon('alert', 'h-4 w-4 shrink-0')}<span>${esc(j.certDisclaimer)}</span></p>
    </div>
    ${curriculum.map((s, i) => chapter(t, s, i)).join('')}
  </section>`;
}
