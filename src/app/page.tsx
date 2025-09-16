"use client";

import FlightSearchForm from '@/components/FlightSearchForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlaneTakeoff , DollarSign} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import allEmptyLegs from '@/data/emptyLegs.json';

export default function Home() {
  const isMobile = useIsMobile();
  const emptyLegs = allEmptyLegs.slice(0, isMobile ? 2 : 3);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-6 md:py-16 lg:py-28 bg-card relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <Image 
          src="/images/jetinterior.jpg" 
          alt="Interior de jet privado de lujo" 
          fill
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="luxury jet"
          priority
        />
        <div className="px-4 md:px-6 text-center relative z-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              Vuelos Charter en Avión Privado
            </h1>
            <p className="mt-4 text-md text-gray-300 md:text-xl text-center" style={{textShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
              Vuelos privados a medida en Argentina. Cotice y reserve con facilidad.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container z-30 px-4 md:px-6">
        <FlightSearchForm />
      </div>

      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Empty Legs</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Ofertas Imbatibles de Última Hora</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Aviación privada a un precio reducido.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-8">
            {emptyLegs.map((leg) => (
              <Card key={leg.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{leg.from} <ArrowRight className="inline-block mx-2 h-5 w-5" /> {leg.to}</CardTitle>
                    <PlaneTakeoff className="h-6 w-6 text-muted-foreground"/>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 flex-grow">
                  <p className="text-sm text-muted-foreground">{leg.aircraft}</p>
                  <p className="text-sm font-medium">{new Date(leg.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-1 text-primary" />
                  <p className="text-2xl font-bold mr-2 text-primary">
                    {leg.price.toLocaleString('es-ES')}
                  </p>
                  <p className="text-xs text-primary">por asiento</p>
                </div>
                  
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full mt-2">
                    <Link href="/empty-legs">Ver Oferta</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link href="/empty-legs">
              <Button variant="outline">
                Ver Todos los Empty Legs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}