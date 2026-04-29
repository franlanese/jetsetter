"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { submitDemoRequest } from "@/app/actions"; // función que conecta con Laravel
import { useTranslation } from '@/context/LanguageContext';
interface DemoRequestDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DemoRequestDialog({ children, open: externalOpen, onOpenChange: externalOnOpenChange }: DemoRequestDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = externalOnOpenChange || setInternalOpen;

  const handleSubmit = async () => {
    setError("");

    if (!name || !email) {
      setError(t('demoDialog.errorFields'));
      return;
    }

    setIsSubmitting(true);

    // Validaciones locales de React
    const formData = new FormData()
    formData.append("nombre", name);
    formData.append("email", email);
    formData.append("empresa", company)

    // Llamo a la nueva función que conecta con Laravel
    const response = await submitDemoRequest(formData);

    setIsSubmitting(false);

    if (response && !response.success) {
        setError(response.message);
    } else {
        setSuccess(true);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Save current scroll position before closing
      const scrollY = window.scrollY;
      setIsOpen(open);
      // Restore scroll position after a short delay
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
      // Reset form states when closing
      setTimeout(() => {
        setSuccess(false);
        setError("");
        setName("");
        setEmail("");
        setCompany("");
      }, 300);
    } else {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[calc(100%_-_1rem)] sm:w-full sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{success ? t('demoDialog.titleSuccess') : t('demoDialog.title')}</DialogTitle>
          <DialogDescription>
            {success ? "" : t('demoDialog.desc')}
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h3 className="text-xl font-semibold">{t('demoDialog.successHeading')}</h3>
            <p className="text-slate-500 max-w-sm">
              {t('demoDialog.successDesc')}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Correo
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Empresa
              </Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="col-span-3"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        )}
        <DialogFooter>
          {success ? (
            <Button type="button" onClick={() => handleOpenChange(false)}>
              {t('demoDialog.close')}
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? t('demoDialog.submitting') : t('demoDialog.title')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
