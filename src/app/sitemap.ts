import { MetadataRoute } from 'next';
import { listMerchantRoutes } from '@/lib/content/merchants';
import { listProgramRoutes } from '@/lib/content/programs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/donate`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/programs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/merchants`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  const [programs, merchants] = await Promise.all([listProgramRoutes(), listMerchantRoutes()]);

  const programRoutes = programs.map((program) => ({
    url: `${SITE_URL}/programs/${program.slug}`,
    lastModified: program.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const merchantRoutes = merchants.map((merchant) => ({
    url: `${SITE_URL}/merchants/${merchant.slug}`,
    lastModified: merchant.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes, ...merchantRoutes];
}
