import { Container } from "@/components/layout/Container"
import { ContactForm } from "@/components/forms/ContactForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/StructuredData"
import { getBreadcrumbSchema } from "@/lib/metadata"
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
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our programs or want to get involved? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-bitcoin" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Send us an email and we&apos;ll respond within 24 hours.
                </p>
                <a
                  href="mailto:info@afribit.africa"
                  className="text-bitcoin hover:underline font-medium mt-2 block"
                >
                  info@afribit.africa
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-bitcoin" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kibera, Nairobi
                  <br />
                  Kenya
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-bitcoin" />
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Connect with us on social media for updates and news.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://twitter.com/afribitafrica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bitcoin hover:text-bitcoin-dark transition-colors"
                  >
                    Twitter
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a
                    href="https://facebook.com/afribitafrica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bitcoin hover:text-bitcoin-dark transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
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
