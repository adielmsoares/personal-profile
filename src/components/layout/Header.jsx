import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLang } from '../../hooks/useLang';
import { stripLang } from '../../i18n/routing';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { Container } from './Container';
import { ContrastToggle, ThemeSelect } from './DisplayToggles';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function useNavLinks() {
  const { t } = useTranslation();
  const { to } = useLang();
  const { pathname } = useLocation();
  const page = stripLang(pathname);
  const isHome = page === '/';
  const isPortfolio = page === '/portfolio';
  const active = useActiveSection(SECTION_IDS, isHome);

  return NAV_ITEMS.map((item) => {
    const href = item.id === 'portfolio' && isPortfolio ? to('/portfolio') : to('/', item.id);
    let current;
    if (isHome && active === item.id) current = 'location';
    if (isPortfolio && item.id === 'portfolio') current = 'page';
    return { id: item.id, label: t(`nav.${item.key}`), href, current };
  });
}

/** Indicador que desliza até o link ativo. */
function useIndicator(listRef, key) {
  const [box, setBox] = useState(null);

  useEffect(() => {
    const update = () => {
      const list = listRef.current;
      const el = listRef.current?.querySelector('[aria-current]');
      if (!list || !el) {
        setBox(null);
        return;
      }
      const listRect = list.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      setBox({
        x: itemRect.left - listRect.left,
        y: itemRect.top - listRect.top,
        w: itemRect.width,
        h: itemRect.height,
      });
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [listRef, key]);

  return box;
}

export default function Header() {
  const { t, i18n } = useTranslation();
  const { to } = useLang();
  const links = useNavLinks();
  const activeId = links.find((l) => l.current)?.id;
  const listRef = useRef(null);
  const indicator = useIndicator(listRef, `${activeId}-${i18n.language}`);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 12);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-(--z-header) border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-standard',
        scrolled || menuOpen
          ? 'border-line-subtle bg-(--header-bg) backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-(--header-h) items-center justify-between gap-4">
        <Link to={to('/', 'top')} aria-label={t('a11y.homeLink')} data-plain="" className="-m-2 p-2 rounded-control">
          <Logo nameClassName="hidden sm:flex lg:hidden xl:flex" />
        </Link>

        <nav aria-label={t('a11y.mainNav')} className="hidden lg:block">
          <ul ref={listRef} className="relative flex items-center gap-1 bg-surface/60 p-1 border border-line-subtle hc:border-line rounded-full">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.href}
                  aria-current={link.current}
                  data-plain=""
                  className="block z-10 relative px-3.5 py-2 rounded-full text-[0.8125rem] text-muted aria-[current]:text-fg hover:text-fg no-underline header-control"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-fg/[0.07] ring-1 ring-fg/10 transition-[transform,width,height,opacity] duration-(--dur-base) ease-brand hc:bg-signal hc:ring-0"
              style={{
                width: indicator?.w ?? 0,
                height: indicator?.h ?? 0,
                transform: `translate(${indicator?.x ?? 0}px, ${indicator?.y ?? 0}px)`,
                opacity: indicator ? 1 : 0,
              }}
            />
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher className="hidden md:block" />
          <div className="hidden sm:block">
            <ThemeSelect />
          </div>
          <ContrastToggle />
          <div className="hidden xl:block">
            <Button to={to('/', 'contact')} size="sm" icon={ArrowRight} className="neon-ring">
              {t('nav.cta')}
            </Button>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            className="lg:hidden inline-flex justify-center items-center border border-line-subtle hc:border-line rounded-full size-10 text-fg header-control"
          >
            <span aria-hidden="true" className="relative size-5">
              <Menu className={cn('absolute inset-0 size-5 transition-[transform,opacity] duration-(--dur-base) ease-brand', menuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
              <X className={cn('absolute inset-0 size-5 transition-[transform,opacity] duration-(--dur-base) ease-brand', menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0')} />
            </span>
          </button>
        </div>
      </Container>

      <span aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-(image:--grad-brand)" />
      <MobileMenu open={menuOpen} onClose={closeMenu} links={links} returnFocusRef={menuButtonRef} />
    </header>
  );
}
