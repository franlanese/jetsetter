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
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface LoginDialogProps {
  children: React.ReactNode;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login, showLoginDialog, setShowLoginDialog } = useAuth();

  const handleLogin = () => {
    const success = login(user, pass);
    if (success) {
      setError("");
      setShowLoginDialog(false);
      // Reset fields after successful login
      setUser("");
      setPass("");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  useEffect(() => {
    console.log("RENDER LOGIN")
  }, [])

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogTrigger asChild onClick={() => setShowLoginDialog(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Ingrese sus credenciales para acceder a su cuenta.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
