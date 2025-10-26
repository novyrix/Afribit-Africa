import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Explore Afribit Africa's five strategic programs: Bitcoin Education, Boda-Boda Compliance, Waste Management, Business Accelerator, and Equipment Scaling. Each initiative brings Bitcoin adoption and economic empowerment to African communities.",
  keywords: [
    "Bitcoin education program",
    "Boda-Boda compliance",
    "waste management Bitcoin",
    "business accelerator",
    "African programs",
  ],
  openGraph: {
    title: "Afribit Africa Programs",
    description: "Five strategic initiatives bringing Bitcoin adoption to African communities.",
    url: `${SITE_URL}/programs`,
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
