import { useTranslation } from 'react-i18next';
import { whatsappUrl } from '../../data/profile';
import { WhatsAppIcon } from '../ui/BrandIcons';

/** Atalho flutuante para o WhatsApp; rótulo visível no hover/foco em telas maiores. */
export default function WhatsAppButton() {
  const { t } = useTranslation();

  return (
    <a
      href={whatsappUrl(t('contact.whatsappMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      data-plain=""
      className="group neon-ring fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-(--z-fab) inline-flex h-14 animate-float-in items-center gap-0 rounded-full bg-elevated pr-4 pl-4 text-fg no-underline shadow-lift ring-1 ring-line-subtle transition-[gap,background-color] duration-(--dur-base) ease-brand hover:gap-2.5 focus-visible:gap-2.5 sm:right-6 sm:bottom-6 hc:ring-line"
    >
      <span className="relative flex justify-center items-center size-6 text-[#25D366] hc:text-fg light:text-[#128C4B]">
        <WhatsAppIcon className="size-6" />
        <span aria-hidden="true" className="hc:hidden -top-0.5 -right-0.5 absolute bg-[#25D366] rounded-full ring-2 ring-elevated size-2.5 animate-pulse-dot" />
      </span>
      <span
        aria-hidden="true"
        className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-(--dur-base) ease-brand group-hover:max-w-48 group-hover:opacity-100 group-focus-visible:max-w-48 group-focus-visible:opacity-100"
      >
        {t('contact.whatsappShort')}
      </span>
      <span className="sr-only">
        {t('contact.whatsappCta')} {t('a11y.newTab')}
      </span>
    </a>
  );
}
