'use client';

import dynamic from 'next/dynamic';
import type { MerchantProfile } from '@/types';
import { Card } from '@/components/ui/card';

interface MerchantMapPanelProps {
  merchants: MerchantProfile[];
  selectedMerchantSlug: string | null;
  onSelectMerchant: (slug: string | null) => void;
}

const MerchantMap = dynamic(
  () => import('@/components/merchants/MerchantMap').then((module) => module.MerchantMap),
  {
    ssr: false,
    loading: () => (
      <Card className="p-8">
        <h3 className="text-2xl font-bold">Merchant Map</h3>
        <p className="text-sm text-muted-foreground mt-3">Loading the interactive map view.</p>
      </Card>
    ),
  }
);

export function MerchantMapPanel({ merchants, selectedMerchantSlug, onSelectMerchant }: MerchantMapPanelProps) {
  return (
    <MerchantMap
      merchants={merchants}
      selectedMerchantSlug={selectedMerchantSlug}
      onSelectMerchant={onSelectMerchant}
    />
  );
}