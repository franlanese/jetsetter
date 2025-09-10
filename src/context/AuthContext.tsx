"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  showLoginDialog: boolean;
  setShowLoginDialog: (show: boolean) => void;
  showRegisterDialog: boolean;
  setShowRegisterDialog: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (user: string, pass: string) => {
    if (user === 'asd' && pass === '123') {
      localStorage.setItem('user', JSON.stringify({ user }));
      setIsLoggedIn(true);
      toast({
        title: `¡Bienvenido ${user}! `,
        description: 'Inicio de sesión exitoso',
      });
      return true;
    }
    toast({
      title: 'Error de inicio de sesión',
      description: 'Usuario o contraseña incorrectos',
      variant: 'destructive',
    });
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast({
      title: 'Cierre de sesión exitoso',
      description: '¡Hasta pronto!',
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, showLoginDialog, setShowLoginDialog, showRegisterDialog, setShowRegisterDialog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
