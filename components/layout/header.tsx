"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { useCalendly } from "@/lib/calendly-context"

interface HeaderProps {
  data?: {
    headerCta?: {
      text?: string
      url?: string
    }
    showCaseStudies?: boolean
    showBlog?: boolean
    showAbout?: boolean
  } | null
}

export function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openCalendly } = useCalendly()

  const ctaText = data?.headerCta?.text || "Book a Consultation"
  const ctaUrl = data?.headerCta?.url

  // Build navigation array based on toggles from Sanity
  const navigation = [
    { name: "FAQ", href: "/#faq", visible: true }, // Always visible
    { name: "About", href: "/about", visible: data?.showAbout === true },
    { name: "Case Studies", href: "/case-studies", visible: data?.showCaseStudies === true },
    { name: "Blog", href: "/blog", visible: data?.showBlog === true },
  ].filter(item => item.visible)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <nav className="flex items-center justify-between py-4 lg:py-6" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mumbo Leads</span>
              <Image
                src="/media/mumbo-logo-header.png"
                alt="Mumbo Leads Logo"
                width={180}
                height={60}
                priority
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-10 lg:items-center">
            <button
              onClick={openCalendly}
              className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-700 transition-colors"
            >
              Book a Call
            </button>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {ctaUrl ? (
              <Link href={ctaUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  className="animate-cta-button overflow-hidden relative"
                >
                  {ctaText}
                </Button>
              </Link>
            ) : (
              <Button
                variant="secondary"
                onClick={openCalendly}
                className="animate-cta-button overflow-hidden relative"
              >
                {ctaText}
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div
              className="fixed inset-0 z-50 bg-black/20"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Mumbo Leads</span>
                  <Image
                    src="/media/mumbo-logo-header.png"
                    alt="Mumbo Leads Logo"
                    width={180}
                    height={60}
                    className="h-12 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <button
                      onClick={() => {
                        openCalendly()
                        setMobileMenuOpen(false)
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-left"
                    >
                      Book a Call
                    </button>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {ctaUrl ? (
                      <Link href={ctaUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="primary"
                          className="w-full animate-cta-button overflow-hidden relative"
                        >
                          {ctaText}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="primary"
                        className="w-full animate-cta-button overflow-hidden relative"
                        onClick={() => {
                          openCalendly()
                          setMobileMenuOpen(false)
                        }}
                      >
                        {ctaText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
