import { esc, en, icon, join } from '../utils.mjs';
import { curriculum, contact, brand } from '../../content/shared.mjs';

/** Brand lockup: official icon mark + wordmark set in the brand font (dark-background variant). */
function brandLockup(size = 'h-8 w-8') {
  return `
    <img src="../assets/brand/eraasoft-mark.png" width="62" height="61" alt="" class="${size} shrink-0" decoding="async">
    <span class="brand-word" dir="ltr"><span class="text-brand-bright">Eraa</span><span>Soft</span></span>`;
}

export function header(t) {
  return `
  <a class="skip-link" href="#main">${esc(t.ui.skip)}</a>
  <header class="site-header" data-header>
    <div class="shell flex h-16 items-center justify-between gap-4 lg:h-20">
      <a href="#top" class="brand-link" aria-label="EraaSoft — ${esc(brand.word)}">${brandLockup()}</a>
      <nav aria-label="${t.lang === 'ar' ? 'التنقل الرئيسي' : 'Primary'}" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          ${join(t.nav, (l) => `<li><a class="nav-link" href="${l.href}">${esc(l.label)}</a></li>`)}
        </ul>
      </nav>
      <div class="flex items-center gap-2">
        <a class="lang-switch" href="${t.alt.path}" hreflang="${t.alt.lang}" lang="${t.alt.lang}" data-lang-switch
           aria-label="${esc(t.ui.langSwitch)}">${icon('globe', 'h-4 w-4')}<span>${esc(t.alt.label)}</span></a>
        <a class="btn btn-primary btn-sm hidden sm:inline-flex" href="#contact">${esc(t.navCta)}</a>
        <button type="button" class="menu-btn lg:hidden" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
          ${icon('menu', 'h-6 w-6')}<span class="sr-only">${esc(t.ui.menu)}</span>
        </button>
      </div>
    </div>
  </header>

  <div id="mobile-menu" class="mobile-menu" data-menu hidden>
    <div class="shell flex h-full flex-col pb-10 pt-24">
      <button type="button" class="menu-close" data-menu-close>
        ${icon('close', 'h-6 w-6')}<span class="sr-only">${esc(t.ui.close)}</span>
      </button>
      <ul class="flex flex-col gap-1">
        ${join(
          t.nav,
          (l, i) =>
            `<li><a class="mobile-link" href="${l.href}" data-menu-link><span class="mobile-link__n" dir="ltr">0${i + 1}</span>${esc(l.label)}</a></li>`,
        )}
      </ul>
      <div class="mt-auto flex flex-col gap-3">
        <a class="btn btn-primary w-full" href="#contact" data-menu-link>${esc(t.navCta)}</a>
        <a class="btn btn-ghost w-full" href="${contact.whatsappHref}" target="_blank" rel="noopener">${icon('whatsapp')}${esc(t.contact.whatsapp)}</a>
      </div>
    </div>
  </div>`;
}

/** Fixed curriculum rail: the 8 letters of SECURITY (vertical on desktop, strip on mobile). */
export function rail(t) {
  return `
  <nav class="rail" aria-label="${esc(t.ui.railLabel)}" data-rail>
    <span class="rail__track" aria-hidden="true"><span class="rail__progress" data-rail-progress></span></span>
    <ol class="rail__list" dir="ltr">
      ${join(
        curriculum,
        (s, i) => `
        <li class="rail__li">
          <a class="rail__item" href="#chapter-${s.id}" data-rail-item="${i}">
            <span class="rail__letter" data-rail-letter>${s.letter}</span>
            <span class="rail__label">${en(s.title)}</span>
          </a>
        </li>`,
      )}
    </ol>
  </nav>`;
}

export function footer(t) {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="shell flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-col gap-4">
        <a href="${brand.providerUrl}" class="brand-link" target="_blank" rel="noopener">${brandLockup('h-9 w-9')}</a>
        <p class="text-sm text-muted"><bdi>© ${year} EraaSoft</bdi> — ${esc(t.footer.rights)}</p>
      </div>
      <div class="flex flex-col gap-4 md:items-end">
        <ul class="flex flex-wrap gap-2">
          ${join(
            contact.socials,
            (s) =>
              `<li><a class="social-btn" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.id, 'h-5 w-5')}</a></li>`,
          )}
        </ul>
        <p class="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <a class="link" href="${brand.providerUrl}" target="_blank" rel="noopener">${esc(t.footer.website)}</a>
          <a class="link" href="mailto:${contact.email}">${contact.email}</a>
          <a class="link" href="${t.alt.path}" hreflang="${t.alt.lang}" lang="${t.alt.lang}" data-lang-switch>${esc(t.alt.label)}</a>
        </p>
      </div>
    </div>
  </footer>`;
}
