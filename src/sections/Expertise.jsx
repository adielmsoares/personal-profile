import { useTranslation } from 'react-i18next';
import { ArrowRight, Braces, Compass, Component } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TagList } from '../components/ui/TagList';
import { expertise } from '../data/profile';
import { useLang } from '../hooks/useLang';
import { cn } from '../utils/cn';

/** Fluxo de descoberta: nós conectados que se desenham ao entrar na tela. */
function ProductVisual() {
  const { t } = useTranslation();
  const steps = t('expertise.visual.product', { returnObjects: true });
  const nodes = [
    [16, 24],
    [176, 24],
    [16, 104],
    [176, 104],
  ];
  return (
    <svg viewBox="0 0 320 152" className="w-full" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.25" className="text-accent">
        <path d="M144 44h32" pathLength="1" className="draw-hover" style={{ '--d': '100ms' }} />
        <path d="M240 64v16H80v24" pathLength="1" className="draw-hover" style={{ '--d': '300ms' }} />
        <path d="M144 124h32" pathLength="1" className="draw-hover" style={{ '--d': '600ms' }} />
      </g>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width="128"
            height="40"
            rx="8"
            className={cn('stroke-line-subtle', i === 3 ? 'fill-accent/10 stroke-accent' : 'fill-page')}
          />
          <text x={x + 14} y={y + 25} className="fill-fg font-mono text-[11px]">
            {String(i + 1).padStart(2, '0')}
          </text>
          <text x={x + 38} y={y + 25} className={cn('font-sans text-[12px]', i === 3 ? 'fill-accent' : 'fill-muted')}>
            {steps[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Módulos de interface que se alinham à grade no hover. */
function InterfaceVisual() {
  const tiles = [
    'col-span-2 h-7 bg-signal/90',
    'h-7 border border-line',
    'h-7 rounded-full border border-line',
    'col-span-3 h-2 bg-line-subtle',
    'h-10 border border-accent/60 bg-accent/10 group-hover:translate-x-0 translate-x-2',
    'col-span-2 h-10 border border-line-subtle bg-page group-hover:translate-y-0 -translate-y-1.5',
  ];
  return (
    <div aria-hidden="true" className="relative gap-2 grid grid-cols-3 p-3 border border-line-subtle border-dashed rounded-control">
      {tiles.map((cls, i) => (
        <span key={i} className={cn('rounded-md transition-transform duration-(--dur-reveal) ease-brand', cls)} />
      ))}
    </div>
  );
}

/** Árvore de componentes com conexões que acendem em sequência. */
function FrontendVisual() {
  const rows = [
    ['App', 0],
    ['Layout', 1],
    ['Section', 2],
    ['Card', 3],
  ];
  return (
    <div aria-hidden="true" className="bg-inset p-4 border border-line-subtle rounded-control font-mono text-[0.75rem]">
      {rows.map(([name, depth], i) => (
        <p key={name} className="flex items-center gap-2 py-0.5" style={{ paddingInlineStart: `${depth * 18}px` }}>
          {depth > 0 ? (
            <span
              className="h-px w-3 origin-left scale-x-0 bg-accent transition-transform duration-(--dur-base) ease-brand group-hover:scale-x-100"
              style={{ transitionDelay: `${i * 90}ms` }}
            />
          ) : null}
          <span className={i === rows.length - 1 ? 'text-accent' : 'text-muted'}>{`<${name} />`}</span>
        </p>
      ))}
    </div>
  );
}

const TREATMENTS = {
  productDesign: { icon: Compass, layout: 'lg:col-span-7 lg:row-span-2', visual: ProductVisual },
  uxui: { icon: Component, layout: 'lg:col-span-5', visual: InterfaceVisual },
  frontend: { icon: Braces, layout: 'lg:col-span-5', visual: FrontendVisual },
};

export default function Expertise() {
  const { t } = useTranslation();
  const { to } = useLang();

  return (
    <Section id="expertise" labelledBy="expertise-title" className="bg-surface/50 border-line-subtle border-y hc:border-line overflow-x-clip">
      <div aria-hidden="true" className="top-0 left-1/2 -z-10 absolute size-[40rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none glow-a" />
      <Container>
        <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">
          <SectionHeading
            id="expertise-title"
            index="02"
            eyebrow={t('expertise.eyebrow')}
            title={t('expertise.title')}
            intro={t('expertise.intro')}
          />
          <Reveal className="shrink-0">
            <Button to={to('/', 'journey')} variant="text" icon={ArrowRight}>
              {t('expertise.cta')}
            </Button>
          </Reveal>
        </div>

        <div className="gap-4 grid lg:grid-cols-12 lg:grid-rows-[auto_auto] mt-14">
          {expertise.map((item, i) => {
            const { icon: Icon, layout, visual: Visual } = TREATMENTS[item.id];
            const featured = item.id === 'productDesign';
            return (
              <Reveal key={item.id} delay={i * 90} className={layout}>
                <Card tone="page" className="group flex flex-col gap-8 p-6 sm:p-8 h-full">
                  <div className="flex justify-between items-start gap-4">
                    <span className="relative flex justify-center items-center bg-surface border border-line-subtle hc:border-line rounded-control size-12 overflow-hidden text-accent">
                      <Icon aria-hidden className="size-6" />
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-(image:--grad-brand)" />
                    </span>
                    <span aria-hidden="true" className="font-mono text-subtle text-sm">
                      {item.number} / 03
                    </span>
                  </div>
                  <div>
                    <h3 className={cn('text-fg', featured ? 'text-h2' : 'text-h3')}>{t(`expertise.cards.${item.id}.title`)}</h3>
                    <p className="mt-4 max-w-xl text-muted">{t(`expertise.cards.${item.id}.text`)}</p>
                  </div>
                  <div className={cn(featured && 'lg:my-auto')}>
                    <Visual />
                  </div>
                  <div className="mt-auto">
                    <p className="text-subtle eyebrow">{t('expertise.skillsLabel')}</p>
                    <TagList items={item.skills} className="mt-3" />
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
