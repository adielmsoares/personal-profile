import { useTranslation } from 'react-i18next';
import { IllustrationFrame, MicroLabel } from './IllustrationFrame';

const SWATCHES = [
  { token: 'navy-975', className: 'bg-navy-975' },
  { token: 'blue-500', className: 'bg-blue-500' },
  { token: 'cyan-400', className: 'bg-cyan-400' },
  { token: 'ice-50', className: 'bg-ice-50' },
];

export default function DesignSystemIllustration({ label, compact = false }) {
  const { t } = useTranslation();

  return (
    <IllustrationFrame label={label} file="design-system / tokens" bodyClassName="grid gap-4 sm:grid-cols-2">
      <div>
        <MicroLabel>{t('illustrations.ds.colors')}</MicroLabel>
        <ul className="gap-2 grid grid-cols-4 mt-3">
          {SWATCHES.map((s) => (
            <li key={s.token} className="flex flex-col gap-1.5">
              <span className={`aspect-square rounded border border-line-subtle ${s.className}`} />
              <span className="font-mono text-[0.5625rem] text-subtle truncate">{s.token}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <MicroLabel>{t('illustrations.ds.type')}</MicroLabel>
        <div className="flex items-end gap-3 mt-3">
          <span className="font-display font-semibold text-fg text-4xl leading-none">Aa</span>
          <span className="font-mono text-[0.625rem] text-muted leading-relaxed">
            Bricolage / DM Sans
            <br />
            JetBrains Mono
          </span>
        </div>
      </div>

      <div className="sm:col-span-2">
        <MicroLabel>{t('illustrations.ds.states')}</MicroLabel>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="rounded-md bg-signal px-3 py-1.5 text-[0.6875rem] font-medium text-on-signal transition-transform duration-(--dur-base) ease-brand group-hover/card:-translate-y-0.5">
            {t('illustrations.ds.primary')}
          </span>
          <span className="rounded-md border border-line px-3 py-1.5 text-[0.6875rem] font-medium text-fg transition-colors duration-(--dur-base) group-hover/card:border-accent group-hover/card:text-accent">
            {t('illustrations.ds.secondary')}
          </span>
          <span className="opacity-60 px-3 py-1.5 border border-line-subtle rounded-md text-[0.6875rem] text-subtle">
            {t('illustrations.ds.disabled')}
          </span>
          <span className="flex items-center gap-2 ms-auto text-[0.6875rem] text-muted">
            {t('illustrations.ds.switchLabel')}
            <span className="relative bg-signal rounded-full w-7 h-4">
              <span className="absolute top-0.5 right-0.5 size-3 rounded-full bg-on-signal transition-transform duration-(--dur-base) ease-brand group-hover/card:-translate-x-3" />
            </span>
          </span>
        </div>
      </div>

      {!compact ? (
        <div className="sm:col-span-2">
          <span className="font-medium text-[0.6875rem] text-fg">{t('illustrations.ds.inputLabel')}</span>
          <span className="flex items-center bg-surface mt-1.5 px-3 border-2 border-accent rounded-md h-9 font-mono text-[0.6875rem] text-subtle">
            {t('illustrations.ds.inputPlaceholder')}
            <span className="bg-fg ms-0.5 w-px h-3.5" />
          </span>
          <div className="flex flex-wrap gap-2 mt-3 font-mono text-[0.5625rem] text-subtle">
            <span className="px-1.5 py-0.5 border border-line-subtle rounded">--radius-control: 10px</span>
            <span className="px-1.5 py-0.5 border border-line-subtle rounded">--space-4: 16px</span>
          </div>
        </div>
      ) : null}
    </IllustrationFrame>
  );
}
