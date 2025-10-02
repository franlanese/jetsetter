import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Plane, History, Code } from 'lucide-react';

const PresentationPage = () => {
  return (
    // Remove the explicit background and text colors to inherit from the global theme
    <div className="min-h-screen">
      {/* Hero Section - Overlay and text colors are already dark-theme friendly */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <Image
          src="/images/jetinterior.jpg"
          alt="Interior de jet privado de lujo"
          fill
          objectFit="cover"
          className="opacity-20"
          priority
        />
        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <Rocket className="mx-auto h-16 w-16 text-white mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Bienvenido a Aera
          </h1>
          <p className="text-xl text-gray-200">
            Tu copiloto digital para la aviación privada. Descubre, reserva y gestiona tus vuelos de lujo con una facilidad sin precedentes.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Features Section - Adjust card background for contrast */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Funcionalidades Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-secondary/50">
              <CardHeader>
                <Plane className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <CardTitle>Búsqueda Inteligente de Vuelos</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Nuestro sistema permite buscar y filtrar vuelos privados en tiempo real, conectándote con una red global de operadores.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow bg-secondary/50">
              <CardHeader>
                <Rocket className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <CardTitle>Ofertas "Empty Legs"</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Accede a oportunidades exclusivas de vuelos a precios reducidos, aprovechando los tramos vacíos de jets privados.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow bg-secondary/50">
              <CardHeader>
                <History className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <CardTitle>Historial de Viajes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Mantén un registro detallado de todos tus viajes anteriores, con acceso fácil a la información y gestión de tus vuelos.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Stack Section - Adjust card and badge colors */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nuestra Tecnología
          </h2>
          <Card className="max-w-4xl mx-auto bg-secondary/50">
            <CardHeader>
              <Code className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <CardTitle className="text-center">Stack Tecnológico Moderno</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg mb-6">
                Jetsetter está construido sobre una base de tecnologías web de vanguardia para garantizar una experiencia de usuario rápida, segura y escalable.
              </p>
              <div className="flex justify-center flex-wrap gap-4">
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">Next.js</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">React</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">TypeScript</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">Tailwind CSS</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">Genkit AI</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section - Text will inherit foreground color */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para volar?</h2>
          <p className="text-lg mb-8">
            Explora la aplicación y descubre la nueva era de los viajes privados.
          </p>
          <Button asChild size="lg">
            <Link href="/demo">Ir a la App</Link>
          </Button>
        </section>
      </main>

      {/* Footer - Remove explicit background, let it inherit */}
      <footer className="text-center p-6 border-t">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Jetsetter. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PresentationPage;