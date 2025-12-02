"use client";

import Link from "next/link";
import { Send } from "lucide-react";

import { useTranslation } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t">
      <div className="flex items-center justify-between py-8 px-5">
        <div className="flex items-center gap-2">
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="http://zonodev.ar" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('nav.aboutUs')}</a>
          <Link href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
          <Link href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Zonodev. {t('footerRights')}
        </p>
      </div>
    </footer>
  );
}
