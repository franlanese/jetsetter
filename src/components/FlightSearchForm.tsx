"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { es } from 'date-fns/locale';
import { CalendarIcon, MapPin, Users, Plane } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import FlightResults from "./FlightResults"

const formSchema = z.object({
  origin: z.string().min(3, { message: "El código de aeropuerto debe tener 3 caracteres." }).max(3).toUpperCase(),
  destination: z.string().min(3, { message: "El código de aeropuerto debe tener 3 caracteres." }).max(3).toUpperCase(),
  departureDate: z.date({
    required_error: "Se requiere una fecha de salida.",
  }),
  travelers: z.coerce.number().min(1, { message: "Debe haber al menos 1 pasajero." }),
})

export type FlightSearchFormValues = z.infer<typeof formSchema>

export default function FlightSearchForm() {
    const [searchResults, setSearchResults] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FlightSearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      travelers: 1,
    },
  })

  function onSubmit(values: FlightSearchFormValues) {
    setIsLoading(true);
    setSearchResults(null);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
        const mockResults = [
            { id: '1', airline: 'NetJets', aircraft: 'Gulfstream G650', from: values.origin, to: values.destination, departureTime: '09:00', arrivalTime: '17:00', price: 45000 },
            { id: '2', airline: 'Flexjet', aircraft: 'Bombardier Global 7500', from: values.origin, to: values.destination, departureTime: '10:30', arrivalTime: '18:30', price: 52000 },
            { id: '3', airline: 'VistaJet', aircraft: 'Dassault Falcon 7X', from: values.origin, to: values.destination, departureTime: '11:00', arrivalTime: '19:00', price: 48500 },
        ];
        setSearchResults(mockResults);
        setIsLoading(false);
        toast({
            title: "Búsqueda Completa",
            description: `Se encontraron ${mockResults.length} vuelos para su viaje de ${values.origin} a ${values.destination}.`,
        });
    }, 1500);
  }

  return (
    <>
    <Card className="w-full shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Encuentre Su Vuelo Privado</CardTitle>
        <CardDescription>Ingrese los detalles de su viaje para comenzar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-4 items-end">
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="¿Desde dónde?" {...field} className="pl-10 placeholder:text-s" />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="¿Adónde quieres ir?" {...field} className="pl-10 placeholder:text-s"/>
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-2">
                <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Salida</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "pl-3 text-left font-normal justify-start",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                            {field.value ? (
                                format(field.value, "PPP", { locale: es })
                            ) : (
                                <span>Elija una fecha</span>
                            )}
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                            locale={es}
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="lg:col-span-1">
                <FormField
                control={form.control}
                name="travelers"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Pasajeros</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" placeholder="1" {...field} className="pl-10"/>
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="lg:col-span-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                    <Plane className="mr-2 h-4 w-4" />
                    {isLoading ? 'Buscando...' : 'Buscar Vuelos'}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    { (isLoading || searchResults) && <FlightResults results={searchResults} isLoading={isLoading} />} 
    </>
  )
}
