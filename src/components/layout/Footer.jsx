import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowUp, Mail } from 'lucide-react';
import { contact, whatsappUrl } from '../../data/profile';
import { NAV_ITEMS } from '../../data/navigation';
import { useLang } from '../../hooks/useLang';
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons';
import { LinkedInIcon } from '../ui/LinkedInIcon';
import { Logo } from '../ui/Logo';
import { Container } from './Container';

const linkClass = 'rounded-sm text-muted no-underline transition-colors duration-(--dur-micro) hover:text-fg';

export default function Footer() {
  const { t } = useTranslation();
  const { to } = useLang();
  const { pathname } = useLocation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-line-subtle hc:border-line border-t">
      <Container className="gap-12 md:gap-8 grid md:grid-cols-12 py-14 lg:py-16">
        <div className="md:col-span-5">
          <Logo showTagline />
          <p className="mt-6 max-w-sm text-muted text-sm">{t('footer.tagline')}</p>
        </div>

        <nav aria-label={t('a11y.footerNav')} className="md:col-span-4">
          <p className="text-subtle eyebrow">{t('footer.index')}</p>
          <ul className="gap-x-8 gap-y-2.5 grid grid-cols-2 mt-4 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link to={to('/', item.id)} data-plain="" className={linkClass}>
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-subtle eyebrow">{t('nav.contact')}</p>
          <ul className="space-y-2.5 mt-4 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} data-plain="" className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail aria-hidden className="size-4" />
                {t('contact.emailLabel')}
                <span className="sr-only">: {contact.email}</span>
              </a>
            </li>
            <li>
              <a href={whatsappUrl(t('contact.whatsappMessage'))} target="_blank" rel="noopener noreferrer" data-plain="" className={`${linkClass} inline-flex items-center gap-2`}>
                <WhatsAppIcon className="size-3.5" />
                WhatsApp
                <span className="sr-only">{t('a11y.newTab')}</span>
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" data-plain="" className={`${linkClass} inline-flex items-center gap-2`}>
                <LinkedInIcon className="size-3.5" />
                LinkedIn
                <span className="sr-only">{t('a11y.newTab')}</span>
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" data-plain="" className={`${linkClass} inline-flex items-center gap-2`}>
                <InstagramIcon className="size-3.5" />
                {contact.instagramHandle}
                <span className="sr-only">Instagram {t('a11y.newTab')}</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex sm:flex-row flex-col-reverse justify-between items-start sm:items-center gap-4 py-6 border-line-subtle hc:border-line border-t font-mono text-subtle text-xs">
        <p>{t('footer.rights', { year })}</p>
        <Link to={`${pathname}#top`} data-plain="" className={`${linkClass} group inline-flex items-center gap-2`}>
          {t('a11y.backToTop')}
          <ArrowUp aria-hidden className="size-3.5 transition-transform duration-(--dur-base) ease-brand group-hover:-translate-y-0.5" />
        </Link>
      </Container>
    </footer>
  );
}
