import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { initI18n } from '../i18n';
import ptBR from '../i18n/locales/pt-BR.json';
import en from '../i18n/locales/en.json';
import es from '../i18n/locales/es.json';
import App from './App';

const resources = {
  'pt-BR': { translation: ptBR },
  en: { translation: en },
  es: { translation: es },
};

export async function render(url, lang) {
  const i18n = initI18n(lang, resources);
  await i18n.changeLanguage(lang);

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );

  const chunks = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
