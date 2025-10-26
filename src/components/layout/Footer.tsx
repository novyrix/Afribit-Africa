import Link from "next/link"
import { Container } from "./Container"
import { NewsletterForm } from "@/components/forms/NewsletterForm"
import { footerLinks, socialLinks } from "@/data/navigation"
import { Facebook, Twitter, Linkedin, Youtube, Bitcoin, Heart } from "lucide-react"

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-900 text-gray-100">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Bitcoin className="h-8 w-8 text-bitcoin" />
                <div className="font-bold text-2xl">
                  <span className="text-bitcoin">Afribit</span>
                  <span className="text-white"> Africa</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Empowering African communities through Bitcoin education, merchant onboarding, and sustainable development.
              </p>
              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = socialIcons[link.icon as keyof typeof socialIcons]
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-bitcoin hover:text-white transition-all hover:scale-110"
                        aria-label={link.name}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-base mb-6 text-white">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-bitcoin transition-colors inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs Links */}
            <div>
              <h3 className="font-semibold text-base mb-6 text-white">Programs</h3>
              <ul className="space-y-3">
                {footerLinks.programs.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-bitcoin transition-colors inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="font-semibold text-base mb-6 text-white">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">
                Get Bitcoin adoption news and program updates.
              </p>
              <NewsletterForm inline={false} showName={false} />
              
              {/* Resources Links */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-3 text-white">Resources</h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-gray-400 hover:text-bitcoin transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} Afribit Africa. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                Built with <Heart className="h-4 w-4 text-bitcoin inline" fill="currentColor" /> and <Bitcoin className="h-4 w-4 text-bitcoin inline" /> for African communities
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
