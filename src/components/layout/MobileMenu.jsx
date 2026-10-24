import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, X } from 'lucide-react';
import { useLang } from '../../hooks/useLang';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { Container } from './Container';
import { ContrastToggle, ThemeSelect } from './DisplayToggles';
import LanguageSwitcher from './LanguageSwitcher';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ open, onClose, links, returnFocusRef }) {
  const { t } = useTranslation();
  const { to } = useLang();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    panel.querySelector(FOCUSABLE)?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 64rem)').matches) onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    const returnTarget = returnFocusRef.current;
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      returnTarget?.focus({ preventScroll: true });
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('a11y.mobileNav')}
      className="fixed inset-0 z-(--z-overlay) flex animate-fade flex-col overflow-x-hidden overflow-y-auto bg-page lg:hidden"
    >
      <div aria-hidden="true" className="-top-40 -right-40 absolute size-[28rem] pointer-events-none glow-a" />
      <Container className="relative flex h-(--header-h) shrink-0 items-center justify-between gap-4 border-b border-line-subtle">
        <Link to={to('/', 'top')} onClick={onClose} aria-label={t('a11y.homeLink')} data-plain="" className="-m-2 p-2 rounded-control">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex justify-center items-center border border-line-subtle hc:border-line hover:border-line rounded-full size-10 text-fg transition-colors"
        >
          <X aria-hidden className="size-5 animate-[fade_300ms_var(--ease-brand)_both]" />
          <span className="sr-only">{t('a11y.closeMenu')}</span>
        </button>
      </Container>

      <Container className="relative flex flex-col flex-1 gap-10 py-6">
        <nav aria-label={t('a11y.mainNav')}>
          <ol>
            {links.map((link, index) => (
              <li key={link.id} className="border-line-subtle border-b animate-reveal" style={{ animationDelay: `${60 + index * 45}ms` }}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  aria-current={link.current}
                  data-plain=""
                  className="group flex items-center gap-5 py-3 min-h-16 text-fg aria-[current]:text-accent no-underline"
                >
                  <span aria-hidden="true" className="w-6 font-mono text-subtle text-xs">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display font-medium text-2xl tracking-tight">{link.label}</span>
                  <ArrowRight
                    aria-hidden
                    className="ms-auto size-5 text-subtle transition-transform duration-(--dur-base) ease-brand group-hover:translate-x-1 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-4 mt-auto animate-reveal [animation-delay:340ms]">
          <p className="text-subtle eyebrow">{t('a11y.preferences')}</p>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher size="lg" />
            <ThemeSelect withLabels />
            <ContrastToggle withLabel />
          </div>
          <Button to={to('/', 'contact')} onClick={onClose} size="lg" icon={ArrowRight} className="w-full">
            {t('nav.cta')}
          </Button>
        </div>
      </Container>
    </div>
  );
}
