import Link from "next/link"
import { Container } from "./Container"
import { footerLinks, socialLinks } from "@/data/navigation"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="font-bold text-xl">
                <span className="text-bitcoin">Afribit</span>
                <span className="text-foreground"> Africa</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering African communities through Bitcoin education, merchant onboarding, and sustainable development.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon as keyof typeof socialIcons]
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-bitcoin transition-colors"
                      aria-label={link.name}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-bitcoin transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs Links */}
            <div>
              <h3 className="font-semibold text-sm mb-4">Programs</h3>
              <ul className="space-y-2">
                {footerLinks.programs.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-bitcoin transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-sm mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-bitcoin transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Afribit Africa. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ and ₿ for African communities
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
