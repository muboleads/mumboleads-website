'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-2 cursor-pointer animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-[10000] p-2"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div
        className="w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
          style={{ imageRendering: 'auto' }}
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
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className="w-full h-auto"
          priority={false}
        />
      </div>
      {isModalOpen && (
        <ImageModal src={src} alt={alt} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

// Lead Capture Popup Component
function LeadCapturePopup({
  data,
  onClose
}: {
  data: {
    enabled?: boolean
    delaySeconds?: number
    proofImage?: string
    badge?: string
    headline?: string
    subheadline?: string
    bulletPoints?: string[]
    firstNamePlaceholder?: string
    emailPlaceholder?: string
    buttonText?: string
    privacyText?: string
    successHeadline?: string
    successMessage?: string
  }
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/course-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit')
      }

      // Mark as submitted in localStorage
      localStorage.setItem('courseLeadSubmitted', 'true')
      setIsSuccess(true)

      // Auto-close after 3 seconds on success
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  const defaults = {
    proofImage: '/media/proof/Ionyx.png',
    badge: '🔥 LIMITED TIME OFFER',
    headline: 'Wait! Before You Go...',
    subheadline: 'Get exclusive access to our Cold Email Masterclass and start landing clients this week.',
    bulletPoints: [
      '8 comprehensive video modules',
      'Done-for-you email templates',
      'Lifetime access included',
    ],
    firstNamePlaceholder: 'Your first name',
    emailPlaceholder: 'Your email address',
    buttonText: 'GET FREE ACCESS',
    privacyText: 'We respect your privacy. Unsubscribe anytime.',
    successHeadline: '🎉 You\'re In!',
    successMessage: 'Check your email for next steps. We\'re excited to have you!',
  }

  const popup = { ...defaults, ...data }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white z-10 p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          // Success State
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">{popup.successHeadline?.includes('🎉') ? '' : '🎉'}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{popup.successHeadline}</h3>
            <p className="text-gray-400">{popup.successMessage}</p>
          </div>
        ) : (
          <>
            {/* Proof Image */}
            {popup.proofImage && (
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={popup.proofImage}
                  alt="Proof"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 -mt-8 relative">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold mb-4">
                {popup.badge}
              </span>

              {/* Headline */}
              <h3 className="text-2xl font-bold text-white mb-2">{popup.headline}</h3>
              <p className="text-gray-400 text-sm mb-4">{popup.subheadline}</p>

              {/* Bullet Points */}
              {popup.bulletPoints && popup.bulletPoints.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {popup.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={popup.firstNamePlaceholder}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder={popup.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cta-button py-4 rounded-lg text-black font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : popup.buttonText}
                </button>
              </form>

              {/* Privacy Text */}
              <p className="text-gray-500 text-xs text-center mt-4">{popup.privacyText}</p>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

// Default data to use when Sanity data is not available
const defaultData = {
  urgency: {
    enabled: true,
    message: 'SPECIAL LAUNCH PRICING ENDS IN:',
    spotsLeft: 7,
    spotsMessage: 'Only {spots} spots left!',
    timerHours: 23,
    timerMinutes: 47,
  },
  hero: {
    badge: "FROM THE EXPERT WHO'S GENERATED R300M+ IN SALES PIPELINE",
    headlinePart1: 'Turn Cold Strangers Into',
    headlineHighlight: 'Paying Clients',
    headlinePart2: 'With One Email',
    subheadline: "The exact cold email system that's generated $16.5M+ in sales pipeline for B2B businesses worldwide. Now available to you.",
    pipelineHighlight: '$16.5M+ in sales pipeline',
    ctaText: 'GET INSTANT ACCESS',
    ctaPrice: 'R1,999',
    ctaUrl: '#',
    guarantee: '30-Day Money-Back Guarantee',
    features: ['8 Comprehensive Modules', 'Certificate Included', 'Lifetime Access'],
  },
  socialProof: [
    { value: '$16.5M+', label: 'Pipeline Generated' },
    { value: '5+', label: 'Years Experience' },
    { value: '500+', label: 'Students Trained' },
    { value: '92%', label: 'Success Rate' },
  ],
  problem: {
    heading: 'Sound Familiar?',
    painPoints: [
      "You're tired of waiting for leads to come to YOU",
      "Your inbox is full of crickets while competitors close deals",
      "You've tried cold email before and got ZERO responses",
      "LinkedIn outreach isn't working like it used to",
      "You're spending a fortune on ads with unpredictable results",
      "You don't know if cold email even works anymore in 2025",
    ],
    transitionHeading: 'What If I Told You...',
    transitionText: "Cold email isn't dead. It's more powerful than ever. But 99% of people are doing it completely wrong.",
    transitionHighlight: "It's more powerful than ever.",
  },
  solution: {
    badge: 'INTRODUCING',
    headingPart1: 'Grow Your B2B Business',
    headingHighlight: 'Using Cold Email',
    description: 'The complete A-Z system for landing high-ticket clients through cold email. From infrastructure to inbox management, this is EVERYTHING you need.',
    benefits: [
      { emoji: '🎯', title: 'Get Clients on Demand', description: 'Stop relying on referrals. Build a predictable pipeline of qualified leads whenever you want.', colorScheme: 'emerald' },
      { emoji: '📈', title: 'Scale Without Ads', description: 'Cold email costs pennies compared to paid advertising. Higher ROI, lower risk.', colorScheme: 'cyan' },
      { emoji: '💰', title: 'Close Bigger Deals', description: 'Direct access to decision-makers means bigger contracts and faster sales cycles.', colorScheme: 'purple' },
    ],
  },
  modules: {
    heading: 'Everything You Need to Master Cold Email',
    subheading: '8 comprehensive modules • 19+ lessons • Actionable templates',
    moduleList: [
      { number: '01', title: 'Cold Email Foundations', items: ['What cold email REALLY is (and isn\'t)', 'Cold Email vs Email Marketing - The R500k Difference', 'Why cold email is your unfair advantage in 2025+', 'The mindset that generated my biggest deal'] },
      { number: '02', title: 'Infrastructure & Deliverability', items: ['The technical setup that gets you to the PRIMARY inbox', 'Domain & DNS configuration (SPF, DKIM, DMARC)', 'Warming sequences that actually work', 'Avoid the spam folder forever'] },
      { number: '03', title: 'Lead Scraping & Data Quality', items: ['Find your ideal prospects in minutes', 'Tools that make lead gen effortless', 'Data enrichment strategies', 'Building lists that convert'] },
      { number: '04', title: 'Copywriting That Converts', items: ['The framework behind my highest-converting emails', 'Subject lines that get 60%+ open rates', 'Offers that make prospects say YES', 'Spintax mastery for scale'] },
      { number: '05', title: 'Tools & Campaign Setup', items: ['The exact tech stack I use daily', 'Campaign setup in under 30 minutes', 'Automation that runs while you sleep', 'A/B testing for continuous improvement'] },
      { number: '06', title: 'Inbox Management & Appointment Setting', items: ['Turn replies into booked meetings', 'Handle objections like a pro', 'Follow-up sequences that close', 'From cold stranger to warm lead'] },
      { number: '07', title: 'Optimization & Scaling', items: ['Scale from 100 to 10,000 emails/day', 'Troubleshooting deliverability issues', 'Analytics that matter', 'When to pivot vs persist'] },
      { number: '08', title: 'Compliance & Ethics', items: ['GDPR & CAN-SPAM fundamentals', 'Ethical outreach that builds reputation', 'Avoiding blacklists permanently', 'Best practices for long-term success'] },
    ],
  },
  testimonials: {
    heading: 'Real Results From Real Students',
    subheading: "Join hundreds who've transformed their business with cold email",
    items: [
      { name: 'Sipho M.', role: 'Agency Owner, Johannesburg', quote: "Generated R180,000 in new business in my first 90 days. This isn't theory - it's a proven system.", revenue: 'R180,000' },
      { name: 'Thandi K.', role: 'B2B Consultant, Cape Town', quote: "I was skeptical about cold email. Now it's responsible for 70% of my pipeline. Hopewell's methods just work.", revenue: 'R420,000' },
      { name: 'James O.', role: 'SaaS Founder, Durban', quote: "Closed a R500k deal from a single cold email campaign. Best investment I've ever made.", revenue: 'R500,000' },
    ],
  },
  instructor: {
    label: 'YOUR INSTRUCTOR',
    name: 'Hopewell Mkhize',
    initials: 'HM',
    title: 'Managing Director @ Mumbo Education',
    bio: "I've spent 5+ years mastering cold email as a freelancer, consultant, and inside some of the best agencies in the world.",
    bioHighlight: "We've collectively added over $16.5M in sales pipeline for B2B businesses around the world.",
    highlightText: '$16.5M in sales pipeline',
    stats: [
      { value: '5+', label: 'Years' },
      { value: '$16.5M', label: 'Pipeline' },
      { value: '500+', label: 'Students' },
    ],
  },
  pricing: {
    badge: 'LAUNCH SPECIAL - LIMITED TIME ONLY',
    heading: 'Get Everything Today',
    subheading: 'Complete cold email mastery at a fraction of the cost',
    valueStack: [
      { item: '8 Comprehensive Video Modules', value: 'R8,000' },
      { item: '19+ Step-by-Step Lessons', value: 'R4,000' },
      { item: 'Done-For-You Email Templates', value: 'R2,500' },
      { item: 'Infrastructure Setup Guides', value: 'R1,500' },
      { item: 'Lead Scraping Toolkit', value: 'R2,000' },
      { item: 'Certificate of Completion', value: 'R500' },
      { item: 'Lifetime Updates & Access', value: 'R3,000' },
    ],
    totalValue: 'R21,500',
    salePrice: 'R1,999',
    savingsText: 'Save over R19,000 today!',
    ctaText: 'ENROLL NOW & START TODAY',
    ctaUrl: '#',
    trustBadges: ['Instant Access', '30-Day Guarantee', 'Secure Payment'],
  },
  useCases: {
    heading: 'Cold Email Works For...',
    items: ['Getting Jobs', 'Getting Clients', 'Getting Sponsors', 'Getting Donors', 'Getting Signups', 'Getting Meetings', 'Getting Partnerships', 'Getting Press', 'Getting ANYTHING'],
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'Will I get a certificate?', answer: 'Yes! You\'ll receive a Certificate of Completion. Please note this is not an academic credential, but it demonstrates your commitment to professional development.' },
      { question: 'How long does the course take?', answer: 'This is structured as a 5-day course. Practically, it can be done in a few hours, but we\'ve limited access to later modules to allow time for implementation and practice.' },
      { question: 'Do you offer refunds?', answer: 'Due to the nature of our product (knowledge and intellectual property that cannot be \'returned\' once accessed), we generally do not offer refunds. However, we\'re confident you\'ll find immense value.' },
      { question: 'Is cold email legal?', answer: 'Yes! When done correctly following GDPR, CAN-SPAM, and POPIA guidelines (all covered in Module 8), cold email is completely legal and ethical.' },
      { question: "I've tried cold email before and it didn't work. Why is this different?", answer: "Most people fail at cold email because they're using outdated tactics. This course covers the latest 2025 strategies including deliverability best practices that most 'gurus' don't even know about." },
    ],
  },
  finalCta: {
    heading: 'This Time Next Month...',
    description: 'You could be closing deals from cold email campaigns that run on autopilot. Or you could still be waiting for leads to magically appear.',
    closingLine: 'The choice is yours.',
    ctaText: 'START CLOSING DEALS',
    ctaPrice: 'R1,999',
    ctaUrl: '#',
    socialProof: "Join 500+ students who've already transformed their businesses",
  },
  footer: {
    companyName: 'Mumbo Education',
    year: '2025',
    disclaimer: 'This course is for educational purposes. Results vary based on effort and market conditions.',
  },
  // Proof Images Sections
  heroProof: {
    label: 'Real Campaign Results',
    image: '/media/proof/xxx.png',
    caption: '49.2K emails sent → 93 opportunities → $651,000 in pipeline',
    captionHighlight: '$651,000 in pipeline',
  },
  dashboardProof: {
    badge: '📊 REAL PROOF FROM REAL CAMPAIGNS',
    heading: 'These Results Speak for Themselves',
    subheading: 'Actual dashboard screenshots from live campaigns',
    featuredCampaigns: [
      { image: '/media/proof/ai.png', title: 'Lingopal SAAS Campaign', stats: '16.7K sent • 46.7% open rate • 17 opps', revenue: '$160,000' },
      { image: '/media/proof/rowthzilla.png', title: 'B2B Lead Gen Campaign', stats: '31.8K sent • 3.1% reply rate • 19 opps', revenue: '$19,000' },
    ],
    smallCampaigns: [
      { image: '/media/proof/image25.jpg', title: '16,209 Leads', subtitle: '424 replies • 38 positive' },
      { image: '/media/proof/image51.jpg', title: '13,051 Leads', subtitle: '317 replies • 26 positive' },
    ],
  },
  responseProof: {
    badge: '📬 ACTUAL INBOX SCREENSHOTS',
    heading: 'CEOs & Founders Actually Reply',
    subheading: 'These are real responses from cold email campaigns',
    responses: [
      { image: '/media/proof/Response 6.png', label: 'Response from Pete (CEO)' },
      { image: '/media/proof/Response 17.png', label: 'Response from Cartar Australia' },
      { image: '/media/proof/Response 29.png', label: 'Response from Joe (Founder & CMO, MyFormData)' },
      { image: '/media/proof/Response 37.png', label: 'Response from President of ELQ' },
      { image: '/media/proof/Response 23.png', label: 'Positive Response' },
      { image: '/media/proof/Response 25.png', label: 'Interested Response' },
    ],
    closingText: "These aren't cherry-picked examples. This is what happens when you use the right system.",
    closingHighlight: 'right system',
  },
  industryProof: {
    badge: '🌍 WORKS ACROSS INDUSTRIES',
    heading: 'From SaaS to Fintech to Marketing Agencies',
    industries: [
      { image: '/media/proof/saas.png', label: 'SaaS', color: 'emerald' },
      { image: '/media/proof/Fintech.png', label: 'Fintech', color: 'cyan' },
      { image: '/media/proof/marketing agency.png', label: 'Marketing', color: 'purple' },
      { image: '/media/proof/enterprise saas.png', label: 'Enterprise', color: 'pink' },
    ],
  },
  moreRepliesProof: {
    label: 'More replies from decision makers...',
    images: [
      { image: '/media/proof/Response 12.png', alt: 'Response Screenshot' },
      { image: '/media/proof/Response 15.png', alt: 'Response Screenshot' },
      { image: '/media/proof/Response 18.png', alt: 'Response Screenshot' },
      { image: '/media/proof/Response 19.png', alt: 'Response Screenshot' },
    ],
  },
  studentDashboardProof: {
    label: 'Campaign dashboards from students using our methods...',
    dashboards: [
      { image: '/media/proof/Martech.png', alt: 'Martech Campaign' },
      { image: '/media/proof/DAAS.png', alt: 'DAAS Campaign' },
    ],
  },
  beforeFaqProof: {
    images: [
      { image: '/media/proof/Response 28.png', alt: 'Response' },
      { image: '/media/proof/Response 35.png', alt: 'Response' },
      { image: '/media/proof/Response 42.png', alt: 'Response' },
      { image: '/media/proof/Response 43.png', alt: 'Response' },
    ],
  },
  finalProof: {
    badge: "💬 Still not convinced? Here's more proof...",
    images: [
      { image: '/media/proof/Ionyx.png', alt: 'Ionyx Campaign - Instantly Dashboard' },
      { image: '/media/proof/Kissmetrics.png', alt: 'Kissmetrics Campaign - Instantly Dashboard' },
    ],
  },
  // Lead Popup
  leadPopup: {
    enabled: true,
    delaySeconds: 5,
    proofImage: '/media/proof/Ionyx.png',
    badge: '🔥 LIMITED TIME OFFER',
    headline: 'Wait! Before You Go...',
    subheadline: 'Get exclusive access to our Cold Email Masterclass and start landing clients this week.',
    bulletPoints: [
      '8 comprehensive video modules',
      'Done-for-you email templates',
      'Lifetime access included',
    ],
    firstNamePlaceholder: 'Your first name',
    emailPlaceholder: 'Your email address',
    buttonText: 'GET FREE ACCESS',
    privacyText: 'We respect your privacy. Unsubscribe anytime.',
    successHeadline: "🎉 You're In!",
    successMessage: "Check your email for next steps. We're excited to have you!",
  },
}

interface SalesCourseData {
  urgency?: typeof defaultData.urgency
  hero?: typeof defaultData.hero
  socialProof?: typeof defaultData.socialProof
  problem?: typeof defaultData.problem
  solution?: typeof defaultData.solution
  modules?: typeof defaultData.modules
  testimonials?: typeof defaultData.testimonials
  instructor?: typeof defaultData.instructor
  pricing?: typeof defaultData.pricing
  useCases?: typeof defaultData.useCases
  faq?: typeof defaultData.faq
  finalCta?: typeof defaultData.finalCta
  footer?: typeof defaultData.footer
  // Proof sections
  heroProof?: typeof defaultData.heroProof
  dashboardProof?: typeof defaultData.dashboardProof
  responseProof?: typeof defaultData.responseProof
  industryProof?: typeof defaultData.industryProof
  moreRepliesProof?: typeof defaultData.moreRepliesProof
  studentDashboardProof?: typeof defaultData.studentDashboardProof
  beforeFaqProof?: typeof defaultData.beforeFaqProof
  finalProof?: typeof defaultData.finalProof
  // Lead Popup
  leadPopup?: typeof defaultData.leadPopup
}

interface CourseLandingProps {
  data: SalesCourseData | null
  instructorImageUrl?: string
}

export function CourseLanding({ data, instructorImageUrl }: CourseLandingProps) {
  // Merge Sanity data with defaults
  const urgency = { ...defaultData.urgency, ...data?.urgency }
  const hero = { ...defaultData.hero, ...data?.hero }
  const socialProof = data?.socialProof?.length ? data.socialProof : defaultData.socialProof
  const problem = { ...defaultData.problem, ...data?.problem }
  const solution = { ...defaultData.solution, ...data?.solution }
  const modules = { ...defaultData.modules, ...data?.modules }
  const testimonials = { ...defaultData.testimonials, ...data?.testimonials }
  const instructor = { ...defaultData.instructor, ...data?.instructor }
  const pricing = { ...defaultData.pricing, ...data?.pricing }
  const useCases = { ...defaultData.useCases, ...data?.useCases }
  const faq = { ...defaultData.faq, ...data?.faq }
  const finalCta = { ...defaultData.finalCta, ...data?.finalCta }
  const footer = { ...defaultData.footer, ...data?.footer }
  // Proof sections
  const heroProof = { ...defaultData.heroProof, ...data?.heroProof }
  const dashboardProof = { ...defaultData.dashboardProof, ...data?.dashboardProof }
  const responseProof = { ...defaultData.responseProof, ...data?.responseProof }
  const industryProof = { ...defaultData.industryProof, ...data?.industryProof }
  const moreRepliesProof = { ...defaultData.moreRepliesProof, ...data?.moreRepliesProof }
  const studentDashboardProof = { ...defaultData.studentDashboardProof, ...data?.studentDashboardProof }
  const beforeFaqProof = { ...defaultData.beforeFaqProof, ...data?.beforeFaqProof }
  const finalProof = { ...defaultData.finalProof, ...data?.finalProof }
  // Lead Popup
  const leadPopup = { ...defaultData.leadPopup, ...data?.leadPopup }

  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: urgency.timerHours || 23,
    minutes: urgency.timerMinutes || 47,
    seconds: 32,
  })

  // Visibility state for animations
  const [isVisible, setIsVisible] = useState(false)

  // Lead popup state
  const [showLeadPopup, setShowLeadPopup] = useState(false)

  // Timer effect
  useEffect(() => {
    setIsVisible(true)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 23
              minutes = 59
              seconds = 59
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Lead popup effect - show after delay if not already submitted
  useEffect(() => {
    if (!leadPopup.enabled) return

    // Check if user has already submitted
    const hasSubmitted = localStorage.getItem('courseLeadSubmitted') === 'true'
    if (hasSubmitted) return

    // Show popup after configured delay
    const delay = (leadPopup.delaySeconds || 5) * 1000
    const popupTimer = setTimeout(() => {
      setShowLeadPopup(true)
    }, delay)

    return () => clearTimeout(popupTimer)
  }, [leadPopup.enabled, leadPopup.delaySeconds])

  const ctaUrl = hero.ctaUrl || '#'
  const pricingCtaUrl = pricing.ctaUrl || ctaUrl
  const finalCtaUrl = finalCta.ctaUrl || ctaUrl

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sora">
      {/* Urgency Bar */}
      {urgency.enabled && (
        <div className="urgent-bar py-3 px-4 text-center sticky top-0 z-50">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="font-bold text-white text-sm md:text-base">
              ⚡ {urgency.message}
            </span>
            <div className="flex gap-2 font-mono font-bold text-white">
              <span className="bg-black/30 px-3 py-1 rounded">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="bg-black/30 px-3 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="bg-black/30 px-3 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
            <span className="text-yellow-200 font-semibold text-sm">
              {urgency.spotsMessage?.replace('{spots}', String(urgency.spotsLeft))}
            </span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div
            className={`${isVisible ? 'float-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <span className="inline-block px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-base md:text-lg font-semibold mb-8">
              🔥 {hero.badge}
            </span>
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 ${isVisible ? 'float-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            {hero.headlinePart1}
            <br />
            <span className="gradient-text">{hero.headlineHighlight}</span>
            <br />
            {hero.headlinePart2}
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 ${isVisible ? 'float-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            {hero.subheadline?.split(hero.pipelineHighlight || '').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-white font-semibold">{hero.pipelineHighlight}</span>
                )}
              </span>
            ))}
          </p>

          <div
            className={`flex flex-col gap-4 justify-center items-center mb-12 ${isVisible ? 'float-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button px-10 py-5 rounded-xl text-black font-bold text-xl pulse-glow"
            >
              {hero.ctaText} → {hero.ctaPrice}
            </a>
            <span className="text-gray-500 text-sm">{hero.guarantee}</span>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-8 text-sm text-gray-400 ${isVisible ? 'float-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.5s' }}
          >
            {hero.features?.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Proof Image */}
      <section className="px-4 pb-16 -mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">{heroProof.label}</span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-emerald-500/20 glow-box">
            <ProofImage
              src={heroProof.image}
              alt={heroProof.label}
            />
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            ↑ {heroProof.caption?.replace(heroProof.captionHighlight || '', '').trim()} <span className="text-emerald-400 font-bold">{heroProof.captionHighlight}</span>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-white/5 py-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {socialProof.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold gradient-text font-mono">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {problem.heading}
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {problem.painPoints?.map((point, i) => (
              <div
                key={i}
                className="p-4 rounded-lg pain-point text-gray-300 text-lg"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {problem.transitionHeading}
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {problem.transitionText?.split(problem.transitionHighlight || '').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-white font-semibold">{problem.transitionHighlight}</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Proof Section - Dashboard Screenshots */}
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-900/10 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
              {dashboardProof.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {dashboardProof.heading}
            </h2>
            <p className="text-gray-400 text-lg">{dashboardProof.subheading}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {dashboardProof.featuredCampaigns?.map((campaign, i) => (
              <div key={i} className="proof-card rounded-xl overflow-hidden">
                <ProofImage
                  src={campaign.image}
                  alt={campaign.title}
                />
                <div className="p-4 bg-black/50">
                  <div className="text-emerald-400 font-bold text-lg">{campaign.title}</div>
                  <div className="text-gray-400 text-sm">{campaign.stats} • <span className="text-white font-bold">{campaign.revenue}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {dashboardProof.smallCampaigns?.map((campaign, i) => (
              <div key={i} className="proof-card rounded-xl overflow-hidden">
                <ProofImage
                  src={campaign.image}
                  alt={campaign.title}
                />
                <div className="p-3 bg-black/50">
                  <div className="text-cyan-400 font-semibold">{campaign.title}</div>
                  <div className="text-gray-500 text-xs">{campaign.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Response Screenshots */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-4">
              {responseProof.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {responseProof.heading}
            </h2>
            <p className="text-gray-400 text-lg">{responseProof.subheading}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {responseProof.responses?.map((response, i) => (
              <div key={i} className="response-card rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <span className="text-gray-600 text-sm font-medium">📧 {response.label}</span>
                </div>
                <ProofImage
                  src={response.image}
                  alt={response.label}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg mb-6">
              {responseProof.closingText?.split(responseProof.closingHighlight || '').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-white font-semibold">{responseProof.closingHighlight}</span>
                  )}
                </span>
              ))}
            </p>
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button px-10 py-5 rounded-xl text-black font-bold text-xl pulse-glow inline-block"
            >
              {hero.ctaText} → {hero.ctaPrice}
            </a>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 section-gradient-emerald">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
            {solution.badge}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {solution.headingPart1}
            <br />
            <span className="gradient-text">{solution.headingHighlight}</span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            {solution.description}
          </p>

          <div className="glow-box rounded-2xl p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black border border-emerald-500/20">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {solution.benefits?.map((benefit, i) => (
                <div key={i}>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 benefit-card-${benefit.colorScheme || 'emerald'}`}
                  >
                    <span className="text-2xl">{benefit.emoji}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More Campaign Proof - Industry Diversity */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-4">
              {industryProof.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              {industryProof.heading}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {industryProof.industries?.map((industry, i) => {
              const colorMap: Record<string, string> = {
                emerald: 'text-emerald-400',
                cyan: 'text-cyan-400',
                purple: 'text-purple-400',
                pink: 'text-pink-400',
              }
              return (
                <div key={i} className="proof-card rounded-xl overflow-hidden">
                  <ProofImage
                    src={industry.image}
                    alt={`${industry.label} Campaign`}
                  />
                  <div className="p-2 bg-black/50 text-center">
                    <div className={`${colorMap[industry.color] || 'text-emerald-400'} text-sm font-semibold`}>{industry.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {modules.heading}
            </h2>
            <p className="text-gray-400 text-lg">{modules.subheading}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.moduleList?.map((module, i) => (
              <div key={i} className="module-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-4xl font-bold text-emerald-400/30">
                    {module.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-4">{module.title}</h3>
                    <ul className="space-y-2">
                      {module.items?.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-gray-400 text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 section-gradient-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {testimonials.heading}
            </h2>
            <p className="text-gray-400">{testimonials.subheading}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.items?.map((t, i) => (
              <div key={i} className="testimonial-card rounded-xl p-6">
                <div className="font-mono text-2xl font-bold text-emerald-400 mb-4">
                  {t.revenue}
                </div>
                <p className="text-gray-300 mb-4">&quot;{t.quote}&quot;</p>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button px-10 py-5 rounded-xl text-black font-bold text-xl pulse-glow inline-block"
            >
              {hero.ctaText} → {hero.ctaPrice}
            </a>
          </div>
        </div>
      </section>

      {/* More Response Screenshots - Scrolling Social Proof */}
      <section className="py-12 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-wider">{moreRepliesProof.label}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {moreRepliesProof.images?.map((img, i) => (
              <div key={i} className="response-card rounded-lg overflow-hidden shadow-lg">
                <ProofImage
                  src={img.image}
                  alt={img.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Instructor */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                {instructorImageUrl ? (
                  <div className="relative">
                    {/* Outer glow ring */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-xl"></div>
                    {/* Image container */}
                    <div className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-4 ring-emerald-500/40 p-1 bg-gradient-to-br from-emerald-500 to-cyan-500">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={instructorImageUrl}
                          alt={instructor.name || 'Instructor'}
                          width={224}
                          height={224}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full instructor-avatar flex items-center justify-center text-6xl font-bold text-black">
                    {instructor.initials}
                  </div>
                )}
              </div>
              <div>
                <span className="text-emerald-400 font-medium text-sm">
                  {instructor.label}
                </span>
                <h3 className="text-3xl font-bold mt-2 mb-4">{instructor.name}</h3>
                <p className="text-gray-400 mb-4">{instructor.bio}</p>
                <p className="text-gray-400 mb-6">
                  {instructor.bioHighlight?.split(instructor.highlightText || '').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-white font-semibold">{instructor.highlightText}</span>
                      )}
                    </span>
                  ))}
                </p>
                <div className="flex gap-4">
                  {instructor.stats?.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Dashboard Proof Before Pricing */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-wider">{studentDashboardProof.label}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {studentDashboardProof.dashboards?.map((dashboard, i) => (
              <div key={i} className="proof-card rounded-xl overflow-hidden">
                <ProofImage
                  src={dashboard.image}
                  alt={dashboard.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glow-box rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-emerald-500/30 overflow-hidden">
            <div className="bg-emerald-500 py-3 text-center">
              <span className="font-bold text-black">🔥 {pricing.badge}</span>
            </div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {pricing.heading}
                </h2>
                <p className="text-gray-400">{pricing.subheading}</p>
              </div>

              <div className="space-y-4 mb-8">
                {pricing.valueStack?.map((item, i) => (
                  <div key={i} className="value-item flex justify-between items-center py-3">
                    <span className="text-gray-300">{item.item}</span>
                    <span className="text-emerald-400 line-through opacity-70">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="text-center border-t border-white/10 pt-8">
                <div className="text-gray-500 mb-2">
                  Total Value: <span className="strike-through">{pricing.totalValue}</span>
                </div>
                <div className="text-5xl font-bold gradient-text mb-2">
                  {pricing.salePrice}
                </div>
                <div className="text-emerald-400 text-sm mb-8">{pricing.savingsText}</div>

                <a
                  href={pricingCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button w-full py-5 rounded-xl text-black font-bold text-xl pulse-glow block text-center"
                >
                  {pricing.ctaText}
                </a>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-4">
                  {pricing.trustBadges?.map((badge, i) => (
                    <span key={i}>✓ {badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm">
              <span>⚠️</span>
              <span>
                Only <strong>{urgency.spotsLeft}</strong> spots remaining at this price
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 section-gradient-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            {useCases.heading}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {useCases.items?.map((use, i) => {
              const colors = [
                'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20',
                'border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20',
                'border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20',
                'border-pink-500/50 bg-pink-500/10 hover:bg-pink-500/20',
                'border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20',
                'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20',
                'border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20',
                'border-teal-500/50 bg-teal-500/10 hover:bg-teal-500/20',
                'border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20',
              ]
              return (
                <div
                  key={i}
                  className={`py-4 px-6 rounded-xl border text-gray-200 transition-all duration-300 ${colors[i % colors.length]}`}
                >
                  {use}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* More Responses Before FAQ */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {beforeFaqProof.images?.map((img, i) => (
              <div key={i} className="response-card rounded-lg overflow-hidden shadow-md">
                <ProofImage
                  src={img.image}
                  alt={img.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {faq.heading}
          </h2>

          <div className="space-y-4">
            {faq.items?.map((item, i) => {
              const accentColors = [
                'border-l-emerald-500',
                'border-l-cyan-500',
                'border-l-purple-500',
                'border-l-pink-500',
                'border-l-yellow-500',
              ]
              return (
                <div
                  key={i}
                  className={`faq-item rounded-xl p-6 border-l-4 ${accentColors[i % accentColors.length]} hover:bg-white/5 transition-colors duration-300`}
                >
                  <h4 className="font-bold text-lg mb-2 text-white">{item.question}</h4>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Even More Response Proof - Before Final CTA */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
              {finalProof.badge}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {finalProof.images?.map((img, i) => (
              <div key={i} className="proof-card rounded-xl overflow-hidden">
                <ProofImage
                  src={img.image}
                  alt={img.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {finalCta.heading}
          </h2>
          <p className="text-xl text-gray-400 mb-8">{finalCta.description}</p>
          <p className="text-2xl font-semibold mb-8">{finalCta.closingLine}</p>

          <a
            href={finalCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button px-12 py-6 rounded-xl text-black font-bold text-2xl pulse-glow inline-block"
          >
            {finalCta.ctaText} → {finalCta.ctaPrice}
          </a>

          <div className="mt-8 text-gray-500 text-sm">{finalCta.socialProof}</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-4">
            © {footer.year} {footer.companyName}. All rights reserved.
          </p>
          <p>{footer.disclaimer}</p>
        </div>
      </footer>

      {/* Lead Capture Popup */}
      {showLeadPopup && (
        <LeadCapturePopup
          data={leadPopup}
          onClose={() => setShowLeadPopup(false)}
        />
      )}
    </div>
  )
}
