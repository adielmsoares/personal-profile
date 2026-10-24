import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Rola até a âncora (ou topo) a cada navegação e move o foco para o destino. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    // Páginas carregadas sob demanda podem levar alguns frames para montar o alvo.
    let frame;
    let attempts = 0;
    const id = decodeURIComponent(hash.slice(1));
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      } else if (attempts++ < 60) {
        frame = requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
