import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Afribit Africa's mission to bring Bitcoin financial freedom to African communities. Your donation funds education, merchant onboarding, and sustainable development. Pay with Bitcoin, Lightning, or other cryptocurrencies.",
  keywords: [
    "Bitcoin donation",
    "donate Bitcoin",
    "cryptocurrency donation",
    "support Africa",
    "Bitcoin charity",
    "Lightning Network donation",
  ],
  openGraph: {
    title: "Donate to Afribit Africa",
    description: "Support our mission with Bitcoin. Your donation brings financial freedom to African communities.",
    url: `${SITE_URL}/donate`,
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
