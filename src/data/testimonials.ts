// Testimonials data - merchant success stories
import type { TestimonialCard } from "@/types"

export const testimonials: TestimonialCard[] = [
  {
    id: "fridah",
    name: "Fridah",
    role: "Small Business Owner",
    location: "Kibera, Nairobi",
    quote: "Bitcoin has changed how I do business. My customers can pay instantly, and I don&apos;t worry about carrying cash anymore. The Afribit team taught me everything I needed to know.",
    image: "/Images/Mama mboga groceries accepting bitcoin.jpg",
    videoUrl: "/Videos/Merchant one testimonial.mp4", // Using the available smaller video
  },
  {
    id: "grace",
    name: "Grace",
    role: "Mama Mboga (Vegetable Vendor)",
    location: "Kibera, Nairobi",
    quote: "I was scared of technology at first, but the training made it simple. Now I accept Bitcoin payments every day. It&apos;s faster than M-Pesa and my money is truly mine.",
    image: "/Images/Mama mboga groceries accepting bitcoin2.jpg",
  },
  {
    id: "lilian",
    name: "Lilian",
    role: "Community Ambassador",
    location: "Kibera, Nairobi",
    quote: "Being part of the Bitcoin education program opened my eyes to financial freedom. I&apos;ve trained over 50 people in my community, and we&apos;re all using Bitcoin now.",
    image: "/Images/Person scanning to pay in bitcoin2.jpg",
  },
  {
    id: "mercy",
    name: "Mercy",
    role: "Waste Collection Coordinator",
    location: "Kibera, Nairobi",
    quote: "Getting paid in Bitcoin for our waste collection work means we can save without banks. It&apos;s helping us build a better future for our families and keep Kibera clean.",
    image: "/Images/People collecting garbage.jpg",
  },
  {
    id: "brian",
    name: "Brian (Boda-Boda Rider)",
    role: "Motorcycle Taxi Driver",
    location: "Kibera, Nairobi",
    quote: "Bitcoin payments make my work easier. No more struggling with change or worrying about theft. My passengers love how fast and secure it is.",
    image: "/Images/Bodaboda onboarding.jpg",
  },
  {
    id: "david",
    name: "David",
    role: "Shop Owner",
    location: "Kibera, Nairobi",
    quote: "The business accelerator program helped me get a micro-loan in Bitcoin. I expanded my shop and now serve more customers. Afribit believes in us.",
    image: "/Images/Payment done in bitcoin.jpg",
    videoUrl: "/Videos/Transaction taking place.mp4",
  },
]

export function getTestimonialById(id: string): TestimonialCard | undefined {
  return testimonials.find(t => t.id === id)
}

export function getTestimonialsWithVideo(): TestimonialCard[] {
  return testimonials.filter(t => t.videoUrl !== null)
}
