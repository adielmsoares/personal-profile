import { useTranslation } from 'react-i18next';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { education } from '../data/profile';

export default function Education() {
  const { t } = useTranslation();

  return (
    <Section id="education" labelledBy="education-title" className="pt-0 lg:pt-0">
      <Container className="gap-12 lg:gap-10 grid lg:grid-cols-12 pt-24 lg:pt-32 border-line-subtle hc:border-line border-t">
        <div className="lg:col-span-5">
          <SectionHeading id="education-title" index="06" eyebrow={t('education.eyebrow')} title={t('education.title')} intro={t('education.text')} />
        </div>

        <Reveal as="ol" delay={100} className="lg:self-end lg:col-span-7 border-line-subtle hc:border-line border-t">
          {education.map((item, i) => (
            <li
              key={item.id}
              className="group grid gap-1 border-b border-line-subtle py-5 transition-colors duration-(--dur-base) hover:bg-surface sm:grid-cols-[2.5rem_9.5rem_1fr_auto] sm:items-baseline sm:gap-4 sm:px-2 hc:border-line"
            >
              <span aria-hidden="true" className="hidden sm:block font-mono text-subtle text-xs">
                0{i + 1}
              </span>
              <span className="font-mono text-accent text-xs uppercase tracking-[0.1em]">{t(`education.items.${item.id}.type`)}</span>
              <span className="font-display font-medium text-fg text-lg">{t(`education.items.${item.id}.course`)}</span>
              <span lang="pt-BR" className="text-muted text-sm">
                {item.school}
              </span>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
