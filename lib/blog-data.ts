export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string | null
  author: string
  category: string
  image: string
  publishedAt: string
  readTime: string
  body?: any // Sanity Portable Text content (optional)
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: '5-cold-email-strategies-that-work',
    title: '5 Cold Email Strategies That Actually Generate Leads in 2024',
    excerpt: 'Discover the proven cold email tactics that consistently book meetings with decision-makers. No fluff, just strategies that work.',
    content: `
# 5 Cold Email Strategies That Actually Generate Leads in 2024

Cold email isn't dead—it's just evolved. While many companies struggle with low open rates and spam folders, our clients consistently achieve 60%+ open rates and book hundreds of qualified meetings.

Here's what actually works in 2024.

## 1. Hyper-Personalization Beyond First Names

Generic "Hi {{FirstName}}" emails don't cut it anymore. Real personalization means:

- Referencing specific company news or achievements
- Addressing actual pain points relevant to their role
- Demonstrating you've done your homework

**Example:** Instead of "I noticed your company is growing," try "Congratulations on your Series B announcement last month. Scaling from 50 to 150 employees typically creates lead gen bottlenecks—here's how we've helped similar companies..."

## 2. The 3-Second Rule for Subject Lines

Decision-makers scan their inbox in seconds. Your subject line needs to pass the instant relevance test.

**What works:**
- "Quick question about [Specific Company Initiative]"
- "Saw your post on [Platform] about [Topic]"
- "[Mutual Connection] suggested I reach out"

**What doesn't:**
- "Quick question" (too vague)
- "Partnership opportunity" (immediate delete)
- "RE: " or "FWD: " tricks (damages trust)

## 3. Problem-Solution-Proof Framework

Structure your emails to:
1. Acknowledge a specific problem they're facing
2. Hint at your solution (don't oversell)
3. Provide social proof (brief, relevant)

Keep it under 100 words. Yes, really.

## 4. Multi-Touch Sequences That Don't Annoy

The first email rarely converts. But 7 follow-ups aren't the answer either.

Our optimal sequence:
- Email 1: Value-first introduction
- Email 2 (Day 3): Additional insight or resource
- Email 3 (Day 7): Soft breakup email
- Email 4 (Day 14): Different angle or case study

Stop after 4 if no response. Your sender reputation matters more than one prospect.

## 5. Technical Excellence: Deliverability Fundamentals

All the copy in the world won't help if you're landing in spam.

**Essential technical setup:**
- SPF, DKIM, and DMARC records configured correctly
- Dedicated sending domains (not your main company domain)
- Gradual warmup (never send 1000 emails on day one)
- Monitor sender score and bounce rates religiously
- Use multiple domains for scale

## The Results Speak for Themselves

These strategies have helped our clients:
- Generate 10,000+ qualified leads
- Achieve average open rates of 67%
- Book 2,500+ sales meetings
- Add $15M+ to pipeline

## Ready to Implement These Strategies?

Cold email works when it's done right. The question isn't whether to use cold email—it's whether you're using proven strategies that actually work.

Want help implementing these tactics for your business? [Book a consultation](/case-studies) to discuss your specific situation.
    `,
    author: 'Mumbo Leads Team',
    category: 'Cold Email',
    image: '/media/B2B-Cold-Email-Agency.png',
    publishedAt: '2024-11-10',
    readTime: '8 min read'
  },
  {
    id: '2',
    slug: 'b2b-lead-generation-guide-2024',
    title: 'The Complete B2B Lead Generation Guide for 2024',
    excerpt: 'Everything you need to know about generating high-quality B2B leads, from targeting to conversion. A comprehensive playbook.',
    content: `
# The Complete B2B Lead Generation Guide for 2024

B2B lead generation has fundamentally changed. The tactics that worked in 2020 are leaving money on the table in 2024.

This guide covers everything we've learned generating 10,000+ qualified leads for B2B companies.

## Part 1: Understanding Modern B2B Buyers

Today's B2B buyers are:
- More informed (they've done research before you reach out)
- More skeptical (they've been burned by bad vendors)
- More demanding (they expect personalization and relevance)

**The implication:** Generic spray-and-pray doesn't work. You need targeted, relevant outreach.

## Part 2: Building Your ICP (Ideal Customer Profile)

Before sending a single email, get crystal clear on:

### Company Characteristics
- Industry and sub-industry
- Company size (revenue and employees)
- Growth stage (startup, growth, enterprise)
- Tech stack (what tools they use)
- Recent company news (funding, leadership changes, expansion)

### Decision Maker Profile
- Exact job titles
- Seniority level
- Department
- Likely pain points
- Budget authority

**Pro tip:** Start narrow. Better to perfectly target 100 companies than poorly target 1,000.

## Part 3: The Multi-Channel Approach

Cold email shouldn't exist in isolation. Layer your approach:

### Primary Channel: Email
- Highest ROI for B2B
- Scalable and measurable
- Direct access to decision-makers

### Supporting Channels:
- **LinkedIn:** Warm up prospects before email
- **Phone:** Follow-up high-value prospects
- **Direct Mail:** Stand out with high-value accounts
- **Retargeting Ads:** Stay top-of-mind with engaged prospects

## Part 4: Creating Compelling Messaging

Your messaging should answer three questions:

1. **Why you?** (What makes you different)
2. **Why now?** (Why should they care today)
3. **Why trust you?** (Social proof and credibility)

### Messaging Framework:

**Hook:** Relevant insight or problem statement
**Value Prop:** What you help with (not what you sell)
**Proof:** Brief, specific results
**CTA:** Low-friction next step

## Part 5: Technical Infrastructure

The backend matters as much as the frontend.

### Essential Tools:
- **CRM:** Salesforce, HubSpot, or Pipedrive
- **Email Platform:** Dedicated cold email tool (not your regular ESP)
- **Data Provider:** For contact discovery
- **Deliverability Monitoring:** Track sender reputation

### Critical Setup:
- Multiple sending domains
- Proper authentication (SPF, DKIM, DMARC)
- Gradual warmup schedule
- Bounce handling automation

## Part 6: Measuring What Matters

Vanity metrics don't pay the bills. Track:

### Email Metrics:
- **Open Rate:** Target 50%+
- **Reply Rate:** Target 10%+
- **Positive Reply Rate:** Target 3-5%

### Business Metrics:
- **Meetings Booked:** Actual calendar events
- **SQLs Generated:** Qualified opportunities
- **Pipeline Added:** Dollar value created
- **Cost Per Lead:** Total spend / SQLs
- **ROI:** Revenue / Investment

## Part 7: Scaling What Works

Once you've proven the model at small scale:

1. **Expand ICP:** Add similar segments
2. **Increase Volume:** More sending domains
3. **Test Variables:** Subject lines, copy, CTAs
4. **Optimize:** Double down on what converts

**Important:** Scale gradually. Growing too fast tanks deliverability.

## Part 8: Common Pitfalls to Avoid

### Don't:
- Buy email lists (terrible deliverability)
- Send from your main domain (protect your brand)
- Ignore technical setup (infrastructure matters)
- Over-automate (lose the personal touch)
- Skip testing (test everything)

### Do:
- Start small and prove the model
- Invest in quality data
- Monitor deliverability obsessively
- Keep messaging relevant
- Follow up consistently

## The Bottom Line

B2B lead generation works when you:
1. Target precisely
2. Message relevantly
3. Execute technically
4. Measure relentlessly
5. Scale gradually

## Need Help?

Implementing a full B2B lead gen program takes time, expertise, and resources. That's where we come in.

We've generated 10,000+ leads for B2B companies using these exact strategies.

[View our case studies](/case-studies) or [book a consultation](/#book-call) to discuss your specific needs.
    `,
    author: 'Mumbo Leads Team',
    category: 'Lead Generation',
    image: '/media/FeaturedIcon1.webp',
    publishedAt: '2024-11-15',
    readTime: '12 min read'
  }
]

export function getBlogPosts() {
  return blogPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}
