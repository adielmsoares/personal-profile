import { useEffect } from 'react';

/** Define --px/--py (−1…1) no elemento conforme o ponteiro. Só ativa com ponteiro fino e sem movimento reduzido. */
export function useParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ok = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!ok.matches) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
