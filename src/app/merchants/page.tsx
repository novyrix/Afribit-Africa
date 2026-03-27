import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MerchantDirectoryExplorer } from '@/components/merchants/MerchantDirectoryExplorer';
import { listFeaturedMerchants, listMerchants } from '@/lib/content/merchants';
import { findProgramBySlug } from '@/lib/content/programs';
import { ArrowRight, Bitcoin, BriefcaseBusiness, MapPin, ShieldCheck } from 'lucide-react';

export default async function MerchantsPage() {
  const merchants = await listMerchants();
  const featuredMerchants = await listFeaturedMerchants();
  const featuredMerchantPrograms = await Promise.all(
    featuredMerchants.map(async (merchant) => ({
      merchant,
      program: merchant.programSlug ? await findProgramBySlug(merchant.programSlug) : undefined,
    }))
  );

  return (
    <div className="min-h-screen">
      <section className="section-hero bg-linear-to-b from-primary/10 to-background">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold">Merchant Directory</h1>
            <p className="text-xl text-muted-foreground">
              Explore the businesses and service operators already using Bitcoin in the Afribit
              ecosystem. This is the first step toward a richer merchant discovery experience with
              location-aware search and map-based browsing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <Card className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <BriefcaseBusiness className="h-5 w-5" />
                  Local commerce
                </div>
                <p className="text-sm text-muted-foreground">
                  Real businesses and service operators, not placeholder merchant cards.
                </p>
              </Card>
              <Card className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Bitcoin className="h-5 w-5" />
                  Bitcoin acceptance
                </div>
                <p className="text-sm text-muted-foreground">
                  Profiles highlight where Bitcoin is already working in day-to-day trade.
                </p>
              </Card>
              <Card className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <ShieldCheck className="h-5 w-5" />
                  Professional proof
                </div>
                <p className="text-sm text-muted-foreground">
                  Merchant stories make the site stronger for donors, partners, and operators.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 border-y bg-secondary/20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: `${merchants.length}`, label: 'Profiles now live' },
              { value: '3', label: 'Merchant sectors represented' },
              { value: '1', label: 'Primary service area' },
              { value: 'Next', label: 'Map discovery phase' },
            ].map((stat) => (
              <Card key={stat.label} className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-lg">
        <Container>
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Merchant Stories</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              These profiles are derived from the strongest real merchant stories already present in
              the codebase and organized into a reusable merchant layer for the site.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredMerchantPrograms.map(({ merchant, program }) => {
              return (
                <Card key={merchant.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-[220px_1fr]">
                    <div className="bg-secondary">
                      <img
                        src={merchant.image}
                        alt={merchant.name}
                        className="h-full w-full object-cover min-h-[220px]"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {merchant.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {merchant.location}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold">{merchant.name}</h3>
                        <p className="text-bitcoin font-medium">{merchant.role}</p>
                      </div>

                      <p className="text-muted-foreground">{merchant.summary}</p>

                      {program && (
                        <p className="text-sm text-muted-foreground">
                          Linked program:{' '}
                          <Link href={`/programs/${program.slug}`} className="text-primary hover:underline">
                            {program.title}
                          </Link>
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {merchant.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <Button asChild>
                        <Link href={`/merchants/${merchant.slug}`}>
                          View Full Profile
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-lg bg-secondary/30">
        <Container>
          <div className="mb-10 space-y-4">
            <h2 className="text-3xl font-bold">Map-Based Discovery</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              The merchant directory now includes synchronized map and list discovery built on OpenStreetMap and Leaflet. You can filter by sector, payment method, and search terms without breaking the browsing flow.
            </p>
          </div>

          <MerchantDirectoryExplorer merchants={merchants} />
        </Container>
      </section>
    </div>
  );
}