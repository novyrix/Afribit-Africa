import { Container } from "@/components/layout/Container"
import { ContactForm } from "@/components/forms/ContactForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/StructuredData"
import { getBreadcrumbSchema } from "@/lib/metadata"
import { ScrollReveal } from "@/components/animations"
import { Mail, MapPin, MessageSquare } from "lucide-react"
import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Afribit Africa. We're here to answer your questions about Bitcoin adoption in Africa, our programs, and how you can get involved.",
  openGraph: {
    title: "Contact Afribit Africa",
    description: "Have questions about our Bitcoin programs? We'd love to hear from you.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <div className="min-h-screen section-hero">
      <StructuredData data={breadcrumbSchema} />
      <Container>
        {/* Page Header */}
        <ScrollReveal className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our programs or want to get involved? We&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 hover:border-bitcoin/20 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-bitcoin/10 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-bitcoin" />
                  </div>
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Send us an email and we&apos;ll respond within 24 hours.
                </p>
                <a
                  href="mailto:info@afribit.africa"
                  className="text-bitcoin hover:text-bitcoin-dark font-semibold block transition-colors"
                >
                  info@afribit.africa
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-bitcoin/20 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-bitcoin/10 p-2 rounded-full">
                    <MapPin className="w-5 h-5 text-bitcoin" />
                  </div>
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Kibera, Nairobi
                  <br />
                  Kenya
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-bitcoin/20 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-bitcoin/10 p-2 rounded-full">
                    <MessageSquare className="w-5 h-5 text-bitcoin" />
                  </div>
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Connect with us on social media for updates and news.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/afribitafrica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bitcoin hover:text-bitcoin-dark transition-colors font-medium"
                  >
                    Twitter
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a
                    href="https://facebook.com/afribitafrica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bitcoin hover:text-bitcoin-dark transition-colors font-medium"
                  >
                    Facebook
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 hover:border-bitcoin/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}
