import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { MonogramConstruct } from '../components/ui/Logo';
import { Portrait } from '../components/ui/Portrait';
import { specialties } from '../data/profile';
import { useLang } from '../hooks/useLang';
import { useParallax } from '../hooks/useParallax';

const FACTS = ['current', 'since', 'focus'];

/** Headline com quebras intencionais (\n nas traduções), revelada linha a linha. */
function Headline({ id, text }) {
  return (
    <h1 id={id} className="mt-7 text-display text-fg max-[25rem]:text-[2.25rem] lines">
      {text.split('\n').map((line, i) => (
        <span key={line} className="line">
          <span style={{ '--i': i }} className={i === 1 ? 'text-neon' : undefined}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const { to } = useLang();
  const ref = useRef(null);
  useParallax(ref);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="relative isolate -mt-(--header-h) overflow-hidden pt-(--header-h)"
    >
      <div aria-hidden="true" className="-z-10 absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid mask-fade" />
        <div className="absolute inset-0 scanlines" />
        <div className="-top-1/4 -right-1/4 absolute size-240 animate-drift glow-a" />
        <div className="-bottom-1/3 -left-1/4 absolute size-192 animate-drift-slow glow-b" />
        <div className="top-1/3 left-1/3 absolute size-160 animate-drift glow-c" />
        <div className="hc:hidden bottom-0 absolute inset-x-0 grid-floor h-[42%]">
          <div className="plane">
            <span />
          </div>
        </div>
        <MonogramConstruct className="hidden hc:hidden lg:block top-[6%] right-[-10%] absolute opacity-50 w-184 parallax [--depth:14]" />
      </div>

      <Container className="items-center gap-16 lg:gap-10 grid lg:grid-cols-12 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 bg-surface/60 py-1.5 ps-2.5 pe-3.5 border border-line-subtle hc:border-line rounded-full text-[0.8125rem] text-muted animate-reveal">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 rounded-full animate-pulse-dot bg-accent-2" />
            </span>
            {t('hero.role')}
          </p>

          <Headline id="hero-title" text={t('hero.title')} />

          <p className="mt-7 max-w-xl text-lead text-muted animate-reveal [animation-delay:420ms]">{t('hero.text')}</p>

          <div className="flex sm:flex-row flex-col gap-3 mt-9 animate-reveal [animation-delay:500ms]">
            <Button to={to('/', 'expertise')} size="lg" icon={ArrowRight} className="neon-ring">
              {t('hero.ctaPrimary')}
            </Button>
            <Button to={to('/', 'contact')} variant="secondary" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          <dl className="gap-6 grid sm:grid-cols-3 mt-14 pt-6 border-line-subtle hc:border-line border-t animate-reveal [animation-delay:580ms]">
            {FACTS.map((fact) => (
              <div key={fact}>
                <dt className="font-mono text-[0.6875rem] text-subtle uppercase tracking-widest">{t(`hero.facts.${fact}Label`)}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-fg leading-snug">{t(`hero.facts.${fact}Value`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 animate-[reveal_900ms_var(--ease-brand)_240ms_both]">
          <div className="parallax [--depth:-4]">
            <Portrait />
          </div>
        </div>
      </Container>

      <div className="bg-surface/40 border-line-subtle border-y hc:border-line">
        <Container className="flex sm:flex-row flex-col sm:items-center gap-3 sm:gap-8 py-4">
          <p id="hero-specialties" className="text-subtle eyebrow shrink-0">
            {t('hero.specialtiesLabel')}
          </p>
          <ul aria-labelledby="hero-specialties" className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-muted">
            {specialties.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? <span aria-hidden="true" className="size-1 rotate-45 bg-accent-2" /> : null}
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
