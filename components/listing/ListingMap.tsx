'use client';

import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ListingMapProps {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function ListingMap({ address, coordinates }: ListingMapProps) {
  const getDirectionsUrl = () => {
    const addressString = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressString)}`;
  };

  const viewOnMapUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  };

  // Build map URL using our secure API proxy (prevents token exposure)
  const getMapImageUrl = () => {
    const params = new URLSearchParams({
      lng: coordinates.lng.toString(),
      lat: coordinates.lat.toString(),
      zoom: '13',
      width: '800',
      height: '600',
    });
    return `/api/map?${params.toString()}`;
  };

  return (
    <Card className="p-6 md:p-8 grain-texture">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Location</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.open(getDirectionsUrl(), '_blank')}
        >
          <Navigation className="h-4 w-4" />
          Get Directions
        </Button>
      </div>

      {/* Address */}
      <div className="mb-6">
        <div className="text-lg font-semibold">{address.street}</div>
        <div className="text-muted-foreground">
          {address.city}, {address.state} {address.zip}
        </div>
      </div>

      {/* Map Image */}
      <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden border-2 border-border">
        {/* Static map image via secure API proxy */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${getMapImageUrl()})`
          }}
        />

        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open(viewOnMapUrl(), '_blank')}
          >
            View Larger Map
          </Button>
        </div>

        {/* Location Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="relative">
            <MapPin className="h-10 w-10 text-primary fill-primary drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Nearby Places */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="font-semibold mb-1">Downtown Sedona</div>
          <div className="text-muted-foreground">2.5 miles • 8 min drive</div>
        </div>
        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="font-semibold mb-1">Cathedral Rock Trail</div>
          <div className="text-muted-foreground">3.1 miles • 10 min drive</div>
        </div>
        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="font-semibold mb-1">Sedona Airport</div>
          <div className="text-muted-foreground">4.2 miles • 12 min drive</div>
        </div>
      </div>
    </Card>
  );
}
