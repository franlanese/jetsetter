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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle } from "lucide-react";

interface RegisterDialogProps {
  children: React.ReactNode;
}

export function RegisterDialog({ children }: RegisterDialogProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [open, setOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { setShowLoginDialog, setShowRegisterDialog } = useAuth();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = () => {
    setError("");
    if (!fullName || !phone || !email || !user || !pass) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingrese un email válido.");
      return;
    }

    // Simulate successful registration
    setIsRegistered(true);
    // In a real application, you would handle the registration logic here.
    // Reset fields after successful registration
    setFullName("");
    setPhone("");
    setEmail("");
    setUser("");
    setPass("");
  };

  const handleBackToLogin = () => {
    setShowLoginDialog(true);
    setOpen(false);
    setIsRegistered(false);
    setShowRegisterDialog(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => { setOpen(true); setIsRegistered(false); setError(""); }}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isRegistered ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-24 w-24 text-green-500 mb-4" />
            <DialogTitle className="text-2xl font-bold mb-2">¡Registro Exitoso!</DialogTitle>
            <DialogDescription className="text-center mb-6">
              Su cuenta ha sido creada exitosamente. Ahora puede iniciar sesión.
            </DialogDescription>
            <Button onClick={handleBackToLogin}>Volver al inicio de sesión</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Registrarse</DialogTitle>
              <DialogDescription>
                Cree una cuenta para acceder a todas las funcionalidades.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
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
                <Label htmlFor="user" className="text-right">
                  Usuario
                </Label>
                <Input
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleRegister}>
                Registrarse
              </Button>
            </DialogFooter>
            {error && (
              <div className="w-full text-center mt-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}