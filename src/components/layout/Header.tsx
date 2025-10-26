"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "./Container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mainNavigation } from "@/data/navigation"
import { Menu, X, Bitcoin, Heart } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop & Tablet Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/95 backdrop-blur-xl shadow-md" 
            : "bg-background/80 backdrop-blur-md"
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              <Bitcoin className="h-8 w-8 text-bitcoin transition-transform duration-500 group-hover:rotate-180" />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-bitcoin">Afribit</span>
                <span className="text-foreground"> Africa</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {mainNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-all duration-200 group relative",
                      isActive(item.href)
                        ? "text-bitcoin"
                        : "text-foreground/70 hover:text-bitcoin"
                    )}
                  >
                    {Icon && (
                      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    )}
                    <span>{item.title}</span>
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-bitcoin rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button asChild variant="gradient" size="lg" className="shadow-lg">
                <Link href="/donate">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t py-4 space-y-4 animate-fadeIn">
              {mainNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-2 py-3 rounded-lg text-base font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-bitcoin/10 text-bitcoin"
                        : "text-foreground/80 hover:bg-accent hover:text-bitcoin"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                  </Link>
                )
              })}
              <Button asChild className="w-full" variant="gradient" size="lg">
                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
            </div>
          )}
        </Container>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t shadow-2xl">
        <nav className="grid grid-cols-5 gap-1 px-2 py-3">
          {mainNavigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all duration-200",
                  active
                    ? "text-bitcoin bg-bitcoin/10"
                    : "text-foreground/60 hover:text-bitcoin hover:bg-accent"
                )}
              >
                {Icon && (
                  <Icon className={cn(
                    "h-6 w-6 transition-transform",
                    active && "scale-110"
                  )} />
                )}
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
      {/* Spacer for mobile bottom nav */}
      <div className="h-20 md:hidden" />
    </>
  )
}
