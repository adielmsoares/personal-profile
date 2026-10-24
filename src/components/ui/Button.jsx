import { Link } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-medium leading-none whitespace-nowrap select-none ' +
  'transition-[background-color,border-color,color,transform] duration-(--dur-micro) ease-standard ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

const variants = {
  primary:
    'rounded-full bg-signal text-on-signal hover:bg-signal-strong hover:shadow-[0_10px_32px_-10px_var(--signal)] active:scale-[0.98] hc:outline hc:outline-1 hc:outline-line hc:hover:shadow-none',
  secondary: 'rounded-full border border-line text-fg hover:border-accent hover:text-accent active:scale-[0.98]',
  text: 'text-accent underline decoration-transparent decoration-1 underline-offset-[6px] hover:decoration-current',
};

const sizes = {
  sm: 'min-h-10 px-5 text-sm',
  md: 'min-h-12 px-6 text-[0.95rem]',
  lg: 'min-h-13 px-7 text-base',
};

/** Botão polimórfico: `to` → Link interno, `href` → âncora, senão <button>. */
export function Button({ to, href, variant = 'primary', size = 'md', icon: Icon, loading = false, className, children, ...rest }) {
  const classes = cn(base, variants[variant], variant === 'text' ? 'min-h-11 text-[0.95rem]' : sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {loading ? (
        <LoaderCircle aria-hidden className="size-4 animate-spin" />
      ) : Icon ? (
        <Icon aria-hidden className="size-4 shrink-0 transition-transform duration-(--dur-base) ease-brand group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} data-plain="" {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} data-plain="" {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} disabled={loading || rest.disabled} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
