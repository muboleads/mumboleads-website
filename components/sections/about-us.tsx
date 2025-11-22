import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Sparkles, ArrowUpRight } from "lucide-react"

interface AboutUsData {
  ownerName?: string
  ownerRole?: string
  ownerImageUrl?: string
  sectionHeading?: string
  shortBio?: string
}

interface AboutUsProps {
  data?: AboutUsData | null
  showAboutPage?: boolean
}

const defaultData: AboutUsData = {
  ownerName: 'Founder Name',
  ownerRole: 'Founder & CEO',
  sectionHeading: 'Meet the founder',
  shortBio: 'Our platform combines cutting-edge technology with thoughtful principles to help you achieve your business goals. We empower companies of all sizes to bring their vision to life.'
}

export function AboutUs({ data, showAboutPage = false }: AboutUsProps) {
  const aboutData = data || defaultData

  return (
    <section className="py-16 sm:py-20 relative bg-gray-50">
      {/* Subtle green glow effects */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Content Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-primary-200/20">
            {/* Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-sm text-primary-700/80 bg-primary-100/50 rounded-full px-4 py-2 ring-1 ring-primary-200/50">
                <Sparkles className="w-4 h-4" />
                <span>{aboutData.sectionHeading}</span>
              </div>
            </div>

          {/* Circular Profile Image */}
          <div className="mt-6 flex justify-center">
            <div className="relative group">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/40 via-primary-400/20 to-primary-300/10 blur-md group-hover:blur-lg transition-all duration-300" />

              {/* Image container - WhatsApp style circle */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                {aboutData.ownerImageUrl ? (
                  <Image
                    src={aboutData.ownerImageUrl}
                    alt={aboutData.ownerName || 'Owner'}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50">
                    <Sparkles className="w-16 h-16 text-primary-300" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <div className="mt-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {aboutData.ownerName}
            </h2>
            {aboutData.ownerRole && (
              <p className="mt-2 text-lg font-medium text-primary-600">
                {aboutData.ownerRole}
              </p>
            )}
          </div>

          {/* Bio Content */}
          <div className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-gray-700 space-y-4">
            {aboutData.shortBio?.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-center">{paragraph}</p>
            ))}
          </div>

          {/* CTA Button - Only show if About page is enabled */}
          {showAboutPage && (
            <div className="mt-8 flex justify-center">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 hover:opacity-90 transition-opacity text-sm font-medium bg-gradient-to-r rounded-full pt-2.5 pr-5 pb-2.5 pl-5 shadow-lg shadow-primary-500/25 text-white from-primary-600 via-primary-500 to-primary-600 border border-primary-400/20"
              >
                Discover Our Story
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white group-hover:bg-white/30 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          )}
          </div>
        </div>
      </Container>
    </section>
  )
}
