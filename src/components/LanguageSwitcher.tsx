import { useTranslation } from '@/context/LanguageContext';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const LanguageSwitcher = () => {
  const { setLocale, locale } = useTranslation();

  const languages = [
    { code: 'es', name: 'Español', flag: '/images/spain.png' },
    { code: 'en', name: 'English', flag: '/images/usa.png' },
    { code: 'pt', name: 'Português', flag: '/images/brasil.png' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    setLocale(langCode as any);
  };

  return (
    <>
      {/* Desktop View - Dropdown */}
      <div className="hidden md:block">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-4 h-[44px] rounded-[0.75rem] border border-white/10 bg-[rgba(15,23,42,0.5)] hover:bg-[rgba(15,23,42,0.7)] text-white hover:text-white backdrop-blur-[12px] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
              <Image
                src={currentLanguage.flag}
                alt={currentLanguage.name}
                width={20}
                height={20}
                className="language-flag"
              />
              <span className="uppercase">{currentLanguage.code}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[rgba(15,23,42,0.9)] border-white/10 backdrop-blur-[12px] text-white">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center gap-2 cursor-pointer focus:bg-white/10 focus:text-white"
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={20}
                  height={20}
                  className="language-flag"
                />
                <span>{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile View - List */}
      <div className="language-selector md:hidden">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
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
    </>
  );
};
