import type { MerchantProfile, TestimonialCard } from "@/types"
import { testimonials } from "@/data/testimonials"

type MerchantBlueprint = {
  id: string
  testimonialId: string
  slug: string
  category: string
  summary: string
  story: string
  neighborhood: string
  city: string
  country: string
  latitude: number
  longitude: number
  programSlug: string
  services: string[]
  paymentMethods: string[]
  featured?: boolean
}

const testimonialLookup = new Map<string, TestimonialCard>(
  testimonials.map((testimonial) => [testimonial.id, testimonial])
)

const merchantBlueprints: MerchantBlueprint[] = [
  {
    id: "merchant-fridah",
    testimonialId: "fridah",
    slug: "fridah-fresh-produce",
    category: "Retail",
    summary: "Fresh produce seller using Bitcoin to reduce cash friction and simplify everyday transactions.",
    story:
      "Fridah represents the kind of neighborhood merchant Afribit is designed to support: practical, community-based, and ready to adopt better payment tools when the onboarding is clear. Her profile shows how a simple payment upgrade can improve customer experience and reduce day-to-day risk.",
    neighborhood: "Kibera",
    city: "Nairobi",
    country: "Kenya",
    latitude: -1.3138,
    longitude: 36.7872,
    programSlug: "business-accelerator",
    services: ["Fresh groceries", "Daily retail checkout", "Bitcoin point-of-sale support"],
    paymentMethods: ["Bitcoin", "Cash"],
    featured: true,
  },
  {
    id: "merchant-grace",
    testimonialId: "grace",
    slug: "grace-mama-mboga",
    category: "Food Retail",
    summary: "Vegetable vendor demonstrating how Bitcoin can fit naturally into high-frequency neighborhood commerce.",
    story:
      "Grace's profile highlights the importance of simple merchant onboarding. Her journey from technology hesitation to daily Bitcoin acceptance is the kind of proof Afribit needs to surface more clearly across the site.",
    neighborhood: "Kibera",
    city: "Nairobi",
    country: "Kenya",
    latitude: -1.3149,
    longitude: 36.7893,
    programSlug: "business-accelerator",
    services: ["Vegetable sales", "Local household supplies", "Bitcoin checkout"],
    paymentMethods: ["Bitcoin", "M-Pesa", "Cash"],
    featured: true,
  },
  {
    id: "merchant-mercy",
    testimonialId: "mercy",
    slug: "mercy-waste-services",
    category: "Environmental Services",
    summary: "Community waste collection operator showing how Bitcoin supports service-based local work, not just shopfronts.",
    story:
      "Mercy's work connects clean neighborhoods, sustainable income, and direct Bitcoin payments. This is a good example of Afribit's broader merchant and service economy story, which should sit alongside retail businesses in the platform experience.",
    neighborhood: "Kibera",
    city: "Nairobi",
    country: "Kenya",
    latitude: -1.3161,
    longitude: 36.7854,
    programSlug: "waste-management",
    services: ["Waste collection coordination", "Community recycling support", "Field payment operations"],
    paymentMethods: ["Bitcoin"],
    featured: true,
  },
  {
    id: "merchant-brian",
    testimonialId: "brian",
    slug: "brian-boda-boda",
    category: "Transport",
    summary: "Boda-boda operator using Bitcoin to streamline fare collection and reduce cash handling risk.",
    story:
      "Brian's profile shows that merchant adoption is not limited to shops. Transport services are part of the merchant ecosystem too, and they need dedicated visibility in the product and future map experience.",
    neighborhood: "Kibera",
    city: "Nairobi",
    country: "Kenya",
    latitude: -1.3116,
    longitude: 36.7908,
    programSlug: "boda-boda-compliance",
    services: ["Passenger transport", "Short-distance delivery", "Bitcoin fare acceptance"],
    paymentMethods: ["Bitcoin", "Cash"],
    featured: false,
  },
  {
    id: "merchant-david",
    testimonialId: "david",
    slug: "david-neighborhood-shop",
    category: "Retail",
    summary: "Neighborhood shop owner linking Bitcoin-based micro-financing to business growth and customer expansion.",
    story:
      "David's story is one of the strongest bridges between the donation side of the site and the merchant story. It demonstrates why donors, operators, and partners should see merchant profiles as evidence of measurable economic impact.",
    neighborhood: "Kibera",
    city: "Nairobi",
    country: "Kenya",
    latitude: -1.3127,
    longitude: 36.7884,
    programSlug: "business-accelerator",
    services: ["General shop retail", "Merchant onboarding proof point", "Bitcoin payment acceptance"],
    paymentMethods: ["Bitcoin", "Cash"],
    featured: true,
  },
]

function buildMerchantProfile(blueprint: MerchantBlueprint): MerchantProfile {
  const testimonial = testimonialLookup.get(blueprint.testimonialId)

  if (!testimonial) {
    throw new Error(`Missing testimonial for merchant blueprint: ${blueprint.testimonialId}`)
  }

  return {
    id: blueprint.id,
    testimonialId: blueprint.testimonialId,
    slug: blueprint.slug,
    name: testimonial.name,
    role: testimonial.role || blueprint.category,
    category: blueprint.category,
    summary: blueprint.summary,
    story: blueprint.story,
    location: testimonial.location || `${blueprint.neighborhood}, ${blueprint.city}`,
    neighborhood: blueprint.neighborhood,
    city: blueprint.city,
    country: blueprint.country,
    latitude: blueprint.latitude,
    longitude: blueprint.longitude,
    image: testimonial.image || "/Images/Hero section video background fallback.png",
    videoUrl: testimonial.videoUrl,
    youtubeId: testimonial.youtubeId,
    programSlug: blueprint.programSlug,
    services: blueprint.services,
    paymentMethods: blueprint.paymentMethods,
    featured: blueprint.featured,
  }
}

export const merchants: MerchantProfile[] = merchantBlueprints.map(buildMerchantProfile)

export const merchantCategories = ["All", ...new Set(merchants.map((merchant) => merchant.category))]

export function getMerchantBySlug(slug: string): MerchantProfile | undefined {
  return merchants.find((merchant) => merchant.slug === slug)
}

export function getFeaturedMerchants(): MerchantProfile[] {
  return merchants.filter((merchant) => merchant.featured)
}

export function getRelatedMerchants(slug: string, limit = 3): MerchantProfile[] {
  return merchants.filter((merchant) => merchant.slug !== slug).slice(0, limit)
}