import { useTranslation } from 'react-i18next';
import { ArrowRight, Component, Landmark, Layers, PanelsTopLeft, Workflow } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { experience } from '../data/profile';
import { useLang } from '../hooks/useLang';

const FOCUS_ICONS = [Landmark, PanelsTopLeft, Workflow, Component, Layers];
const EMPLOYERS = [...new Set(experience.map((job) => job.company))];

export default function About() {
  const { t } = useTranslation();
  const { to } = useLang();
  const focus = t('about.focus', { returnObjects: true });

  return (
    <Section id="about" labelledBy="about-title">
      <Container className="gap-16 lg:gap-10 grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading id="about-title" index="01" eyebrow={t('about.eyebrow')} title={t('about.title')} />
          <Reveal className="space-y-5 mt-8 max-w-xl text-lead text-muted">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </Reveal>
          <Reveal className="mt-8">
            <Button to={to('/', 'expertise')} variant="text" icon={ArrowRight}>
              {t('about.cta')}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:self-center lg:col-span-5 lg:col-start-8">
          <h3 className="text-subtle eyebrow">{t('about.focusLabel')}</h3>
          <ol className="mt-5 border-line-subtle hc:border-line border-t">
            {focus.map((item, i) => {
              const Icon = FOCUS_ICONS[i];
              return (
                <li key={item} className="group flex items-center gap-4 py-4 border-line-subtle hc:border-line border-b">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-control border border-line-subtle bg-surface text-accent transition-colors duration-(--dur-base) group-hover:border-accent hc:border-line">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="text-fg">{item}</span>
                  <span aria-hidden="true" className="ms-auto font-mono text-subtle text-xs">
                    0{i + 1}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="bg-surface mt-8 p-5 border border-line-subtle hc:border-line rounded-card">
            <p className="text-subtle eyebrow">{t('about.employersLabel')}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-3 font-display font-medium text-fg text-lg">
              {EMPLOYERS.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p className="mt-3 text-subtle text-sm">{t('about.employersNote')}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
