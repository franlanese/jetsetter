"use client";

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Users, Plane, DollarSign, MapPin, Search } from "lucide-react";
import Image from "next/image";
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const emptyLegsData = [
    { id: 1, from: 'LHR', to: 'JFK', date: '2024-10-28', aircraft: 'Gulfstream G650', seats: 8, price: 25000, status: 'Disponible', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'Gulfstream G650' },
    { id: 2, from: 'TEB', to: 'VNY', date: '2024-10-29', aircraft: 'Bombardier Global 7500', seats: 12, price: 18000, status: 'Disponible', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'Bombardier Global 7500' },
    { id: 3, from: 'DXB', to: 'CDG', date: '2024-10-30', aircraft: 'Dassault Falcon 8X', seats: 10, price: 35000, status: 'Reservado', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'Dassault Falcon 8X' },
    { id: 4, from: 'HPN', to: 'MIA', date: '2024-11-01', aircraft: 'Cessna Citation Longitude', seats: 9, price: 15000, status: 'Disponible', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'Cessna Citation Longitude' },
    { id: 5, from: 'SVO', to: 'LBG', date: '2024-11-02', aircraft: 'Embraer Praetor 600', seats: 7, price: 30000, status: 'Disponible', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'Embraer Praetor 600' },
    { id: 6, from: 'LAX', to: 'ASP', date: '2024-11-03', aircraft: 'Gulfstream G280', seats: 6, price: 12000, status: 'Reservado', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'Gulfstream G280' },
];


export default function EmptyLegsList() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>();

  const filteredLegs = useMemo(() => {
    return emptyLegsData.filter(leg => {
        const legDate = new Date(leg.date);
        legDate.setHours(0,0,0,0);
        
        const filterDate = departureDate ? new Date(departureDate) : null;
        if(filterDate) filterDate.setHours(0,0,0,0);

        return (
            (origin === '' || leg.from.toLowerCase().includes(origin.toLowerCase())) &&
            (destination === '' || leg.to.toLowerCase().includes(destination.toLowerCase())) &&
            (!filterDate || legDate.getTime() === filterDate.getTime())
        )
    })
  }, [origin, destination, departureDate]);

  const resetFilters = () => {
    setOrigin('');
    setDestination('');
    setDepartureDate(undefined);
  }

  return (
    <>
      <Card className="mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="relative">
                <label className="text-sm font-medium">Desde</label>
                <MapPin className="absolute left-3 top-[2.4rem] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="ej., JFK" value={origin} onChange={(e) => setOrigin(e.target.value)} className="pl-10 uppercase mt-1" />
            </div>
            <div className="relative">
                <label className="text-sm font-medium">Hasta</label>
                <MapPin className="absolute left-3 top-[2.4rem] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="ej., LAX" value={destination} onChange={(e) => setDestination(e.target.value)} className="pl-10 uppercase mt-1" />
            </div>
            <div>
                <label className="text-sm font-medium">Fecha de Salida</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal justify-start mt-1",
                            !departureDate && "text-muted-foreground"
                        )}
                        >
                        <Calendar className="mr-2 h-4 w-4 opacity-50" />
                        {departureDate ? (
                            format(departureDate, "PPP", { locale: es })
                        ) : (
                            <span>Elija una fecha</span>
                        )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                            mode="single"
                            selected={departureDate}
                            onSelect={setDepartureDate}
                            initialFocus
                            locale={es}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Button onClick={resetFilters} variant="outline">Limpiar Filtros</Button>
        </div>
      </Card>
        
      {filteredLegs.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLegs.map((leg) => (
                <Card key={leg.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 w-full">
                        <Image
                            src={leg.imageUrl}
                            alt={leg.aircraft}
                            fill
                            objectFit="cover"
                            data-ai-hint={leg.dataAiHint}
                        />
                        <Badge className="absolute top-4 right-4" variant={leg.status === 'Disponible' ? 'default' : 'secondary'}>
                            {leg.status}
                        </Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center justify-between">
                            <span>{leg.from} <ArrowRight className="inline-block mx-1 h-5 w-5" /> {leg.to}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 flex-grow">
                        <div className="flex items-center text-muted-foreground">
                            <Plane className="w-4 h-4 mr-2" />
                            <span className="text-sm">{leg.aircraft}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{new Date(leg.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            <span className="text-sm">{leg.seats} Asientos Disponibles</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center">
                            <DollarSign className="w-5 h-5 mr-1 text-primary"/>
                            <p className="text-2xl font-bold text-primary">
                                {leg.price.toLocaleString('es-ES')}
                            </p>
                        </div>
                        <Button size="sm" disabled={leg.status !== 'Disponible'}>
                            Reservar Ahora
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      ) : (
        <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">No se Encontraron Vuelos</h3>
                <p>Ningún vuelo de tramo vacío coincide con sus filtros actuales. Intente ajustar su búsqueda.</p>
            </CardContent>
        </Card>
      )}
    </>
  )
}
