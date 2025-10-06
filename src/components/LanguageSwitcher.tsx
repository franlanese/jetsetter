"use client";

import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Box, Globe } from 'lucide-react';
import Image from 'next/image';

export const LanguageSwitcher = () => {
  const { setLocale , locale} = useTranslation();

  const flags: Record<string, string> = {
    es: "/images/spain.png",
    en: "/images/usa.png",
    pt: "/images/brasil.png",
  };

  const currentFlag = flags[locale] || "/images/spain.png";

  const languageNames: Record<string, string> = {
    es: "Español",
    en: "English",
    pt: "Português",
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Image
              src={currentFlag}
              alt={locale.toUpperCase()}
              width={16}
              height={16}
            />
            <span>{locale.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLocale('es')} className="flex items-center gap-2">
            <Image
              src={flags["es"]}
              alt="Español"
              width={16}
              height={16}
            />
            <span>Español</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('en')} className="flex items-center gap-2">
            <Image
              src={flags["en"]}
              alt="English"
              width={16}
              height={16}
            />
            <span>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('pt')} className="flex items-center gap-2">
            <Image
              src={flags["pt"]}
              alt="Português"
              width={16}
              height={16}
            />
            <span>Português</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
