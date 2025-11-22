import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import { getAboutUs, getSettings } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import * as LucideIcons from "lucide-react"

export const metadata: Metadata = {
  title: 'About Us | Mumbo Leads',
  description: 'Learn about the founder and mission behind Mumbo Leads',
}

// Icon mapping for core values
const getIcon = (iconName?: string) => {
  if (!iconName) return LucideIcons.Sparkles
  const Icon = (LucideIcons as any)[iconName]
  return Icon || LucideIcons.Sparkles
}

export default async function AboutPage() {
  const [aboutUs, settings] = await Promise.all([
    getAboutUs(),
    getSettings(),
  ])

  // Fallback data
  const defaultAbout = {
    ownerName: 'Founder Name',
    ownerRole: 'Founder & CEO',
    extendedBio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Welcome to our story. We are dedicated to helping businesses grow through innovative lead generation strategies.'
          }
        ]
      }
    ],
    missionTitle: 'Our Mission',
    missionDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We believe in creating meaningful connections that drive business growth.'
          }
        ]
      }
    ],
    coreValues: []
  }

  const about = aboutUs || defaultAbout

  return (
    <>
      <main className="min-h-screen bg-white">
        <Header data={settings} />

        {/* Hero Section */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-to-b from-primary-50/50 to-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/40 via-primary-400/20 to-primary-300/10 blur-lg group-hover:blur-xl transition-all duration-300" />
                  <div className="relative overflow-hidden rounded-3xl ring-1 ring-primary-200/50 bg-gradient-to-br from-primary-50 to-white p-3">
                    <div className="overflow-hidden rounded-2xl ring-1 bg-gradient-to-br from-gray-100 to-gray-50 ring-white/10 aspect-square relative">
                      {about.ownerImageUrl ? (
                        <Image
                          src={about.ownerImageUrl}
                          alt={about.ownerName || 'Owner'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50">
                          <LucideIcons.User className="w-24 h-24 text-primary-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-sm text-primary-700 bg-primary-100/50 rounded-full px-4 py-2 ring-1 ring-primary-200/50">
                  <LucideIcons.Sparkles className="w-4 h-4" />
                  <span>About Us</span>
                </div>

                <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl tracking-tight font-bold text-gray-900">
                  {about.ownerName}
                </h1>

                {about.ownerRole && (
                  <p className="mt-3 text-xl font-medium text-primary-600">
                    {about.ownerRole}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Extended Bio Section */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-gray max-w-none">
                {about.extendedBio && (
                  <PortableText
                    value={about.extendedBio}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-lg leading-relaxed text-gray-700 mb-6">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
                            {children}
                          </h3>
                        ),
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Mission Section */}
        {about.missionTitle && about.missionDescription && (
          <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-primary-50/30">
            <Container>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  {about.missionTitle}
                </h2>
                <div className="prose prose-lg prose-gray max-w-none">
                  <PortableText
                    value={about.missionDescription}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-lg leading-relaxed text-gray-700">
                            {children}
                          </p>
                        ),
                      },
                    }}
                  />
                </div>
              </div>

              {/* Core Values */}
              {about.coreValues && about.coreValues.length > 0 && (
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {about.coreValues.map((value: { icon?: string; title: string; description: string }, idx: number) => {
                    const Icon = getIcon(value.icon)
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl ring-1 p-6 bg-white ring-primary-200/40 hover:ring-primary-300/60 transition-all hover:shadow-lg hover:shadow-primary-500/10"
                      >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-200/50 mb-4">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </Container>
          </section>
        )}

        <Footer data={settings?.footer} />
      </main>
    </>
  )
}
