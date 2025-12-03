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
import { submitForm } from "@/app/actions";

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
  const router = useRouter();

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = externalOnOpenChange || setInternalOpen;

  const handleSubmit = async () => {
    if (!name || !email) {
      setError("Nombre y correo electrónico son obligatorios.");
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    setError("");
    setIsOpen(false);

    const formData = new FormData()

    formData.append("nombre", name);
    formData.append("email", email);
    formData.append("empresa", company)
    await submitForm(formData)
    //router.push('/demo');
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
          <DialogTitle>Solicitar Demo</DialogTitle>
          <DialogDescription>
            Complete el formulario para acceder a la demostración.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Ir a la Demo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
