import 'server-only';

import type { Program as PrismaProgram } from '@prisma/client';
import type { ProgramCard } from '@/types';
import { prisma } from '@/lib/prisma';
import { programs as staticPrograms } from '@/data/programs';

type ProgramRoute = {
  slug: string;
  updatedAt: Date;
};

const loggedFallbacks = {
  programs: false,
  singleProgram: new Set<string>(),
  routes: false,
};

function logProgramsFallback(message: string, error: unknown, slug?: string) {
  if (slug) {
    if (loggedFallbacks.singleProgram.has(slug)) {
      return;
    }

    loggedFallbacks.singleProgram.add(slug);
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

  if (loggedFallbacks.programs) {
    return;
  }

  loggedFallbacks.programs = true;
  console.error(message, error);
}

function fallbackProgram(slug: string): ProgramCard | undefined {
  return staticPrograms.find((program) => program.slug === slug);
}

function toProgramCard(program: PrismaProgram): ProgramCard {
  const fallback = fallbackProgram(program.slug);

  return {
    id: program.id,
    title: program.name,
    description: program.summary || program.description || fallback?.description || '',
    image: program.coverImage || fallback?.image || '/Images/placeholder.jpg',
    slug: program.slug,
    icon: fallback?.icon,
    goal: program.goal ? Number(program.goal) : fallback?.goal,
    raised: Number(program.raised),
    category: fallback?.category,
    features: fallback?.features,
    status: program.status,
    locationLabel: program.locationLabel || undefined,
    city: program.city || undefined,
    country: program.country || undefined,
    beneficiaryCount: program.beneficiaryCount || undefined,
    featured: program.featured,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  };
}

export async function listPrograms(): Promise<ProgramCard[]> {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    if (programs.length === 0) {
      return staticPrograms;
    }

    return programs.map(toProgramCard);
  } catch (error) {
    logProgramsFallback('Falling back to static programs:', error);
    return staticPrograms;
  }
}

export async function findProgramBySlug(slug: string): Promise<ProgramCard | undefined> {
  try {
    const program = await prisma.program.findUnique({
      where: { slug },
    });

    if (!program) {
      return fallbackProgram(slug);
    }

    return toProgramCard(program);
  } catch (error) {
    logProgramsFallback('Falling back to static program for slug', error, slug);
    return fallbackProgram(slug);
  }
}

export async function listProgramRoutes(): Promise<ProgramRoute[]> {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    if (programs.length === 0) {
      return staticPrograms.map((program) => ({
        slug: program.slug,
        updatedAt: new Date(),
      }));
    }

    return programs;
  } catch (error) {
    logProgramsFallback('Falling back to static program routes:', error);
    return staticPrograms.map((program) => ({
      slug: program.slug,
      updatedAt: new Date(),
    }));
  }
}