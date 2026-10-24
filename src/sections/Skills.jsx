import { useTranslation } from 'react-i18next';
import { Code, Cpu, Layers, Puzzle, Users } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TagList } from '../components/ui/TagList';
import { skillGroups } from '../data/profile';
import { cn } from '../utils/cn';

const ICONS = { product: Users, interface: Layers, frontend: Code, ai: Cpu, complementary: Puzzle };

const LAYOUT = {
  product: 'lg:col-span-2',
  interface: 'lg:col-span-2',
  frontend: 'lg:col-span-2',
  ai: 'sm:col-span-2 lg:col-span-4',
  complementary: 'lg:col-span-2',
};

export default function Skills() {
  const { t } = useTranslation();

  return (
    <Section id="skills" labelledBy="skills-title">
      <Container>
        <SectionHeading id="skills-title" index="05" eyebrow={t('skills.eyebrow')} title={t('skills.title')} intro={t('skills.intro')} />

        <ul className="gap-4 grid sm:grid-cols-2 lg:grid-cols-6 grid-flow-row-dense mt-14">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.id];
            const featured = group.id === 'ai';
            return (
              <Reveal as="li" key={group.id} delay={(i % 3) * 80} className={LAYOUT[group.id]}>
                <Card className={cn('flex flex-col p-6 sm:p-7 h-full', featured && 'lg:grid lg:grid-cols-2 lg:gap-x-8')}>
                  <div className={cn('flex justify-between items-center gap-3', featured && 'lg:col-span-2')}>
                    <Icon aria-hidden className="size-5 text-accent" />
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-sm font-mono text-[0.6875rem] uppercase tracking-widest',
                        featured ? 'bg-signal text-on-signal' : 'border border-line-subtle text-subtle hc:border-line',
                      )}
                    >
                      {t(`skills.groups.${group.id}.level`)}
                    </span>
                  </div>
                  <div>
                    <h3 className="mt-8 font-display text-fg text-xl">{t(`skills.groups.${group.id}.title`)}</h3>
                    {featured ? <p className="mt-3 text-[0.95rem] text-muted">{t('skills.groups.ai.text')}</p> : null}
                  </div>
                  <TagList items={group.items} className={cn('mt-5', featured && 'lg:mt-8 lg:self-end')} />
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
