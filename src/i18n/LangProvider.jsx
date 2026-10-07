import { useCallback, useEffect, useMemo, useState } from 'react';
import { LangContext } from './LangContext';

const STORAGE_KEY = 'lang';

function initialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    // Storage can be blocked; fall through to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export default function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the choice simply won't persist.
    }
  }, []);

  // Copy is stored as { es, en }; plain strings are language-neutral.
  const value = useMemo(
    () => ({ lang, setLang, t: (copy) => (copy && typeof copy === 'object' ? copy[lang] : copy) }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
