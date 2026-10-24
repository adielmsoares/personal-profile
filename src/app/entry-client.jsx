import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource-variable/dm-sans/opsz.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import '../styles/index.css';
import { initI18n, loadLanguage } from '../i18n';
import { getLangFromPath } from '../i18n/routing';
import App from './App';

async function start() {
  const lang = getLangFromPath(window.location.pathname);
  // O HTML pré-renderizado embute as traduções do idioma atual; em dev, carrega sob demanda.
  const inline = document.getElementById('i18n-data');
  if (inline) {
    initI18n(lang, { [lang]: { translation: JSON.parse(inline.textContent) } });
  } else {
    initI18n(lang);
    await loadLanguage(lang);
  }

  const container = document.getElementById('root');
  const app = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );

  // data-csr: HTML genérico (ex.: 404.html servido em qualquer URL) — renderiza do zero em vez de hidratar.
  if (container.firstElementChild && !container.hasAttribute('data-csr')) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
  window.__asReady = true;
}

start();
