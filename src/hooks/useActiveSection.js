import { useEffect, useState } from 'react';

/** Retorna o id da seção atualmente na faixa central da viewport. */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) {
      setActive(null);
      return undefined;
    }
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key, enabled]);

  return active;
}
