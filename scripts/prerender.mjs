/**
 * Pré-renderiza cada rota/idioma em HTML estático, com metadados localizados,
 * canonical, hreflang, Open Graph, Schema.org Person, sitemap.xml e robots.txt.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { SITE_URL } from '../site.config.mjs';
import { DEFAULT_LANG, LANGS, PAGES, localizePath } from '../src/i18n/routing.js';
import { portrait, portraitSrcSet } from '../src/data/media.js';
import { contact } from '../src/data/profile.js';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const absolute = (urlPath) => `${SITE_URL}${urlPath}`;

async function loadLocales() {
  const entries = await Promise.all(
    LANGS.map(async (l) => [l.code, JSON.parse(await fs.readFile(path.join(root, `src/i18n/locales/${l.code}.json`), 'utf8'))]),
  );
  return Object.fromEntries(entries);
}

function personSchema(locale, hasPhoto) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Adiel Soares',
    url: absolute('/'),
    jobTitle: 'Senior Product Designer',
    description: locale.meta.home.description,
    email: `mailto:${contact.email}`,
    sameAs: [contact.linkedin, contact.instagram],
    telephone: `+${contact.whatsapp}`,
    worksFor: { '@type': 'Organization', name: 'G4F' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'IESB' },
      { '@type': 'EducationalOrganization', name: 'Grupo Projeção' },
      { '@type': 'EducationalOrganization', name: 'Descomplica' },
    ],
    knowsAbout: [
      'Product Design',
      'UX Research',
      'UX/UI Design',
      'Design Systems',
      'Information Architecture',
      'Accessibility',
      'Frontend Development',
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Generative AI',
      'AI-assisted Design',
      'Prompt Engineering',
    ],
  };
  if (hasPhoto) data.image = absolute(`${portrait.basePath}-${portrait.width}.jpg`);
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function buildHead({ lang, page, locale, hasPhoto }) {
  const meta = locale.meta[page.id];
  const urlPath = localizePath(lang, page.path);
  const ogImage = absolute(`/og/og-${lang}.png`);
  const current = LANGS.find((l) => l.code === lang);
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<link rel="canonical" href="${absolute(urlPath)}">`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${absolute(localizePath(l.code, page.path))}">`),
    `<link rel="alternate" hreflang="x-default" href="${absolute(localizePath(DEFAULT_LANG, page.path))}">`,
    `<meta property="og:type" content="${page.id === 'home' ? 'profile' : 'website'}">`,
    `<meta property="og:site_name" content="Adiel Soares">`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:url" content="${absolute(urlPath)}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escapeHtml(locale.meta.ogAlt)}">`,
    `<meta property="og:locale" content="${current.ogLocale}">`,
    ...LANGS.filter((l) => l.code !== lang).map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}">`),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<meta name="twitter:image:alt" content="${escapeHtml(locale.meta.ogAlt)}">`,
  ];

  if (page.id === 'home') {
    tags.push(
      `<link rel="preload" as="image" type="image/avif" imagesrcset="${portraitSrcSet('avif')}" imagesizes="${portrait.sizes}" fetchpriority="high">`,
      `<script type="application/ld+json">${personSchema(locale, hasPhoto)}</script>`,
    );
  }
  return tags.join('\n    ');
}

function fillTemplate(template, { lang, head, html, locale }) {
  const i18nData = `<script id="i18n-data" type="application/json">${JSON.stringify(locale).replace(/</g, '\\u003c')}</script>`;
  return template
    .replace('<html lang="pt-BR"', `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--app-head-->', `${head}\n    ${i18nData}`)
    .replace('<!--app-html-->', html);
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.flatMap((page) =>
    LANGS.map((l) => {
      const alternates = LANGS.map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${alt.code}" href="${absolute(localizePath(alt.code, page.path))}"/>`,
      ).join('\n');
      return `  <url>
    <loc>${absolute(localizePath(l.code, page.path))}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(localizePath(DEFAULT_LANG, page.path))}"/>
  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

async function main() {
  const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
  const locales = await loadLocales();
  const hasPhoto = !(await fs
    .access(path.join(dist, 'images/portrait/placeholder.txt'))
    .then(() => true)
    .catch(() => false));

  for (const l of LANGS) {
    for (const page of PAGES) {
      const url = localizePath(l.code, page.path);
      const html = await render(url, l.code);
      const head = buildHead({ lang: l.code, page, locale: locales[l.code], hasPhoto });
      const output = fillTemplate(template, { lang: l.code, head, html, locale: locales[l.code] });
      const file = path.join(dist, url === '/' ? '' : url, 'index.html');
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, output);
      // Cópia "/rota.html" para servidores que resolvem URLs sem barra final (clean URLs).
      if (url !== '/') await fs.writeFile(path.join(dist, `${url}.html`), output);
      console.log(`[prerender] ${url}`);
    }
  }

  const notFoundLocale = locales[DEFAULT_LANG];
  const notFoundHtml = await render('/404', DEFAULT_LANG);
  const notFoundHead = [
    `<title>${escapeHtml(notFoundLocale.meta.notFound.title)}</title>`,
    `<meta name="description" content="${escapeHtml(notFoundLocale.meta.notFound.description)}">`,
    '<meta name="robots" content="noindex">',
  ].join('\n    ');
  const notFoundPage = fillTemplate(template, { lang: DEFAULT_LANG, head: notFoundHead, html: notFoundHtml, locale: notFoundLocale });
  await fs.writeFile(path.join(dist, '404.html'), notFoundPage.replace('<div id="root">', '<div id="root" data-csr>'));
  console.log('[prerender] /404.html');

  await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap());
  await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`);
  await fs.rm(path.join(dist, 'images/portrait/placeholder.txt'), { force: true });
  await fs.rm(ssrDir, { recursive: true, force: true });

  if (SITE_URL === 'https://adielsoares.com' && !process.env.SITE_URL) {
    console.warn('[prerender] SITE_URL não definido — usando domínio padrão. Defina SITE_URL=https://seu-dominio no build de produção.');
  }
  console.log('[prerender] sitemap.xml e robots.txt gerados.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
