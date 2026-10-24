import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'as-theme';
const CONTRAST_KEY = 'as-contrast';
const THEME_COLORS = { light: '#F6F9FC', dark: '#060D1B' };

function read(key, values) {
  try {
    const value = localStorage.getItem(key);
    return values.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* sem persistência disponível */
  }
}

function withTransition(update) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && document.startViewTransition) document.startViewTransition(update);
  else update();
}

function applyTheme(resolved) {
  document.documentElement.setAttribute('data-theme', resolved);
  document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[resolved]);
}

/** Tema: 'light' | 'dark' | 'system'. Sem escolha salva, segue prefers-color-scheme. */
export function useTheme() {
  const [preference, setPreferenceState] = useState('system');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const syncTheme = () => setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    setPreferenceState(read(THEME_KEY, ['light', 'dark']) ?? 'system');
    syncTheme();
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = () => {
      if (!read(THEME_KEY, ['light', 'dark'])) {
        const next = media.matches ? 'light' : 'dark';
        withTransition(() => applyTheme(next));
        setTheme(next);
      }
    };
    const onStorage = () => {
      setPreferenceState(read(THEME_KEY, ['light', 'dark']) ?? 'system');
      syncTheme();
    };
    media.addEventListener('change', onSystemChange);
    window.addEventListener('as-theme-change', onStorage);
    return () => {
      media.removeEventListener('change', onSystemChange);
      window.removeEventListener('as-theme-change', onStorage);
    };
  }, []);

  const setPreference = useCallback((next) => {
    write(THEME_KEY, next === 'system' ? null : next);
    const resolved = next === 'system' ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : next;
    withTransition(() => applyTheme(resolved));
    setTheme(resolved);
    window.dispatchEvent(new Event('as-theme-change'));
  }, []);

  return { preference, theme, setPreference };
}

/** Alto contraste independente do tema. Sem escolha salva, segue prefers-contrast. */
export function useContrast() {
  const [high, setHigh] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setHigh(root.getAttribute('data-contrast') === 'high');
    sync();
    const media = window.matchMedia('(prefers-contrast: more)');
    const onSystemChange = () => {
      if (!read(CONTRAST_KEY, ['high', 'standard'])) root.setAttribute('data-contrast', media.matches ? 'high' : 'standard');
    };
    media.addEventListener('change', onSystemChange);
    // Mantém instâncias (header e menu mobile) sincronizadas.
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-contrast'] });
    return () => {
      media.removeEventListener('change', onSystemChange);
      observer.disconnect();
    };
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute('data-contrast') === 'high' ? 'standard' : 'high';
    withTransition(() => root.setAttribute('data-contrast', next));
    write(CONTRAST_KEY, next);
  }, []);

  return { high, toggle };
}
