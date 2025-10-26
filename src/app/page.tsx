import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
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

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Support Our Mission</h2>
            <p className="text-xl opacity-90">
              Your Bitcoin donation directly funds education, merchant onboarding, and community development in Kibera.
            </p>
            <Button asChild size="lg" className="bg-bitcoin hover:bg-bitcoin-dark">
              <Link href="/donate">Donate with Bitcoin</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
