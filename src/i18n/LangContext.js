import { createContext, useContext } from 'react';

export const LangContext = createContext({ lang: 'es', setLang: () => {}, t: (value) => value });

export const useLang = () => useContext(LangContext);
