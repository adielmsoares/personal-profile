import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Menu } from 'lucide-react';
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
      const el = listRef.current?.querySelector('[aria-current]');
      setBox(el ? { x: el.offsetLeft + 10, w: el.offsetWidth - 20 } : null);
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
        'sticky top-0 z-(--z-header) border-b transition-[background-color,border-color] duration-(--dur-base) ease-standard',
        scrolled ? 'border-line-subtle bg-(--header-bg)' : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-(--header-h) items-center justify-between gap-4">
        <Link to={to('/', 'top')} aria-label={t('a11y.homeLink')} data-plain="" className="-m-2 p-2 rounded-control">
          <Logo nameClassName="hidden sm:flex lg:hidden xl:flex" />
        </Link>

        <nav aria-label={t('a11y.mainNav')} className="hidden lg:block">
          <ul ref={listRef} className="relative flex items-center">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.href}
                  aria-current={link.current}
                  data-plain=""
                  className="block rounded-full px-2.5 py-2 text-[0.8125rem] text-muted no-underline transition-colors duration-(--dur-micro) ease-standard hover:text-fg aria-[current]:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 left-0 h-px bg-(image:--grad-brand) transition-[transform,width,opacity] duration-(--dur-base) ease-brand"
              style={{ width: indicator?.w ?? 0, transform: `translateX(${indicator?.x ?? 0}px)`, opacity: indicator ? 1 : 0 }}
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
            <Button to={to('/', 'contact')} variant="text" size="sm" icon={ArrowRight}>
              {t('nav.cta')}
            </Button>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden inline-flex justify-center items-center border border-line-subtle hc:border-line hover:border-line rounded-full size-10 text-fg transition-colors"
          >
            <Menu aria-hidden className="size-5" />
            <span className="sr-only">{t('a11y.openMenu')}</span>
          </button>
        </div>
      </Container>

      <span aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-(image:--grad-brand)" />
      <MobileMenu open={menuOpen} onClose={closeMenu} links={links} returnFocusRef={menuButtonRef} />
    </header>
  );
}
