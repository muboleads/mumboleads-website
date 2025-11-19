import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"

// Fallback data
const defaultFooter = {
  description: "B2B Cold Email Agency\nfor Busy Companies",
  email: "hopewell@mumboleads.com",
  links: [
    { label: "Case Study", href: "/case-studies" },
    { label: "Blog", href: "/blog" }
  ],
  addresses: [
    { line1: "Paarl, Western Cape", line2: "South Africa", city: "7646" }
  ]
}

interface FooterProps {
  data?: {
    description?: string
    email?: string
    links?: Array<{
      label: string
      href: string
    }>
    addresses?: Array<{
      line1?: string
      line2?: string
      city?: string
    }>
  } | null
}

export function Footer({ data }: FooterProps) {
  const footer = data || defaultFooter
  const links = footer.links || defaultFooter.links
  const addresses = footer.addresses || defaultFooter.addresses

  return (
    <footer className="bg-black text-white">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Column 1: Logo and Description */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/media/mumbo-logo-footer.png"
                  alt="Mumbo Leads Logo"
                  width={200}
                  height={60}
                  className="h-14 w-auto sm:h-16"
                />
              </Link>
              <p className="text-gray-400 text-base max-w-md whitespace-pre-line">
                {footer.description || "B2B Cold Email Agency\nfor Busy Companies"}
              </p>
            </div>

            {/* Column 2: Email */}
            <div>
              <h3 className="text-base font-semibold mb-4">Email us on:</h3>
              <a
                href={`mailto:${footer.email || "hopewell@mumboleads.com"}`}
                className="text-base text-gray-400 hover:text-white transition-colors"
              >
                {footer.email || "hopewell@mumboleads.com"}
              </a>
            </div>

            {/* Column 3: Links */}
            <div>
              <h3 className="text-base font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-base font-semibold mb-4">Contact</h3>
              <div className="space-y-1 text-base text-gray-400">
                {addresses.map((address, index) => (
                  <div key={index} className="space-y-1">
                    {address.line1 && <p>{address.line1}</p>}
                    {address.line2 && <p>{address.line2}</p>}
                    {address.city && <p>{address.city}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-500 py-6">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} Mumbo Leads. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
