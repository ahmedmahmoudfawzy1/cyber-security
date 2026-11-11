# EraaSecurity — Cybersecurity Fundamentals Diploma

Landing page for EraaSoft's **Cybersecurity Fundamentals Diploma**, in Arabic (`/ar/`, RTL) and English (`/en/`, LTR).

## Run

```bash
npm install          # once
npm run build        # builds dist/ (HTML + Tailwind CSS + JS + GSAP)
npm run serve        # http://localhost:4173/ar/  ·  http://localhost:4173/en/
```

| Script | Purpose |
|---|---|
| `npm run build` | Full build into `dist/` (deploy this folder as static files) |
| `npm run watch:css` | Rebuild CSS on change (run `npm run build:html` after editing content/templates) |
| `npm run qa` | Screenshots + console/overflow checks across 6 viewports (needs `serve` running; uses installed Edge) |
| `npm run og` | Regenerates the Open Graph images from the hero |

**Production SEO:** build with the real domain so canonical/hreflang/OG URLs are absolute and `sitemap.xml` is generated:

```bash
SITE_URL=https://your-domain.com npm run build
```

## Stack

HTML5 · Tailwind CSS v4 (CLI build) · Vanilla JS (ES modules) · GSAP 3 (ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, ScrambleText). No framework.

## Structure

```
src/content/      shared.mjs (curriculum, tools, projects, contact) · ar.mjs · en.mjs
src/templates/    page.mjs + sections/*.mjs   → static HTML per language
src/styles/       main.css (brand tokens + components)
src/js/           main.js · modules/ (menu, tabs, faq, anchors) · animations/ (GSAP)
scripts/          build · serve · qa · og
```

To edit text, change only `src/content/*`, then run `npm run build`.

## Content sources (no educational content was added)

| Page section | Source |
|---|---|
| Hero tagline / "Goal of the diploma" | PDF 2 §10 (final box) |
| Duration: 120 hours, ~5 months | Provided by the client |
| The Mission | PDF 2 §1 |
| Who is it for · Beginners · Prerequisites | PDF 2 §2, §3, §4 |
| What you'll learn (8 areas) | PDF 2 §5 |
| Curriculum journey — 8 sections, 102 topics | PDF 1 pp. 2–6 (Sections 1–8) |
| Security+ objective translations (AR page) | Translation of PDF 1 Section 5 |
| Toolkit (8 tools + descriptions) | PDF 1 Section 8 + PDF 2 §8 |
| Projects & labs (15 + final) + lab rules | PDF 1 pp. 6–7 + PDF 2 §8 |
| Career paths · Limits · Best outcome | PDF 2 §6 |
| References (10) | PDF 1 p. 2 + PDF 2 §9 |
| FAQ (10 + duration) | PDF 2 §7 (+ client-provided duration) |
| Advice before enrolling | PDF 2 §10 |
| Contact (WhatsApp, phone, email, socials) | eraasoft.com |

Approved edits: spelling fixes (John the Ripper, Burp Suite, Libraries, Framework…), "course" → "diploma", "Dumb Questions & Answers" → "Security+ Exam Q&A", references to "the draft" removed.
