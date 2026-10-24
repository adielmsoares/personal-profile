import { cn } from '../../utils/cn';
import { Reveal } from './Reveal';

export function Eyebrow({ index, children, className }) {
  return (
    <p className={cn('flex items-center gap-3 text-subtle eyebrow', className)}>
      {index ? (
        <>
          <span aria-hidden="true" className="text-accent">
            {index}
          </span>
          <span aria-hidden="true" className="bg-line w-6 h-px" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({ id, index, eyebrow, title, intro, className, children }) {
  return (
    <Reveal className={cn('max-w-3xl', className)}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-5 text-fg text-h2">
        {title}
      </h2>
      {intro ? <p className="mt-5 max-w-2xl text-lead text-muted">{intro}</p> : null}
      {children}
    </Reveal>
  );
}
