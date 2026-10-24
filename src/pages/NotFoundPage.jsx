import { useTranslation } from 'react-i18next';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/SectionHeading';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLang } from '../hooks/useLang';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const { to } = useLang();
  useDocumentMeta('notFound');

  return (
    <section id="top" aria-labelledby="notfound-title" className="isolate relative overflow-hidden">
      <div aria-hidden="true" className="-z-10 absolute inset-0 bg-grid pointer-events-none mask-fade" />
      <Container className="flex flex-col justify-center items-start py-24 min-h-[70vh]">
        <Eyebrow>{t('notFound.eyebrow')}</Eyebrow>
        <p aria-hidden="true" className="mt-6 font-display font-semibold text-[clamp(5rem,14vw,10rem)] text-line-subtle hc:text-line leading-none">
          404<span className="inline-block bg-signal size-[0.18em] align-baseline animate-blink" />
        </p>
        <h1 id="notfound-title" className="mt-6 text-fg text-h2">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 max-w-xl text-lead text-muted">{t('notFound.text')}</p>
        <Button to={to('/')} variant="secondary" className="mt-10">
          {t('notFound.cta')}
        </Button>
      </Container>
    </section>
  );
}
