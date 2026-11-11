/**
 * Generates the Open Graph images (1200×630) from the live hero.
 *   npm run serve   (in another terminal)
 *   npm run og
 * Output: src/assets/og/og-{ar,en}.jpg (rebuild afterwards).
 */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const base = process.env.BASE || 'http://localhost:4173';
const browser = await chromium.launch({ channel: 'msedge' });
await mkdir('src/assets/og', { recursive: true });

for (const lang of ['ar', 'en']) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`${base}/${lang}/`, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: '.hero__cue,.hero__side .flex,.site-header nav,.site-header .btn,.lang-switch,.menu-btn{display:none!important}.hero__inner{padding-top:5.5rem!important;padding-bottom:2.5rem!important}',
  });
  await page.waitForTimeout(3800);
  await page.screenshot({ path: `src/assets/og/og-${lang}.jpg`, type: 'jpeg', quality: 86 });
  await page.close();
  console.log(`✓ og-${lang}.jpg`);
}
await browser.close();
