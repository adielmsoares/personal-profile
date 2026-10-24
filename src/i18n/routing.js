export const DEFAULT_LANG = 'pt-BR';
export const LANG_STORAGE_KEY = 'as-lang';

export const LANGS = [
  { code: 'pt-BR', short: 'PT', prefix: '', ogLocale: 'pt_BR' },
  { code: 'en', short: 'EN', prefix: '/en', ogLocale: 'en_US' },
  { code: 'es', short: 'ES', prefix: '/es', ogLocale: 'es_ES' },
];

export const PAGES = [
  { id: 'home', path: '/' },
  { id: 'portfolio', path: '/portfolio' },
];

const PREFIX_RE = /^\/(en|es)(?=\/|$)/;

export function getLangFromPath(pathname) {
  const match = PREFIX_RE.exec(pathname);
  return match ? match[1] : DEFAULT_LANG;
}

export function stripLang(pathname) {
  const path = pathname.replace(PREFIX_RE, '').replace(/\/+$/, '');
  return path || '/';
}

export function localizePath(lang, path = '/') {
  const prefix = LANGS.find((l) => l.code === lang)?.prefix ?? '';
  if (path === '/') return prefix || '/';
  return `${prefix}${path}`;
}
