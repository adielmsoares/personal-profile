/**
 * Gera variantes otimizadas do retrato (AVIF/WebP/JPEG), imagens Open Graph por idioma
 * e apple-touch-icon. Sem a foto original, gera um placeholder com a marca.
 *
 * Foto original esperada em: src/assets/source/adiel-portrait.(jpg|jpeg|png|webp)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { portrait } from '../src/data/media.js';

const root = path.resolve(import.meta.dirname, '..');
const SOURCE_DIR = path.join(root, 'src/assets/source');
const OUT_PORTRAIT = path.join(root, 'public/images/portrait');
const OUT_OG = path.join(root, 'public/og');
const PLACEHOLDER_FLAG = path.join(OUT_PORTRAIT, 'placeholder.txt');
// Incrementar ao mudar marca/paleta para forçar a regeneração.
const VERSION = '5';
const VERSION_FILE = path.join(OUT_OG, 'version.txt');

const GLYPHS = (stroke, link = stroke) => `
  <g fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="${stroke}" d="M4 37 14.5 4.5h5l5.6 17.5"/>
    <path stroke="${stroke}" transform="matrix(1 0 .3 1 24 0)" d="M18 3H7a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4H4"/>
    <path stroke="${link}" d="M25.1 22 30 37"/>
  </g>`;

// Mesma construção do componente Monogram: aberração ciano/violeta, fenda horizontal e nó de circuito.
const MONOGRAM = (light, accent) => `
  <g mask="url(#slice)">
    <g opacity=".75" transform="translate(-.9 0)">${GLYPHS('#3ADCEB')}</g>
    <g opacity=".75" transform="translate(.9 0)">${GLYPHS('#9D7BFF')}</g>
    ${GLYPHS(light, accent)}
  </g>
  <path d="M45.2 3H49.6" stroke="${light}" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="51.6" cy="3" r="1.8" fill="none" stroke="#3ADCEB" stroke-width="1.5"/>`;

const BRAND_DEFS = `<defs>
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#477BFF"/><stop offset="1" stop-color="#3ADCEB"/></linearGradient>
  <radialGradient id="glow" cx="85%" cy="15%" r="65%"><stop offset="0" stop-color="#477BFF" stop-opacity=".22"/><stop offset="1" stop-color="#477BFF" stop-opacity="0"/></radialGradient>
  <mask id="slice" maskUnits="userSpaceOnUse" x="-4" y="-4" width="63" height="48"><rect x="-4" y="-4" width="63" height="48" fill="#fff"/><rect x="-4" y="19.4" width="63" height="1.2" fill="#000"/></mask>
</defs>`;

const GRID = (w, h, step = 48) => {
  let lines = '';
  for (let x = step; x < w; x += step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = step; y < h; y += step) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  return `<g stroke="#B9CBDB" stroke-opacity="0.06">${lines}</g>`;
};

const escapeXml = (s) => s.replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function findSource() {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const file = path.join(SOURCE_DIR, `adiel-portrait.${ext}`);
    if (await exists(file)) return file;
  }
  return null;
}

async function isUpToDate(source) {
  const marker = path.join(OUT_PORTRAIT, `adiel-${portrait.width}.avif`);
  if (!(await exists(marker)) || !(await exists(path.join(OUT_OG, 'og-pt-BR.png')))) return false;
  const version = await fs.readFile(VERSION_FILE, 'utf8').catch(() => '');
  if (version.trim() !== VERSION) return false;
  const placeholder = await exists(PLACEHOLDER_FLAG);
  if (!source) return placeholder;
  if (placeholder) return false;
  const [src, out] = await Promise.all([fs.stat(source), fs.stat(marker)]);
  return out.mtimeMs >= src.mtimeMs;
}

function placeholderSvg() {
  const { width: w, height: h } = portrait;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><radialGradient id="g" cx="70%" cy="20%" r="80%"><stop offset="0" stop-color="#15243A"/><stop offset="1" stop-color="#060D1B"/></radialGradient></defs>
    ${BRAND_DEFS}
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    ${GRID(w, h)}
    <g transform="translate(${w / 2 - 162} ${h / 2 - 120}) scale(6)">${MONOGRAM('#F7FAFF', 'url(#brand)')}</g>
  </svg>`);
}

async function buildPortrait(source) {
  await fs.mkdir(OUT_PORTRAIT, { recursive: true });
  const master = source
    ? await sharp(source).rotate().resize(portrait.width, portrait.height, { fit: 'cover', position: 'centre' }).toBuffer()
    : await sharp(placeholderSvg()).png().toBuffer();

  await Promise.all(
    portrait.widths.flatMap((w) => {
      const h = Math.round((w * portrait.height) / portrait.width);
      const resized = () => sharp(master).resize(w, h);
      const out = (ext) => path.join(OUT_PORTRAIT, `adiel-${w}.${ext}`);
      return [
        resized().avif({ quality: 52, effort: 6 }).toFile(out('avif')),
        resized().webp({ quality: 76 }).toFile(out('webp')),
        resized().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(out('jpg')),
      ];
    }),
  );

  if (source) await fs.rm(PLACEHOLDER_FLAG, { force: true });
  else await fs.writeFile(PLACEHOLDER_FLAG, 'Retrato provisório. Adicione src/assets/source/adiel-portrait.jpg\n');
  return master;
}

function wrap(text, max) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function buildOg(master, lang, tagline) {
  const W = 1200;
  const H = 630;
  const PW = 400;
  const PH = 500;
  const PX = 730;
  const PY = 65;
  const lines = wrap(tagline, 26);
  const sans = "'Bricolage Grotesque', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
  const mono = "'JetBrains Mono', Consolas, 'DejaVu Sans Mono', monospace";

  const base = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${BRAND_DEFS}
    <rect width="${W}" height="${H}" fill="#060D1B"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    ${GRID(W, H)}
    <g transform="translate(80 76) scale(1.6)">${MONOGRAM('#F7FAFF', 'url(#brand)')}</g>
    <text x="80" y="236" fill="#3ADCEB" font-family="${mono}" font-size="17" font-weight="500" letter-spacing="3">PRODUCT DESIGN · UX/UI · FRONTEND</text>
    <text x="78" y="318" fill="#F7FAFF" font-family="${sans}" font-size="68" font-weight="700" letter-spacing="-2">Adiel Soares</text>
    ${lines
      .map((l, i) => `<text x="80" y="${384 + i * 46}" fill="#B9CBDB" font-family="${sans}" font-size="36" font-weight="500">${escapeXml(l)}</text>`)
      .join('')}
    <rect x="80" y="553" width="64" height="3" rx="1.5" fill="url(#brand)"/>
    <text x="160" y="560" fill="#8DA2B8" font-family="${mono}" font-size="16" letter-spacing="0.5">Senior Product Designer | UX/UI Designer | Frontend Engineer</text>
    <rect x="${PX - 16}" y="${PY - 16}" width="${PW + 32}" height="${PH + 32}" rx="40" fill="none" stroke="#304760"/>
    <rect x="${PX + 32}" y="${PY - 17}" width="96" height="2" fill="url(#brand)"/>
  </svg>`);

  const mask = Buffer.from(`<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="28" fill="#fff"/></svg>`);
  const photo = await sharp(master)
    .resize(PW, PH, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(base)
    .composite([{ input: photo, left: PX, top: PY }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_OG, `og-${lang}.png`));
}

async function main() {
  const source = await findSource();
  if (await isUpToDate(source)) {
    console.log('[images] Imagens já atualizadas.');
    return;
  }
  if (!source) {
    console.warn('[images] Foto não encontrada em src/assets/source/adiel-portrait.jpg — gerando retrato provisório com a marca.');
  }

  const master = await buildPortrait(source);

  await fs.mkdir(OUT_OG, { recursive: true });
  for (const lang of ['pt-BR', 'en', 'es']) {
    const locale = JSON.parse(await fs.readFile(path.join(root, `src/i18n/locales/${lang}.json`), 'utf8'));
    await buildOg(master, lang, locale.meta.ogTagline);
  }

  await sharp(path.join(root, 'public/favicon.svg'), { density: 384 })
    .resize(180, 180)
    .png()
    .toFile(path.join(root, 'public/apple-touch-icon.png'));
  await fs.writeFile(VERSION_FILE, VERSION);

  console.log(`[images] Retrato, imagens Open Graph e ícones gerados${source ? '' : ' (placeholder)'}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
