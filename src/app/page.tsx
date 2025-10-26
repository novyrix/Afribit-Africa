import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Statistics Section with Animated Counters */}
      <StatisticsSection />

      {/* Programs Section */}
      <ProgramsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-bitcoin text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Support Our Mission</h2>
            <p className="text-xl opacity-90">
              Your donation helps us empower more communities with Bitcoin education and sustainable development.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/donate">Make a Donation</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
