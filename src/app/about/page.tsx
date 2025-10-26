'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';
import { teamMembers } from '@/data/team';
import { partners } from '@/data/partners';
import { timeline } from '@/data/timeline';
import { mediaCoverage } from '@/data/media';
import {
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Mail,
  Linkedin,
  Twitter,
  CheckCircle,
  Tv,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-hero bg-linear-to-b from-primary/10 to-background">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              Empowering Africa Through Bitcoin
            </h1>
            <p className="text-xl text-muted-foreground">
              We are building a Bitcoin-powered future for African communities, one merchant, one
              transaction, and one educated mind at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="gradient" asChild>
                <Link href="/donate">Support Our Mission</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section-lg">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Mission */}
            <Card className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide accessible Bitcoin education and infrastructure that empowers African
                communities to achieve financial sovereignty, economic opportunity, and protection
                against currency devaluation. We believe every person deserves access to sound money
                and the freedom it brings.
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A thriving African Bitcoin economy where communities are economically empowered,
                merchants accept digital payments seamlessly, and financial inclusion is a reality
                for all. We envision Africa as a global leader in Bitcoin adoption and innovation.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="section-lg bg-secondary/30">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Principles that guide everything we do at Afribit Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: 'Community First',
                description:
                  'We prioritize community needs and build solutions from the ground up with local input.',
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Financial Sovereignty',
                description:
                  'Empowering individuals with control over their wealth through self-custody and education.',
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: 'Open & Transparent',
                description:
                  'We operate with full transparency, using open-source tools and sharing our impact openly.',
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Innovation',
                description:
                  'Constantly exploring new ways to make Bitcoin accessible, practical, and beneficial.',
              },
            ].map((value, index) => (
              <Card key={index} className="p-6 md:p-8 text-center space-y-4 border-2 hover:border-bitcoin/20 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="flex justify-center">
                  <div className="bg-bitcoin/10 group-hover:bg-bitcoin p-4 rounded-full transition-colors">
                    <div className="text-primary group-hover:text-white transition-colors">{value.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-bitcoin transition-colors">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section-lg">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated individuals working tirelessly to bring Bitcoin to Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-bitcoin/20">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/Images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6 space-y-3 bg-white group-hover:bg-gray-50 transition-colors">
                  <h3 className="text-xl font-bold group-hover:text-bitcoin transition-colors">{member.name}</h3>
                  <p className="text-sm text-bitcoin font-semibold">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  <div className="flex gap-3 pt-2 border-t">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-muted-foreground hover:bg-bitcoin hover:text-white transition-all hover:scale-110"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-muted-foreground hover:bg-bitcoin hover:text-white transition-all hover:scale-110"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-muted-foreground hover:bg-bitcoin hover:text-white transition-all hover:scale-110"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact Timeline */}
      <section className="section-lg bg-secondary/30">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to bring Bitcoin to Africa
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2" />

              {/* Timeline events */}
              <div className="space-y-8">
                {timeline.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Year badge */}
                    <div className="shrink-0 w-16 md:w-1/2 md:text-right md:pr-12">
                      <div
                        className={`inline-block ${
                          index % 2 === 0 ? '' : 'md:float-right'
                        }`}
                      >
                        <span className="text-2xl font-bold text-primary">{event.year}</span>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <div
                        className={`h-4 w-4 rounded-full border-4 border-background ${
                          event.milestone ? 'bg-primary' : 'bg-primary/50'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="grow pl-16 md:w-1/2 md:pl-12">
                      <Card
                        className={`p-6 border-2 hover:shadow-lg transition-all ${
                          event.milestone 
                            ? 'border-bitcoin hover:border-bitcoin/60 bg-bitcoin/5' 
                            : 'hover:border-bitcoin/20'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          {event.milestone && (
                            <div className="shrink-0 mt-0.5 bg-bitcoin/10 p-1.5 rounded-full">
                              <CheckCircle className="h-5 w-5 text-bitcoin" />
                            </div>
                          )}
                          <h3 className="text-lg font-bold leading-tight">{event.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="section-lg">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact in Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from our work across Africa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '2000+', label: 'Bitcoin Transactions', icon: <TrendingUp /> },
              { value: '200+', label: 'Merchants Onboarded', icon: <Users /> },
              { value: '1000+', label: 'Community Members', icon: <Users /> },
              { value: '5', label: 'Active Programs', icon: <CheckCircle /> },
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="p-6 text-center space-y-3 border-2 hover:border-bitcoin/20 hover:shadow-lg transition-all group cursor-default"
              >
                <div className="flex justify-center text-bitcoin group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Media Coverage Section */}
      <section className="section-lg bg-secondary/30">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3">
              <Tv className="h-10 w-10 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Media Coverage</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Global and local media coverage of our Bitcoin adoption work in Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {mediaCoverage.map((media) => (
              <Card key={media.id} className="overflow-hidden space-y-0">
                <YouTubeEmbed videoId={media.youtubeId} title={media.title} />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{media.outlet}</span>
                    <span className="text-xs text-muted-foreground">{media.date}</span>
                  </div>
                  <h3 className="text-lg font-bold">{media.title}</h3>
                  <p className="text-sm text-muted-foreground">{media.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners Section */}
      <section className="section-lg">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Working together with organizations that share our vision
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="h-24 w-24 mb-4 bg-white rounded-lg p-4 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/Logo/logo.svg';
                    }}
                  />
                </div>
                <p className="text-sm font-medium mb-1 group-hover:text-bitcoin transition-colors">{partner.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-orange-500 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 text-white/90">
              Whether through donations, volunteering, or spreading awareness, you can help us bring
              Bitcoin financial freedom to Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
