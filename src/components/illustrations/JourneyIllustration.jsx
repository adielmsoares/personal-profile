import { useTranslation } from 'react-i18next';
import { IllustrationFrame, MicroLabel, Skeleton } from './IllustrationFrame';

const POINTS = [
  [50, 54],
  [150, 24],
  [250, 44],
  [350, 16],
];

export default function JourneyIllustration({ label, compact = false }) {
  const { t } = useTranslation();
  const stages = t('illustrations.journey.stages', { returnObjects: true });
  const nodes = t('illustrations.journey.nodes', { returnObjects: true });

  return (
    <IllustrationFrame label={label} file="discovery / journey-map">
      <MicroLabel>{t('illustrations.journey.journeyLabel')}</MicroLabel>
      <svg viewBox="0 0 400 72" className="mt-3 w-full overflow-visible">
        {POINTS.map(([x]) => (
          <line key={x} x1={x} x2={x} y1="0" y2="72" stroke="currentColor" className="text-line-subtle" strokeDasharray="2 4" />
        ))}
        <path
          d="M0 62C25 60 35 54 50 54S120 24 150 24 220 44 250 44 320 16 350 16 390 20 400 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
        />
        {POINTS.map(([x, y], i) => (
          <rect
            key={x}
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
            className={i === 1 ? 'fill-signal text-accent' : 'fill-inset text-accent'}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <ol className="grid grid-cols-4 mt-2 font-mono text-[0.625rem] text-muted sm:text-[0.6875rem] text-center">
        {stages.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>

      {!compact ? (
        <div className="mt-5 pt-4 border-line-subtle border-t">
          <MicroLabel>{t('illustrations.journey.iaLabel')}</MicroLabel>
          <div className="flex flex-col items-center mt-3">
            <span className="px-3 py-1 border border-accent rounded font-mono text-[0.6875rem] text-fg">{nodes[0]}</span>
            <span className="bg-line w-px h-3" />
            <div className="before:top-0 before:absolute relative before:inset-x-[16.6%] gap-2 grid grid-cols-3 before:bg-line w-full before:h-px">
              {nodes.slice(1).map((node) => (
                <div key={node} className="flex flex-col items-center">
                  <span className="bg-line w-px h-3" />
                  <span className="bg-surface px-2 py-1 border border-line-subtle rounded w-full font-mono text-[0.625rem] text-muted text-center truncate">
                    {node}
                  </span>
                  <div className="flex flex-col gap-1.5 mt-2 w-4/5">
                    <Skeleton />
                    <Skeleton className="w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </IllustrationFrame>
  );
}
