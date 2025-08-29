import Link from "next/link";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Send className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg">Jetsetter</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Sobre Nosotros</Link>
            <Link href="#" className="hover:text-primary transition-colors">Términos de Servicio</Link>
            <Link href="#" className="hover:text-primary transition-colors">Política de Privacidad</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Zonodev Inc. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
