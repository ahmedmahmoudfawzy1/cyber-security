import { esc, en, icon, join, sectionHead } from '../utils.mjs';
import { references, contact, brand } from '../../content/shared.mjs';

export function referencesSection(t) {
  const r = t.references;
  return `
  <section id="references" class="section" aria-labelledby="references-title">
    <div class="shell flex flex-col gap-14">
      ${sectionHead({ id: 'references-title', eyebrow: r.eyebrow, title: r.title, intro: r.intro })}
      <ul class="refs" data-reveal-group>
        ${join(
          references,
          (ref) => `
          <li class="ref" data-reveal-item>
            <div class="ref__name">
              ${ref.source ? `<span class="ref__source" dir="ltr">${esc(ref.source)}</span>` : ''}
              <h3 class="ref__title">${en(ref.name)}</h3>
            </div>
            <p class="ref__desc">${esc(r.descriptions[ref.id])}</p>
            <div class="ref__meter">
              ${
                ref.percent
                  ? `<span class="meter" role="img" aria-label="${esc(r.percentLabel(ref.percent))}"><span class="meter__fill" style="--p:${ref.percent / 100}" data-meter></span></span>
                     <span class="meter__label" dir="ltr">${ref.percent}%</span>`
                  : ''
              }
            </div>
          </li>`,
        )}
      </ul>
      <p class="cert-note" data-reveal>${icon('alert', 'h-4 w-4 shrink-0')}<span>${esc(r.disclaimer)}</span></p>
    </div>
  </section>`;
}

export function faq(t) {
  const f = t.faq;
  return `
  <section id="faq" class="section" aria-labelledby="faq-title">
    <div class="shell grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">${sectionHead({ id: 'faq-title', eyebrow: f.eyebrow, title: f.title })}</div>
      <div class="faq lg:col-span-8" data-reveal-group>
        ${join(
          f.items,
          (item) => `
          <details class="faq__item" data-faq data-reveal-item>
            <summary class="faq__q"><span>${esc(item.q)}</span><span class="faq__icon" aria-hidden="true"></span></summary>
            <div class="faq__a" data-faq-body><p>${esc(item.a)}</p></div>
          </details>`,
        )}
      </div>
    </div>
  </section>`;
}

export function enroll(t) {
  const e = t.enroll;
  return `
  <section id="enroll" class="section" aria-labelledby="enroll-title">
    <div class="shell grid gap-12 lg:grid-cols-12">
      <div class="flex flex-col gap-8 lg:col-span-7">
        ${sectionHead({ id: 'enroll-title', eyebrow: e.eyebrow, title: e.title })}
        ${join(e.paragraphs, (p) => `<p class="lead" data-reveal>${esc(p)}</p>`)}
      </div>
      <aside class="goal lg:col-span-5 lg:self-end" data-reveal aria-label="${esc(e.goalLabel)}">
        <p class="eyebrow">${esc(e.goalLabel)}</p>
        <p class="goal__text">${esc(e.goal)}</p>
      </aside>
    </div>
  </section>`;
}

export function contactSection(t) {
  const c = t.contact;
  const chars = (text, part) => [...text].map((ch) => `<span class="fw-char" data-finale-char="${part}">${ch}</span>`).join('');
  return `
  <section id="contact" class="contact" aria-labelledby="contact-title" data-finale data-scroll-end="finale">
    <div class="contact__bg" aria-hidden="true"></div>
    <div class="shell contact__inner">
      <div class="finale-word" aria-hidden="true" dir="ltr" data-finale-word>
        <span class="finale-word__eraa">${chars(brand.prefix, 'eraa')}</span><span class="finale-word__sec">${chars(brand.suffix, 'sec')}</span>
      </div>
      <div class="contact__body" data-finale-body>
        <p class="eyebrow">${esc(c.eyebrow)}</p>
        <h2 id="contact-title" class="h-section">${esc(c.title)}</h2>
        <p class="lead max-w-2xl">${esc(c.lead)}</p>
        <div class="contact__actions">
          <a class="btn btn-primary btn-lg" href="${contact.whatsappHref}" target="_blank" rel="noopener">${icon('whatsapp', 'h-5 w-5')}${esc(c.whatsapp)}</a>
          <a class="btn btn-ghost btn-lg" href="${contact.phoneHref}">${icon('phone', 'h-5 w-5')}<span>${esc(c.call)}</span><span class="contact__value" dir="ltr">${contact.phoneDisplay}</span></a>
          <a class="btn btn-ghost btn-lg" href="mailto:${contact.email}">${icon('mail', 'h-5 w-5')}<span>${esc(c.email)}</span><span class="contact__value" dir="ltr">${contact.email}</span></a>
        </div>
        <div class="contact__socials">
          <span class="text-sm text-muted">${esc(c.socials)}</span>
          <ul class="flex flex-wrap gap-2">
            ${join(
              contact.socials,
              (s) => `<li><a class="social-btn" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.id, 'h-5 w-5')}</a></li>`,
            )}
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}
