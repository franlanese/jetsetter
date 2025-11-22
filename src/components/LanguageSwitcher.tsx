"use client";

import { useTranslation } from '@/context/LanguageContext';
import Image from 'next/image';

export const LanguageSwitcher = () => {
  const { setLocale, locale } = useTranslation();

  const languages = [
    { code: 'es', name: 'Español', flag: '/images/spain.png' },
    { code: 'en', name: 'English', flag: '/images/usa.png' },
    { code: 'pt', name: 'Português', flag: '/images/brasil.png' },
  ];

  const handleLanguageChange = (e: React.MouseEvent, langCode: string) => {
    e.stopPropagation(); // Prevent event from bubbling up to NavBar
    setLocale(langCode as any);
  };

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={(e) => handleLanguageChange(e, lang.code)}
          className={`language-button ${locale === lang.code ? 'active' : ''}`}
          aria-label={`Switch to ${lang.name}`}
        >
          <Image
            src={lang.flag}
            alt={lang.name}
            width={20}
            height={20}
            className="language-flag"
          />
          <span className="language-code">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};
