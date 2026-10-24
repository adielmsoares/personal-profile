import { createContext, useContext } from 'react';
import { DEFAULT_LANG, localizePath } from '../i18n/routing';

export const LangContext = createContext(DEFAULT_LANG);

export function useLang() {
  const lang = useContext(LangContext);
  return {
    lang,
    to: (path = '/', hash = '') => `${localizePath(lang, path)}${hash ? `#${hash}` : ''}`,
  };
}
