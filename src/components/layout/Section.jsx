import { cn } from '../../utils/cn';

export function Section({ id, labelledBy, className, children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} tabIndex={-1} className={cn('relative py-24 lg:py-32', className)}>
      {children}
    </section>
  );
}
