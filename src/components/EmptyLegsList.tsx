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
import emptyLegsTest from "../data/emptyLegs.json"

export default function EmptyLegsList() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>();

  const filteredLegs = useMemo(() => {
    return emptyLegsTest.filter(leg => {
        const legDate = new Date(leg.date);
        legDate.setHours(0,0,0,0);
        
        const filterDate = departureDate ? new Date(departureDate) : null;
        if(filterDate) filterDate.setHours(0,0,0,0);

        const originMatch = origin === '' || 
                            leg.from.toLowerCase().includes(origin.toLowerCase()) ||
                            (leg.originCity && leg.originCity.toLowerCase().includes(origin.toLowerCase()));

        const destinationMatch = destination === '' ||
                                 leg.to.toLowerCase().includes(destination.toLowerCase()) ||
                                 (leg.destinationCity && leg.destinationCity.toLowerCase().includes(destination.toLowerCase()));

        return (
            originMatch &&
            destinationMatch &&
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
            <div>
                <label className="text-sm font-medium">Desde</label>
                <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="pl-10 placeholder:text-s"
                    placeholder='¿Desde dónde?'
                    />
                </div>
            </div>
            <div>
                <label className="text-sm font-medium">Hasta</label>
                <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10 placeholder:text-s"
                    placeholder='¿Adónde quieres ir?'
                    />
                </div>
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
                            <span className="text-sm text-muted-foreground">Elija una fecha</span>
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
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-sm text-muted-foreground">{leg.originCity}</p>
                                <p className="text-2xl font-bold">{leg.from}</p>
                            </div>
                            <ArrowRight className="mx-4 h-6 w-6" />
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">{leg.destinationCity}</p>
                                <p className="text-2xl font-bold">{leg.to}</p>
                            </div>
                        </div>
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
                    <CardFooter className="flex justify-between items-center pt-4 px-4 border-t">
                        <div className="flex items-center">
                            <DollarSign className="w-5 h-5 mr-1 text-primary"/>
                            <p className="text-2xl font-bold mr-2 text-primary">
                                {leg.price.toLocaleString('es-ES')}
                            </p>
                            <p className='text-xs text-primary'>
                                por asiento
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
