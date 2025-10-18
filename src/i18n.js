import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { languages as languageList, translations } from './translations';

export const languages = languageList;

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  // Load saved language from localStorage, default to 'en'
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('verityguard_language');
    return saved && translations[saved] ? saved : 'en';
  });

  // Save language to localStorage and update document direction
  useEffect(() => {
    localStorage.setItem('verityguard_language', lang);
    
    // Set document direction for RTL languages (Arabic)
    const currentLang = languages.find(l => l.code === lang);
    if (currentLang) {
      document.documentElement.dir = currentLang.dir;
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => {
    return (key, fallback = key) => {
      return translations[lang]?.[key] || translations.en?.[key] || fallback;
    };
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
