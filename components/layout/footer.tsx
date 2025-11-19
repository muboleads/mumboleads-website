import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"

const footerLinks = {
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Use Cases", href: "/#use-cases" },
    { name: "Blog", href: "/blog" }
  ],
  support: [
    { name: "FAQ", href: "/#faq" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" }
  ]
}

// Fallback data
const defaultFooter = {
  description: "B2B Cold Email Agency\nfor Busy Companies",
  email: "info@nerdyjoe.com",
  addresses: [
    { line1: "7921H1 Lancaster Ave", line2: "Wayne, Munich, PA" },
    { line1: "1382 Lexington Avenue", line2: "New York" }
  ]
}

interface FooterProps {
  data?: {
    description?: string
    email?: string
    addresses?: Array<{
      line1?: string
      line2?: string
      city?: string
    }>
  } | null
}

export function Footer({ data }: FooterProps) {
  const footer = data || defaultFooter
  return (
    <footer className="bg-black text-white">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/media/mumbo-logo-footer.png"
                  alt="Mumbo LEADS Logo"
                  width={200}
                  height={60}
                  className="h-14 w-auto sm:h-16"
                />
              </Link>
              <p className="text-gray-400 text-base max-w-md whitespace-pre-line">
                {footer.description || "B2B Cold Email Agency\nfor Busy Companies"}
              </p>
              {footer.email && (
                <div className="mt-6">
                  <p className="text-base text-gray-400">{footer.email}</p>
                </div>
              )}
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-base font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base font-semibold mb-4">Contact</h3>
              <div className="space-y-6 text-base text-gray-400">
                {footer.addresses && footer.addresses.length > 0 ? (
                  footer.addresses.map((address, index) => (
                    <div key={index} className="space-y-1">
                      {address.line1 && <p>{address.line1}</p>}
                      {address.line2 && <p>{address.line2}</p>}
                      {address.city && <p>{address.city}</p>}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="space-y-1">
                      <p>7921H1 Lancaster Ave</p>
                      <p>Wayne, Munich, PA</p>
                    </div>
                    <div className="space-y-1">
                      <p>1382 Lexington Avenue</p>
                      <p>New York</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-500 py-6">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} Mumbo LEADS. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
