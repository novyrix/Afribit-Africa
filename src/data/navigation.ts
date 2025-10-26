// Site navigation and footer data
import type { NavItem, SocialLink } from "@/types"

export const mainNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our mission and impact",
  },
  {
    title: "Programs",
    href: "/programs",
    description: "Our community initiatives",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "News and updates",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with us",
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
    { title: "Merchant Onboarding", href: "/programs#merchants" },
    { title: "Bitcoin Education", href: "/programs#education" },
    { title: "Community Support", href: "/programs#community" },
    { title: "Waste Collection", href: "/programs#waste" },
    { title: "Food Market", href: "/programs#food" },
  ],
  resources: [
    { title: "Blog", href: "/blog" },
    { title: "Donate", href: "/donate" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
}
