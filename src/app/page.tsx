import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section - Temporary Placeholder */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Empowering African Communities Through{" "}
              <span className="text-bitcoin">Bitcoin</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Building a sustainable future with Bitcoin education, merchant onboarding, 
              and community development initiatives in Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-bitcoin hover:bg-bitcoin-dark">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section - Placeholder */}
      <section className="py-16 bg-white border-y">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-bitcoin">2,000+</div>
              <div className="text-muted-foreground mt-2">Transactions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-bitcoin">200+</div>
              <div className="text-muted-foreground mt-2">Merchants Onboarded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-bitcoin">5</div>
              <div className="text-muted-foreground mt-2">Active Programs</div>
            </div>
          </div>
        </Container>
      </section>

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
