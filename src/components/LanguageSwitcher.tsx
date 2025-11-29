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
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-10 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground">
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
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center gap-2 cursor-pointer"
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
