'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Calendar,
  Users,
  Plane,
  DollarSign,
  MapPin,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import emptyLegsTest from '../data/emptyLegs.json';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Checkbox } from './ui/checkbox';

// Define the type for a leg based on your JSON structure
interface Leg {
  id: number;
  from: string;
  to: string;
  date: string;
  seats: number;
  price: number;
  aircraft: string;
  status: string;
  imageUrl: string;
  dataAiHint: string;
  originCity?: string;
  destinationCity?: string;
}

export default function EmptyLegsList() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [selectedLeg, setSelectedLeg] = useState<Leg | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSeatDialogOpen, setIsSeatDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const { toast } = useToast();

  const filteredLegs: Leg[] = useMemo(() => {
    return emptyLegsTest.filter((leg) => {
      const legDate = new Date(leg.date);
      legDate.setHours(0, 0, 0, 0);

      const filterDate = departureDate ? new Date(departureDate) : null;
      if (filterDate) filterDate.setHours(0, 0, 0, 0);

      const originMatch =
        origin === '' ||
        leg.from.toLowerCase().includes(origin.toLowerCase()) ||
        (leg.originCity &&
          leg.originCity.toLowerCase().includes(origin.toLowerCase()));

      const destinationMatch =
        destination === '' ||
        leg.to.toLowerCase().includes(destination.toLowerCase()) ||
        (leg.destinationCity &&
          leg.destinationCity.toLowerCase().includes(destination.toLowerCase()));

      const availableMatch = !showAvailableOnly || leg.status === 'Disponible';

      return (
        originMatch &&
        destinationMatch &&
        (!filterDate || legDate.getTime() === filterDate.getTime()) &&
        availableMatch
      );
    });
  }, [origin, destination, departureDate, showAvailableOnly]);

  const resetFilters = () => {
    setOrigin('');
    setDestination('');
    setDepartureDate(undefined);
    setShowAvailableOnly(false);
  };

  const handleReserveClick = (leg: Leg) => {
    setSelectedLeg(leg);
    setSelectedSeats(1);
    setIsSeatDialogOpen(true);
  };

  const handleSeatSelectionContinue = () => {
    setIsSeatDialogOpen(false);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmReservation = () => {
    if (selectedLeg) {
      toast({
        title: 'Solicitud de Reserva Enviada',
        description:
          'Nos pondremos en contacto contigo en breve para confirmar los detalles.',
      });
    }
    setIsConfirmDialogOpen(false);
  };

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
                placeholder="¿Desde dónde?"
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
                placeholder="¿Adónde quieres ir?"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Fecha de Salida</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal justify-start mt-1',
                    !departureDate && 'text-muted-foreground'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 opacity-50" />
                  {departureDate ? (
                    format(departureDate, 'PPP', { locale: es })
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Elija una fecha
                    </span>
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
          <Button onClick={resetFilters} variant="outline">
            Limpiar Filtros
          </Button>
        </div>
        <div className="flex items-center space-x-2 mt-5">
          <Checkbox
            id="available-only"
            checked={showAvailableOnly}
            onCheckedChange={(checked) =>
              setShowAvailableOnly(checked as boolean)
            }
            className='h-5 w-5 border-input'
          />
          <label
            htmlFor="available-only"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mostrar solo disponibles
          </label>
        </div>
      </Card>

      {filteredLegs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLegs.map((leg) => (
            <Card
              key={leg.id}
              className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={leg.imageUrl}
                  alt={leg.aircraft}
                  fill
                  objectFit="cover"
                  data-ai-hint={leg.dataAiHint}
                />
                <Badge
                  className="absolute top-4 right-4"
                  variant={leg.status === 'Disponible' ? 'default' : 'secondary'}
                >
                  {leg.status}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">
                      {leg.originCity}
                    </p>
                    <p className="text-2xl font-bold">{leg.from}</p>
                  </div>
                  <ArrowRight className="mx-4 h-6 w-6" />
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {leg.destinationCity}
                    </p>
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
                  <span className="text-sm">
                    {new Date(leg.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{leg.seats} Asientos Disponibles</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-4 px-4 border-t">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-1 text-primary" />
                  <p className="text-2xl font-bold mr-2 text-primary">
                    {leg.price.toLocaleString('es-ES')}
                  </p>
                  <p className="text-xs text-primary">por asiento</p>
                </div>
                <Button
                  size="sm"
                  disabled={leg.status !== 'Disponible'}
                  onClick={() => handleReserveClick(leg)}
                >
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
            <p>
              Ningún vuelo de tramo vacío coincide con sus filtros actuales.
              Intente ajustar su búsqueda.
            </p>
          </CardContent>
        </Card>
      )}

      {selectedLeg && (
        <>
          <Dialog open={isSeatDialogOpen} onOpenChange={setIsSeatDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Seleccionar Asientos</DialogTitle>
                <DialogDescription>
                  Seleccione la cantidad de asientos que desea reservar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="seats" className="text-right">
                    Asientos
                  </Label>
                  <Input
                    id="seats"
                    type="number"
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(parseInt(e.target.value, 10))}
                    min={1}
                    max={selectedLeg.seats}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSeatSelectionContinue}>Continuar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Reserva</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="mt-4 text-sm text-left text-muted-foreground">
                    <p><strong>Desde:</strong> {selectedLeg.from} ({selectedLeg.originCity})</p>
                    <p><strong>Hasta:</strong> {selectedLeg.to} ({selectedLeg.destinationCity})</p>
                    <p><strong>Fecha:</strong> {new Date(selectedLeg.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Avión:</strong> {selectedLeg.aircraft}</p>
                    <p><strong>Asientos:</strong> {selectedSeats}</p>
                    <div className="text-right mt-4">
                      <p className="text-lg font-bold">Total</p>
                      <p className="text-2xl font-bold text-primary">${(selectedLeg.price * selectedSeats).toLocaleString('es-ES')}</p>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmReservation}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}
