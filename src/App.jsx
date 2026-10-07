import { useEffect } from 'react';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Figures from './components/Figures';
import Frame from './components/Frame';
import Hero from './components/Hero';
import Principles from './components/Principles';
import Work from './components/Work';
import LangProvider from './i18n/LangProvider';

// The old multi-page routes now live as sections of a single sheet.
const LEGACY_ROUTES = { '/proyectos': 'obra', '/contacto': 'contacto' };

export default function App() {
  useEffect(() => {
    const legacy = LEGACY_ROUTES[location.pathname.replace(/\/$/, '')];
    if (legacy) history.replaceState(null, '', `/#${legacy}`);
    const target = legacy ?? decodeURIComponent(location.hash.slice(1));
    if (target) document.getElementById(target)?.scrollIntoView();
  }, []);

  return (
    <LangProvider>
      <Frame />
      <main className="sheet">
        <Hero />
        <Principles />
        <Work />
        <Figures />
        <Contact />
      </main>
      <Cursor />
    </LangProvider>
  );
}
