import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import { AREA_ILLUSTRATIONS } from '../components/illustrations';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { portfolioAreas } from '../data/profile';
import { useLang } from '../hooks/useLang';
import { cn } from '../utils/cn';

const LAYOUT = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];

export default function PortfolioPreview() {
  const { t } = useTranslation();
  const { to } = useLang();

  return (
    <Section id="portfolio" labelledBy="portfolio-title">
      <Container>
        <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">
          <SectionHeading
            id="portfolio-title"
            index="03"
            eyebrow={t('portfolio.eyebrow')}
            title={t('portfolio.title')}
            intro={t('portfolio.text')}
          />
          <Reveal className="shrink-0">
            <Button to={to('/portfolio')} variant="secondary" icon={ArrowRight}>
              {t('portfolio.cta')}
            </Button>
          </Reveal>
        </div>

        <ul className="gap-4 grid md:grid-cols-12 mt-14">
          {portfolioAreas.map((area, i) => {
            const Illustration = AREA_ILLUSTRATIONS[area.id];
            const title = t(`portfolio.areas.${area.id}.title`);
            return (
              <Reveal as="li" key={area.id} delay={(i % 2) * 90} className={LAYOUT[i]}>
                <Card className="group/card flex flex-col p-4 sm:p-5 h-full">
                  <div className="relative rounded-[0.75rem] overflow-hidden">
                    <div className="transition-transform duration-(--dur-reveal) ease-brand group-hover/card:scale-[1.015]">
                      <Illustration compact label={`${t('a11y.illustration')}: ${title}`} />
                    </div>
                    <span className="top-2.5 right-2.5 absolute bg-page/85 px-2 py-0.5 border border-line-subtle rounded-full font-mono text-[0.625rem] text-subtle">
                      {t('portfolio.illustrative')}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 px-1 pt-7 pb-1">
                    <p aria-hidden="true" className="font-mono text-accent text-xs">
                      {area.number}
                    </p>
                    <h3 className="mt-2 text-fg text-h3">{title}</h3>
                    <p className="mt-3 text-muted">{t(`portfolio.areas.${area.id}.summary`)}</p>
                    <Link
                      to={to('/portfolio', area.anchor)}
                      data-plain=""
                      className={cn(
                        'inline-flex items-center self-start gap-2 mt-auto pt-6 font-medium text-accent text-sm no-underline',
                        "after:absolute after:inset-0 after:rounded-card after:content-[''] hover:underline hover:underline-offset-4",
                      )}
                    >
                      {t('portfolio.explore')}
                      <span className="sr-only">: {title}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-(--dur-base) ease-brand group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </ul>

        <Reveal as="p" className="flex items-start gap-3 mt-8 text-subtle text-sm">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          {t('portfolio.note')}
        </Reveal>
      </Container>
    </Section>
  );
}
