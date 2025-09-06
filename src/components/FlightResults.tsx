import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Flight {
  id: string;
  airline: string;
  aircraft: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

interface FlightResultsProps {
  results: Flight[] | null;
  isLoading: boolean;
}

const ResultSkeleton = () => (
    <Card className="flex flex-col overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-6 flex-grow flex flex-col">
            <Skeleton className="h-6 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex-grow my-4 grid gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
            </div>
        </CardContent>
    </Card>
);

export default function FlightResults({ results, isLoading }: FlightResultsProps) {
  if (isLoading) {
    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-headline">Searching for available flights...</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <ResultSkeleton />
                    <ResultSkeleton />
                    <ResultSkeleton />
                </div>
            </div>
        </section>
    );
  }
  
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 font-headline">Your Flight Options</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {results.map((flight) => (
            <Card key={flight.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                  <Image
                      src={`https://placehold.co/600x400.png`}
                      alt={flight.aircraft}
                      fill
                      objectFit="cover"
                      data-ai-hint="private jet tarmac"
                  />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-xl font-bold">{flight.airline}</CardTitle>
                <CardDescription className="text-md">{flight.aircraft}</CardDescription>
                <div className="flex-grow my-4 grid gap-2">
                    <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>Departs: {flight.departureTime}</span>
                    </div>
                     <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>Arrives: {flight.arrivalTime}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                    <p className="text-2xl font-bold text-primary">
                        ${flight.price.toLocaleString()}
                    </p>
                    <Button>Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
