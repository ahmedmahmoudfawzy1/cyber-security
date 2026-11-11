import { esc } from './utils.mjs';
import { header, rail, footer } from './sections/chrome.mjs';
import { hero } from './sections/hero.mjs';
import { mission, audience, outcomes } from './sections/intro.mjs';
import { journey } from './sections/journey.mjs';
import { toolkit, labs, careers } from './sections/practice.mjs';
import { referencesSection, faq, enroll, contactSection } from './sections/closing.mjs';
import { brand, contact, curriculum } from '../content/shared.mjs';

const VENDOR_SCRIPTS = ['gsap', 'ScrollTrigger', 'ScrollSmoother', 'SplitText', 'DrawSVGPlugin', 'ScrambleTextPlugin'];

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function structuredData(t, url) {
  const course = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: t.hero.title,
    alternateName: [brand.word, brand.diplomaName],
    description: t.meta.description,
    inLanguage: t.lang,
    timeRequired: `PT${brand.durationHours}H`,
    url,
    provider: {
      '@type': 'Organization',
      name: brand.provider,
      url: brand.providerUrl,
      email: contact.email,
      telephone: contact.phoneHref.replace('tel:', ''),
      sameAs: contact.socials.map((s) => s.href),
    },
    syllabusSections: curriculum.map((s) => ({ '@type': 'Syllabus', name: s.title })),
    teaches: t.outcomes.items.map((o) => o.title),
  };
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return jsonLd(course) + jsonLd(faqPage);
}

function fontsHref(lang) {
  const families = [
    'family=Red+Hat+Display:wght@400;500;600;700;800;900',
    'family=JetBrains+Mono:wght@400;500;700',
  ];
  if (lang === 'ar') families.unshift('family=Cairo:wght@400;500;600;700;800;900');
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

/**
 * RTL only: isolate Latin runs that end in "+" (e.g. "CompTIA Linux+",
 * "Security+ (Version 8)") so the trailing "+" is not flipped by the bidi
 * algorithm inside Arabic sentences. Only touches text between tags.
 */
function isolateLatinPlus(html) {
  return html.replace(/[A-Za-z][A-Za-z0-9 ]*\+(?: \(Version \d\))?(?![^<]*>)/g, (m) => `<bdi>${m}</bdi>`);
}

export function renderPage(t, opts) {
  const html = renderDocument(t, opts);
  if (t.dir !== 'rtl') return html;
  const [head, body] = html.split('<body>');
  return `${head}<body>${isolateLatinPlus(body)}`;
}

function renderDocument(t, { siteUrl }) {
  const abs = (p) => (siteUrl ? siteUrl + p : p);
  const url = abs(t.path);
  const ogImage = abs(`/assets/og/og-${t.lang}.jpg`);

  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(t.meta.title)}</title>
  <meta name="description" content="${esc(t.meta.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#060b1d">
  <meta name="color-scheme" content="dark">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="${t.lang}" href="${url}">
  <link rel="alternate" hreflang="${t.alt.lang}" href="${abs(t.alt.path)}">
  <link rel="alternate" hreflang="x-default" href="${abs('/ar/')}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="EraaSoft">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:title" content="${esc(t.meta.title)}">
  <meta property="og:description" content="${esc(t.meta.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(t.meta.ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@eraasoft">
  <meta name="twitter:title" content="${esc(t.meta.title)}">
  <meta name="twitter:description" content="${esc(t.meta.description)}">
  <meta name="twitter:image" content="${ogImage}">

  <link rel="icon" href="../assets/brand/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="../assets/brand/eraasoft-mark.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${fontsHref(t.lang)}">
  <link rel="stylesheet" href="../assets/css/main.css">
  <script>document.documentElement.classList.replace('no-js','js');</script>
  ${structuredData(t, url)}
</head>
<body>
  ${header(t)}
  ${rail(t)}
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <main id="main" tabindex="-1">
        ${hero(t)}
        ${mission(t)}
        ${audience(t)}
        ${outcomes(t)}
        ${journey(t)}
        ${toolkit(t)}
        ${labs(t)}
        ${careers(t)}
        ${referencesSection(t)}
        ${faq(t)}
        ${enroll(t)}
        ${contactSection(t)}
      </main>
      ${footer(t)}
    </div>
  </div>
  ${VENDOR_SCRIPTS.map((s) => `<script src="../assets/vendor/gsap/${s}.min.js" defer></script>`).join('\n  ')}
  <script type="module" src="../assets/js/main.js"></script>
</body>
</html>
`;
}

/** Root page: language negotiation with crawlable links (no duplicate content). */
export function renderRoot({ siteUrl }) {
  const abs = (p) => (siteUrl ? siteUrl + p : p);
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EraaSecurity — Cybersecurity Fundamentals Diploma | EraaSoft</title>
  <meta name="robots" content="noindex, follow">
  <meta name="theme-color" content="#060b1d">
  <link rel="alternate" hreflang="ar" href="${abs('/ar/')}">
  <link rel="alternate" hreflang="en" href="${abs('/en/')}">
  <link rel="alternate" hreflang="x-default" href="${abs('/ar/')}">
  <link rel="icon" href="assets/brand/favicon.ico">
  <script>
    (function () {
      var pref = (navigator.languages && navigator.languages[0]) || navigator.language || 'ar';
      location.replace(/^ar\\b/i.test(pref) ? 'ar/' : 'en/');
    })();
  </script>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#060b1d;color:#e8edfb;font:600 18px system-ui,sans-serif}
    a{color:#e6c238;margin:0 12px}
  </style>
</head>
<body>
  <p><a href="ar/" hreflang="ar" lang="ar">العربية</a> · <a href="en/" hreflang="en">English</a></p>
</body>
</html>
`;
}
