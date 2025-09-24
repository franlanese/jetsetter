import Link from "next/link";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="flex items-center justify-between py-8 px-5">
        <div className="flex items-center gap-2">
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="http://zonodev.ar" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Sobre Nosotros</a>
          <Link href="#" className="hover:text-primary transition-colors">Términos de Servicio</Link>
          <Link href="#" className="hover:text-primary transition-colors">Política de Privacidad</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Zonodev. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
