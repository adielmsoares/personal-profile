import { useId } from 'react';
import { cn } from '../../utils/cn';

// Traços com terminais e junções arredondados; mesma grade 54×40 e traço 6.
export const MONOGRAM = {
  a: 'M4 37 14.5 4.5h5l5.6 17.5',
  link: 'M25.1 22 30 37',
  s: 'M18 3H7a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4H4',
  sTransform: 'matrix(1 0 .3 1 24 0)',
};

const STROKE = { fill: 'none', strokeWidth: 6, strokeLinecap: 'round', strokeLinejoin: 'round' };

// Fenda horizontal que "fatia" os glifos e trilha de circuito saindo do S.
const SLICE = { y: 19.4, h: 1.2 };
const TRACE = 'M45.2 3H49.6';
const NODE = { cx: 51.6, cy: 3, r: 1.8 };

function Glyphs({ stroke, linkStroke }) {
  return (
    <>
      <path {...STROKE} stroke={stroke} d={MONOGRAM.a} />
      <path {...STROKE} stroke={stroke} transform={MONOGRAM.sTransform} d={MONOGRAM.s} />
      <path {...STROKE} stroke={linkStroke ?? stroke} d={MONOGRAM.link} />
    </>
  );
}

/**
 * Monograma AS: a perna direita do A é o elo em gradiente que conecta as letras.
 * Camadas ciano/violeta deslocadas (aberração cromática) e fenda horizontal dão o acabamento futurista.
 */
export function Monogram({ className, mono = false, title }) {
  const id = `as-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg
      viewBox="0 0 55 40"
      className={cn('overflow-visible', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        {!mono ? (
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--brand-1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--brand-2)' }} />
          </linearGradient>
        ) : null}
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="63" height="48">
          <rect x="-4" y="-4" width="63" height="48" fill="#fff" />
          <rect x="-4" y={SLICE.y} width="63" height={SLICE.h} fill="#000" />
        </mask>
      </defs>

      <g mask={`url(#${id}-m)`}>
        {!mono ? (
          <g className="hc:hidden mix-blend-screen light:mix-blend-multiply" opacity="0.75">
            <g transform="translate(-0.9 0)" className="group-hover/logo:animate-glitch">
              <Glyphs stroke="var(--accent-2)" />
            </g>
            <g transform="translate(0.9 0)" className="group-hover/logo:animate-glitch [animation-delay:60ms]">
              <Glyphs stroke="var(--accent-3)" />
            </g>
          </g>
        ) : null}
        <Glyphs stroke="currentColor" linkStroke={mono ? 'currentColor' : `url(#${id}-g)`} />
      </g>

      <path d={TRACE} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle
        {...NODE}
        fill="none"
        strokeWidth="1.5"
        stroke={mono ? 'currentColor' : 'var(--accent-2)'}
        className="origin-[51.6px_3px] transition-transform duration-(--dur-base) ease-brand group-hover/logo:scale-125"
      />
    </svg>
  );
}

/** Construção do monograma em traço, desenhada progressivamente (hero). */
export function MonogramConstruct({ className }) {
  return (
    <svg viewBox="-6 -6 66 52" className={className} aria-hidden="true" focusable="false" fill="none">
      <g stroke="currentColor" strokeWidth="0.15" className="text-line-subtle">
        {[0, 10, 20, 30, 40].map((y) => (
          <line key={`h${y}`} x1="-6" x2="60" y1={y} y2={y} pathLength="1" className="draw" style={{ '--d': `${y * 12}ms` }} />
        ))}
        {[0, 12, 24, 36, 48].map((x) => (
          <line key={`v${x}`} y1="-6" y2="46" x1={x} x2={x} pathLength="1" className="draw" style={{ '--d': `${200 + x * 10}ms` }} />
        ))}
      </g>
      <g strokeWidth="0.35" strokeLinecap="round" strokeLinejoin="round" className="text-accent" stroke="currentColor">
        <path d={MONOGRAM.a} pathLength="1" className="draw" style={{ '--d': '700ms' }} />
        <path d={MONOGRAM.s} transform={MONOGRAM.sTransform} pathLength="1" className="draw" style={{ '--d': '950ms' }} />
      </g>
      <path
        d={MONOGRAM.link}
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="opacity-70 animate-[fade_900ms_var(--ease-brand)_1.6s_both] text-accent-3"
      />
    </svg>
  );
}

/** Logotipo horizontal. `nameClassName` controla a exibição do nome (versão compacta no mobile). */
export function Logo({ className, showTagline = false, nameClassName }) {
  return (
    <span className={cn('group/logo inline-flex items-center gap-3 text-fg', className)}>
      <Monogram className="w-auto h-6 shrink-0" />
      <span className={cn('flex-col', nameClassName || 'flex')}>
        <span className="font-display font-semibold text-[1.0625rem] leading-none tracking-[-0.01em] whitespace-nowrap">
          Adiel Soares
        </span>
        {showTagline ? (
          <span className="mt-1.5 font-mono text-[0.625rem] text-subtle uppercase tracking-[0.12em]">
            Product Design · UX/UI · Frontend
          </span>
        ) : null}
      </span>
    </span>
  );
}
