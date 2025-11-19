import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to create this
})

async function populateSanity() {
  console.log('🚀 Starting Sanity population...\n')

  try {
    // 1. Create Homepage
    console.log('📄 Creating Homepage...')
    const homepage = await client.createOrReplace({
      _type: 'homepage',
      _id: 'homepage',
      hero: {
        headline: 'Fill your calendar with more ',
        highlightedText: 'sales-qualified leads',
        subheadline: 'We help your business focus on what really matters:',
        bulletPoints: [
          {
            _key: 'bullet-1',
            title: "Hit your ICP's needs",
            description: 'without breaking the bank.'
          },
          {
            _key: 'bullet-2',
            title: 'Boost profitability',
            description: 'month-to-month spending your time closing deals.'
          }
        ],
        ctaText: 'Book a Call'
      },
      stats: [
        {
          _key: 'stat-1',
          metric: '+19 B2B',
          description: 'leads booked for a financing agency in 2 weeks',
          bgColor: 'bg-green-100'
        },
        {
          _key: 'stat-2',
          metric: '2k+',
          description: 'Took a B2B financing agency from 20 qualified leads per month with a consistent outbound engine',
          bgColor: 'bg-blue-100'
        },
        {
          _key: 'stat-3',
          metric: '$1.7M',
          description: 'added in pipeline with one tailored sequence for SEO agency',
          bgColor: 'bg-green-100'
        },
        {
          _key: 'stat-4',
          metric: '25+',
          description: 'Booked 25 podcast guest spots per month for an SEO agency turning them into pipeline',
          bgColor: 'bg-purple-100'
        }
      ],
      help: {
        heading: 'Still wondering how we can help you? Well, let\'s see...',
        subheading: 'We generated 3,000 B2B calls for a gaming and esports organization by the Top 3 business development metrics. But how? Email leads when it\'s done right can cut this networking it right:',
        steps: [
          'You have to reach to the primary inbox.',
          'It has to be the right email for a double-header at the right organization.',
          'The prospect needs to feel a reply.'
        ]
      },
      seo: {
        metaTitle: 'Mumbo LEADS - B2B Lead Generation & Cold Email Agency',
        metaDescription: 'Fill your calendar with sales-qualified leads. Expert B2B cold email campaigns that generate results. Tech-driven delivery, laser-targeted prospecting, and copy that converts.',
        metaKeywords: ['B2B lead generation', 'cold email agency', 'sales qualified leads', 'outbound marketing', 'email marketing']
      }
    })
    console.log('✅ Homepage created\n')

    // 2. Create FAQs
    console.log('❓ Creating FAQs...')
    const faqs = [
      {
        question: 'What makes Mumbo LEADS different from other lead gen agencies?',
        answer: 'We focus on quality over quantity, using a tech-driven approach combined with deep market research to ensure every lead is qualified and matches your ICP perfectly. Our proprietary targeting system and proven delivery methods set us apart.',
        order: 1
      },
      {
        question: 'How many B2B leads will I get?',
        answer: 'The number of leads varies based on your industry, target market, and campaign specifics. We focus on qualified conversations and booked meetings rather than just raw numbers. Most clients see significant pipeline growth within the first 2-4 weeks.',
        order: 2
      },
      {
        question: 'Will my emails land in spam?',
        answer: 'We\'ve invested years and significant resources into mastering email deliverability. Our tech-driven delivery engineering ensures your messages reach the primary inbox, not spam. We use proven methods and constantly monitor deliverability metrics.',
        order: 3
      },
      {
        question: 'Who handles copy and targeting?',
        answer: 'Our expert team handles all copywriting and targeting. We use a proven framework based on hundreds of successful campaigns, combined with deep research into your specific market and ICP to create messaging that resonates and converts.',
        order: 4
      },
      {
        question: 'What happens if I want to pause or cancel?',
        answer: 'We offer flexible engagement options. You can pause or cancel your campaign with proper notice. We believe in earning your business every month through results, not locking you into long-term contracts.',
        order: 5
      },
      {
        question: 'How long before I see results?',
        answer: 'Most clients start seeing qualified conversations and booked meetings within 2-4 weeks of campaign launch. We optimize weekly to improve results, and campaigns typically hit their stride by month 2-3.',
        order: 6
      },
      {
        question: 'Why wouldn\'t I just hire a full-time SDR?',
        answer: 'A full-time SDR costs $60k+ per year plus benefits, training, tools, and management time. With Mumbo LEADS, you get an entire team of experts, proven systems, and technology for a fraction of the cost, with faster results and no hiring risk.',
        order: 7
      }
    ]

    for (let i = 0; i < faqs.length; i++) {
      await client.createOrReplace({
        _type: 'faq',
        _id: `faq-${i + 1}`,
        ...faqs[i]
      })
    }
    console.log('✅ 7 FAQs created\n')

    // 3. Create How It Works Steps
    console.log('🔄 Creating How It Works steps...')
    const howItWorksSteps = [
      {
        title: 'Get - Prepared - Head',
        description: 'We hop on a quick call, walk you through, send you an onboarding form. We\'ll make sure we have all the infrastructure ready to go.',
        icon: 'FileCheck',
        order: 1
      },
      {
        title: 'Kickoff Call - Idea Phase',
        description: 'We run a 30min strategy call then reach our 30-min building your strategy and campaigns.',
        icon: 'MessageSquare',
        order: 2
      },
      {
        title: 'Campaign Launch',
        description: 'Once results after kickoff your campaign go live. We hit the inbox start sending and generate conversions.',
        icon: 'Search',
        order: 3
      },
      {
        title: 'Scale - Repeat',
        description: 'Every week we tweak better targeting, message messaging, and send volumes to optimize even better results.',
        icon: 'Repeat',
        order: 4
      }
    ]

    for (let i = 0; i < howItWorksSteps.length; i++) {
      await client.createOrReplace({
        _type: 'howItWorks',
        _id: `howItWorks-${i + 1}`,
        ...howItWorksSteps[i]
      })
    }
    console.log('✅ 4 How It Works steps created\n')

    // 4. Create Site Settings
    console.log('⚙️ Creating Site Settings...')
    await client.createOrReplace({
      _type: 'settings',
      _id: 'settings',
      siteName: 'Mumbo LEADS',
      tagline: 'B2B Cold Email Agency for Busy Companies',
      footer: {
        description: 'B2B Cold Email Agency\nfor Busy Companies',
        email: 'info@nerdyjoe.com',
        addresses: [
          {
            line1: '7921H1 Lancaster Ave',
            line2: 'Wayne, Munich, PA'
          },
          {
            line1: '1382 Lexington Avenue',
            line2: 'New York'
          }
        ]
      },
      defaultSeo: {
        metaTitle: 'Mumbo LEADS - B2B Lead Generation & Cold Email Agency',
        metaDescription: 'Fill your calendar with sales-qualified leads through expert cold email campaigns.',
        metaKeywords: ['B2B lead generation', 'cold email', 'sales qualified leads']
      }
    })
    console.log('✅ Site Settings created\n')

    // 5. Create Blog Posts
    console.log('📝 Creating Blog Posts...')
    const blogPosts = [
      {
        _type: 'post',
        title: '5 Cold Email Strategies That Actually Generate Leads in 2024',
        slug: { current: '5-cold-email-strategies-2024' },
        author: 'Mumbo LEADS Team',
        excerpt: 'Discover the proven cold email strategies that top B2B companies use to fill their pipeline with qualified leads. Learn what works in 2024 and beyond.',
        categories: ['Lead Generation', 'Cold Email'],
        publishedAt: '2024-01-15T10:00:00Z',
        readTime: '8 min read',
        body: [
          {
            _key: 'block-1',
            _type: 'block',
            style: 'normal',
            children: [{ _key: 'span-1', _type: 'span', text: 'Cold email remains one of the most effective channels for B2B lead generation, but only when done right. In this comprehensive guide, we\'ll share the exact strategies our agency uses to generate thousands of qualified leads for our clients.' }]
          },
          {
            _key: 'block-2',
            _type: 'block',
            style: 'h2',
            children: [{ _key: 'span-2', _type: 'span', text: '1. Hyper-Personalization at Scale' }]
          },
          {
            _key: 'block-3',
            _type: 'block',
            style: 'normal',
            children: [{ _key: 'span-3', _type: 'span', text: 'Generic emails don\'t work anymore. Today\'s prospects expect personalization that shows you\'ve done your research. Use variables beyond just first name - reference their company\'s recent achievements, challenges in their industry, or specific pain points.' }]
          },
          {
            _key: 'block-4',
            _type: 'block',
            style: 'h2',
            children: [{ _key: 'span-4', _type: 'span', text: '2. Multi-Touch Sequences' }]
          },
          {
            _key: 'block-5',
            _type: 'block',
            style: 'normal',
            children: [{ _key: 'span-5', _type: 'span', text: 'A single email rarely converts. Build sequences of 5-7 emails spaced 2-3 days apart. Each email should provide value and have a clear, single call-to-action. Our data shows the 3rd and 4th emails often get the best response rates.' }]
          }
        ],
        seo: {
          metaTitle: '5 Cold Email Strategies That Generate Leads in 2024',
          metaDescription: 'Proven cold email strategies used by top B2B companies to fill their pipeline with qualified leads.',
          metaKeywords: ['cold email strategies', 'B2B lead generation', 'email marketing 2024']
        }
      },
      {
        _type: 'post',
        title: 'The Complete B2B Lead Generation Guide for 2024',
        slug: { current: 'b2b-lead-generation-guide-2024' },
        author: 'Mumbo LEADS Team',
        excerpt: 'A comprehensive guide to B2B lead generation in 2024. From strategy to execution, learn how to build a predictable pipeline of qualified leads.',
        categories: ['Lead Generation', 'Strategy'],
        publishedAt: '2024-01-10T10:00:00Z',
        readTime: '12 min read',
        body: [
          {
            _key: 'block-p1',
            _type: 'block',
            style: 'normal',
            children: [{ _key: 'span-p1', _type: 'span', text: 'B2B lead generation has evolved dramatically. What worked five years ago doesn\'t work today. In this complete guide, we\'ll walk you through building a modern lead generation system that delivers consistent, qualified leads.' }]
          },
          {
            _key: 'block-p2',
            _type: 'block',
            style: 'h2',
            children: [{ _key: 'span-p2', _type: 'span', text: 'Understanding Your ICP' }]
          },
          {
            _key: 'block-p3',
            _type: 'block',
            style: 'normal',
            children: [{ _key: 'span-p3', _type: 'span', text: 'Everything starts with a crystal-clear Ideal Customer Profile (ICP). Not just demographics, but psychographics - what keeps them up at night, what they value, how they make decisions. Spend time here; it pays off exponentially.' }]
          }
        ],
        seo: {
          metaTitle: 'Complete B2B Lead Generation Guide 2024',
          metaDescription: 'Build a predictable pipeline of qualified B2B leads. Complete strategy guide from targeting to conversion.',
          metaKeywords: ['B2B lead generation', 'lead generation guide', 'sales pipeline']
        }
      }
    ]

    for (let i = 0; i < blogPosts.length; i++) {
      await client.createOrReplace({
        ...blogPosts[i],
        _id: `post-${i + 1}`
      })
    }
    console.log('✅ 2 Blog posts created\n')

    // 6. Create Case Studies
    console.log('📊 Creating Case Studies...')
    const caseStudies = [
      {
        _type: 'caseStudy',
        title: 'How FinanceFlow Inc. Generated 1,247 Qualified Leads in 90 Days',
        slug: { current: 'financeflow-1247-leads' },
        client: 'FinanceFlow Inc.',
        industry: 'B2B Finance',
        challenge: 'FinanceFlow Inc., a B2B financing platform, was struggling to generate consistent qualified leads. Their existing marketing efforts were producing high volumes but low conversion rates. They needed a systematic approach to reach decision-makers at target companies and book qualified sales calls.',
        solution: 'We implemented a multi-channel outbound strategy focused on their ideal customer profile: CFOs and Finance Directors at mid-market companies. Our approach included hyper-personalized cold email sequences, strategic LinkedIn outreach, and targeted content. We developed 3 distinct messaging frameworks tailored to different industry verticals within their ICP.',
        results: [
          { _key: 'result-1', metric: 'Qualified Leads', value: '1,247' },
          { _key: 'result-2', metric: 'Pipeline Generated', value: '$2.4M' },
          { _key: 'result-3', metric: 'Email Open Rate', value: '67%' },
          { _key: 'result-4', metric: 'Response Rate', value: '23%' },
          { _key: 'result-5', metric: 'Meetings Booked', value: '156' },
          { _key: 'result-6', metric: 'Cost per Lead', value: '$47' }
        ],
        testimonial: {
          quote: 'The Mumbo LEADS team completely transformed our outbound process. We went from sporadic leads to a predictable pipeline. The quality of leads is exceptional - these are exactly the decision-makers we need to talk to.',
          author: 'Michael Chen',
          position: 'VP of Sales, FinanceFlow Inc.'
        },
        publishedAt: '2024-01-20T10:00:00Z',
        seo: {
          metaTitle: 'Case Study: 1,247 Qualified Leads in 90 Days - FinanceFlow Inc.',
          metaDescription: 'See how we helped FinanceFlow Inc. generate $2.4M in pipeline through strategic cold email campaigns.',
          metaKeywords: ['B2B lead generation case study', 'cold email results', 'finance leads']
        }
      },
      {
        _type: 'caseStudy',
        title: 'RankBoost Digital: $1.7M Pipeline in 90 Days Through Cold Email',
        slug: { current: 'rankboost-digital-pipeline' },
        client: 'RankBoost Digital',
        industry: 'SEO Agency',
        challenge: 'RankBoost Digital, an SEO agency serving e-commerce brands, had plateaued at $50K monthly recurring revenue. Their inbound marketing was inconsistent, and they lacked a systematic outbound process. They needed to scale their client acquisition to reach their $200K MRR goal.',
        solution: 'We built a targeted outbound engine focused on e-commerce directors at companies doing $5M-50M in annual revenue. Our strategy combined personalized cold email with strategic podcast guest placements to build authority. We created case study-driven email sequences showcasing their ROI with similar clients.',
        results: [
          { _key: 'result-r1', metric: 'Pipeline Generated', value: '$1.7M' },
          { _key: 'result-r2', metric: 'Qualified Meetings', value: '89' },
          { _key: 'result-r3', metric: 'New Clients', value: '12' },
          { _key: 'result-r4', metric: 'Email Response Rate', value: '31%' },
          { _key: 'result-r5', metric: 'Podcast Placements', value: '25/month' },
          { _key: 'result-r6', metric: 'MRR Growth', value: '+$78K' }
        ],
        testimonial: {
          quote: 'Working with Mumbo LEADS was a game-changer. They did not just send cold emails - they built us a complete outbound system. The podcast placement strategy alone has been worth 10x our investment.',
          author: 'Sarah Martinez',
          position: 'Founder, RankBoost Digital'
        },
        publishedAt: '2024-01-18T10:00:00Z',
        seo: {
          metaTitle: 'Case Study: $1.7M Pipeline for SEO Agency - RankBoost Digital',
          metaDescription: 'How we helped RankBoost Digital scale from $50K to $128K MRR using strategic cold email and podcast placements.',
          metaKeywords: ['SEO agency lead generation', 'cold email case study', 'agency growth']
        }
      }
    ]

    for (let i = 0; i < caseStudies.length; i++) {
      await client.createOrReplace({
        ...caseStudies[i],
        _id: `caseStudy-${i + 1}`
      })
    }
    console.log('✅ 2 Case studies created\n')

    console.log('🎉 Sanity population complete!\n')
    console.log('📋 Summary:')
    console.log('  - 1 Homepage document')
    console.log('  - 7 FAQ items')
    console.log('  - 4 How It Works steps')
    console.log('  - 1 Site Settings document')
    console.log('  - 2 Blog posts')
    console.log('  - 2 Case studies')
    console.log('\n✨ Your Sanity CMS is now fully populated!')
    console.log('🌐 Visit http://localhost:3002 to see your content')
    console.log('🎨 Visit http://localhost:3002/studio to edit content\n')

  } catch (error) {
    console.error('❌ Error populating Sanity:', error)
    throw error
  }
}

// Run the population
populateSanity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
