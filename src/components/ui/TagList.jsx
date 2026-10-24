import { cn } from '../../utils/cn';

export function TagList({ items, className, label }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-2 bg-page px-2.5 py-1.5 border border-line-subtle hc:border-line rounded-md font-mono text-[0.75rem] text-muted leading-none"
        >
          <span aria-hidden="true" className="bg-line size-1" />
          {item}
        </li>
      ))}
    </ul>
  );
}
