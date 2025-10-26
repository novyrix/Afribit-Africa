'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProgramBySlug } from '@/data/programs';
import { DonationModal } from '@/components/donations/DonationModal';
import { ImpactCalculator } from '@/components/donations/ImpactCalculator';
import {
  CheckCircle,
  TrendingUp,
  Users,
  Target,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

  // Resolve params on mount
  useState(() => {
    params.then(setResolvedParams);
  });

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const program = getProgramBySlug(resolvedParams.slug);

  if (!program) {
    notFound();
  }

  const progress = Math.round(((program.raised || 0) / (program.goal || 1)) * 100);

  return (
    <>
      <div className="min-h-screen">
        {/* Back Button */}
        <section className="py-6 border-b">
          <Container>
            <Button variant="ghost" asChild>
              <Link href="/programs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </Link>
            </Button>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Images/placeholder.jpg';
                  }}
                />
              </div>

              {/* Content */}
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  {program.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{program.title}</h1>
                <p className="text-xl text-muted-foreground mb-8">{program.description}</p>

                {/* Progress Card */}
                <Card className="p-6 mb-6">
                  <div className="flex justify-between items-baseline mb-4">
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        ${(program.raised || 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        raised of ${(program.goal || 0).toLocaleString()} goal
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{progress}%</p>
                      <p className="text-sm text-muted-foreground">funded</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 mb-4">
                    <div
                      className="bg-primary rounded-full h-3 transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsDonationModalOpen(true)}
                  >
                    Donate to This Program
                  </Button>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Active Since</p>
                    <p className="font-semibold">2023</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Beneficiaries</p>
                    <p className="font-semibold">500+</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">Kampala</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Program Details */}
        <section className="py-20 bg-secondary/30">
          <Container>
            <div className="grid md:grid-cols-2 gap-12">
              {/* What We Do */}
              <div>
                <h2 className="text-3xl font-bold mb-6">What We Do</h2>
                <Card className="p-6">
                  <ul className="space-y-4">
                    {program.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Impact Goals */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Impact Goals</h2>
                <Card className="p-6">
                  <div className="space-y-6">
                    {[
                      {
                        icon: <Target />,
                        title: 'Community Empowerment',
                        description:
                          'Equipping locals with knowledge and tools to achieve financial sovereignty through Bitcoin.',
                      },
                      {
                        icon: <TrendingUp />,
                        title: 'Economic Growth',
                        description:
                          'Creating sustainable income opportunities and supporting local businesses.',
                      },
                      {
                        icon: <Users />,
                        title: 'Network Building',
                        description:
                          'Connecting community members to a global Bitcoin economy and support network.',
                      },
                    ].map((goal, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="shrink-0 p-3 bg-primary/10 rounded-lg h-fit">
                          <div className="text-primary">{goal.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Program Timeline</h2>
              <div className="space-y-8">
                {[
                  {
                    phase: 'Phase 1',
                    title: 'Foundation & Pilot',
                    description:
                      'Initial setup, first participants onboarded, and core infrastructure established.',
                    status: 'completed',
                  },
                  {
                    phase: 'Phase 2',
                    title: 'Growth & Expansion',
                    description:
                      'Scaling operations, increasing participant numbers, and refining processes.',
                    status: 'in-progress',
                  },
                  {
                    phase: 'Phase 3',
                    title: 'Sustainability',
                    description:
                      'Achieving self-sustaining operations and measuring long-term impact.',
                    status: 'upcoming',
                  },
                ].map((phase, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="shrink-0">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold ${
                          phase.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : phase.status === 'in-progress'
                            ? 'bg-primary text-white'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </div>
                    <div className="grow pb-8 border-l-2 border-dashed border-secondary pl-6 -ml-6">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{phase.phase}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            phase.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : phase.status === 'in-progress'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {phase.status.replace('-', ' ')}
                        </span>
                      </div>
                      <h4 className="font-semibold mb-2">{phase.title}</h4>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Impact Calculator */}
        <section className="py-20 bg-secondary/30">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Calculate Your Impact on This Program
              </h2>
              <ImpactCalculator defaultAmount={50} />
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-linear-to-r from-primary to-orange-500 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Support {program.title}</h2>
              <p className="text-xl mb-8 text-white/90">
                Your donation directly supports this program and helps us reach more people in need
                of Bitcoin education and financial empowerment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setIsDonationModalOpen(true)}
                >
                  Donate Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link href="/programs">View All Programs</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        defaultProgram={program.slug}
      />
    </>
  );
}
