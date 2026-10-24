import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { AREA_ILLUSTRATIONS } from '../components/illustrations';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeading';
import { TagList } from '../components/ui/TagList';
import { portfolioAreas } from '../data/profile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLang } from '../hooks/useLang';

function SubHeading({ children }) {
  return <h3 className="text-subtle eyebrow">{children}</h3>;
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5 mt-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted">
          <span aria-hidden="true" className="bg-accent mt-[0.6em] size-1.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AreaSection({ area, index }) {
  const { t } = useTranslation();
  const Illustration = AREA_ILLUSTRATIONS[area.id];
  const base = `portfolioPage.areas.${area.id}`;
  const title = t(`portfolio.areas.${area.id}.title`);
  const headingId = `${area.anchor}-title`;

  return (
    <section
      id={area.anchor}
      aria-labelledby={headingId}
      tabIndex={-1}
      className={index % 2 ? 'border-t border-line-subtle bg-surface py-20 lg:py-28 hc:border-line' : 'border-t border-line-subtle py-20 lg:py-28 hc:border-line'}
    >
      <Container className="gap-12 lg:gap-10 grid lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p aria-hidden="true" className="font-mono text-subtle text-xs">
              <span className="text-accent">{area.number}</span> / 04
            </p>
            <h2 id={headingId} className="mt-3 text-fg text-h2">
              {title}
            </h2>
            <p className="mt-5 text-lead text-muted">{t(`portfolio.areas.${area.id}.summary`)}</p>
          </Reveal>

          <Reveal className="mt-12">
            <SubHeading>{t('portfolioPage.labels.context')}</SubHeading>
            <p className="mt-4 text-fg">{t(`${base}.context`)}</p>
          </Reveal>

          <Reveal className="mt-10">
            <SubHeading>{t('portfolioPage.labels.challenges')}</SubHeading>
            <BulletList items={t(`${base}.challenges`, { returnObjects: true })} />
          </Reveal>

          <Reveal className="gap-px grid sm:grid-cols-2 bg-line-subtle hc:bg-line mt-10 border border-line-subtle hc:border-line rounded-card overflow-hidden">
            {['ux', 'engineering'].map((kind) => (
              <div key={kind} className="bg-page p-6">
                <SubHeading>{t(`portfolioPage.labels.${kind}`)}</SubHeading>
                <p className="mt-3 text-[0.95rem] text-muted">{t(`${base}.${kind}`)}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:top-[calc(var(--header-h)+2rem)] lg:sticky space-y-10">
            <Reveal delay={100}>
              <SubHeading>{t('portfolioPage.labels.demo')}</SubHeading>
              <div className="group/card mt-4">
                <Illustration label={`${t('a11y.illustration')}: ${title}`} />
              </div>
            </Reveal>
            <Reveal>
              <SubHeading>{t('portfolioPage.labels.competencies')}</SubHeading>
              <TagList items={area.competencies} className="mt-4" />
            </Reveal>
            <Reveal className="gap-10 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <SubHeading>{t('portfolioPage.labels.methods')}</SubHeading>
                <BulletList items={t(`${base}.methods`, { returnObjects: true })} />
              </div>
              <div>
                <SubHeading>{t('portfolioPage.labels.deliverables')}</SubHeading>
                <BulletList items={t(`${base}.deliverables`, { returnObjects: true })} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function PortfolioPage() {
  const { t } = useTranslation();
  const { to } = useLang();
  useDocumentMeta('portfolio');

  return (
    <>
      <section id="top" aria-labelledby="portfolio-page-title" tabIndex={-1} className="isolate relative overflow-hidden">
        <div aria-hidden="true" className="-z-10 absolute inset-0 bg-grid pointer-events-none mask-fade" />
        <Container className="pt-10 sm:pt-14 pb-20 lg:pb-28">
          <Link
            to={to('/', 'portfolio')}
            data-plain=""
            className="group inline-flex items-center gap-2 min-h-10 font-mono text-muted hover:text-fg text-xs no-underline uppercase tracking-wide transition-colors"
          >
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-(--dur-base) ease-brand group-hover:-translate-x-0.5" />
            {t('portfolioPage.backHome')}
          </Link>

          <div className="gap-12 lg:gap-10 grid lg:grid-cols-12 mt-10">
            <div className="lg:col-span-7">
              <Eyebrow className="animate-reveal">{t('portfolioPage.eyebrow')}</Eyebrow>
              <h1
                id="portfolio-page-title"
                className="mt-6 text-fg text-h2 lg:text-[3.75rem] lg:leading-[1.02] animate-reveal [animation-delay:80ms]"
              >
                {t('portfolioPage.title')}
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-muted animate-reveal [animation-delay:160ms]">{t('portfolioPage.intro')}</p>
              <p className="flex items-start gap-3 mt-8 py-1 ps-4 border-signal border-l-2 max-w-2xl text-muted text-sm animate-reveal [animation-delay:220ms]">
                <Info aria-hidden className="mt-0.5 size-4 text-accent shrink-0" />
                {t('portfolioPage.disclaimer')}
              </p>
            </div>

            <nav aria-labelledby="portfolio-index" className="lg:self-end lg:col-span-4 lg:col-start-9 animate-reveal [animation-delay:200ms]">
              <h2 id="portfolio-index" className="text-subtle eyebrow">
                {t('portfolioPage.indexLabel')}
              </h2>
              <ol className="mt-4 border-line-subtle hc:border-line border-t">
                {portfolioAreas.map((area) => (
                  <li key={area.id} className="border-line-subtle hc:border-line border-b">
                    <Link
                      to={to('/portfolio', area.anchor)}
                      data-plain=""
                      className="group flex items-center gap-4 py-3 min-h-14 text-fg hover:text-accent no-underline transition-colors"
                    >
                      <span aria-hidden="true" className="w-4 font-mono text-accent text-xs">
                        {area.number}
                      </span>
                      <span className="flex-1 font-medium">{t(`portfolio.areas.${area.id}.title`)}</span>
                      <ArrowDown
                        aria-hidden
                        className="size-4 text-subtle transition-transform duration-(--dur-base) ease-brand group-hover:translate-y-0.5 group-hover:text-accent"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Container>
      </section>

      {portfolioAreas.map((area, i) => (
        <AreaSection key={area.id} area={area} index={i} />
      ))}

      <section aria-labelledby="portfolio-closing" className="py-20 lg:py-28 border-line-subtle hc:border-line border-t">
        <Container>
          <Reveal className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-8 bg-surface p-8 sm:p-12 border border-line-subtle hc:border-line rounded-card">
            <div className="max-w-2xl">
              <h2 id="portfolio-closing" className="text-fg text-h3 sm:text-[2rem] sm:leading-tight">
                {t('portfolioPage.closingTitle')}
              </h2>
              <p className="mt-3 text-muted">{t('portfolioPage.closingText')}</p>
            </div>
            <Button to={to('/', 'contact')} size="lg" icon={ArrowRight}>
              {t('portfolioPage.closingCta')}
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
