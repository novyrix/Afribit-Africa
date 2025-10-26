import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Statistics Section with Animated Counters */}
      <StatisticsSection />

      {/* Programs Preview - Placeholder */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
            <p className="text-xl text-muted-foreground">
              Making a real impact in African communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Merchant Onboarding", "Bitcoin Education", "Community Support"].map((program) => (
              <div key={program} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{program}</h3>
                <p className="text-muted-foreground">
                  Empowering communities through innovative Bitcoin solutions.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
