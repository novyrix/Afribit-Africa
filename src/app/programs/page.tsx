'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { programs, programCategories, type ProgramCategory } from '@/data/programs';
import { DonationModal } from '@/components/donations/DonationModal';
import { Target, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('All');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const filteredPrograms =
    selectedCategory === 'All'
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  const totalGoal = programs.reduce((sum, p) => sum + (p.goal || 0), 0);
  const totalRaised = programs.reduce((sum, p) => sum + (p.raised || 0), 0);
  const progressPercentage = Math.round((totalRaised / totalGoal) * 100);

  const handleDonate = (programSlug: string) => {
    setSelectedProgram(programSlug);
    setIsDonationModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-hero bg-linear-to-b from-primary/10 to-background">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold">Our Programs</h1>
              <p className="text-xl text-muted-foreground">
                Five strategic initiatives bringing Bitcoin adoption and economic empowerment to
                African communities. Every donation directly supports these life-changing programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="gradient" onClick={() => setIsDonationModalOpen(true)}>
                  <Target className="mr-2 h-5 w-5" />
                  Support All Programs
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#programs">Browse Programs</a>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Overall Progress */}
        <section className="section-md bg-secondary/30">
          <Container>
            <Card className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Goal</p>
                  <p className="text-4xl font-bold text-primary">${totalGoal.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Raised</p>
                  <p className="text-4xl font-bold text-green-500">${totalRaised.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Overall Progress</p>
                  <p className="text-4xl font-bold">{progressPercentage}%</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full bg-secondary rounded-full h-4">
                  <div
                    className="bg-primary rounded-full h-4 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </Card>
          </Container>
        </section>

        {/* Category Filter */}
        <section id="programs" className="py-12">
          <Container>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {programCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  size="lg"
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-2 text-xs opacity-70">
                      ({programs.filter((p) => p.category === category).length})
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => {
                const progress = Math.round(
                  ((program.raised || 0) / (program.goal || 1)) * 100
                );

                return (
                  <Card key={program.id} className="overflow-hidden group">
                    {/* Image */}
                    <div className="aspect-video bg-secondary relative overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/Images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {program.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {program.description}
                      </p>

                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">
                            ${(program.raised || 0).toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            of ${(program.goal || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{progress}% funded</p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {program.features?.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          className="flex-1"
                          onClick={() => handleDonate(program.slug)}
                        >
                          Donate
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`/programs/${program.slug}`}>Learn More</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No programs found in this category.
                </p>
              </div>
            )}
          </Container>
        </section>

        {/* Impact Section */}
        <section className="section-lg bg-secondary/30">
          <Container>
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Program Impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real results from your donations across all our programs
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: '500+', label: 'People Trained', icon: <Target /> },
                { value: '200+', label: 'Merchants Onboarded', icon: <TrendingUp /> },
                { value: '30+', label: 'Boda-Boda Drivers', icon: <TrendingUp /> },
                { value: '100+', label: 'Businesses Supported', icon: <CheckCircle /> },
              ].map((stat, index) => (
                <Card key={index} className="p-6 text-center space-y-3">
                  <div className="flex justify-center text-primary">{stat.icon}</div>
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="section-lg bg-linear-to-r from-primary to-orange-500 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Every Donation Makes a Difference
              </h2>
              <p className="text-xl text-white/90">
                Choose a program that resonates with you, or support all five to maximize your
                impact across Africa.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsDonationModalOpen(true)}
              >
                Donate Now
              </Button>
            </div>
          </Container>
        </section>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        defaultProgram={selectedProgram}
      />
    </>
  );
}
