import { useTranslation } from 'react-i18next';
import { Briefcase, Landmark } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { experience, progression } from '../data/profile';
import { cn } from '../utils/cn';
import { formatPeriod, toDateTime } from '../utils/period';

const CONTEXT_ICONS = { public: Landmark, private: Briefcase };

function Progression() {
  const { t } = useTranslation();
  const lastIndex = progression.length - 1;

  return (
    <Reveal className="mt-14">
      <p id="journey-progression" className="text-subtle eyebrow">
        {t('journey.progressionLabel')}
      </p>
      <ol aria-labelledby="journey-progression" className="relative gap-5 sm:gap-4 grid sm:grid-cols-5 mt-6">
        <span aria-hidden="true" className="hidden sm:block top-8.5 right-0 left-0 absolute bg-line-subtle hc:bg-line h-px" />
        <span aria-hidden="true" className="draw-line absolute top-8.5 left-0 hidden h-px w-full origin-left bg-(image:--grad-brand) sm:block" />
        {progression.map((step, i) => {
          const last = i === lastIndex;
          return (
            <li key={step.id} className="relative flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3">
              <span className="font-mono text-subtle text-xs">{step.year}</span>
              <span
                aria-hidden="true"
                className={cn('z-10 relative size-2.5 rotate-45 shrink-0', last ? 'bg-accent-2' : 'border border-line bg-page')}
              />
              <span className={cn('text-[0.95rem] leading-snug', last ? 'font-medium text-fg' : 'text-muted')}>
                {t(`journey.progression.${step.id}`)}
              </span>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}

export default function Journey() {
  const { t } = useTranslation();
  const months = t('months', { returnObjects: true });

  return (
    <Section id="journey" labelledBy="journey-title" className="bg-surface/50 border-line-subtle border-y hc:border-line">
      <Container>
        <SectionHeading id="journey-title" index="04" eyebrow={t('journey.eyebrow')} title={t('journey.title')} intro={t('journey.intro')} />

        <Progression />

        <div className="gap-12 lg:gap-10 grid lg:grid-cols-12 mt-16">
          <aside className="lg:col-span-4" aria-labelledby="journey-contexts">
            <div className="lg:top-[calc(var(--header-h)+2rem)] lg:sticky">
              <h3 id="journey-contexts" className="text-subtle eyebrow">
                {t('journey.contextsLabel')}
              </h3>
              <ul className="space-y-3 mt-5">
                {['public', 'private'].map((ctx) => {
                  const Icon = CONTEXT_ICONS[ctx];
                  return (
                    <li key={ctx} className="bg-page p-5 border border-line-subtle hc:border-line rounded-card">
                      <p className="flex items-center gap-3 font-display font-semibold text-fg">
                        <Icon aria-hidden className="size-5 text-accent" />
                        {t(`journey.contexts.${ctx}.title`)}
                      </p>
                      <p className="mt-2 text-[0.95rem] text-muted">{t(`journey.contexts.${ctx}.text`)}</p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-subtle text-sm">{t('journey.contextNote')}</p>
            </div>
          </aside>

          <ol className="relative space-y-4 lg:col-span-8">
            <span aria-hidden="true" className="top-2 bottom-2 left-1.25 absolute bg-line-subtle hc:bg-line w-px" />
            <span aria-hidden="true" className="timeline-progress absolute top-2 bottom-2 left-1.25 w-px bg-(image:--grad-brand)" />
            {experience.map((job, i) => {
              const current = !job.end;
              const Icon = CONTEXT_ICONS[job.context];
              return (
                <Reveal as="li" key={job.id} delay={Math.min(i, 3) * 70} className="relative ps-9">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'top-8 left-0 absolute size-2.75 rotate-45',
                      current ? 'bg-accent-2 shadow-[0_0_0_4px_var(--bg-surface)]' : 'border border-line bg-surface',
                    )}
                  />
                  <Card tone="page" className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <time dateTime={toDateTime(job.start)} className="font-mono text-subtle text-xs">
                        {formatPeriod(job.start, job.end, months, t('journey.present'))}
                      </time>
                      {current ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-accent-2/60 rounded-full font-mono text-[0.6875rem] text-accent-2">
                          <span aria-hidden="true" className="rounded-full size-1.5 animate-pulse-dot bg-accent-2" />
                          {t('journey.current')}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-fg text-h3">{t(`journey.items.${job.id}.role`)}</h3>
                    <p className="mt-1 font-medium text-fg">
                      {job.company}
                      {job.companyFull ? (
                        <span lang="pt-BR" className="font-normal text-muted">
                          {' '}
                          · {job.companyFull}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-3 text-muted">{t(`journey.items.${job.id}.text`)}</p>
                    <p className="inline-flex items-center gap-2 mt-4 text-subtle text-sm">
                      <Icon aria-hidden className="size-4 text-accent" />
                      {t(`journey.contexts.${job.context}.title`)}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
