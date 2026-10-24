import { useTranslation } from 'react-i18next';
import { IllustrationFrame, MicroLabel, Skeleton } from './IllustrationFrame';

const k = 'text-accent';
const s = 'text-muted';
const c = 'text-subtle';

const CODE = [
  [[k, 'export function '], ['text-fg', 'Card'], [s, '({ title, tone }) {']],
  [[k, '  return '], [s, '(']],
  [[c, '    <'], ['text-fg', 'article '], [s, 'className={card({ tone })}'], [c, '>']],
  [[c, '      <'], ['text-fg', 'Heading '], [s, 'level={3}'], [c, '>'], [s, '{title}'], [c, '</Heading>']],
  [[c, '      <'], ['text-fg', 'Slot '], [s, 'name="content"'], [c, ' />']],
  [[c, '    </'], ['text-fg', 'article'], [c, '>']],
  [[s, '  );']],
  [[s, '}']],
];

const TREE = [
  ['App', 0],
  ['Layout', 1],
  ['Header', 2],
  ['Section', 2],
  ['Card', 3],
  ['Button', 3],
];

export default function CodeIllustration({ label, compact = false }) {
  const { t } = useTranslation();

  return (
    <IllustrationFrame label={label} file="src/components/Card.tsx" padded={false} bodyClassName="grid gap-4 sm:grid-cols-[1.35fr_1fr]">
      <div className="p-4 sm:p-5 border-line-subtle sm:border-e border-b sm:border-b-0 overflow-hidden">
        <pre className="font-mono text-[0.625rem] sm:text-[0.6875rem] leading-[1.75] whitespace-pre">
          {CODE.map((line, i) => (
            <span key={i} className="block">
              <span className="inline-block opacity-60 me-3 w-3 text-subtle text-end select-none">{i + 1}</span>
              {line.map(([cls, text], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
              {i === CODE.length - 1 ? <span className="inline-block bg-signal ms-0.5 w-1.5 h-3 align-middle animate-blink" /> : null}
            </span>
          ))}
        </pre>
      </div>

      <div className="px-4 sm:py-5 sm:pe-5 pb-4">
        <MicroLabel>{t('illustrations.code.tree')}</MicroLabel>
        <ul className="space-y-1.5 mt-3 font-mono text-[0.625rem] sm:text-[0.6875rem]">
          {TREE.map(([name, depth]) => (
            <li key={name} className="flex items-center gap-1.5" style={{ paddingInlineStart: `${depth * 12}px` }}>
              <span className={`size-1.5 ${name === 'Card' ? 'bg-signal' : 'bg-line'}`} />
              <span className={name === 'Card' ? 'text-accent' : 'text-muted'}>{`<${name} />`}</span>
            </li>
          ))}
        </ul>

        {!compact ? (
          <>
            <MicroLabel className="mt-5">{t('illustrations.code.preview')}</MicroLabel>
            <div className="bg-surface mt-3 p-3 border border-accent rounded-md">
              <span className="block bg-fg/70 rounded-full w-1/2 h-2" />
              <div className="space-y-1.5 mt-2.5">
                <Skeleton />
                <Skeleton className="w-4/5" />
              </div>
              <span className="block bg-signal mt-3 rounded w-14 h-4" />
            </div>
          </>
        ) : null}
      </div>
    </IllustrationFrame>
  );
}
