"use client"

import { useState } from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Plus, ArrowRight, Calendar } from "lucide-react"
import { useCalendly } from "@/lib/calendly-context"

interface PricingTier {
  _id: string
  planName: string
  currency: string
  price: number
  period: string
  highlight?: string
  savingsNote?: string
  features: string[]
  ctaText: string
  ctaLink: string
  order: number
}

interface PricingSectionData {
  title?: string
  description?: string
  badge?: string
}

interface PricingProps {
  data?: PricingTier[] | null
  sectionData?: PricingSectionData | null
}

export function Pricing({ data, sectionData }: PricingProps) {
  const tiers = data && data.length > 0 ? data : []
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { openCalendly } = useCalendly()

  const sectionTitle = sectionData?.title || 'Simple, Transparent Pricing'
  const sectionDescription = sectionData?.description || 'Same great service, flexible payment options. Choose what works best for you.'
  const badgeText = sectionData?.badge || 'Transparent rates'

  // Get features from the first tier (shared across all options)
  const features = tiers.length > 0 && tiers[0].features?.length > 0
    ? tiers[0].features
    : []

  // Don't render if no data from Sanity
  if (tiers.length === 0) {
    return null
  }

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] border-2 border-primary-300/60 bg-gradient-to-br from-white via-primary-50/30 to-white shadow-[0_8px_30px_rgba(123,202,82,0.12)] ring-1 ring-primary-200/40">
          {/* Background gradients adapted to green theme */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(123,202,82,0.08),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(123,202,82,0.06),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(123,202,82,0.05)_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]" />
          </div>

          <div className="relative sm:p-8 pt-6 pr-6 pb-6 pl-6">
            {/* Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mb-2">
              <Plus className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {sectionTitle}
              </h2>
            </div>

            {/* Pricing Options - Dynamic Cards */}
            <div className={`grid grid-cols-1 ${tiers.length > 1 ? 'md:grid-cols-2' : ''} gap-6 max-w-4xl mx-auto mb-8`}>
              {tiers.map((tier, index) => (
                <button
                  key={tier._id}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative rounded-3xl p-6 sm:p-8 text-left transition-all duration-200 cursor-pointer ${
                    selectedIndex === index
                      ? 'bg-white ring-2 ring-primary-500 shadow-lg shadow-primary-500/20'
                      : 'bg-white/60 ring-1 ring-primary-200/60 hover:ring-primary-300 hover:bg-white/80'
                  }`}
                >
                  {/* Highlight badge */}
                  <div className="flex items-center gap-2 mb-4">
                    {tier.highlight && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedIndex === index
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tier.highlight}
                      </span>
                    )}
                    {tier.savingsNote && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        {tier.savingsNote}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                      {tier.currency}{tier.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-600 ml-1">
                      {tier.period}
                    </span>
                  </div>

                  {/* Plan Name */}
                  <p className="text-sm text-gray-600">
                    {tier.planName}
                  </p>

                  {/* Selection indicator */}
                  <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedIndex === index
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedIndex === index && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Features Card */}
            {features.length > 0 && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-sm ring-2 ring-primary-300/60 border border-primary-200/40 p-6 sm:p-8 shadow-sm">
                <div className="max-w-5xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center mb-6">
                    <p className="text-sm font-semibold text-primary-700 uppercase tracking-wide">
                      What's included
                    </p>
                  </div>

                  {/* Features List - 3 Column Grid */}
                  <div className="mb-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <button
                      onClick={openCalendly}
                      className="inline-flex items-center justify-center gap-3 rounded-full px-12 py-4 text-lg font-semibold tracking-tight text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg shadow-primary-500/25 border border-primary-400/20 cursor-pointer w-full sm:w-auto sm:min-w-[400px]"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>{tiers[selectedIndex]?.ctaText || 'Get Started'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom note */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              {sectionDescription}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
