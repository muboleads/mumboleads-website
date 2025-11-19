export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
  }[]
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  image: string
  publishedAt: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'fintech-company-1000-leads',
    title: 'How We Generated 1,000+ Qualified Leads for a Fintech Startup',
    client: 'FinanceFlow Inc.',
    industry: 'Financial Technology',
    challenge: 'FinanceFlow, a B2B payment processing platform, struggled to reach decision-makers at mid-sized companies. Their in-house cold email campaigns had low open rates (8%) and virtually no conversions.',
    solution: 'We implemented our laser-targeted prospecting system to identify CFOs and Finance Directors at companies with 50-500 employees. Our tech-driven delivery engineering ensured 98% inbox placement, while our conversion-focused copy addressed specific pain points around payment reconciliation and cash flow management.',
    results: [
      { metric: 'Qualified Leads Generated', value: '1,247' },
      { metric: 'Open Rate', value: '67%' },
      { metric: 'Reply Rate', value: '23%' },
      { metric: 'Meetings Booked', value: '187' },
      { metric: 'Pipeline Added', value: '$2.4M' },
      { metric: 'Time to First Lead', value: '11 days' }
    ],
    testimonial: {
      quote: 'Mumbo Leads transformed our outbound strategy. We went from struggling to book 2-3 meetings per month to consistently generating 40+ qualified opportunities. The ROI has been incredible.',
      author: 'Sarah Johnson',
      position: 'VP of Sales, FinanceFlow Inc.'
    },
    image: '/media/B2B-Cold-Email-Agency.png',
    publishedAt: '2024-10-15'
  },
  {
    id: '2',
    slug: 'saas-company-pipeline-growth',
    title: '$1.7M Pipeline in 90 Days: SEO Agency Success Story',
    client: 'RankBoost Digital',
    industry: 'Digital Marketing / SEO',
    challenge: 'RankBoost Digital, an enterprise SEO agency, had a strong service offering but struggled to reach Fortune 1000 marketing directors. Their generic outbound efforts resulted in spam complaints and damaged sender reputation.',
    solution: 'We developed a multi-sequence campaign targeting Marketing VPs and Directors at companies recently featured in tech news for funding or expansion. Each email referenced specific company milestones and demonstrated understanding of their growth challenges. Our deliverability engineering maintained pristine sender reputation throughout.',
    results: [
      { metric: 'Pipeline Generated', value: '$1.7M' },
      { metric: 'Enterprise Clients', value: '12' },
      { metric: 'Average Deal Size', value: '$142K' },
      { metric: 'Email Deliverability', value: '99.2%' },
      { metric: 'Positive Reply Rate', value: '31%' },
      { metric: 'Campaign Duration', value: '90 days' }
    ],
    testimonial: {
      quote: 'The level of personalization and market research Mumbo Leads brought to our campaigns was game-changing. They did not just send emails—they opened doors to conversations with decision-makers we could not reach before.',
      author: 'Michael Chen',
      position: 'Founder & CEO, RankBoost Digital'
    },
    image: '/media/FeaturedIcon1.webp',
    publishedAt: '2024-11-05'
  }
]

export function getCaseStudies() {
  return caseStudies.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getCaseStudy(slug: string) {
  return caseStudies.find(cs => cs.slug === slug)
}
