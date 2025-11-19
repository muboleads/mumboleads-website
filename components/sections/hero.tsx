"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp } from "lucide-react"
import { useCalModal } from "@/lib/cal-context"

// Fallback data if Sanity is not configured
const defaultStats = [
  {
    iconUrl: "/media/1660659496-list-building-icon.svg",
    metric: "+19 B2B",
    description: "leads booked for a financing agency in 2 weeks",
    bgColor: "bg-primary-300",
    iconBg: "bg-white border-2 border-primary-400 shadow-sm"
  },
  {
    iconUrl: "/media/1660659470-email-marketing-icon.svg",
    metric: "2k+",
    description: "Took a B2B financing agency from 20 qualified leads per month with a consistent outbound engine",
    bgColor: "bg-blue-200",
    iconBg: "bg-white border-2 border-blue-300 shadow-sm"
  },
  {
    iconUrl: "/media/1660659507-cold-email-icon.svg",
    metric: "$1.7M",
    description: "added in pipeline with one tailored sequence for SEO agency",
    bgColor: "bg-primary-300",
    iconBg: "bg-white border-2 border-primary-400 shadow-sm"
  },
  {
    iconUrl: "/media/1660659496-list-building-icon.svg",
    metric: "25+",
    description: "Booked 25 podcast guest spots per month for an SEO agency turning them into pipeline",
    bgColor: "bg-yellow-200",
    iconBg: "bg-white border-2 border-yellow-300 shadow-sm"
  }
]

const defaultHero = {
  headline: "Fill your calendar with more ",
  highlightedText: "sales-qualified leads",
  subheadline: undefined as string | undefined,
  // bulletPoints: [
  //   {
  //     title: "Hit your ICP's needs",
  //     description: "without breaking the bank."
  //   },
  //   {
  //     title: "Boost profitability",
  //     description: "month-to-month spending your time closing deals."
  //   }
  // ],
  bulletPoints: [] as Array<{ title?: string; description?: string }>,
  ctaText: "Book a Call",
  ctaUrl: undefined as string | undefined
}

interface HeroProps {
  data?: {
    hero?: typeof defaultHero
    stats?: typeof defaultStats
  } | null
}

export function Hero({ data }: HeroProps) {
  const { openCalModal } = useCalModal()

  // Merge Sanity data with defaults, but respect empty arrays from Sanity
  const hero = {
    headline: data?.hero?.headline ?? defaultHero.headline,
    highlightedText: data?.hero?.highlightedText ?? defaultHero.highlightedText,
    subheadline: data?.hero?.subheadline,
    bulletPoints: data?.hero?.bulletPoints ?? defaultHero.bulletPoints,
    ctaText: data?.hero?.ctaText ?? defaultHero.ctaText,
    ctaUrl: data?.hero?.ctaUrl
  }

  // If Sanity provides stats, merge with default colors; otherwise use defaults
  const stats = data?.stats
    ? data.stats.map((stat: any, index: number) => {
        // Check if bgColor is valid (starts with bg-primary, bg-blue, or bg-yellow)
        const isValidBgColor = stat.bgColor && (
          stat.bgColor.startsWith('bg-primary-') ||
          stat.bgColor.startsWith('bg-blue-') ||
          stat.bgColor.startsWith('bg-yellow-')
        )

        return {
          ...stat,
          bgColor: isValidBgColor ? stat.bgColor : (defaultStats[index]?.bgColor || 'bg-primary-300'),
          iconBg: stat.iconBg || defaultStats[index]?.iconBg || 'bg-white border-2 border-primary-400 shadow-sm'
        }
      })
    : defaultStats

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {hero.headline}
              {hero.highlightedText && (
                <span className="bg-gradient-to-r from-primary-600 to-gray-900 bg-clip-text text-transparent">
                  {hero.highlightedText}
                </span>
              )}
            </h1>

            {hero.subheadline && (
              <p className="mt-6 text-base text-gray-700 sm:text-lg font-semibold">
                {hero.subheadline}
              </p>
            )}

            {hero.bulletPoints && hero.bulletPoints.length > 0 && (
              <div className="mt-6 space-y-4 text-base text-gray-700 sm:text-lg">
                <ul className="space-y-3">
                  {hero.bulletPoints.map((point: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-gray-900 mt-0.5" />
                      <span>
                        {point.title && <strong>{point.title}</strong>}
                        {point.title && point.description && " "}
                        {point.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              {hero.ctaUrl ? (
                <Link href={hero.ctaUrl}>
                  <Button size="lg" className="bg-gradient-to-r from-primary-600 to-gray-900 hover:from-primary-500 hover:to-gray-800 px-16">
                    {hero.ctaText || "Book a Call"}
                  </Button>
                </Link>
              ) : (
                <Button size="lg" onClick={openCalModal} className="bg-gradient-to-r from-primary-600 to-gray-900 hover:from-primary-500 hover:to-gray-800 px-16">
                  {hero.ctaText || "Book a Call"}
                </Button>
              )}
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat: any, index: number) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-6 animate-stats-glow`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={`${stat.iconBg || stat.bgColor} inline-flex rounded-xl p-3 mb-4`}>
                  {stat.iconUrl ? (
                    <Image
                      src={stat.iconUrl}
                      alt="Stat icon"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  ) : (
                    <TrendingUp className="h-8 w-8 text-gray-900" />
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.metric}
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
