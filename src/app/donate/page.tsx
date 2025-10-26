'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { DonationModal } from '@/components/donations/DonationModal';
import { ImpactCalculator } from '@/components/donations/ImpactCalculator';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bitcoin, Heart, Users, TrendingUp, CheckCircle, Shield, Globe } from 'lucide-react';

const DONATION_TIERS = [
  {
    amount: 25,
    title: 'Supporter',
    description: 'Help us reach 5 people with Bitcoin education',
    icon: <Heart className="h-6 w-6" />,
  },
  {
    amount: 50,
    title: 'Advocate',
    description: 'Support 2 training sessions for local merchants',
    icon: <Users className="h-6 w-6" />,
  },
  {
    amount: 100,
    title: 'Champion',
    description: 'Enable 10 Bitcoin wallet setups',
    icon: <Bitcoin className="h-6 w-6" />,
  },
  {
    amount: 250,
    title: 'Pioneer',
    description: 'Onboard 5 merchants to accept Bitcoin',
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    amount: 500,
    title: 'Visionary',
    description: 'Fully fund a community education program',
    icon: <Globe className="h-6 w-6" />,
  },
];

const IMPACT_STORIES = [
  {
    name: 'Fridah',
    role: 'Market Vendor',
    story: 'Thanks to donations, I learned to accept Bitcoin payments. My business has grown 30% and I can now save money without worrying about inflation.',
    image: '/Images/fridah.jpg',
  },
  {
    name: 'Brian',
    role: 'Boda-Boda Driver',
    story: 'The Bitcoin training program changed my life. I now accept digital payments and have access to financial services for the first time.',
    image: '/Images/brian.jpg',
  },
  {
    name: 'Grace',
    role: 'Small Business Owner',
    story: 'With the equipment funded by donors, I started accepting Bitcoin payments. My customers love it, and I\'ve opened doors to global commerce.',
    image: '/Images/grace.jpg',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How do I donate with Bitcoin?',
    answer: 'Click any donation button above, and you\'ll be redirected to our secure BTCPay Server checkout. You can pay with Bitcoin on-chain or via Lightning Network. QR codes are provided for easy wallet scanning.',
  },
  {
    question: 'Can I donate with traditional currency?',
    answer: 'Currently, we accept Bitcoin donations through BTCPay Server. The amounts displayed in USD are converted to Bitcoin at the current exchange rate when you create your donation invoice.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Afribit Africa is a registered non-profit organization. Donations may be tax-deductible depending on your country\'s regulations. We provide receipts for all donations. Please consult with a tax professional in your jurisdiction.',
  },
  {
    question: 'How is my donation used?',
    answer: 'Your donation directly supports Bitcoin education programs, merchant onboarding, equipment purchases, and community development initiatives across Africa. We maintain full transparency with regular impact reports.',
  },
  {
    question: 'Can I make a recurring donation?',
    answer: 'Recurring donations are not currently available through our BTCPay Server integration, but we\'re working on this feature. For now, you can manually create donations at your preferred frequency.',
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes! All payments are processed through BTCPay Server, a self-hosted, open-source Bitcoin payment processor. Your transaction is secured by the Bitcoin network, and we never have access to your private keys.',
  },
  {
    question: 'Can I donate anonymously?',
    answer: 'Absolutely! When creating your donation, simply check the "Make this donation anonymous" option. Your name and email will not be recorded or displayed publicly.',
  },
  {
    question: 'How long does it take for my donation to be confirmed?',
    answer: 'Bitcoin on-chain transactions typically confirm within 10-60 minutes depending on network congestion. Lightning Network payments are instant. You\'ll receive confirmation once the transaction is settled.',
  },
];

export default function DonatePage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>();
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const handleDonate = (amount?: number, program?: string) => {
    setSelectedAmount(amount);
    setSelectedProgram(program);
    setIsDonationModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-hero bg-linear-to-b from-primary/10 to-background">
          <Container>
            <ScrollReveal className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold">
                Support Bitcoin Adoption in Africa
              </h1>
              <p className="text-xl text-muted-foreground">
                Your donation empowers communities, educates merchants, and builds a Bitcoin-powered
                future for Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => handleDonate()} size="lg" variant="gradient" className="text-lg">
                  <Bitcoin className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#impact">See Your Impact</a>
                </Button>
              </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="section-md bg-secondary/30">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Total Raised', value: '$2,149', icon: <TrendingUp /> },
                { label: 'Donors', value: '127', icon: <Users /> },
                { label: 'Merchants Helped', value: '200+', icon: <Users /> },
                { label: 'Active Programs', value: '5', icon: <CheckCircle /> },
              ].map((stat, index) => (
                <Card key={index} className="p-6 text-center space-y-3">
                  <div className="flex justify-center text-primary">{stat.icon}</div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Donation Tiers */}
        <section className="section-lg">
          <Container>
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Choose Your Impact Level</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every contribution makes a difference. Select a tier or choose a custom amount.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
              {DONATION_TIERS.map((tier, index) => (
                <Card
                  key={index}
                  className="p-6 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-2 hover:border-bitcoin/20"
                  onClick={() => handleDonate(tier.amount)}
                >
                  <div className="bg-bitcoin/10 text-bitcoin p-4 rounded-full w-fit mb-6 group-hover:scale-110 group-hover:bg-bitcoin group-hover:text-white transition-all duration-300">
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-bitcoin transition-colors">{tier.title}</h3>
                  <p className="text-4xl font-bold text-bitcoin mb-6">${tier.amount}</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{tier.description}</p>
                  <Button className="w-full group-hover:bg-bitcoin group-hover:text-white transition-all" variant="outline" size="lg">
                    Select
                  </Button>
                </Card>
              ))}

              {/* Custom Amount Card */}
              <Card
                className="p-6 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-dashed border-bitcoin/30 hover:border-bitcoin group"
                onClick={() => handleDonate()}
              >
                <div className="bg-linear-to-br from-bitcoin to-red-600 text-white p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-bitcoin transition-colors">Custom Amount</h3>
                <p className="text-4xl font-bold text-bitcoin mb-6">$___</p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Choose any amount that works for you
                </p>
                <Button className="w-full" variant="outline" size="lg">
                  Choose Amount
                </Button>
              </Card>
            </div>
          </Container>
        </section>

        {/* Impact Calculator */}
        <section id="impact" className="section-lg bg-secondary/30">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Impact</h2>
                <p className="text-lg text-muted-foreground">
                  See how your donation transforms lives across Africa
                </p>
              </div>
              <ImpactCalculator defaultAmount={50} />
            </div>
          </Container>
        </section>

        {/* Impact Stories */}
        <section className="section-lg">
          <Container>
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Your Donations at Work</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from people whose lives have been transformed by Bitcoin education
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {IMPACT_STORIES.map((story, index) => (
                <Card 
                  key={index} 
                  className="p-6 space-y-4 border-2 hover:border-bitcoin/20 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/Images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-bitcoin transition-colors">{story.name}</h3>
                  <p className="text-sm text-bitcoin font-semibold">{story.role}</p>
                  <p className="text-muted-foreground italic leading-relaxed">&ldquo;{story.story}&rdquo;</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Why Donate Section */}
        <section className="section-lg bg-secondary/30">
          <Container>
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Why Your Donation Matters</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {[
                {
                  icon: <Shield className="h-12 w-12" />,
                  title: 'Financial Inclusion',
                  description:
                    'Bitcoin provides banking services to millions of unbanked Africans, offering an alternative to unstable local currencies.',
                },
                {
                  icon: <Users className="h-12 w-12" />,
                  title: 'Community Empowerment',
                  description:
                    'Education programs create jobs, train merchants, and build sustainable Bitcoin economies in local communities.',
                },
                {
                  icon: <Globe className="h-12 w-12" />,
                  title: 'Global Impact',
                  description:
                    'Your donation connects African businesses to the global economy, opening new markets and opportunities.',
                },
              ].map((item, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="flex justify-center text-primary">{item.icon}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="section-lg">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center space-y-4 mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need to know about donating
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="section-lg bg-linear-to-r from-primary to-orange-500 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white/90">
                Join hundreds of donors supporting Bitcoin adoption across Africa. Every satoshi
                counts.
              </p>
              <Button
                onClick={() => handleDonate()}
                size="lg"
                variant="secondary"
                className="text-lg"
              >
                <Bitcoin className="mr-2 h-5 w-5" />
                Donate with Bitcoin
              </Button>
            </div>
          </Container>
        </section>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        defaultAmount={selectedAmount}
        defaultProgram={selectedProgram}
      />
    </>
  );
}
