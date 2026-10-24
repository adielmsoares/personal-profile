import { Contrast, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContrast, useTheme } from '../../hooks/usePreferences';
import { cn } from '../../utils/cn';

const THEME_OPTIONS = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
];

/** Grupo segmentado com indicador deslizante (itens de mesma largura). */
export function Segmented({ label, count, activeIndex, className, children }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('relative grid grid-flow-col auto-cols-fr p-0.5 border border-line-subtle hc:border-line rounded-full', className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0.5 left-0.5 rounded-full bg-elevated ring-1 ring-line-subtle transition-transform duration-(--dur-base) ease-brand hc:bg-signal hc:ring-0"
        style={{
          width: `calc((100% - 4px) / ${count})`,
          transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
          opacity: activeIndex < 0 ? 0 : 1,
        }}
      />
      {children}
    </div>
  );
}

export function ThemeSelect({ withLabels = false, className }) {
  const { t } = useTranslation();
  const { theme, setPreference } = useTheme();
  const activeIndex = THEME_OPTIONS.findIndex((o) => o.value === theme);

  return (
    <Segmented label={t('a11y.themeLabel')} count={THEME_OPTIONS.length} activeIndex={activeIndex} className={className}>
      {THEME_OPTIONS.map(({ value, icon: Icon }) => {
        const active = theme === value;
        const name = t(`a11y.themeOptions.${value}`);
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            title={withLabels ? undefined : name}
            onClick={() => setPreference(value)}
            className={cn(
              'group inline-flex z-10 relative justify-center items-center gap-2 rounded-full header-control',
              withLabels ? 'min-h-11 px-3 text-sm font-medium' : 'size-9',
              active ? 'text-fg hc:text-on-signal' : 'text-subtle hover:text-fg',
            )}
          >
            <Icon aria-hidden className={cn('size-4 transition-transform duration-(--dur-base) ease-brand group-hover:-rotate-12 group-hover:scale-110', active && 'rotate-[-8deg] scale-110')} />
            <span className={withLabels ? undefined : 'sr-only'}>{name}</span>
          </button>
        );
      })}
    </Segmented>
  );
}

export function ContrastToggle({ withLabel = false, className }) {
  const { t } = useTranslation();
  const { high, toggle } = useContrast();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={high}
      title={high ? t('a11y.contrastHintOn') : t('a11y.contrastHintOff')}
      className={cn(
        'group inline-flex justify-center items-center gap-2 border border-line-subtle hc:border-line rounded-full text-subtle header-control',
        'aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-on-signal',
        withLabel ? 'min-h-12 px-4 text-sm font-medium' : 'size-10',
        className,
      )}
    >
      <Contrast aria-hidden className="size-4 transition-transform duration-(--dur-base) ease-brand group-hover:rotate-12 group-hover:scale-110 group-aria-pressed:rotate-180" />
      <span className={withLabel ? undefined : 'sr-only'}>{t('a11y.contrast')}</span>
    </button>
  );
}
