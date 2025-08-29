
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, ArrowRight } from "lucide-react";

type TravelHistory = {
  id: string;
  date: string;
  origin: {
    code: string;
    name: string;
    city: string;
  };
  destination: {
    code: string;
    name: string;
    city: string;
  };
  aircraft: {
    model: string;
    registration: string;
  };
  flight_duration: string;
  status: string;
  cost_usd: number;
};

interface TravelHistoryCardProps {
  trip: TravelHistory;
}

export function TravelHistoryCard({ trip }: TravelHistoryCardProps) {
  const statusVariant = trip.status === "Completado" ? "default" : "destructive";

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{trip.origin.city} a {trip.destination.city}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{trip.date}</CardDescription>
          </div>
          <Badge variant={statusVariant}>{trip.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold">{trip.origin.code}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-lg font-semibold">{trip.destination.code}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plane className="h-4 w-4" />
            <span>{trip.flight_duration}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground border-t pt-4 mt-4">
          <p><strong>Aeronave:</strong> {trip.aircraft.model} ({trip.aircraft.registration})</p>
          <p><strong>Costo del Vuelo:</strong> ${trip.cost_usd.toLocaleString('en-US')} USD</p>
          <p><strong>ID de Viaje:</strong> {trip.id}</p>
        </div>
      </CardContent>
    </Card>
  );
}
