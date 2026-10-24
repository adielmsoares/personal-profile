import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { loadLanguage } from '../../i18n';
import { LangContext } from '../../hooks/useLang';
import Header from './Header';
import Footer from './Footer';
import ScrollManager from './ScrollManager';
import WhatsAppButton from './WhatsAppButton';

export default function LangLayout({ lang }) {
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    if (i18n.language === lang) return undefined;
    let cancelled = false;
    loadLanguage(lang)
      .then(() => {
        if (!cancelled) i18n.changeLanguage(lang);
      })
      .catch(() => {
        /* falha de rede: mantém o idioma carregado */
      });
    return () => {
      cancelled = true;
    };
  }, [lang, i18n]);

  return (
    <LangContext value={lang}>
      <a
        href="#main"
        className="sr-only z-(--z-skip) rounded-control bg-signal px-4 py-3 font-medium text-on-signal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('a11y.skipToContent')}
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </LangContext>
  );
}
