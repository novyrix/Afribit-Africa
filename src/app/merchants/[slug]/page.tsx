import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';
import { findMerchantBySlug, listRelatedMerchants, listMerchantRoutes } from '@/lib/content/merchants';
import { findProgramBySlug } from '@/lib/content/programs';
import { ArrowLeft, ArrowRight, Bitcoin, BriefcaseBusiness, MapPin, Quote, Wallet } from 'lucide-react';

interface MerchantDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const merchants = await listMerchantRoutes();
  return merchants.map((merchant) => ({ slug: merchant.slug }));
}

export async function generateMetadata({ params }: MerchantDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const merchant = await findMerchantBySlug(slug);
  if (!merchant) return {};

  const title = `${merchant.name} | Afribit Africa`;
  const description = merchant.summary;

  return {
    title,
    description,
    openGraph: {
      title: merchant.name,
      description,
      images: merchant.image ? [{ url: merchant.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: merchant.name,
      description,
      images: merchant.image ? [merchant.image] : [],
    },
  };
}

export default async function MerchantDetailPage({ params }: MerchantDetailPageProps) {
  const { slug } = await params;
  const merchant = await findMerchantBySlug(slug);

  if (!merchant) {
    notFound();
  }

  const program = merchant.programSlug ? await findProgramBySlug(merchant.programSlug) : undefined;
  const relatedMerchants = await listRelatedMerchants(merchant.slug);

  return (
    <div className="min-h-screen">
      <section className="py-6 border-b">
        <Container>
          <Button variant="ghost" asChild>
            <Link href="/merchants">
              <ArrowLeft className="h-4 w-4" />
              Back to Merchants
            </Link>
          </Button>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {merchant.category}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {merchant.location}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold">{merchant.name}</h1>
                <p className="text-xl text-bitcoin font-semibold">{merchant.role}</p>
                <p className="text-lg text-muted-foreground max-w-3xl">{merchant.summary}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <BriefcaseBusiness className="h-5 w-5" />
                    Sector
                  </div>
                  <p className="text-sm text-muted-foreground">{merchant.category}</p>
                </Card>
                <Card className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Bitcoin className="h-5 w-5" />
                    Payments
                  </div>
                  <p className="text-sm text-muted-foreground">{merchant.paymentMethods.join(', ')}</p>
                </Card>
                <Card className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <MapPin className="h-5 w-5" />
                    Service area
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {merchant.neighborhood}, {merchant.city}, {merchant.country}
                  </p>
                </Card>
              </div>

              <Card className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Quote className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Merchant Story</h2>
                </div>
                <p className="text-muted-foreground leading-7">{merchant.story}</p>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl bg-secondary border">
                <img src={merchant.image} alt={merchant.name} className="w-full h-full object-cover min-h-[340px]" />
              </div>

              {merchant.youtubeId && (
                <YouTubeEmbed
                  videoId={merchant.youtubeId}
                  title={`${merchant.name} – Afribit Merchant Story`}
                />
              )}

              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">What this profile shows</h2>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {merchant.services.map((service) => (
                    <li key={service} className="rounded-lg bg-secondary/60 px-4 py-3">
                      {service}
                    </li>
                  ))}
                </ul>
              </Card>

              {program && (
                <Card className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Related Program</h2>
                  <p className="font-semibold text-primary">{program.title}</p>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                  <Button asChild variant="outline">
                    <Link href={`/programs/${program.slug}`}>
                      View Program
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-lg bg-secondary/30">
        <Container>
          <div className="mb-10 space-y-3">
            <h2 className="text-3xl font-bold">More Merchant Profiles</h2>
            <p className="text-lg text-muted-foreground">
              Continue exploring the businesses and operators already represented in the Afribit ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedMerchants.map((relatedMerchant) => (
              <Card key={relatedMerchant.id} className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{relatedMerchant.name}</h3>
                  <p className="text-sm text-bitcoin font-medium">{relatedMerchant.role}</p>
                </div>
                <p className="text-sm text-muted-foreground">{relatedMerchant.summary}</p>
                <Button asChild variant="outline">
                  <Link href={`/merchants/${relatedMerchant.slug}`}>Open profile</Link>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}