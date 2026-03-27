'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { MerchantProfile } from '@/types';
import { MerchantMapPanel } from '@/components/merchants/MerchantMapPanel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bitcoin, MapPin, Search, Store, Tag } from 'lucide-react';

interface MerchantDirectoryExplorerProps {
  merchants: MerchantProfile[];
}

export function MerchantDirectoryExplorer({ merchants }: MerchantDirectoryExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [selectedMerchantSlug, setSelectedMerchantSlug] = useState<string | null>(merchants[0]?.slug || null);

  const categories = useMemo(
    () => [...new Set(merchants.map((merchant) => merchant.category).filter(Boolean))].sort(),
    [merchants]
  );
  const paymentMethods = useMemo(
    () => [...new Set(merchants.flatMap((merchant) => merchant.paymentMethods).filter(Boolean))].sort(),
    [merchants]
  );

  const filteredMerchants = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return merchants.filter((merchant) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          merchant.name,
          merchant.role,
          merchant.category,
          merchant.summary,
          merchant.location,
          merchant.neighborhood,
          merchant.city,
          ...merchant.services,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));

      const matchesCategory = category === 'all' || merchant.category === category;
      const matchesPaymentMethod =
        paymentMethod === 'all' || merchant.paymentMethods.includes(paymentMethod);

      return matchesSearch && matchesCategory && matchesPaymentMethod;
    });
  }, [category, merchants, paymentMethod, searchTerm]);

  const mappedCount = filteredMerchants.filter(
    (merchant) => merchant.latitude !== undefined && merchant.longitude !== undefined
  ).length;
  const featuredCount = filteredMerchants.filter((merchant) => merchant.featured).length;

  useEffect(() => {
    if (filteredMerchants.length === 0) {
      setSelectedMerchantSlug(null);
      return;
    }

    if (!selectedMerchantSlug || !filteredMerchants.some((merchant) => merchant.slug === selectedMerchantSlug)) {
      setSelectedMerchantSlug(filteredMerchants[0].slug);
    }
  }, [filteredMerchants, selectedMerchantSlug]);

  return (
    <div className="space-y-10">
      <Card className="p-6 md:p-8">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto] lg:items-end">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Search merchants</p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by merchant, service, location, or sector"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Sector</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sectors</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Payment method</p>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All payment methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All payment methods</SelectItem>
                {paymentMethods.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setCategory('all');
              setPaymentMethod('all');
            }}
          >
            Reset filters
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Store className="h-4 w-4" />
              Matching profiles
            </div>
            <p className="mt-2 text-3xl font-bold text-primary">{filteredMerchants.length}</p>
          </div>
          <div className="rounded-2xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Mapped results
            </div>
            <p className="mt-2 text-3xl font-bold text-primary">{mappedCount}</p>
          </div>
          <div className="rounded-2xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Tag className="h-4 w-4" />
              Featured stories
            </div>
            <p className="mt-2 text-3xl font-bold text-primary">{featuredCount}</p>
          </div>
        </div>
      </Card>

      <MerchantMapPanel
        merchants={filteredMerchants}
        selectedMerchantSlug={selectedMerchantSlug}
        onSelectMerchant={setSelectedMerchantSlug}
      />

      <div className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Filtered Merchant Profiles</h2>
            <p className="text-lg text-muted-foreground">
              The list below stays aligned with the current discovery filters and map results.
            </p>
          </div>
        </div>

        {filteredMerchants.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <Card
                key={merchant.id}
                className={`p-6 flex flex-col gap-4 transition-colors ${
                  selectedMerchantSlug === merchant.slug ? 'border-primary ring-1 ring-primary/30' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold">{merchant.name}</h3>
                    <span className="text-xs rounded-full bg-secondary px-3 py-1 text-muted-foreground">
                      {merchant.category}
                    </span>
                  </div>
                  <p className="text-sm text-bitcoin font-medium">{merchant.role}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {merchant.location}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground grow">{merchant.summary}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Payment methods</p>
                  <div className="flex flex-wrap gap-2">
                    {merchant.paymentMethods.map((method) => (
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

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={selectedMerchantSlug === merchant.slug ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setSelectedMerchantSlug(merchant.slug)}
                  >
                    Focus on map
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/merchants/${merchant.slug}`}>Open profile</Link>
                  </Button>
                </div>
                {selectedMerchantSlug === merchant.slug && (
                  <p className="text-xs font-medium text-primary">Current map focus</p>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-2xl font-bold">No merchants matched these filters</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Adjust the search term or reset the sector and payment filters to widen the results.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}