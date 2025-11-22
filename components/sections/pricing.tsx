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
  timeline: string
  features: string[]
  ctaText: string
  ctaLink: string
  upsellEnabled?: boolean
  upsellName?: string
  upsellDescription?: string
  upsellPrice?: number
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

const defaultTier: PricingTier = {
  _id: 'default',
  planName: 'Professional Package',
  currency: '$',
  price: 3200,
  period: '/project',
  timeline: '4–6 weeks',
  features: [
    'Complete visual brand system',
    'Custom website or digital product',
    'Launch support and guidelines'
  ],
  ctaText: 'Start conversation',
  ctaLink: '#contact',
  upsellEnabled: false,
  order: 1
}

export function Pricing({ data, sectionData }: PricingProps) {
  const tiers = data && data.length > 0 ? data : [defaultTier]
  const primaryTier = tiers[0]

  const [upsellActive, setUpsellActive] = useState(false)
  const { openCalendly } = useCalendly()

  const sectionTitle = sectionData?.title || 'Simple, Transparent Pricing'
  const sectionDescription = sectionData?.description || 'Clear pricing, no surprises. Every project is scoped individually for your unique needs.'
  const badgeText = sectionData?.badge || 'Transparent rates'

  const totalPrice = primaryTier.upsellEnabled && upsellActive
    ? primaryTier.price + (primaryTier.upsellPrice || 0)
    : primaryTier.price

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
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {sectionTitle}
              </h2>
            </div>

            {/* Pricing Card */}
            <div className="mt-8 rounded-3xl bg-white/80 backdrop-blur-sm ring-2 ring-primary-300/60 border border-primary-200/40 p-6 sm:p-8 shadow-sm">
              <div className="max-w-5xl mx-auto">
                {/* Plan Name & Price */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/50 ring-1 ring-primary-200/50 mb-4">
                    <p className="text-sm font-semibold tracking-wide text-primary-700 uppercase">
                      {primaryTier.planName}
                    </p>
                  </div>

                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
                    {primaryTier.currency || '$'}{totalPrice.toLocaleString()}
                  </div>

                  <p className="mt-2 text-base font-medium text-gray-600">
                    {primaryTier.period}{primaryTier.timeline && ` • ${primaryTier.timeline}`}
                  </p>
                </div>

                {/* Upsell Add-on (if enabled) */}
                {primaryTier.upsellEnabled && primaryTier.upsellName && (
                  <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary-50/50 to-white ring-1 ring-primary-200/40 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-base font-medium tracking-tight text-gray-900">
                          {primaryTier.upsellName}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {primaryTier.upsellDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          + {primaryTier.currency || '$'}{primaryTier.upsellPrice?.toLocaleString()}
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={upsellActive}
                          onClick={() => setUpsellActive(!upsellActive)}
                          className={`inline-flex h-6 w-11 items-center rounded-full ring-1 transition-colors duration-200 ${
                            upsellActive
                              ? 'bg-primary-500 ring-primary-400'
                              : 'bg-gray-200 ring-gray-300'
                          }`}
                        >
                          <span
                            className={`h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
                              upsellActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                          <span className="sr-only">Toggle {primaryTier.upsellName} add-on</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List - 3 Column Grid */}
                <div className="mb-8">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                    {primaryTier.features.map((feature, idx) => (
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
                    <span>{primaryTier.ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

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
