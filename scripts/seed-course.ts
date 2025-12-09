import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const salesCourseData = {
  _type: 'salesCourse',
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
    ctaUrl: 'https://paystack.shop/pay/cold_email_course',
    guarantee: '30-Day Money-Back Guarantee',
    features: ['8 Comprehensive Modules', 'Certificate Included', 'Lifetime Access'],
  },
  socialProof: [
    { _key: 'stat1', value: '$16.5M+', label: 'Pipeline Generated' },
    { _key: 'stat2', value: '5+', label: 'Years Experience' },
    { _key: 'stat3', value: '500+', label: 'Students Trained' },
    { _key: 'stat4', value: '92%', label: 'Success Rate' },
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
      {
        _key: 'benefit1',
        emoji: '🎯',
        title: 'Get Clients on Demand',
        description: 'Stop relying on referrals. Build a predictable pipeline of qualified leads whenever you want.',
        colorScheme: 'emerald',
      },
      {
        _key: 'benefit2',
        emoji: '📈',
        title: 'Scale Without Ads',
        description: 'Cold email costs pennies compared to paid advertising. Higher ROI, lower risk.',
        colorScheme: 'cyan',
      },
      {
        _key: 'benefit3',
        emoji: '💰',
        title: 'Close Bigger Deals',
        description: 'Direct access to decision-makers means bigger contracts and faster sales cycles.',
        colorScheme: 'purple',
      },
    ],
  },
  modules: {
    heading: 'Everything You Need to Master Cold Email',
    subheading: '8 comprehensive modules • 19+ lessons • Actionable templates',
    moduleList: [
      {
        _key: 'module1',
        number: '01',
        title: 'Cold Email Foundations',
        items: [
          "What cold email REALLY is (and isn't)",
          'Cold Email vs Email Marketing - The R500k Difference',
          'Why cold email is your unfair advantage in 2025+',
          'The mindset that generated my biggest deal',
        ],
      },
      {
        _key: 'module2',
        number: '02',
        title: 'Infrastructure & Deliverability',
        items: [
          'The technical setup that gets you to the PRIMARY inbox',
          'Domain & DNS configuration (SPF, DKIM, DMARC)',
          'Warming sequences that actually work',
          'Avoid the spam folder forever',
        ],
      },
      {
        _key: 'module3',
        number: '03',
        title: 'Lead Scraping & Data Quality',
        items: [
          'Find your ideal prospects in minutes',
          'Tools that make lead gen effortless',
          'Data enrichment strategies',
          'Building lists that convert',
        ],
      },
      {
        _key: 'module4',
        number: '04',
        title: 'Copywriting That Converts',
        items: [
          'The framework behind my highest-converting emails',
          'Subject lines that get 60%+ open rates',
          'Offers that make prospects say YES',
          'Spintax mastery for scale',
        ],
      },
      {
        _key: 'module5',
        number: '05',
        title: 'Tools & Campaign Setup',
        items: [
          'The exact tech stack I use daily',
          'Campaign setup in under 30 minutes',
          'Automation that runs while you sleep',
          'A/B testing for continuous improvement',
        ],
      },
      {
        _key: 'module6',
        number: '06',
        title: 'Inbox Management & Appointment Setting',
        items: [
          'Turn replies into booked meetings',
          'Handle objections like a pro',
          'Follow-up sequences that close',
          'From cold stranger to warm lead',
        ],
      },
      {
        _key: 'module7',
        number: '07',
        title: 'Optimization & Scaling',
        items: [
          'Scale from 100 to 10,000 emails/day',
          'Troubleshooting deliverability issues',
          'Analytics that matter',
          'When to pivot vs persist',
        ],
      },
      {
        _key: 'module8',
        number: '08',
        title: 'Compliance & Ethics',
        items: [
          'GDPR & CAN-SPAM fundamentals',
          'Ethical outreach that builds reputation',
          'Avoiding blacklists permanently',
          'Best practices for long-term success',
        ],
      },
    ],
  },
  testimonials: {
    heading: 'Real Results From Real Students',
    subheading: "Join hundreds who've transformed their business with cold email",
    items: [
      {
        _key: 'testimonial1',
        name: 'Sipho M.',
        role: 'Agency Owner, Johannesburg',
        quote: "Generated R180,000 in new business in my first 90 days. This isn't theory - it's a proven system.",
        revenue: 'R180,000',
      },
      {
        _key: 'testimonial2',
        name: 'Thandi K.',
        role: 'B2B Consultant, Cape Town',
        quote: "I was skeptical about cold email. Now it's responsible for 70% of my pipeline. Hopewell's methods just work.",
        revenue: 'R420,000',
      },
      {
        _key: 'testimonial3',
        name: 'James O.',
        role: 'SaaS Founder, Durban',
        quote: "Closed a R500k deal from a single cold email campaign. Best investment I've ever made.",
        revenue: 'R500,000',
      },
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
      { _key: 'instructorStat1', value: '5+', label: 'Years' },
      { _key: 'instructorStat2', value: '$16.5M', label: 'Pipeline' },
      { _key: 'instructorStat3', value: '500+', label: 'Students' },
    ],
  },
  pricing: {
    badge: 'LAUNCH SPECIAL - LIMITED TIME ONLY',
    heading: 'Get Everything Today',
    subheading: 'Complete cold email mastery at a fraction of the cost',
    valueStack: [
      { _key: 'value1', item: '8 Comprehensive Video Modules', value: 'R8,000' },
      { _key: 'value2', item: '19+ Step-by-Step Lessons', value: 'R4,000' },
      { _key: 'value3', item: 'Done-For-You Email Templates', value: 'R2,500' },
      { _key: 'value4', item: 'Infrastructure Setup Guides', value: 'R1,500' },
      { _key: 'value5', item: 'Lead Scraping Toolkit', value: 'R2,000' },
      { _key: 'value6', item: 'Certificate of Completion', value: 'R500' },
      { _key: 'value7', item: 'Lifetime Updates & Access', value: 'R3,000' },
    ],
    totalValue: 'R21,500',
    salePrice: 'R1,999',
    savingsText: 'Save over R19,000 today!',
    ctaText: 'ENROLL NOW & START TODAY',
    ctaUrl: 'https://paystack.shop/pay/cold_email_course',
    trustBadges: ['Instant Access', '30-Day Guarantee', 'Secure Payment'],
  },
  useCases: {
    heading: 'Cold Email Works For...',
    items: [
      'Getting Jobs',
      'Getting Clients',
      'Getting Sponsors',
      'Getting Donors',
      'Getting Signups',
      'Getting Meetings',
      'Getting Partnerships',
      'Getting Press',
      'Getting ANYTHING',
    ],
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        _key: 'faq1',
        question: 'Will I get a certificate?',
        answer: "Yes! You'll receive a Certificate of Completion. Please note this is not an academic credential, but it demonstrates your commitment to professional development.",
      },
      {
        _key: 'faq2',
        question: 'How long does the course take?',
        answer: "This is structured as a 5-day course. Practically, it can be done in a few hours, but we've limited access to later modules to allow time for implementation and practice.",
      },
      {
        _key: 'faq3',
        question: 'Do you offer refunds?',
        answer: "Due to the nature of our product (knowledge and intellectual property that cannot be 'returned' once accessed), we generally do not offer refunds. However, we're confident you'll find immense value.",
      },
      {
        _key: 'faq4',
        question: 'Is cold email legal?',
        answer: 'Yes! When done correctly following GDPR, CAN-SPAM, and POPIA guidelines (all covered in Module 8), cold email is completely legal and ethical.',
      },
      {
        _key: 'faq5',
        question: "I've tried cold email before and it didn't work. Why is this different?",
        answer: "Most people fail at cold email because they're using outdated tactics. This course covers the latest 2025 strategies including deliverability best practices that most 'gurus' don't even know about.",
      },
    ],
  },
  finalCta: {
    heading: 'This Time Next Month...',
    description: 'You could be closing deals from cold email campaigns that run on autopilot. Or you could still be waiting for leads to magically appear.',
    closingLine: 'The choice is yours.',
    ctaText: 'START CLOSING DEALS',
    ctaPrice: 'R1,999',
    ctaUrl: 'https://paystack.shop/pay/cold_email_course',
    socialProof: "Join 500+ students who've already transformed their businesses",
  },
  footer: {
    companyName: 'Mumbo Education',
    year: '2025',
    disclaimer: 'This course is for educational purposes. Results vary based on effort and market conditions.',
  },
  seo: {
    metaTitle: 'Cold Email Mastery Course | Grow Your B2B Business',
    metaDescription: 'Learn the exact cold email system that has generated $16.5M+ in sales pipeline. 8 modules, lifetime access, certificate included.',
    metaKeywords: ['cold email', 'B2B sales', 'lead generation', 'email marketing', 'cold outreach', 'sales pipeline'],
  },

  // ==========================================
  // PROOF IMAGES SECTIONS
  // ==========================================

  // Hero Proof - Main campaign result below hero
  heroProof: {
    label: 'Real Campaign Results',
    image: '/media/proof/xxx.png',
    caption: '49.2K emails sent → 93 opportunities → $651,000 in pipeline',
    captionHighlight: '$651,000 in pipeline',
  },

  // Dashboard Proof - Campaign screenshots with stats
  dashboardProof: {
    badge: '📊 REAL PROOF FROM REAL CAMPAIGNS',
    heading: 'These Results Speak for Themselves',
    subheading: 'Actual dashboard screenshots from live campaigns',
    featuredCampaigns: [
      {
        _key: 'featured1',
        image: '/media/proof/ai.png',
        title: 'Lingopal SAAS Campaign',
        stats: '16.7K sent • 46.7% open rate • 17 opps',
        revenue: '$160,000',
      },
      {
        _key: 'featured2',
        image: '/media/proof/rowthzilla.png',
        title: 'B2B Lead Gen Campaign',
        stats: '31.8K sent • 3.1% reply rate • 19 opps',
        revenue: '$19,000',
      },
    ],
    smallCampaigns: [
      {
        _key: 'small1',
        image: '/media/proof/image25.jpg',
        title: '16,209 Leads',
        subtitle: '424 replies • 38 positive',
      },
      {
        _key: 'small2',
        image: '/media/proof/image51.jpg',
        title: '13,051 Leads',
        subtitle: '317 replies • 26 positive',
      },
    ],
  },

  // Response Proof - Client email responses
  responseProof: {
    badge: '📬 ACTUAL INBOX SCREENSHOTS',
    heading: 'CEOs & Founders Actually Reply',
    subheading: 'These are real responses from cold email campaigns',
    responses: [
      { _key: 'resp1', image: '/media/proof/Response 6.png', label: 'Response from Pete (CEO)' },
      { _key: 'resp2', image: '/media/proof/Response 17.png', label: 'Response from Cartar Australia' },
      { _key: 'resp3', image: '/media/proof/Response 29.png', label: 'Response from Joe (Founder & CMO, MyFormData)' },
      { _key: 'resp4', image: '/media/proof/Response 37.png', label: 'Response from President of ELQ' },
      { _key: 'resp5', image: '/media/proof/Response 23.png', label: 'Positive Response' },
      { _key: 'resp6', image: '/media/proof/Response 25.png', label: 'Interested Response' },
    ],
    closingText: "These aren't cherry-picked examples. This is what happens when you use the right system.",
    closingHighlight: 'right system',
  },

  // Industry Proof - Works across industries
  industryProof: {
    badge: '🌍 WORKS ACROSS INDUSTRIES',
    heading: 'From SaaS to Fintech to Marketing Agencies',
    industries: [
      { _key: 'ind1', image: '/media/proof/saas.png', label: 'SaaS', color: 'emerald' },
      { _key: 'ind2', image: '/media/proof/Fintech.png', label: 'Fintech', color: 'cyan' },
      { _key: 'ind3', image: '/media/proof/marketing agency.png', label: 'Marketing', color: 'purple' },
      { _key: 'ind4', image: '/media/proof/enterprise saas.png', label: 'Enterprise', color: 'pink' },
    ],
  },

  // More Replies Proof - After testimonials
  moreRepliesProof: {
    label: 'More replies from decision makers...',
    images: [
      { _key: 'more1', image: '/media/proof/Response 12.png', alt: 'Response Screenshot' },
      { _key: 'more2', image: '/media/proof/Response 15.png', alt: 'Response Screenshot' },
      { _key: 'more3', image: '/media/proof/Response 18.png', alt: 'Response Screenshot' },
      { _key: 'more4', image: '/media/proof/Response 19.png', alt: 'Response Screenshot' },
    ],
  },

  // Student Dashboard Proof - Before pricing
  studentDashboardProof: {
    label: 'Campaign dashboards from students using our methods...',
    dashboards: [
      { _key: 'dash1', image: '/media/proof/Martech.png', alt: 'Martech Campaign' },
      { _key: 'dash2', image: '/media/proof/DAAS.png', alt: 'DAAS Campaign' },
    ],
  },

  // Before FAQ Proof - Response screenshots
  beforeFaqProof: {
    images: [
      { _key: 'bfaq1', image: '/media/proof/Response 28.png', alt: 'Response' },
      { _key: 'bfaq2', image: '/media/proof/Response 35.png', alt: 'Response' },
      { _key: 'bfaq3', image: '/media/proof/Response 42.png', alt: 'Response' },
      { _key: 'bfaq4', image: '/media/proof/Response 43.png', alt: 'Response' },
    ],
  },

  // Final Proof - Before final CTA
  finalProof: {
    badge: "💬 Still not convinced? Here's more proof...",
    images: [
      { _key: 'final1', image: '/media/proof/Ionyx.png', alt: 'Ionyx Campaign - Instantly Dashboard' },
      { _key: 'final2', image: '/media/proof/Kissmetrics.png', alt: 'Kissmetrics Campaign - Instantly Dashboard' },
    ],
  },

  // Lead Capture Popup
  leadPopup: {
    enabled: true,
    delaySeconds: 5,
    proofImage: '/media/proof/Ionyx.png',
    badge: '🔥 LIMITED TIME OFFER',
    headline: 'Wait! Before You Go...',
    subheadline: 'Get exclusive insights on cold email strategies that have generated $16.5M+ in pipeline. Enter your details below.',
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
    successMessage: "Check your email for next steps. We're excited to have you on this journey!",
  },
}

async function seedCourse() {
  console.log('🚀 Seeding Sales Course data to Sanity...')

  try {
    // Check if a sales course document already exists
    const existing = await client.fetch(`*[_type == "salesCourse"][0]._id`)

    if (existing) {
      // DO NOT override existing content - protect manual edits made in Sanity Studio
      console.log('⚠️  Sales Course document already exists!')
      console.log('ℹ️  Skipping to protect existing content.')
      console.log('ℹ️  To edit content, use Sanity Studio instead.')
      console.log('\n💡 If you really need to reset, delete the document in Sanity Studio first.')
      return
    }

    // Only create if no document exists
    console.log('📝 Creating new Sales Course document...')
    await client.create(salesCourseData)
    console.log('✅ Sales Course created successfully!')
    console.log('\n🎉 Done! Visit /course to see the changes.')
  } catch (error) {
    console.error('❌ Error seeding course:', error)
    process.exit(1)
  }
}

seedCourse()
