
import { TravelHistoryCard } from "@/components/TravelHistoryCard";
import travelHistory from "@/data/viajesUsuario.json";

export default function TravelHistoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Historial de Viajes</h1>
      <div className="space-y-6">
        {travelHistory.map((trip) => (
          <TravelHistoryCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
