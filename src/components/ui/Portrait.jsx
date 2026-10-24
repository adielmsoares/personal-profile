import { useTranslation } from 'react-i18next';
import { portrait, portraitSrcSet } from '../../data/media';

/** Retrato em moldura com cantos de construção. Imagem LCP: prioritária, sem lazy. */
export function Portrait() {
  const { t } = useTranslation();

  return (
    <figure className="relative mx-auto w-full max-w-104 lg:max-w-110">
      <div className="relative hud">
        <div aria-hidden="true" className="absolute -inset-4 border border-line-subtle hc:border-line rounded-[2rem] pointer-events-none parallax [--depth:-6]">
          <span className="absolute -top-px left-10 h-px w-28 bg-(image:--grad-neon)" />
          <span className="-right-px bottom-12 absolute w-px h-20 bg-accent-3/60" />
        </div>

        <div className="relative bg-elevated rounded-card aspect-4/5 overflow-hidden">
          <picture>
            <source type="image/avif" srcSet={portraitSrcSet('avif')} sizes={portrait.sizes} />
            <source type="image/webp" srcSet={portraitSrcSet('webp')} sizes={portrait.sizes} />
            <img
              src={`${portrait.basePath}-${portrait.width}.jpg`}
              srcSet={portraitSrcSet('jpg')}
              sizes={portrait.sizes}
              width={portrait.width}
              height={portrait.height}
              alt={t('hero.portraitAlt')}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          </picture>
          <div aria-hidden="true" className="hc:hidden bottom-0 absolute inset-x-0 bg-linear-to-t from-navy-975/55 light:from-navy-975/35 to-transparent h-1/3" />
        </div>
      </div>

      <figcaption className="relative flex justify-between items-start gap-4 mt-6 pt-4 border-line-subtle hc:border-line border-t">
        <span>
          <span className="block font-display font-semibold text-fg text-base">{t('hero.portraitCaption')}</span>
          <span className="block mt-1 font-mono text-[0.6875rem] text-muted leading-snug">{t('hero.signature')}</span>
        </span>
        <span className="mt-1 font-mono text-[0.625rem] text-subtle tracking-wider" aria-hidden="true">
          AS/01
        </span>
      </figcaption>
    </figure>
  );
}
