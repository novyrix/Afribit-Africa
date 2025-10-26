import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { StructuredData } from "@/components/StructuredData";
import { getBreadcrumbSchema } from "@/lib/metadata";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afribit Africa",
  description: "Empowering Africa through Bitcoin education, financial inclusion, and community development. Join us in bringing financial freedom to African communities with programs in education, waste management, and business acceleration.",
  openGraph: {
    title: "Afribit Africa - Empowering Communities Through Bitcoin",
    description: "Join us in bringing Bitcoin financial freedom to African communities. Support education, merchant onboarding, and sustainable development initiatives.",
  },
};

export default function Home() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      
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
