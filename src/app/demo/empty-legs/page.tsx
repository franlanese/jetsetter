import EmptyLegsList from '@/components/EmptyLegsList';
import { Plane } from 'lucide-react';

export default function EmptyLegsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Plane className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl font-headline">
            Vuelos de Tramo Vacío
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Disfrute del lujo de los viajes privados a una fracción del costo. Explore y filtre nuestra lista actual de vuelos de tramo vacío disponibles.
          </p>
        </div>
        <EmptyLegsList />
      </div>
    </div>
  );
}
