/**
 * QA runner (local Edge/Chrome via playwright-core — no browser download).
 *   npm run serve        (in another terminal)
 *   npm run qa -- [--lang=ar|en] [--vp=name,name] [--shots=10] [--reduce]
 * Reports console errors, failed requests and horizontal overflow, and saves
 * viewport screenshots along the page into qa/.
 */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const base = args.base || 'http://localhost:4173';
const langs = args.lang ? [args.lang] : ['ar', 'en'];
const shots = Number(args.shots ?? 8);
const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 720 },
  { name: 'tablet-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024, mobile: true },
  { name: 'mobile-390', width: 390, height: 844, mobile: true },
  { name: 'mobile-360', width: 360, height: 740, mobile: true },
];
const viewports = args.vp ? VIEWPORTS.filter((v) => args.vp.split(',').includes(v.name)) : VIEWPORTS;

const browser = await chromium.launch({ channel: 'msedge' });
const outDir = args.out || path.join(os.tmpdir(), 'eraasecurity-qa');
await mkdir(outDir, { recursive: true });
console.log('Screenshots →', outDir);
let problems = 0;

for (const lang of langs) {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.mobile,
      hasTouch: !!vp.mobile,
      reducedMotion: args.reduce ? 'reduce' : 'no-preference',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
    page.on('response', (r) => r.status() >= 400 && errors.push(`http ${r.status()}: ${r.url()}`));

    await page.goto(`${base}/${lang}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3200);
    const tag = `${lang}-${vp.name}${args.reduce ? '-reduce' : ''}`;

    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const overflow = [];
    for (let i = 0; i <= shots; i++) {
      const y = Math.round((total * i) / shots);
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(args.wait ? Number(args.wait) : 1400);
      const ov = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        return document.documentElement.scrollWidth > w ? document.documentElement.scrollWidth - w : 0;
      });
      if (ov) overflow.push(`${ov}px at ${i}`);
      await page.screenshot({ path: `${outDir}/${tag}-${String(i).padStart(2, '0')}.png` });
    }
    if (args.targets) {
      const selectors = String(args.targets).split(',');
      for (const [i, sel] of selectors.entries()) {
        await page.evaluate((s) => {
          const el = document.querySelector(s);
          if (!el) return;
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 90);
        }, sel);
        await page.waitForTimeout(1600);
        await page.evaluate((s) => {
          const el = document.querySelector(s);
          if (!el) return;
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 90);
        }, sel);
        await page.waitForTimeout(1600);
        await page.screenshot({ path: `${outDir}/${tag}-t${i}.png` });
      }
    }
    const status = errors.length || overflow.length ? 'FAIL' : 'ok';
    if (status === 'FAIL') problems++;
    console.log(`[${status}] ${tag} height=${total + vp.height}px`);
    errors.forEach((e) => console.log('   ', e));
    if (overflow.length) console.log('    horizontal overflow:', overflow.join(', '));
    await context.close();
  }
}
await browser.close();
console.log(problems ? `${problems} run(s) with problems` : 'All runs clean');
process.exit(problems ? 1 : 0);
