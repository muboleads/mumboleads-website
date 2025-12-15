'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useCalendly } from '@/lib/calendly-context'

// Image Modal Component - uses Portal to render at document body level
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <div
      className="tourism-modal-overlay"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="tourism-modal-close"
        aria-label="Close image"
      >
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Tap to close hint on mobile */}
      <div className="tourism-modal-hint">
        Tap anywhere to close
      </div>

      <div
        className="tourism-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="tourism-modal-image"
        />
      </div>
    </div>,
    document.body
  )
}

// Clickable Proof Image Component
function ProofImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className={`cursor-pointer transition-transform hover:scale-[1.02] ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      {isModalOpen && (
        <ImageModal src={src} alt={alt} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

// TypeWriter Component for animated text
function TypeWriter({
  words,
  className = '',
  delay = 4000,
}: {
  words: string[]
  className?: string
  delay?: number
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = delay

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, delay])

  return (
    <span className={`tourism-typing-container ${className}`}>
      <span className="tourism-typing-text">{currentText}</span>
      <span className="tourism-typing-cursor" />
    </span>
  )
}

// Default data fallbacks
const defaultData = {
  urgency: {
    enabled: true,
    message: 'Limited Availability: We only take on',
    spotsPerMonth: 5,
    spotsLeft: 2,
    monthName: 'January',
  },
  hero: {
    eyebrow: 'For Hotels, Lodges, Tour Operators & Restaurants',
    headlinePart1: 'Get More',
    benefitWords: ['Direct Bookings', 'Group Enquiries', 'Corporate Clients', 'Tour Partnerships', 'Event Reservations'],
    headlinePart2: 'Without',
    painWords: ['Chasing Leads', 'Waiting for Peak Season', 'Paying OTA Commissions', 'Empty Room Stress', 'Begging for Referrals'],
    typingDelay: 4000,
    subtitle: 'We help Travel, Tourism & Hospitality businesses get 10-30+ high-intent booking enquiries every month with a done-for-you outreach system that works while you sleep.',
    subtitleHighlight: '10-30+ high-intent booking enquiries',
    proofItems: ['No upfront fees', 'Results in 14 days', 'Cancel anytime'],
    stats: [
      { value: 'R2.7M+', label: 'Pipeline Generated' },
      { value: '103', label: 'Booking Enquiries' },
      { value: '81%', label: 'Positive Replies' },
    ],
  },
  heroForm: {
    badge: 'Only 2 Spots Left for January',
    title: 'Book Your Free Strategy Call',
    subtitle: 'See how we can fill your rooms with direct bookings',
    buttonText: 'Book My Free Strategy Call',
    privacyText: 'Your information is 100% secure. No spam, ever.',
    businessTypes: [
      'Hotel',
      'Lodge / Safari Lodge',
      'Guest House / B&B',
      'Resort / Spa',
      'Tour Operator',
      'Restaurant / Venue',
      'Other Hospitality Business',
    ],
    revenueRanges: [
      'Under R50,000',
      'R50,000 - R150,000',
      'R150,000 - R500,000',
      'R500,000 - R1M',
      'R1M+',
    ],
  },
  problem: {
    label: 'The Problem',
    heading: "You're Working Harder Than Ever...",
    headingHighlight: 'But Bookings Are Still Inconsistent',
    intro: "You didn't get into hospitality to spend your days chasing leads, begging for referrals, or watching OTAs take 20% of every booking. But somehow, that's exactly where you are.",
    painCards: [
      { icon: '📉', title: 'Feast or Famine Bookings', description: "Peak season is chaos. Off-season is crickets. You never know what next month will bring — and you can't plan your business on \"hope.\"" },
      { icon: '💸', title: 'OTAs Eating Your Profits', description: "Booking.com takes 15-20% of every reservation. Airbnb owns your guests. You're building their business, not yours." },
      { icon: '👻', title: 'Leads That Ghost You', description: 'You run Facebook ads, get enquiries, send quotes... then nothing. They vanish. Time wasted. Money burned.' },
      { icon: '🙏', title: 'Waiting for Referrals', description: "Word of mouth is great — but you can't scale \"someone might recommend us.\" You need a system, not luck." },
    ],
    ctaText: 'Show Me The Solution',
    transitionText: "Sound familiar? There's a better way.",
  },
  solution: {
    label: 'The Solution',
    heading: 'A Done-For-You System That Brings',
    headingHighlight: 'Serious Bookers To Your Door',
    subtitle: 'We build and run your entire guest acquisition system. You just show up to close the bookings.',
    steps: [
      { number: 1, title: 'We Find Your Ideal Guests', description: 'Corporate travel managers. Tour operators. Event planners. We identify and reach the decision-makers who book properties like yours — and actually have budget.' },
      { number: 2, title: 'We Run Multi-Channel Outreach', description: "Cold email. LinkedIn. Paid ads. Cold calling. We use every channel that works for hospitality — so you're not relying on one traffic source." },
      { number: 3, title: 'We Qualify & Warm Your Leads', description: 'No more time-wasters. We filter out the tyre-kickers and only send you enquiries from people ready to book — with dates, group sizes, and budgets.' },
      { number: 4, title: 'You Close Direct Bookings', description: 'No OTA commissions. No middlemen. You get direct relationships with guests who book again and again — and refer their colleagues.' },
    ],
  },
  results: {
    label: 'Real Results',
    heading: 'This System Has Already Generated',
    headingHighlight: 'Millions in Bookings',
    subtitle: "Here's what we've done for hospitality businesses like yours",
    bigNumber: 'R2.7M+',
    bigLabel: 'Booking Pipeline Generated',
    bigSubtext: 'In just 120 days for South African hospitality businesses',
    stats: [
      { value: '103', label: 'Qualified Enquiries' },
      { value: '19,000+', label: 'Decision-Makers Reached' },
      { value: '242', label: 'Positive Responses' },
      { value: '81%', label: 'Reply Rate' },
    ],
  },
  whatYouGet: {
    label: "What's Included",
    heading: 'Everything You Need To Fill Your',
    headingHighlight: 'Rooms With Direct Bookings',
    benefits: [
      { title: 'Done-For-You Lead Generation', description: "We find and contact your ideal guests across email, LinkedIn, paid ads, and phone. You don't lift a finger.", isBonus: false },
      { title: 'Custom Outreach Campaigns', description: 'Tailored messaging for your property, your ideal guest profile, and your unique selling points. No generic templates.', isBonus: false },
      { title: 'Lead Qualification & Filtering', description: 'We ask the right questions upfront so you only speak to guests who are ready to book — not browse.', isBonus: false },
      { title: 'Automated Follow-Up Sequences', description: 'Most leads need 5-7 touchpoints before they book. We handle all the follow-ups so no one slips through the cracks.', isBonus: false },
      { title: 'Weekly Performance Reports', description: 'See exactly how many people we reached, how many responded, and how many enquiries are in your pipeline.', isBonus: false },
      { title: 'CRM Setup & Integration', description: "We'll set up a simple CRM so you can track every lead, every conversation, and every booking in one place.", isBonus: true },
      { title: 'Dedicated Account Manager', description: 'You get a real person managing your campaigns, not a chatbot. Weekly calls to review results and optimize.', isBonus: true },
    ],
    ctaText: 'Get Started Today',
  },
  testimonials: {
    label: 'Success Stories',
    heading: 'Hospitality Owners Are Getting',
    headingHighlight: 'Consistent Direct Bookings',
    items: [
      {
        quote: 'We used to pray for bookings during low season. Now we have corporate groups reaching out directly, booking midweek stays at full rate. The system paid for itself in the first two weeks.',
        result: '12 group bookings in 60 days',
        name: 'David M.',
        initials: 'DM',
        role: 'Safari Lodge, Limpopo',
      },
      {
        quote: "We're getting direct enquiries from travel managers who used to book through Booking.com. That's 18% we now keep on every booking. The ROI is insane.",
        result: 'R420,000 pipeline in 90 days',
        name: 'Linda K.',
        initials: 'LK',
        role: 'Boutique Hotel, Cape Town',
      },
      {
        quote: "I was skeptical at first, but these leads are REAL. Not tyre-kickers. People calling with dates, budgets, and group sizes. I just show up to close. It's changed everything.",
        result: '23 new tour contracts signed',
        name: 'Thabo N.',
        initials: 'TN',
        role: 'Tour Operator, Johannesburg',
      },
    ],
  },
  whoFor: {
    heading: 'Is This Right For',
    headingHighlight: 'You?',
    yesTitle: 'This IS For You If...',
    yesItems: [
      'You run a hotel, lodge, guest house, or tour operation',
      "You're tired of relying on OTAs and paying 15-20% commissions",
      'You want consistent bookings, not feast-or-famine months',
      "You're ready to invest in growth (not looking for free hacks)",
      'You can handle more bookings if we send them your way',
      'You want to build direct relationships with your guests',
    ],
    noTitle: 'This Is NOT For You If...',
    noItems: [
      'You just launched and have no track record',
      "You're not willing to invest in marketing",
      "You can't handle more than 5 bookings per month",
      'You\'re looking for "get rich quick" schemes',
      "You don't respond to leads within 24 hours",
      "You're happy with the OTA-dependent status quo",
    ],
  },
  guarantee: {
    icon: '🛡️',
    heading: 'Our "No Results, No Pay"',
    headingHighlight: 'Guarantee',
    description: "We're so confident in our system that we guarantee results. If we don't deliver qualified booking enquiries within 30 days, we work for free until we do. No questions asked. No risk on your side. You only pay when you see real results hitting your inbox.",
  },
  faq: {
    heading: 'Frequently Asked',
    headingHighlight: 'Questions',
    items: [
      { question: 'How quickly will I see results?', answer: 'Most clients start seeing qualified enquiries within 14-21 days of launch. Full pipeline typically builds over 60-90 days as campaigns optimize.' },
      { question: 'What kind of leads will I receive?', answer: 'Corporate travel managers, tour operators, event planners, and group bookers. People with budgets who book multiple rooms or repeat bookings — not random tourists browsing.' },
      { question: 'How is this different from running Facebook ads myself?', answer: "Facebook ads give you clicks. We give you qualified, warm leads with contact details, dates, group sizes, and budgets. We also handle the follow-up until they're ready to book." },
      { question: 'Do I need any technical skills?', answer: 'Zero. We handle everything — the tech, the campaigns, the messaging, the follow-ups. You just need to answer the phone when qualified bookers call.' },
      { question: "What if it doesn't work for my property?", answer: "Our guarantee covers you. If we don't deliver results in 30 days, we work for free until we do. But honestly? This system works for any hospitality business that can handle more bookings." },
      { question: 'How many new clients do you take on?', answer: "We limit ourselves to 5 new clients per month to ensure quality. Each client gets a dedicated account manager and custom campaign strategy. When spots are full, there's a waitlist." },
    ],
  },
  finalCta: {
    heading: 'Ready To Stop Chasing Bookings',
    headingPart2: 'And Start',
    headingHighlight: 'Receiving Them?',
    subtitle: "Book your free strategy call today. We'll show you exactly how many bookings we can generate for your property — no pressure, no obligations.",
    ctaText: 'Book Your Free Strategy Call',
    ctaNote: 'Only 2 spots remaining for January • Free 30-min call • No obligations',
    trustItems: [
      { icon: '🔒', text: '100% Confidential' },
      { icon: '✓', text: 'No Upfront Fees' },
      { icon: '🛡️', text: 'Results Guaranteed' },
      { icon: '📞', text: 'Cancel Anytime' },
    ],
  },
  footer: {
    companyName: 'Mumbo Leads',
    tagline: 'Helping Travel, Tourism & Hospitality businesses get more direct bookings.',
    year: '2025',
  },
  // Proof Sections
  dashboardProof: {
    badge: '📊 REAL CAMPAIGN RESULTS',
    heading: 'These Results Speak for Themselves',
    subheading: 'Actual dashboard screenshots from live outreach campaigns',
    campaigns: [
      { image: '/media/proof/DAAS.png', title: 'DAAS Campaign', stats: '16.7K sent • 46.7% open rate', revenue: '$160,000' },
      { image: '/media/proof/Martech.png', title: 'Martech Campaign', stats: '31.8K sent • 3.1% reply rate', revenue: '$19,000' },
      { image: '/media/proof/Ionyx.png', title: 'Ionyx Campaign', stats: '12.4K sent • 52% open rate', revenue: '$95,000' },
      { image: '/media/proof/Fintech.png', title: 'Fintech Campaign', stats: '8.2K sent • 4.2% reply rate', revenue: '$75,000' },
    ],
  },
  responseProof: {
    badge: '📬 ACTUAL INBOX SCREENSHOTS',
    heading: 'Decision-Makers Actually Reply',
    subheading: 'Real responses from cold outreach campaigns',
    responses: [
      { image: '/media/proof/Response 35.png', label: 'Positive Response from CEO' },
      { image: '/media/proof/Response 28.png', label: 'Meeting Request' },
      { image: '/media/proof/Response 12.png', label: 'Interested Response' },
      { image: '/media/proof/Response 15.png', label: 'Follow-up Request' },
    ],
    closingText: "These aren't cherry-picked examples. This is what happens when you use the right system.",
  },
  moreProof: {
    badge: '🚀 MORE PROVEN RESULTS',
    heading: 'We Do This Across Multiple Industries',
    subheading: 'The same system works for any business that wants qualified leads',
    campaigns: [
      { image: '/media/proof/ai.png', title: 'AI Solutions', stats: '9.8K sent • 48% open rate', revenue: '$120,000' },
      { image: '/media/proof/saas.png', title: 'SaaS Campaign', stats: '15.2K sent • 3.8% reply rate', revenue: '$85,000' },
    ],
  },
}

// Interfaces
interface TourismLandingData {
  urgency?: typeof defaultData.urgency
  hero?: typeof defaultData.hero
  heroForm?: typeof defaultData.heroForm
  problem?: typeof defaultData.problem
  solution?: typeof defaultData.solution
  results?: typeof defaultData.results
  whatYouGet?: typeof defaultData.whatYouGet
  testimonials?: typeof defaultData.testimonials
  whoFor?: typeof defaultData.whoFor
  guarantee?: typeof defaultData.guarantee
  faq?: typeof defaultData.faq
  finalCta?: typeof defaultData.finalCta
  footer?: typeof defaultData.footer
  // Proof sections
  dashboardProof?: typeof defaultData.dashboardProof
  responseProof?: typeof defaultData.responseProof
  moreProof?: typeof defaultData.moreProof
}

interface Partner {
  _id: string
  name: string
  logoUrl: string
  website?: string
}

interface TourismLandingProps {
  data: TourismLandingData | null
  partners?: Partner[]
}

export function TourismLanding({ data, partners = [] }: TourismLandingProps) {
  // Merge Sanity data with defaults
  const urgency = { ...defaultData.urgency, ...data?.urgency }
  const hero = { ...defaultData.hero, ...data?.hero }
  const heroForm = { ...defaultData.heroForm, ...data?.heroForm }
  const problem = { ...defaultData.problem, ...data?.problem }
  const solution = { ...defaultData.solution, ...data?.solution }
  const results = { ...defaultData.results, ...data?.results }
  const whatYouGet = { ...defaultData.whatYouGet, ...data?.whatYouGet }
  const testimonials = { ...defaultData.testimonials, ...data?.testimonials }
  const whoFor = { ...defaultData.whoFor, ...data?.whoFor }
  const guarantee = { ...defaultData.guarantee, ...data?.guarantee }
  const faq = { ...defaultData.faq, ...data?.faq }
  const finalCta = { ...defaultData.finalCta, ...data?.finalCta }
  const footer = { ...defaultData.footer, ...data?.footer }
  // Proof sections
  const dashboardProof = { ...defaultData.dashboardProof, ...data?.dashboardProof }
  const responseProof = { ...defaultData.responseProof, ...data?.responseProof }
  const moreProof = { ...defaultData.moreProof, ...data?.moreProof }

  const { openCalendly } = useCalendly()

  // Visibility state for animations
  const [isVisible, setIsVisible] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    monthlyRevenue: '',
    website: '',
    primaryGoal: '',
    budget: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tourism-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit')
      }

      setIsSuccess(true)
      // Open Calendly after successful submission
      setTimeout(() => {
        openCalendly()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render subtitle with highlighted text
  const renderSubtitleWithHighlight = (text: string, highlight: string) => {
    if (!highlight) return text
    const parts = text.split(highlight)
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && <strong>{highlight}</strong>}
      </span>
    ))
  }

  return (
    <div className="tourism-page">
      {/* Urgency Bar */}
      {urgency.enabled && (
        <div className="tourism-urgency-bar">
          🔥 {urgency.message} <span>{urgency.spotsPerMonth} new clients</span> per month — <span>{urgency.spotsLeft} spots left</span> for {urgency.monthName}
        </div>
      )}

      {/* Hero Section */}
      <section className="tourism-hero">
        <div className="tourism-hero-bg-element" />
        <div className="tourism-hero-bg-element" />
        <div className="tourism-container">
          <div className="tourism-hero-grid">
            <div className="tourism-hero-content">
              <div
                className={isVisible ? 'tourism-float-up' : 'opacity-0'}
                style={{ animationDelay: '0.1s' }}
              >
                <div className="tourism-hero-eyebrow">
                  <span className="tourism-pulse-dot" />
                  {hero.eyebrow}
                </div>
              </div>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 ${isVisible ? 'tourism-float-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                {hero.headlinePart1}{' '}
                <TypeWriter words={hero.benefitWords || []} delay={hero.typingDelay} />
                <br />
                {hero.headlinePart2}{' '}
                <TypeWriter words={hero.painWords || []} delay={hero.typingDelay} />
              </h1>

              <p
                className={`tourism-hero-subtitle ${isVisible ? 'tourism-float-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s' }}
              >
                {renderSubtitleWithHighlight(hero.subtitle || '', hero.subtitleHighlight || '')}
              </p>

              <div
                className={`tourism-hero-proof ${isVisible ? 'tourism-float-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.4s' }}
              >
                {hero.proofItems?.map((item, i) => (
                  <div key={i} className="tourism-hero-proof-item">
                    <span className="icon">✓</span> {item}
                  </div>
                ))}
              </div>

              <div
                className={`tourism-hero-stats ${isVisible ? 'tourism-float-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.5s' }}
              >
                {hero.stats?.map((stat, i) => (
                  <div key={i} className="tourism-hero-stat">
                    <div className="tourism-hero-stat-num tourism-mono">{stat.value}</div>
                    <div className="tourism-hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Hero Form */}
              <div
                className={`tourism-hero-form ${isVisible ? 'tourism-float-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
              <div className="tourism-form-glow" />

              {isSuccess ? (
                <div className="tourism-form-success">
                  <div className="tourism-form-success-icon">🎉</div>
                  <h3>Thank You!</h3>
                  <p>Opening calendar to book your call...</p>
                </div>
              ) : (
                <>
                  <div className="tourism-form-header">
                    <div className="tourism-form-badge">🔥 {heroForm.badge}</div>
                    <h3 className="tourism-form-title">{heroForm.title}</h3>
                    <p className="tourism-form-sub">{heroForm.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="tourism-form-row">
                      <div className="tourism-form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="John Smith"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="tourism-form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@lodge.co.za"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="tourism-form-row">
                      <div className="tourism-form-group">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+27 XX XXX XXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="tourism-form-group">
                        <label>Company *</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Your business name"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="tourism-form-row">
                      <div className="tourism-form-group">
                        <label>Business Type *</label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select type...</option>
                          {heroForm.businessTypes?.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="tourism-form-group">
                        <label>Monthly Revenue *</label>
                        <select
                          name="monthlyRevenue"
                          value={formData.monthlyRevenue}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select range...</option>
                          {heroForm.revenueRanges?.map((range, i) => (
                            <option key={i} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="tourism-form-row">
                      <div className="tourism-form-group">
                        <label>Website</label>
                        <input
                          type="text"
                          placeholder="yourbusiness.co.za"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="tourism-form-group">
                        <label>Primary Goal *</label>
                        <select
                          name="primaryGoal"
                          value={formData.primaryGoal}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select goal...</option>
                          <option value="More Leads">More Leads</option>
                          <option value="More Sales">More Sales</option>
                          <option value="Brand Awareness">Brand Awareness</option>
                          <option value="Direct Bookings">Direct Bookings</option>
                          <option value="All of the Above">All of the Above</option>
                        </select>
                      </div>
                    </div>

                    <div className="tourism-form-group">
                      <label>Growth Budget *</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Monthly investment...</option>
                        <option value="Under R5,000/mo">Under R5,000/mo</option>
                        <option value="R5,000 - R15,000/mo">R5,000 - R15,000/mo</option>
                        <option value="R15,000 - R30,000/mo">R15,000 - R30,000/mo</option>
                        <option value="R30,000+/mo">R30,000+/mo</option>
                      </select>
                    </div>

                    {error && <p className="tourism-form-error">{error}</p>}

                    <button
                      type="submit"
                      className="tourism-btn-form-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : `${heroForm.buttonText} →`}
                    </button>
                  </form>

                  <p className="tourism-form-footer">🔒 {heroForm.privacyText}</p>
                </>
              )}
              </div>

              {/* Logo Marquee */}
              {partners.length > 0 && (
                <div className="tourism-logo-marquee">
                  <p className="tourism-logo-marquee-label">Trusted by leading companies</p>
                  <div className="tourism-logo-track">
                    {/* Duplicate logos for seamless loop */}
                    {[...partners, ...partners].map((partner, i) => (
                      <div key={`${partner._id}-${i}`} className="tourism-logo-item">
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          title={partner.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="tourism-section tourism-problem">
        <div className="tourism-container-narrow">
          <span className="tourism-section-label">{problem.label}</span>
          <h2 className="tourism-section-heading">
            {problem.heading}
            <br />
            <span className="tourism-green">{problem.headingHighlight}</span>
          </h2>
          <p className="tourism-problem-intro">{problem.intro}</p>

          <div className="tourism-problem-grid">
            {problem.painCards?.map((card, i) => (
              <div key={i} className="tourism-problem-card">
                <div className="icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 text-lg mb-6">{problem.transitionText}</p>
            <button onClick={openCalendly} className="tourism-btn-glow tourism-btn-glow-secondary">
              {problem.ctaText}
            </button>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="tourism-section tourism-solution">
        <div className="tourism-container-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <span className="tourism-section-label">{solution.label}</span>
            <h2 className="tourism-section-heading">
              {solution.heading}
              <br />
              <span className="tourism-green">{solution.headingHighlight}</span>
            </h2>
          </div>
          <p className="tourism-solution-subtitle">{solution.subtitle}</p>

          <div className="tourism-solution-steps">
            {solution.steps?.map((step, i) => (
              <div key={i} className="tourism-solution-step">
                <div className="tourism-solution-step-num">{step.number}</div>
                <div className="tourism-solution-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="tourism-section tourism-results">
        <div className="tourism-container">
          <div className="text-center">
            <span className="tourism-section-label">{results.label}</span>
            <h2 className="tourism-section-heading">
              {results.heading}
              <br />
              <span className="tourism-green">{results.headingHighlight}</span>
            </h2>
          </div>
          <p className="tourism-results-subtitle">{results.subtitle}</p>

          <div className="tourism-results-showcase">
            <div className="tourism-results-big-number tourism-mono tourism-gradient-text">
              {results.bigNumber}
            </div>
            <div className="tourism-results-big-label">{results.bigLabel}</div>
            <div className="tourism-results-big-sub">{results.bigSubtext}</div>

            <div className="tourism-results-grid">
              {results.stats?.map((stat, i) => (
                <div key={i} className="tourism-result-item">
                  <div className="tourism-result-item-num tourism-mono">{stat.value}</div>
                  <div className="tourism-result-item-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Proof Section */}
      <section className="tourism-section tourism-proof-section">
        <div className="tourism-container">
          <div className="text-center mb-12">
            <span className="tourism-proof-badge">{dashboardProof.badge}</span>
            <h2 className="tourism-section-heading mt-4">{dashboardProof.heading}</h2>
            <p className="tourism-proof-subheading">{dashboardProof.subheading}</p>
          </div>

          <div className="tourism-proof-grid">
            {dashboardProof.campaigns?.map((campaign, i) => (
              <div key={i} className="tourism-proof-card">
                <ProofImage src={campaign.image} alt={campaign.title} />
                <div className="tourism-proof-card-info">
                  <div className="tourism-proof-card-title">{campaign.title}</div>
                  <div className="tourism-proof-card-stats">{campaign.stats}</div>
                  <div className="tourism-proof-card-revenue">{campaign.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="tourism-section tourism-what-you-get">
        <div className="tourism-container">
          <div className="text-center">
            <span className="tourism-section-label">{whatYouGet.label}</span>
            <h2 className="tourism-section-heading">
              {whatYouGet.heading}
              <br />
              <span className="tourism-green">{whatYouGet.headingHighlight}</span>
            </h2>
          </div>

          <div className="tourism-benefits-list">
            {whatYouGet.benefits?.map((benefit, i) => (
              <div key={i} className="tourism-benefit-item">
                <div className="tourism-benefit-check">✓</div>
                <div className="tourism-benefit-content">
                  <h3>
                    {benefit.title}
                    {benefit.isBonus && <span className="tourism-bonus-tag">Bonus</span>}
                  </h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={openCalendly} className="tourism-btn-glow">
              {whatYouGet.ctaText} →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="tourism-section tourism-testimonials">
        <div className="tourism-container">
          <div className="text-center">
            <span className="tourism-section-label">{testimonials.label}</span>
            <h2 className="tourism-section-heading">
              {testimonials.heading}
              <br />
              <span className="tourism-green">{testimonials.headingHighlight}</span>
            </h2>
          </div>

          <div className="tourism-testimonials-grid">
            {testimonials.items?.map((item, i) => (
              <div key={i} className="tourism-testimonial">
                <div className="tourism-testimonial-stars">★★★★★</div>
                <p className="tourism-testimonial-text">&quot;{item.quote}&quot;</p>
                <div className="tourism-testimonial-result">→ {item.result}</div>
                <div className="tourism-testimonial-author">
                  <div className="tourism-testimonial-avatar">{item.initials}</div>
                  <div className="tourism-testimonial-info">
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="tourism-section tourism-who-for">
        <div className="tourism-container">
          <div className="text-center">
            <h2 className="tourism-section-heading">
              {whoFor.heading} <span className="tourism-green">{whoFor.headingHighlight}</span>
            </h2>
          </div>

          <div className="tourism-who-for-grid">
            <div className="tourism-who-for-box yes">
              <h3>✓ {whoFor.yesTitle}</h3>
              <ul>
                {whoFor.yesItems?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="tourism-who-for-box no">
              <h3>✗ {whoFor.noTitle}</h3>
              <ul>
                {whoFor.noItems?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="tourism-guarantee">
        <div className="tourism-container">
          <div className="tourism-guarantee-box">
            <div className="tourism-guarantee-icon">{guarantee.icon}</div>
            <h2>
              {guarantee.heading} <span className="tourism-green">{guarantee.headingHighlight}</span>
            </h2>
            <p>{guarantee.description}</p>
          </div>
        </div>
      </section>

      {/* Response Proof Section */}
      <section className="tourism-section tourism-proof-section tourism-proof-section-alt">
        <div className="tourism-container">
          <div className="text-center mb-12">
            <span className="tourism-proof-badge">{responseProof.badge}</span>
            <h2 className="tourism-section-heading mt-4">{responseProof.heading}</h2>
            <p className="tourism-proof-subheading">{responseProof.subheading}</p>
          </div>

          <div className="tourism-proof-grid tourism-proof-grid-responses">
            {responseProof.responses?.map((response, i) => (
              <div key={i} className="tourism-proof-card tourism-proof-card-response">
                <ProofImage src={response.image} alt={response.label} />
                <div className="tourism-proof-card-label">{response.label}</div>
              </div>
            ))}
          </div>

          <p className="tourism-proof-closing">{responseProof.closingText}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="tourism-section tourism-faq">
        <div className="tourism-container">
          <div className="text-center">
            <h2 className="tourism-section-heading">
              {faq.heading} <span className="tourism-green">{faq.headingHighlight}</span>
            </h2>
          </div>

          <div className="tourism-faq-list">
            {faq.items?.map((item, i) => (
              <div key={i} className="tourism-faq-item">
                <div className="tourism-faq-question">{item.question}</div>
                <p className="tourism-faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Proof Section - Before Final CTA */}
      <section className="tourism-section tourism-proof-section">
        <div className="tourism-container">
          <div className="text-center mb-12">
            <span className="tourism-proof-badge">{moreProof.badge}</span>
            <h2 className="tourism-section-heading mt-4">{moreProof.heading}</h2>
            <p className="tourism-proof-subheading">{moreProof.subheading}</p>
          </div>

          <div className="tourism-proof-grid">
            {moreProof.campaigns?.map((campaign, i) => (
              <div key={i} className="tourism-proof-card">
                <ProofImage src={campaign.image} alt={campaign.title} />
                <div className="tourism-proof-card-info">
                  <div className="tourism-proof-card-title">{campaign.title}</div>
                  <div className="tourism-proof-card-stats">{campaign.stats}</div>
                  <div className="tourism-proof-card-revenue">{campaign.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="tourism-final-cta">
        <div className="tourism-container">
          <h2>
            {finalCta.heading}
            <br />
            {finalCta.headingPart2} <span className="tourism-green">{finalCta.headingHighlight}</span>
          </h2>
          <p className="tourism-final-cta-subtitle">{finalCta.subtitle}</p>
          <button onClick={openCalendly} className="tourism-btn-glow">
            {finalCta.ctaText} →
          </button>
          <p className="tourism-final-cta-note">{finalCta.ctaNote}</p>

          <div className="tourism-final-cta-trust">
            {finalCta.trustItems?.map((item, i) => (
              <div key={i} className="tourism-trust-item">
                <span className="icon">{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="tourism-footer">
        <div className="tourism-container">
          <div className="tourism-footer-logo">
            <span className="tourism-footer-flag">🇿🇦</span>
            <img
              src="/media/mumbo-logo-footer.png"
              alt="Mumbo Leads"
              className="tourism-footer-logo-img"
            />
          </div>
          <p>{footer.tagline}</p>
          <p className="copy">© {footer.year} {footer.companyName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
