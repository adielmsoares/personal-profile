import { cn } from '../../utils/cn';

/** Moldura de "janela" para demonstrações conceituais. Conteúdo interno é decorativo. */
export function IllustrationFrame({ label, file, className, children, bodyClassName, padded = true }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('bg-inset border border-line-subtle hc:border-line rounded-[10px] overflow-hidden text-left', className)}
    >
      <div aria-hidden="true" className="flex justify-between items-center gap-3 px-3.5 py-2 border-line-subtle border-b">
        <span className="flex gap-1">
          <span className="bg-line size-1.5" />
          <span className="bg-line size-1.5" />
          <span className="bg-signal size-1.5" />
        </span>
        {file ? <span className="font-mono text-[0.625rem] text-subtle truncate">{file}</span> : null}
      </div>
      <div aria-hidden="true" className={cn(padded && 'p-4 sm:p-5', bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

export function MicroLabel({ children, className }) {
  return <p className={cn('font-mono text-[0.625rem] text-subtle uppercase tracking-[0.14em]', className)}>{children}</p>;
}

export function Skeleton({ className }) {
  return <span className={cn('block bg-line-subtle hc:bg-line rounded-full h-1.5', className)} />;
}
