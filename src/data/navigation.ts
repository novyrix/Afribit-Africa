// Site navigation and footer data
import type { NavItem, SocialLink } from "@/types"
import { Home, Info, Grid3x3, Heart, Mail, Twitter, Facebook, Linkedin, Youtube } from "lucide-react"

export const mainNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our mission and impact",
    icon: Info,
  },
  {
    title: "Programs",
    href: "/programs",
    description: "Our community initiatives",
    icon: Grid3x3,
  },
  {
    title: "Donate",
    href: "/donate",
    description: "Support our mission",
    icon: Heart,
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with us",
    icon: Mail,
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://twitter.com/afribitafrica",
    icon: "twitter",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/afribitafrica",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/afribit-africa",
    icon: "linkedin",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@afribitafrica",
    icon: "youtube",
  },
]

export const footerLinks = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Team", href: "/about#team" },
    { title: "Partners", href: "/about#partners" },
    { title: "Contact", href: "/contact" },
  ],
  programs: [
    { title: "Bitcoin Education", href: "/programs/bitcoin-education" },
    { title: "Merchant Onboarding", href: "/programs/merchant-onboarding" },
    { title: "Boda-Boda Program", href: "/programs/boda-boda" },
    { title: "Waste Management", href: "/programs/waste-management" },
    { title: "Business Accelerator", href: "/programs/business-accelerator" },
  ],
  resources: [
    { title: "Donate", href: "/donate" },
    { title: "Media Coverage", href: "/about#media" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
}
