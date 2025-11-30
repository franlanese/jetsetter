"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import es from '@/lib/locales/es/common.json';
import en from '@/lib/locales/en/common.json';
import pt from '@/lib/locales/pt/common.json';

const translations: Record<string, any> = { es, en, pt };

type Locale = 'es' | 'en' | 'pt';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('es');
  const [messages, setMessages] = useState(translations.es);

  useEffect(() => {
    setMessages(translations[locale]);
  }, [locale]);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value === undefined || value === null) return key;
      value = value[k];
    }

    return value === undefined ? key : (value as string);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
