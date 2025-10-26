import { Container } from "@/components/layout/Container"
import { ContactForm } from "@/components/forms/ContactForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, MessageSquare } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Afribit Africa",
  description: "Get in touch with Afribit Africa. We're here to answer your questions about Bitcoin adoption in Kenya.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our programs or want to get involved? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
