"use client";

import Link from "next/link";
import { Send, Menu, Plane, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { RegisterDialog } from "./RegisterDialog";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Buscar Vuelos", icon: Search },
  { href: "/empty-legs", label: "Tramos Vacíos", icon: Plane },
];

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, logout, showLoginDialog, setShowLoginDialog, showRegisterDialog, setShowRegisterDialog } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Send className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Jetsetter</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Abrir menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/historial-de-viajes">Historial de Viajes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Mi Cuenta</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <LoginDialog open={showLoginDialog}>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => setShowLoginDialog(true)}>Iniciar Sesión</Button>
              </LoginDialog>
              <RegisterDialog open={showRegisterDialog}>
                <Button size="sm" className="hidden sm:inline-flex" onClick={() => setShowRegisterDialog(true)}>Registrarse</Button>
              </RegisterDialog>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Alternar Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Jetsetter</span>
                </Link>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-4 px-2.5 transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="flex flex-col gap-2 pt-6">
                  {isLoggedIn ? (
                    <Button onClick={logout}>Cerrar Sesión</Button>
                  ) : (
                    <>
                      <RegisterDialog open={showRegisterDialog}>
                        <Button className="w-full" onClick={() => setShowRegisterDialog(true)}>Registrarse</Button>
                      </RegisterDialog>
                      <LoginDialog open={showLoginDialog}>
                        <Button variant="ghost" className="w-full" onClick={() => setShowLoginDialog(true)}>Iniciar Sesión</Button>
                      </LoginDialog>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
