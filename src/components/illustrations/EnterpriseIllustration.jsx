import { useTranslation } from 'react-i18next';
import { IllustrationFrame, Skeleton } from './IllustrationFrame';

const BARS = [
  [40, 65, 50, 80, 60],
  [70, 45, 55, 35, 60],
  [30, 50, 75, 60, 90],
];

const STATUS_STYLES = [
  'border-line text-muted',
  'border-accent text-accent',
  'border-line-subtle text-subtle',
  'border-accent text-accent',
];

export default function EnterpriseIllustration({ label, compact = false }) {
  const { t } = useTranslation();
  const roles = t('illustrations.enterprise.roles', { returnObjects: true });
  const statuses = t('illustrations.enterprise.statuses', { returnObjects: true });
  const columns = t('illustrations.enterprise.columns', { returnObjects: true });

  return (
    <IllustrationFrame label={label} file="admin / requests" padded={false} bodyClassName="flex gap-4">
      <div className="hidden xs:flex flex-col items-center gap-3 py-4 border-e border-line-subtle w-11 shrink-0">
        <span className="bg-signal size-4" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`size-4 rounded-sm border ${i === 0 ? 'border-line' : 'border-line-subtle'}`} />
        ))}
      </div>

      <div className="flex-1 py-4 sm:py-5 ps-4 xs:ps-0 pe-4 sm:pe-5 min-w-0">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="font-display font-semibold text-[0.8125rem] text-fg">{t('illustrations.enterprise.title')}</p>
          <div className="flex gap-1">
            {roles.map((role, i) => (
              <span
                key={role}
                className={`rounded border px-2 py-0.5 text-[0.5625rem] ${i === 0 ? 'border-accent text-accent' : 'border-line-subtle text-subtle'}`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="gap-2 grid grid-cols-3 mt-4">
          {BARS.map((bars, i) => (
            <div key={i} className="bg-surface p-2.5 border border-line-subtle rounded-md">
              <Skeleton className="w-2/3" />
              <div className="flex items-end gap-1 mt-3 h-8">
                {bars.map((h, j) => (
                  <span
                    key={j}
                    className={`flex-1 origin-bottom transition-transform duration-(--dur-reveal) ease-brand group-hover/card:scale-y-110 ${j === bars.length - 1 ? 'bg-signal' : 'bg-line'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {!compact ? (
          <table className="mt-4 w-full text-[0.625rem] text-left table-fixed">
            <thead>
              <tr className="border-line-subtle border-b font-mono text-subtle uppercase tracking-wide">
                {columns.map((col) => (
                  <th key={col} className="pb-2 font-normal">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {statuses.map((status, i) => (
                <tr key={i} className="border-line-subtle last:border-0 border-b">
                  <td className="py-2 pe-2">
                    <Skeleton className={i % 2 ? 'w-3/4' : 'w-5/6'} />
                  </td>
                  <td className="py-2 pe-2">
                    <Skeleton className="w-1/2" />
                  </td>
                  <td className="py-2">
                    <span className={`inline-block truncate rounded border px-2 py-0.5 ${STATUS_STYLES[i]}`}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </IllustrationFrame>
  );
}
