import 'server-only';

import type { Merchant as PrismaMerchant, Program, Testimonial } from '@prisma/client';
import type { MerchantProfile } from '@/types';
import { prisma } from '@/lib/prisma';
import { merchants as staticMerchants } from '@/data/merchants';

type MerchantRecord = PrismaMerchant & {
  program: Program | null;
  primaryTestimonial: Testimonial | null;
};

type MerchantRoute = {
  slug: string;
  updatedAt: Date;
};

const loggedFallbacks = {
  merchants: false,
  singleMerchant: new Set<string>(),
  routes: false,
};

function logMerchantsFallback(message: string, error: unknown, slug?: string) {
  if (slug) {
    if (loggedFallbacks.singleMerchant.has(slug)) {
      return;
    }

    loggedFallbacks.singleMerchant.add(slug);
    console.error(`${message} ${slug}:`, error);
    return;
  }

  if (message.includes('routes')) {
    if (loggedFallbacks.routes) {
      return;
    }

    loggedFallbacks.routes = true;
    console.error(message, error);
    return;
  }

  if (loggedFallbacks.merchants) {
    return;
  }

  loggedFallbacks.merchants = true;
  console.error(message, error);
}

function parseStringArray(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function fallbackMerchant(slug: string) {
  return staticMerchants.find((merchant) => merchant.slug === slug);
}

function toMerchantProfile(merchant: MerchantRecord): MerchantProfile {
  const fallback = fallbackMerchant(merchant.slug);

  return {
    id: merchant.id,
    testimonialId: fallback?.testimonialId || merchant.primaryTestimonial?.slug || merchant.id,
    slug: merchant.slug,
    name: merchant.name,
    role: merchant.primaryTestimonial?.role || fallback?.role || merchant.category,
    category: merchant.category,
    summary: merchant.summary || fallback?.summary || '',
    story: merchant.description || fallback?.story || merchant.summary,
    location: merchant.locationLabel || fallback?.location || 'Location pending',
    neighborhood: merchant.neighborhood || fallback?.neighborhood,
    city: merchant.city || fallback?.city || 'Nairobi',
    country: merchant.country || fallback?.country || 'Kenya',
    latitude: merchant.latitude ? Number(merchant.latitude) : fallback?.latitude,
    longitude: merchant.longitude ? Number(merchant.longitude) : fallback?.longitude,
    image:
      merchant.primaryImage ||
      fallback?.image ||
      merchant.primaryTestimonial?.image ||
      '/Images/Hero section video background fallback.png',
    videoUrl: merchant.videoUrl || fallback?.videoUrl || merchant.primaryTestimonial?.videoUrl || undefined,
    youtubeId: merchant.youtubeId || fallback?.youtubeId || merchant.primaryTestimonial?.youtubeId || undefined,
    programSlug: merchant.program?.slug || fallback?.programSlug,
    services: parseStringArray(merchant.services).length > 0 ? parseStringArray(merchant.services) : fallback?.services || [],
    paymentMethods:
      parseStringArray(merchant.paymentMethods).length > 0
        ? parseStringArray(merchant.paymentMethods)
        : fallback?.paymentMethods || ['Bitcoin'],
    featured: merchant.featured,
  };
}

export async function listMerchants(): Promise<MerchantProfile[]> {
  try {
    const merchants = await prisma.merchant.findMany({
      where: { status: 'ACTIVE' },
      include: {
        program: true,
        primaryTestimonial: true,
      },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    });

    if (merchants.length === 0) {
      return staticMerchants;
    }

    return merchants.map(toMerchantProfile);
  } catch (error) {
    logMerchantsFallback('Falling back to static merchants:', error);
    return staticMerchants;
  }
}

export async function findMerchantBySlug(slug: string): Promise<MerchantProfile | undefined> {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { slug },
      include: {
        program: true,
        primaryTestimonial: true,
      },
    });

    if (!merchant) {
      return fallbackMerchant(slug);
    }

    return toMerchantProfile(merchant);
  } catch (error) {
    logMerchantsFallback('Falling back to static merchant for slug', error, slug);
    return fallbackMerchant(slug);
  }
}

export async function listFeaturedMerchants(): Promise<MerchantProfile[]> {
  const merchants = await listMerchants();
  return merchants.filter((merchant) => merchant.featured);
}

export async function listMerchantsByProgram(programSlug: string): Promise<MerchantProfile[]> {
  try {
    const merchants = await prisma.merchant.findMany({
      where: {
        status: 'ACTIVE',
        program: { slug: programSlug },
      },
      include: {
        program: true,
        primaryTestimonial: true,
      },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    });

    if (merchants.length === 0) {
      return staticMerchants.filter((m) => m.programSlug === programSlug);
    }

    return merchants.map(toMerchantProfile);
  } catch (error) {
    logMerchantsFallback('Falling back to static merchants by program:', error);
    return staticMerchants.filter((m) => m.programSlug === programSlug);
  }
}

export async function listRelatedMerchants(slug: string, limit = 3): Promise<MerchantProfile[]> {
  const merchants = await listMerchants();
  const currentMerchant = merchants.find((merchant) => merchant.slug === slug);

  if (!currentMerchant) {
    return merchants.filter((merchant) => merchant.slug !== slug).slice(0, limit);
  }

  return merchants
    .filter((merchant) => merchant.slug !== slug)
    .sort((left, right) => {
      const leftScore = Number(left.category === currentMerchant.category) + Number(left.city === currentMerchant.city);
      const rightScore = Number(right.category === currentMerchant.category) + Number(right.city === currentMerchant.city);
      return rightScore - leftScore;
    })
    .slice(0, limit);
}

export async function listMerchantRoutes(): Promise<MerchantRoute[]> {
  try {
    const merchants = await prisma.merchant.findMany({
      where: { status: 'ACTIVE' },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
    });

    if (merchants.length === 0) {
      return staticMerchants.map((merchant) => ({
        slug: merchant.slug,
        updatedAt: new Date(),
      }));
    }

    return merchants;
  } catch (error) {
    logMerchantsFallback('Falling back to static merchant routes:', error);
    return staticMerchants.map((merchant) => ({
      slug: merchant.slug,
      updatedAt: new Date(),
    }));
  }
}