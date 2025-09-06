
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { TravelHistoryCard } from "@/components/TravelHistoryCard";
import travelHistory from "@/data/viajesUsuario.json";

export default function TravelHistoryPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <div className="container mx-auto py-8"><h1 className="text-3xl font-bold mb-6">Cargando...</h1></div>;
  }

  if (!isLoggedIn) {
    return null; // or a loading spinner, or a message
  }

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
