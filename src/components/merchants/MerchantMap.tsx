'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { LatLngBoundsExpression } from 'leaflet';
import type { MerchantProfile } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Bitcoin, MapPin } from 'lucide-react';

interface MerchantMapProps {
  merchants: MerchantProfile[];
  selectedMerchantSlug: string | null;
  onSelectMerchant: (slug: string | null) => void;
}

const defaultCenter: [number, number] = [-1.3135, 36.7879];

function MapViewportController({ merchants }: { merchants: MerchantProfile[] }) {
  const map = useMap();

  useEffect(() => {
    if (merchants.length === 0) {
      map.setView(defaultCenter, 14);
      return;
    }

    if (merchants.length === 1 && merchants[0].latitude && merchants[0].longitude) {
      map.setView([merchants[0].latitude, merchants[0].longitude], 16);
      return;
    }

    const bounds: LatLngBoundsExpression = merchants
      .filter((merchant) => merchant.latitude && merchant.longitude)
      .map((merchant) => [merchant.latitude!, merchant.longitude!] as [number, number]);

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [36, 36] });
    }
  }, [map, merchants]);

  return null;
}

function SelectedMerchantController({ merchant }: { merchant: MerchantProfile | null }) {
  const map = useMap();

  useEffect(() => {
    if (!merchant?.latitude || !merchant.longitude) {
      return;
    }

    map.flyTo([merchant.latitude, merchant.longitude], Math.max(map.getZoom(), 16), {
      animate: true,
      duration: 0.8,
    });
  }, [map, merchant]);

  return null;
}

export function MerchantMap({ merchants, selectedMerchantSlug, onSelectMerchant }: MerchantMapProps) {
  const mapMerchants = useMemo(
    () => merchants.filter((merchant) => merchant.latitude && merchant.longitude),
    [merchants]
  );

  useEffect(() => {
    if (mapMerchants.length === 0) {
      onSelectMerchant(null);
      return;
    }

    if (!selectedMerchantSlug || !mapMerchants.some((merchant) => merchant.slug === selectedMerchantSlug)) {
      onSelectMerchant(mapMerchants[0].slug);
    }
  }, [mapMerchants, onSelectMerchant, selectedMerchantSlug]);

  const selectedMerchant =
    mapMerchants.find((merchant) => merchant.slug === selectedMerchantSlug) || mapMerchants[0] || null;

  return (
    <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 items-start">
      <Card className="overflow-hidden border bg-white">
        <div className="border-b px-6 py-4">
          <h3 className="text-2xl font-bold">Merchant Map</h3>
          <p className="text-sm text-muted-foreground mt-2">
            OpenStreetMap view of active merchants in the Afribit network. Coordinates are approximate and intended for neighborhood-level discovery in this phase.
          </p>
        </div>

        <div className="h-[480px] w-full">
          {mapMerchants.length > 0 ? (
            <MapContainer
              center={defaultCenter}
              zoom={15}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <MapViewportController merchants={mapMerchants} />
              <SelectedMerchantController merchant={selectedMerchant} />
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              {mapMerchants.map((merchant) => (
                <CircleMarker
                  key={merchant.slug}
                  center={[merchant.latitude!, merchant.longitude!]}
                  radius={selectedMerchant?.slug === merchant.slug ? 12 : 9}
                  pathOptions={{
                    color: selectedMerchant?.slug === merchant.slug ? '#0E622F' : '#F7931A',
                    fillColor: selectedMerchant?.slug === merchant.slug ? '#0E622F' : '#F7931A',
                    fillOpacity: 0.85,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: () => onSelectMerchant(merchant.slug),
                  }}
                >
                  <Popup>
                    <div className="space-y-1">
                      <p className="font-semibold">{merchant.name}</p>
                      <p className="text-sm text-muted-foreground">{merchant.category}</p>
                      <p className="text-xs text-muted-foreground">{merchant.location}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
              No mapped merchants match the current filters.
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold">Location-aware discovery</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This GIS slice now supports filtered discovery across merchant sectors and payment methods, while keeping the map and directory aligned.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-secondary/60 p-4">
              <p className="font-semibold">Mapped merchants</p>
              <p className="text-2xl font-bold text-primary mt-1">{mapMerchants.length}</p>
            </div>
            <div className="rounded-xl bg-secondary/60 p-4">
              <p className="font-semibold">Coverage area</p>
              <p className="text-2xl font-bold text-primary mt-1">{mapMerchants.length > 0 ? 'Live' : 'Filtered out'}</p>
            </div>
          </div>
        </Card>

        {selectedMerchant && (
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{selectedMerchant.name}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {selectedMerchant.category}
                </span>
              </div>
              <p className="text-bitcoin font-medium">{selectedMerchant.role}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedMerchant.location}
              </p>
            </div>

            <p className="text-sm text-muted-foreground">{selectedMerchant.summary}</p>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Payments</p>
              <div className="flex flex-wrap gap-2">
                {selectedMerchant.paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                  >
                    <Bitcoin className="h-3.5 w-3.5" />
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href={`/merchants/${selectedMerchant.slug}`}>Open Merchant Profile</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}