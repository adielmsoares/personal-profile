import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Atualiza title, description e Open Graph na navegação client-side (o HTML inicial já vem pré-renderizado). */
export function useDocumentMeta(page) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t(`meta.${page}.title`);
    const description = t(`meta.${page}.description`);
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', window.location.origin + window.location.pathname);
  }, [page, t, i18n.language]);
}
