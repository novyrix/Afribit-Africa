import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Afribit Africa's mission to empower African communities through Bitcoin education and financial inclusion. Meet our team, discover our vision, and see our impact timeline from 2020 to today.",
  keywords: [
    "about Afribit",
    "Bitcoin Africa mission",
    "team",
    "vision",
    "impact",
    "timeline",
    "partners",
  ],
  openGraph: {
    title: "About Afribit Africa",
    description: "Building a Bitcoin-powered future for African communities. Learn about our mission, vision, and impact.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
