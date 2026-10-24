import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { InstagramIcon, WhatsAppIcon } from '../components/ui/BrandIcons';
import { LinkedInIcon } from '../components/ui/LinkedInIcon';
import { Monogram } from '../components/ui/Logo';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeading';
import { contact, whatsappUrl } from '../data/profile';

function CopyEmailButton() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle');
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center gap-2 rounded-control border border-line-subtle px-3.5 text-sm text-muted transition-colors duration-(--dur-micro) hover:border-line hover:text-fg hc:border-line"
      >
        {status === 'copied' ? <Check aria-hidden className="size-4 text-accent" /> : <Copy aria-hidden className="size-4" />}
        {t('contact.copy')}
      </button>
      <p role="status" aria-live="polite" className="text-accent text-sm basis-full">
        {status === 'copied' ? t('contact.copied') : status === 'error' ? t('contact.copyError') : ''}
      </p>
    </>
  );
}

const valueLink =
  'group inline-flex items-center gap-2 text-lg font-medium break-all text-fg decoration-accent decoration-1 underline-offset-[6px] hover:underline';

const chip =
  'inline-flex min-h-10 items-center gap-2 rounded-full border border-line-subtle px-3.5 text-sm text-muted no-underline transition-colors duration-(--dur-micro) hover:border-accent hover:text-fg hc:border-line';

export default function Contact() {
  const { t } = useTranslation();
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(t('contact.mailSubject'))}`;
  const whatsapp = whatsappUrl(t('contact.whatsappMessage'));

  return (
    <Section id="contact" labelledBy="contact-title" className="pt-8 lg:pt-12">
      <Container>
        <Reveal className="isolate relative bg-surface px-6 sm:px-12 lg:px-16 py-14 sm:py-16 lg:py-20 border border-line-subtle hc:border-line rounded-card overflow-hidden">
          <div aria-hidden="true" className="-z-10 absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid mask-fade" />
            <div className="absolute inset-0 scanlines" />
            <div className="-top-1/2 -right-1/4 absolute size-176 animate-drift glow-a" />
            <div className="-bottom-1/2 left-0 absolute size-144 animate-drift-slow glow-c" />
            <span className="absolute inset-x-0 top-0 h-px bg-(image:--grad-neon) opacity-70" />
          </div>
          <Monogram
            mono
            className="hidden hc:hidden md:block -right-6 -bottom-8 -z-10 absolute opacity-60 w-88 text-line-subtle pointer-events-none"
          />

          <Eyebrow index="07">{t('contact.eyebrow')}</Eyebrow>
          <h2 id="contact-title" className="mt-6 max-w-3xl text-fg text-h2">
            {t('contact.title')}
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-muted">{t('contact.text')}</p>

          <div className="flex sm:flex-row flex-col gap-3 mt-10">
            <Button href={mailto} size="lg" icon={ArrowRight} className="neon-ring">
              {t('contact.cta')}
            </Button>
            <Button href={whatsapp} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" icon={ArrowUpRight}>
              {t('contact.whatsappCta')}
              <span className="sr-only"> {t('a11y.newTab')}</span>
            </Button>
          </div>

          <div className="gap-8 grid md:grid-cols-[1.4fr_1fr] mt-12 pt-8 border-line-subtle hc:border-line border-t">
            <div>
              <p className="flex items-center gap-2 text-subtle eyebrow">
                <Mail aria-hidden className="size-4" />
                {t('contact.emailLabel')}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <a href={mailto} className={valueLink}>
                  {contact.email}
                </a>
                <CopyEmailButton />
              </div>
            </div>
            <div>
              <p className="text-subtle eyebrow">{t('contact.elsewhere')}</p>
              <ul className="flex flex-wrap gap-2 mt-3">
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={chip}>
                    <WhatsAppIcon className="size-4" />
                    {contact.whatsappDisplay}
                    <span className="sr-only">WhatsApp {t('a11y.newTab')}</span>
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={chip}>
                    <LinkedInIcon className="size-3.5" />
                    LinkedIn
                    <span className="sr-only">{t('a11y.newTab')}</span>
                  </a>
                </li>
                <li>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className={chip}>
                    <InstagramIcon className="size-4" />
                    {contact.instagramHandle}
                    <span className="sr-only">Instagram {t('a11y.newTab')}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
