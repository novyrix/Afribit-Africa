// Central types export file

// Database types (from Prisma)
export type {
  User,
  UserRole,
  ContactSubmission,
  SubmissionStatus,
  Subscriber,
  SubscriberStatus,
  Post,
  PostCategory,
  PostStatus,
  Donation,
  DonationStatus,
  Program,
  Testimonial,
  Statistic,
  PageView,
} from '@prisma/client'

// Component types
export interface NavItem {
  title: string
  href: string
  description?: string
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

export interface ProgramCard {
  id: string
  title: string
  description: string
  image: string
  slug: string
  icon?: string
  goal?: number
  raised?: number
  category?: string
  features?: string[]
}

export interface TestimonialCard {
  id: string
  name: string
  role?: string
  location?: string
  quote: string
  image?: string
  videoUrl?: string
  youtubeId?: string
}

export interface StatItem {
  label: string
  value: number | string
  icon?: string
  suffix?: string
  prefix?: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface NewsletterFormData {
  email: string
  name?: string
}

export interface DonationFormData {
  amount: number
  currency: string
  donorEmail?: string
  donorName?: string
  message?: string
  isAnonymous: boolean
  program?: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface BTCPayInvoice {
  id: string
  storeId: string
  amount: string
  currency: string
  checkoutLink: string
  status: string
  createdTime: string
}
