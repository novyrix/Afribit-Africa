import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/StructuredData";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Afribit Africa - Empowering Communities Through Bitcoin",
    template: "%s | Afribit Africa",
  },
  description: "Empowering Africa through Bitcoin education, financial inclusion, and community development. Join us in bringing financial freedom to African communities.",
  keywords: [
    "Bitcoin",
    "Africa",
    "Bitcoin education",
    "financial inclusion",
    "cryptocurrency",
    "Uganda",
    "Bitcoin adoption",
    "financial freedom",
    "blockchain",
    "African development",
    "Boda-Boda",
    "waste management",
    "merchant onboarding",
  ],
  authors: [{ name: "Afribit Africa" }],
  creator: "Afribit Africa",
  publisher: "Afribit Africa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Afribit Africa",
    title: "Afribit Africa - Empowering Communities Through Bitcoin",
    description: "Empowering Africa through Bitcoin education, financial inclusion, and community development.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Afribit Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AfribitAfrica",
    creator: "@AfribitAfrica",
    title: "Afribit Africa - Empowering Communities Through Bitcoin",
    description: "Empowering Africa through Bitcoin education, financial inclusion, and community development.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
