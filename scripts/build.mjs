/**
 * Static build: renders /ar/ and /en/ pages from the content files,
 * then copies assets, JS modules and the GSAP vendor files into dist/.
 * CSS is compiled separately by the Tailwind CLI (see package.json).
 *
 * Optional: SITE_URL=https://example.com npm run build
 *   → absolute canonical / hreflang / og URLs + sitemap.xml.
 */
import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ar from '../src/content/ar.mjs';
import en from '../src/content/en.mjs';
import { renderPage, renderRoot } from '../src/templates/page.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');

const VENDOR = ['gsap', 'ScrollTrigger', 'ScrollSmoother', 'SplitText', 'DrawSVGPlugin', 'ScrambleTextPlugin'];

async function write(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

async function build() {
  // Keep the compiled CSS between HTML rebuilds; wipe everything else.
  const cssDir = path.join(dist, 'assets', 'css');
  const cssBackup = existsSync(cssDir) ? path.join(root, '.css-cache') : null;
  if (cssBackup) await cp(cssDir, cssBackup, { recursive: true });
  await rm(dist, { recursive: true, force: true });
  if (cssBackup) {
    await cp(cssBackup, cssDir, { recursive: true });
    await rm(cssBackup, { recursive: true, force: true });
  }

  for (const t of [ar, en]) {
    await write(path.join(dist, t.lang, 'index.html'), renderPage(t, { siteUrl }));
  }
  await write(path.join(dist, 'index.html'), renderRoot({ siteUrl }));

  await cp(path.join(root, 'src', 'assets'), path.join(dist, 'assets'), { recursive: true });
  await cp(path.join(root, 'src', 'js'), path.join(dist, 'assets', 'js'), { recursive: true });
  for (const name of VENDOR) {
    await cp(
      path.join(root, 'node_modules', 'gsap', 'dist', `${name}.min.js`),
      path.join(dist, 'assets', 'vendor', 'gsap', `${name}.min.js`),
    );
  }

  const robots = ['User-agent: *', 'Allow: /'];
  if (siteUrl) {
    robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
    const urls = ['ar', 'en']
      .map(
        (lang) => `  <url>
    <loc>${siteUrl}/${lang}/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${siteUrl}/ar/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/ar/"/>
  </url>`,
      )
      .join('\n');
    await write(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    );
  }
  await write(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');

  console.log(`✓ HTML built → dist/ (ar, en)${siteUrl ? ` for ${siteUrl}` : ' (relative URLs — set SITE_URL for production)'}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
