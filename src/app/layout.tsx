import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afribit Africa - Empowering Communities Through Bitcoin",
  description: "Empowering African communities through Bitcoin education, merchant onboarding, and sustainable development initiatives in Kenya.",
  keywords: ["Bitcoin", "Africa", "Kenya", "Cryptocurrency", "Education", "Merchant Onboarding", "Community Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
