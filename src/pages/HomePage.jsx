import { useDocumentMeta } from '../hooks/useDocumentMeta';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Education from '../sections/Education';
import Expertise from '../sections/Expertise';
import Hero from '../sections/Hero';
import Journey from '../sections/Journey';
import PortfolioPreview from '../sections/PortfolioPreview';
import Skills from '../sections/Skills';

export default function HomePage() {
  useDocumentMeta('home');

  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <PortfolioPreview />
      <Journey />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
