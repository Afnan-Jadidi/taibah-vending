import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations';

const LanguageContext = createContext({
  lang: 'ar',
  setLang: () => {},
  t: (key) => key,
  dir: 'rtl',
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [lang, dir]);

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations.ar;
      return dict[key] ?? translations.ar[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
