// Programs data - sourced from BTCPay crowdfunding campaigns
import type { ProgramCard } from "@/types"

export const programs: ProgramCard[] = [
  {
    id: "bitcoin-education",
    title: "Bitcoin Education Program",
    description: "Training 500+ community ambassadors to spread Bitcoin knowledge throughout Kibera and beyond. Empowering locals with financial literacy and cryptocurrency skills.",
    image: "/Images/Trezor Academy session pics/IMG-20250914-WA0117.jpg",
    icon: "GraduationCap",
    goal: 20000,
    raised: 850,
    category: "Education",
    slug: "bitcoin-education",
    features: [
      "500 Community Ambassadors trained",
      "Weekly Bitcoin meetups and workshops",
      "Hands-on wallet setup sessions",
      "Lightning Network education",
    ],
  },
  {
    id: "boda-boda",
    title: "Boda-Boda Compliance & Education",
    description: "Supporting motorcycle taxi drivers with Bitcoin payments, compliance training, and financial inclusion. Making transportation more accessible and efficient.",
    image: "/Images/Motorbike bitcoin onboarding.jpg",
    icon: "Bike",
    goal: 15000,
    raised: 420,
    category: "Transportation",
    slug: "boda-boda-compliance",
    features: [
      "Motorcycle taxi driver onboarding",
      "Bitcoin payment integration",
      "Compliance and safety training",
      "Income tracking and financial planning",
    ],
  },
  {
    id: "waste-management",
    title: "Waste Management Expansion",
    description: "Expanding our community-led waste collection initiative. Pay collectors in Bitcoin while keeping Kibera clean and creating sustainable jobs.",
    image: "/Images/Waste Collection.jpg",
    icon: "Recycle",
    goal: 18000,
    raised: 390,
    category: "Environment",
    slug: "waste-management",
    features: [
      "Weekly waste collection drives",
      "Bitcoin payments for collectors",
      "Environmental education programs",
      "Recycling partnerships",
    ],
  },
  {
    id: "business-accelerator",
    title: "Business Accelerator & Financing",
    description: "Helping local entrepreneurs access Bitcoin-based microfinancing. Supporting small businesses with capital, mentorship, and Bitcoin adoption.",
    image: "/Images/Mama mboga groceries accepting bitcoin.jpg",
    icon: "TrendingUp",
    goal: 25000,
    raised: 310,
    category: "Business",
    slug: "business-accelerator",
    features: [
      "Micro-loans in Bitcoin",
      "Business mentorship programs",
      "Merchant onboarding support",
      "Financial literacy workshops",
    ],
  },
  {
    id: "equipment-scaling",
    title: "Equipment for Efficiency & Scaling",
    description: "Acquiring essential equipment to scale our operations: smartphones, Point-of-Sale devices, and educational materials for wider community impact.",
    image: "/Images/Payment done in bitcoin.jpg",
    icon: "Smartphone",
    goal: 22000,
    raised: 179,
    category: "Infrastructure",
    slug: "equipment-scaling",
    features: [
      "Bitcoin POS devices for merchants",
      "Smartphones for ambassadors",
      "Educational materials and signage",
      "Solar charging stations",
    ],
  },
]

export function getProgramBySlug(slug: string): ProgramCard | undefined {
  return programs.find(program => program.slug === slug)
}

export function getProgramsByCategory(category: string): ProgramCard[] {
  return programs.filter(program => program.category === category)
}

export const programCategories = [
  "All",
  "Education",
  "Transportation",
  "Environment",
  "Business",
  "Infrastructure",
] as const

export type ProgramCategory = typeof programCategories[number]
