import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANG, LANGS } from './routing';

const loaders = {
  'pt-BR': () => import('./locales/pt-BR.json'),
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json'),
};

/** `resources`: traduções já disponíveis (SSR ou JSON embutido no HTML pré-renderizado). */
export function initI18n(lng = DEFAULT_LANG, resources = {}) {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: DEFAULT_LANG,
      supportedLngs: LANGS.map((l) => l.code),
      load: 'currentOnly',
      partialBundledLanguages: true,
      initAsync: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  }
  return i18n;
}

export async function loadLanguage(lng) {
  if (i18n.hasResourceBundle(lng, 'translation')) return;
  const mod = await loaders[lng]();
  i18n.addResourceBundle(lng, 'translation', mod.default, true, true);
}

export { i18n };
