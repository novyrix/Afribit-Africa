import { Metadata } from 'next';
import { ProgramDetailClient } from '@/components/programs/ProgramDetailClient';
import { findProgramBySlug, listProgramRoutes } from '@/lib/content/programs';
import { listTestimonialsByProgram } from '@/lib/content/testimonials';
import { listMerchantsByProgram } from '@/lib/content/merchants';
import { notFound } from 'next/navigation';

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programs = await listProgramRoutes();
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await findProgramBySlug(slug);
  if (!program) return {};

  const title = `${program.title} | Afribit Africa`;
  const description = program.description;

  return {
    title,
    description,
    openGraph: {
      title: program.title,
      description,
      images: program.image ? [{ url: program.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: program.title,
      description,
      images: program.image ? [program.image] : [],
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const [program, testimonials, merchants] = await Promise.all([
    findProgramBySlug(slug),
    listTestimonialsByProgram(slug),
    listMerchantsByProgram(slug),
  ]);

  if (!program) {
    notFound();
  }

  return <ProgramDetailClient program={program} testimonials={testimonials} merchants={merchants} />;
}
