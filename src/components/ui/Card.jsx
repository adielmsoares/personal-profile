import { cn } from '../../utils/cn';

/** Superfície editorial: borda que acende no topo, leve elevação no hover. */
export function Card({ as: Tag = 'article', tone = 'surface', interactive = true, className, children, ...rest }) {
  return (
    <Tag
      className={cn(
        'shadow-card border border-line-subtle hc:border-line rounded-card edge-glow',
        tone === 'page' ? 'bg-page' : tone === 'elevated' ? 'bg-elevated' : 'bg-surface',
        interactive &&
        'transition-[border-color,transform,box-shadow] duration-(--dur-base) ease-brand hover:-translate-y-0.5 hover:border-line hover:shadow-lift motion-reduce:hover:translate-y-0',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
