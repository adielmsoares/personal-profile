import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { loadLanguage } from '../../i18n';
import { LANGS, LANG_STORAGE_KEY, localizePath, stripLang } from '../../i18n/routing';
import { useLang } from '../../hooks/useLang';
import { cn } from '../../utils/cn';

function remember(code) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, code);
  } catch {
    /* sem persistência disponível */
  }
}

export default function LanguageSwitcher({ className, size = 'sm' }) {
  const { t } = useTranslation();
  const { lang } = useLang();
  const { pathname, hash } = useLocation();
  const page = stripLang(pathname);
  const activeIndex = LANGS.findIndex((l) => l.code === lang);

  return (
    <nav aria-label={t('a11y.languageSelector')} className={className}>
      <ul className="relative grid grid-flow-col auto-cols-fr p-0.5 border border-line-subtle hc:border-line rounded-full">
        <li
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0.5 left-0.5 rounded-full bg-elevated ring-1 ring-line-subtle transition-transform duration-(--dur-base) ease-brand hc:bg-signal hc:ring-0"
          style={{ width: `calc((100% - 4px) / ${LANGS.length})`, transform: `translateX(${activeIndex * 100}%)` }}
        />
        {LANGS.map((l) => {
          const active = l.code === lang;
          return (
            <li key={l.code} className="z-10 relative">
              <Link
                to={`${localizePath(l.code, page)}${hash}`}
                hrefLang={l.code}
                lang={l.code}
                aria-current={active ? 'true' : undefined}
                onClick={() => remember(l.code)}
                onPointerEnter={() => loadLanguage(l.code)}
                onFocus={() => loadLanguage(l.code)}
                data-plain=""
                className={cn(
                  'flex items-center justify-center rounded-full font-mono font-medium tracking-[0.06em] no-underline transition-colors duration-(--dur-micro)',
                  size === 'lg' ? 'min-h-11 min-w-14 px-3 text-sm' : 'h-9 min-w-9 px-2 text-[0.6875rem]',
                  active ? 'text-fg hc:text-on-signal' : 'text-subtle hover:text-fg',
                )}
              >
                {l.short}
                <span className="sr-only"> — {t(`a11y.languages.${l.code}`)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
