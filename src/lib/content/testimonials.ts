import 'server-only';

import type { Testimonial as PrismaTestimonial } from '@prisma/client';
import type { TestimonialCard } from '@/types';
import { prisma } from '@/lib/prisma';
import { testimonials as staticTestimonials } from '@/data/testimonials';

let loggedTestimonialsFallback = false;

function fallbackTestimonial(id: string): TestimonialCard | undefined {
  return staticTestimonials.find((testimonial) => testimonial.id === id);
}

function toTestimonialCard(testimonial: PrismaTestimonial): TestimonialCard {
  const fallback = testimonial.slug ? fallbackTestimonial(testimonial.slug) : undefined;

  return {
    id: testimonial.slug || testimonial.id,
    name: testimonial.name,
    role: testimonial.role || fallback?.role,
    location: testimonial.location || fallback?.location,
    quote: testimonial.quote,
    image:
      testimonial.image || fallback?.image || '/Images/Hero section video background fallback.png',
    videoUrl: testimonial.videoUrl || fallback?.videoUrl,
    youtubeId: testimonial.youtubeId || fallback?.youtubeId,
  };
}

export async function listTestimonials(): Promise<TestimonialCard[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'asc' }],
    });

    if (testimonials.length === 0) {
      return staticTestimonials;
    }

    return testimonials.map(toTestimonialCard);
  } catch (error) {
    if (!loggedTestimonialsFallback) {
      loggedTestimonialsFallback = true;
      console.error('Falling back to static testimonials:', error);
    }

    return staticTestimonials;
  }
}

export async function listTestimonialsByProgram(programSlug: string): Promise<TestimonialCard[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true, program: programSlug },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    });

    if (testimonials.length === 0) {
      return staticTestimonials.filter((t) => {
        // map known program slugs to testimonial IDs from static data
        const programToIds: Record<string, string[]> = {
          'business-accelerator': ['fridah', 'grace', 'david'],
          'waste-management': ['mercy'],
          'boda-boda-compliance': ['brian'],
          'bitcoin-education': ['lilian'],
        };
        return (programToIds[programSlug] ?? []).includes(t.id);
      });
    }

    return testimonials.map(toTestimonialCard);
  } catch (error) {
    if (!loggedTestimonialsFallback) {
      loggedTestimonialsFallback = true;
      console.error('Falling back to static testimonials by program:', error);
    }

    return staticTestimonials.filter((t) => {
      const programToIds: Record<string, string[]> = {
        'business-accelerator': ['fridah', 'grace', 'david'],
        'waste-management': ['mercy'],
        'boda-boda-compliance': ['brian'],
        'bitcoin-education': ['lilian'],
      };
      return (programToIds[programSlug] ?? []).includes(t.id);
    });
  }
}