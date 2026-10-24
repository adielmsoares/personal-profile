import { Route, Routes } from 'react-router';
import LangLayout from '../components/layout/LangLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import PortfolioPage from '../pages/PortfolioPage';

function localizedRoutes(lang, base) {
  return (
    <Route key={lang} path={base} element={<LangLayout lang={lang} />}>
      <Route index element={<HomePage />} />
      <Route path="portfolio" element={<PortfolioPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  );
}

export default function App() {
  return (
    <Routes>
      {localizedRoutes('pt-BR', '/')}
      {localizedRoutes('en', '/en')}
      {localizedRoutes('es', '/es')}
    </Routes>
  );
}
