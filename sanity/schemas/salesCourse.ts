import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'salesCourse',
  title: 'Sales Course Landing Page',
  type: 'document',
  fields: [
    // ==========================================
    // URGENCY SETTINGS
    // ==========================================
    defineField({
      name: 'urgency',
      title: 'Urgency Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Urgency Bar',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'message',
          title: 'Urgency Message',
          type: 'string',
          initialValue: 'SPECIAL LAUNCH PRICING ENDS IN:',
        }),
        defineField({
          name: 'spotsLeft',
          title: 'Spots Left Count',
          type: 'number',
          initialValue: 7,
        }),
        defineField({
          name: 'spotsMessage',
          title: 'Spots Message',
          type: 'string',
          initialValue: 'Only {spots} spots left!',
          description: 'Use {spots} as placeholder for the count',
        }),
        defineField({
          name: 'timerHours',
          title: 'Timer Hours',
          type: 'number',
          initialValue: 23,
        }),
        defineField({
          name: 'timerMinutes',
          title: 'Timer Minutes',
          type: 'number',
          initialValue: 47,
        }),
      ],
    }),

    // ==========================================
    // HERO SECTION
    // ==========================================
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: "FROM THE EXPERT WHO'S GENERATED R300M+ IN SALES PIPELINE",
        }),
        defineField({
          name: 'headlinePart1',
          title: 'Headline Part 1',
          type: 'string',
          initialValue: 'Turn Cold Strangers Into',
        }),
        defineField({
          name: 'headlineHighlight',
          title: 'Headline Highlight (Gradient)',
          type: 'string',
          initialValue: 'Paying Clients',
        }),
        defineField({
          name: 'headlinePart2',
          title: 'Headline Part 2',
          type: 'string',
          initialValue: 'With One Email',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          initialValue: 'The exact cold email system that\'s generated $16.5M+ in sales pipeline for B2B businesses worldwide. Now available to you.',
        }),
        defineField({
          name: 'pipelineHighlight',
          title: 'Pipeline Amount to Highlight',
          type: 'string',
          initialValue: '$16.5M+ in sales pipeline',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'GET INSTANT ACCESS',
        }),
        defineField({
          name: 'ctaPrice',
          title: 'CTA Price Display',
          type: 'string',
          initialValue: 'R1,999',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL (Payment Link)',
          type: 'url',
          description: 'External payment link',
        }),
        defineField({
          name: 'guarantee',
          title: 'Guarantee Text',
          type: 'string',
          initialValue: '30-Day Money-Back Guarantee',
        }),
        defineField({
          name: 'features',
          title: 'Feature List',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['8 Comprehensive Modules', 'Certificate Included', 'Lifetime Access'],
        }),
      ],
    }),

    // ==========================================
    // SOCIAL PROOF STATS
    // ==========================================
    defineField({
      name: 'socialProof',
      title: 'Social Proof Stats Bar',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Stat Value', type: 'string' }),
          defineField({ name: 'label', title: 'Stat Label', type: 'string' }),
        ],
        preview: {
          select: { title: 'value', subtitle: 'label' },
        },
      }],
      validation: (Rule) => Rule.max(4),
    }),

    // ==========================================
    // PROBLEM SECTION
    // ==========================================
    defineField({
      name: 'problem',
      title: 'Problem Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Sound Familiar?',
        }),
        defineField({
          name: 'painPoints',
          title: 'Pain Points',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'transitionHeading',
          title: 'Transition Heading',
          type: 'string',
          initialValue: 'What If I Told You...',
        }),
        defineField({
          name: 'transitionText',
          title: 'Transition Text',
          type: 'text',
          rows: 2,
          initialValue: "Cold email isn't dead. It's more powerful than ever. But 99% of people are doing it completely wrong.",
        }),
        defineField({
          name: 'transitionHighlight',
          title: 'Text to Highlight',
          type: 'string',
          initialValue: "It's more powerful than ever.",
        }),
      ],
    }),

    // ==========================================
    // SOLUTION SECTION
    // ==========================================
    defineField({
      name: 'solution',
      title: 'Solution Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'INTRODUCING',
        }),
        defineField({
          name: 'headingPart1',
          title: 'Heading Part 1',
          type: 'string',
          initialValue: 'Grow Your B2B Business',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Gradient)',
          type: 'string',
          initialValue: 'Using Cold Email',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: "The complete A-Z system for landing high-ticket clients through cold email. From infrastructure to inbox management, this is EVERYTHING you need.",
        }),
        defineField({
          name: 'benefits',
          title: 'Benefit Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'emoji', title: 'Emoji Icon', type: 'string' }),
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
              defineField({
                name: 'colorScheme',
                title: 'Color Scheme',
                type: 'string',
                options: {
                  list: [
                    { title: 'Emerald', value: 'emerald' },
                    { title: 'Cyan', value: 'cyan' },
                    { title: 'Purple', value: 'purple' },
                  ],
                },
                initialValue: 'emerald',
              }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'emoji' },
            },
          }],
          validation: (Rule) => Rule.max(3),
        }),
      ],
    }),

    // ==========================================
    // COURSE MODULES
    // ==========================================
    defineField({
      name: 'modules',
      title: 'Course Modules',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Everything You Need to Master Cold Email',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          initialValue: '8 comprehensive modules • 19+ lessons • Actionable templates',
        }),
        defineField({
          name: 'moduleList',
          title: 'Modules',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'number', title: 'Module Number', type: 'string' }),
              defineField({ name: 'title', title: 'Module Title', type: 'string' }),
              defineField({
                name: 'items',
                title: 'Curriculum Items',
                type: 'array',
                of: [{ type: 'string' }],
              }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'number' },
              prepare({ title, subtitle }) {
                return { title: `${subtitle}. ${title}` }
              },
            },
          }],
        }),
      ],
    }),

    // ==========================================
    // TESTIMONIALS
    // ==========================================
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Real Results From Real Students',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          initialValue: "Join hundreds who've transformed their business with cold email",
        }),
        defineField({
          name: 'items',
          title: 'Testimonial Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'name', title: 'Name', type: 'string' }),
              defineField({ name: 'role', title: 'Role & Location', type: 'string' }),
              defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
              defineField({ name: 'revenue', title: 'Revenue Amount', type: 'string' }),
            ],
            preview: {
              select: { title: 'name', subtitle: 'revenue' },
            },
          }],
        }),
      ],
    }),

    // ==========================================
    // INSTRUCTOR
    // ==========================================
    defineField({
      name: 'instructor',
      title: 'Instructor Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'YOUR INSTRUCTOR' }),
        defineField({ name: 'name', title: 'Name', type: 'string', initialValue: 'Hopewell Mkhize' }),
        defineField({ name: 'initials', title: 'Initials (for avatar)', type: 'string', initialValue: 'HM' }),
        defineField({ name: 'title', title: 'Title/Role', type: 'string', initialValue: 'Managing Director @ Mumbo Education' }),
        defineField({ name: 'bio', title: 'Bio Paragraph 1', type: 'text', rows: 3 }),
        defineField({ name: 'bioHighlight', title: 'Bio Paragraph 2 (with highlight)', type: 'text', rows: 3 }),
        defineField({ name: 'highlightText', title: 'Highlighted Amount in Bio', type: 'string', initialValue: '$16.5M in sales pipeline' }),
        defineField({
          name: 'stats',
          title: 'Instructor Stats',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'value', title: 'Value', type: 'string' }),
              defineField({ name: 'label', title: 'Label', type: 'string' }),
            ],
          }],
          validation: (Rule) => Rule.max(3),
        }),
      ],
    }),

    // ==========================================
    // PRICING
    // ==========================================
    defineField({
      name: 'pricing',
      title: 'Pricing Section',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Top Badge', type: 'string', initialValue: 'LAUNCH SPECIAL - LIMITED TIME ONLY' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Get Everything Today' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'Complete cold email mastery at a fraction of the cost' }),
        defineField({
          name: 'valueStack',
          title: 'Value Stack Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'item', title: 'Item Name', type: 'string' }),
              defineField({ name: 'value', title: 'Value (crossed out)', type: 'string' }),
            ],
          }],
        }),
        defineField({ name: 'totalValue', title: 'Total Value', type: 'string', initialValue: 'R21,500' }),
        defineField({ name: 'salePrice', title: 'Sale Price', type: 'string', initialValue: 'R1,999' }),
        defineField({ name: 'savingsText', title: 'Savings Text', type: 'string', initialValue: 'Save over R19,000 today!' }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'ENROLL NOW & START TODAY' }),
        defineField({ name: 'ctaUrl', title: 'CTA URL (Payment Link)', type: 'url' }),
        defineField({
          name: 'trustBadges',
          title: 'Trust Badges',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Instant Access', '30-Day Guarantee', 'Secure Payment'],
        }),
      ],
    }),

    // ==========================================
    // USE CASES
    // ==========================================
    defineField({
      name: 'useCases',
      title: 'Use Cases Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Cold Email Works For...' }),
        defineField({
          name: 'items',
          title: 'Use Case Items',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    // ==========================================
    // FAQ
    // ==========================================
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Frequently Asked Questions' }),
        defineField({
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'question', title: 'Question', type: 'string' }),
              defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
            ],
            preview: {
              select: { title: 'question' },
            },
          }],
        }),
      ],
    }),

    // ==========================================
    // FINAL CTA
    // ==========================================
    defineField({
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'This Time Next Month...' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, initialValue: 'You could be closing deals from cold email campaigns that run on autopilot. Or you could still be waiting for leads to magically appear.' }),
        defineField({ name: 'closingLine', title: 'Closing Line', type: 'string', initialValue: 'The choice is yours.' }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'START CLOSING DEALS' }),
        defineField({ name: 'ctaPrice', title: 'CTA Price', type: 'string', initialValue: 'R1,999' }),
        defineField({ name: 'ctaUrl', title: 'CTA URL (Payment Link)', type: 'url' }),
        defineField({ name: 'socialProof', title: 'Social Proof Text', type: 'string', initialValue: "Join 500+ students who've already transformed their businesses" }),
      ],
    }),

    // ==========================================
    // FOOTER
    // ==========================================
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({ name: 'companyName', title: 'Company Name', type: 'string', initialValue: 'Mumbo Education' }),
        defineField({ name: 'year', title: 'Year', type: 'string', initialValue: '2025' }),
        defineField({ name: 'disclaimer', title: 'Disclaimer Text', type: 'text', rows: 2, initialValue: 'This course is for educational purposes. Results vary based on effort and market conditions.' }),
      ],
    }),

    // ==========================================
    // SEO & SOCIAL SHARING
    // ==========================================
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'object',
      description: 'Settings for search engines and social media sharing (Facebook, Twitter, LinkedIn, WhatsApp)',
      fields: [
        // Basic SEO
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          initialValue: 'Cold Email Mastery Course | Grow Your B2B Business',
          description: 'Recommended: 50-60 characters',
          validation: (Rule) => Rule.max(70).warning('Keep under 70 characters for best SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          initialValue: 'Learn the exact cold email system that has generated $16.5M+ in sales pipeline. 8 modules, lifetime access, certificate included.',
          description: 'Recommended: 150-160 characters',
          validation: (Rule) => Rule.max(170).warning('Keep under 170 characters for best SEO'),
        }),
        defineField({
          name: 'metaKeywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO keywords for the page',
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Full URL of this page (e.g., https://yourdomain.com/course)',
        }),

        // Open Graph (Facebook, LinkedIn, WhatsApp)
        defineField({
          name: 'ogTitle',
          title: 'Social Share Title',
          type: 'string',
          description: 'Title shown when shared on Facebook, LinkedIn, WhatsApp. Falls back to Meta Title if empty.',
        }),
        defineField({
          name: 'ogDescription',
          title: 'Social Share Description',
          type: 'text',
          rows: 2,
          description: 'Description shown when shared. Falls back to Meta Description if empty.',
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image (OG Image)',
          type: 'image',
          description: 'Recommended size: 1200x630px. This image appears when shared on Facebook, LinkedIn, WhatsApp, etc.',
          options: {
            accept: 'image/*',
          },
        }),

        // Twitter Card
        defineField({
          name: 'twitterCard',
          title: 'Twitter Card Type',
          type: 'string',
          options: {
            list: [
              { title: 'Summary with Large Image (Recommended)', value: 'summary_large_image' },
              { title: 'Summary', value: 'summary' },
            ],
          },
          initialValue: 'summary_large_image',
        }),
        defineField({
          name: 'twitterTitle',
          title: 'Twitter Title',
          type: 'string',
          description: 'Title for Twitter cards. Falls back to OG Title if empty.',
        }),
        defineField({
          name: 'twitterDescription',
          title: 'Twitter Description',
          type: 'text',
          rows: 2,
          description: 'Description for Twitter. Falls back to OG Description if empty.',
        }),
        defineField({
          name: 'twitterImage',
          title: 'Twitter Image',
          type: 'image',
          description: 'Image for Twitter cards. Falls back to OG Image if empty. Recommended: 1200x600px.',
        }),
        defineField({
          name: 'twitterCreator',
          title: 'Twitter Creator Handle',
          type: 'string',
          description: 'Twitter handle (e.g., @yourusername)',
        }),

        // Additional SEO
        defineField({
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          initialValue: false,
          description: 'Enable to prevent this page from appearing in search results',
        }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Hero Campaign Result
    // ==========================================
    defineField({
      name: 'heroProof',
      title: 'Hero Proof Section',
      type: 'object',
      description: 'Main campaign result displayed below hero',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Real Campaign Results' }),
        defineField({ name: 'image', title: 'Campaign Screenshot', type: 'string', description: 'Image path e.g. /media/proof/xxx.png' }),
        defineField({ name: 'caption', title: 'Caption Text', type: 'string', initialValue: '49.2K emails sent → 93 opportunities → $651,000 in pipeline' }),
        defineField({ name: 'captionHighlight', title: 'Highlighted Part of Caption', type: 'string', initialValue: '$651,000 in pipeline' }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Dashboard Screenshots
    // ==========================================
    defineField({
      name: 'dashboardProof',
      title: 'Dashboard Proof Section',
      type: 'object',
      description: 'Campaign dashboard screenshots with stats',
      fields: [
        defineField({ name: 'badge', title: 'Section Badge', type: 'string', initialValue: '📊 REAL PROOF FROM REAL CAMPAIGNS' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'These Results Speak for Themselves' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'Actual dashboard screenshots from live campaigns' }),
        defineField({
          name: 'featuredCampaigns',
          title: 'Featured Campaigns (Large)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'title', title: 'Campaign Title', type: 'string' }),
              defineField({ name: 'stats', title: 'Stats Line', type: 'string' }),
              defineField({ name: 'revenue', title: 'Revenue Amount', type: 'string' }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'revenue' },
            },
          }],
          validation: (Rule) => Rule.max(2),
        }),
        defineField({
          name: 'smallCampaigns',
          title: 'Small Dashboard Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'title', title: 'Card Title', type: 'string' }),
              defineField({ name: 'subtitle', title: 'Card Subtitle', type: 'string' }),
            ],
            preview: {
              select: { title: 'title' },
            },
          }],
          validation: (Rule) => Rule.max(2),
        }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Client Responses
    // ==========================================
    defineField({
      name: 'responseProof',
      title: 'Client Response Screenshots',
      type: 'object',
      description: 'Email response screenshots from prospects',
      fields: [
        defineField({ name: 'badge', title: 'Section Badge', type: 'string', initialValue: '📬 ACTUAL INBOX SCREENSHOTS' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'CEOs & Founders Actually Reply' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string', initialValue: 'These are real responses from cold email campaigns' }),
        defineField({
          name: 'responses',
          title: 'Response Screenshots',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'label', title: 'Response Label', type: 'string', description: 'e.g. Response from Pete (CEO)' }),
            ],
            preview: {
              select: { title: 'label' },
            },
          }],
        }),
        defineField({ name: 'closingText', title: 'Closing Text', type: 'string', initialValue: "These aren't cherry-picked examples. This is what happens when you use the right system." }),
        defineField({ name: 'closingHighlight', title: 'Highlighted Text', type: 'string', initialValue: 'right system' }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Industry Diversity
    // ==========================================
    defineField({
      name: 'industryProof',
      title: 'Industry Proof Section',
      type: 'object',
      description: 'Shows campaigns work across industries',
      fields: [
        defineField({ name: 'badge', title: 'Section Badge', type: 'string', initialValue: '🌍 WORKS ACROSS INDUSTRIES' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'From SaaS to Fintech to Marketing Agencies' }),
        defineField({
          name: 'industries',
          title: 'Industry Screenshots',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'label', title: 'Industry Label', type: 'string' }),
              defineField({
                name: 'color',
                title: 'Label Color',
                type: 'string',
                options: {
                  list: [
                    { title: 'Emerald', value: 'emerald' },
                    { title: 'Cyan', value: 'cyan' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Pink', value: 'pink' },
                  ],
                },
                initialValue: 'emerald',
              }),
            ],
            preview: {
              select: { title: 'label' },
            },
          }],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - More Decision Maker Replies
    // ==========================================
    defineField({
      name: 'moreRepliesProof',
      title: 'More Replies Section',
      type: 'object',
      description: 'Additional response screenshots after testimonials',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'More replies from decision makers...' }),
        defineField({
          name: 'images',
          title: 'Response Images',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
          }],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Student Dashboards
    // ==========================================
    defineField({
      name: 'studentDashboardProof',
      title: 'Student Dashboards Section',
      type: 'object',
      description: 'Campaign dashboards from students',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Campaign dashboards from students using our methods...' }),
        defineField({
          name: 'dashboards',
          title: 'Dashboard Screenshots',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
          }],
          validation: (Rule) => Rule.max(2),
        }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Before FAQ Responses
    // ==========================================
    defineField({
      name: 'beforeFaqProof',
      title: 'Before FAQ Proof Section',
      type: 'object',
      description: 'Response screenshots before FAQ section',
      fields: [
        defineField({
          name: 'images',
          title: 'Response Images',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
          }],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),

    // ==========================================
    // PROOF IMAGES - Final Proof (Before Final CTA)
    // ==========================================
    defineField({
      name: 'finalProof',
      title: 'Final Proof Section',
      type: 'object',
      description: 'Last proof section before final CTA',
      fields: [
        defineField({ name: 'badge', title: 'Section Badge', type: 'string', initialValue: "💬 Still not convinced? Here's more proof..." }),
        defineField({
          name: 'images',
          title: 'Proof Images',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Path', type: 'string' }),
              defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
          }],
          validation: (Rule) => Rule.max(2),
        }),
      ],
    }),

    // ==========================================
    // LEAD CAPTURE POPUP MODAL
    // ==========================================
    defineField({
      name: 'leadPopup',
      title: 'Lead Capture Popup',
      type: 'object',
      description: 'Popup modal to capture visitor leads on first visit',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Popup',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'delaySeconds',
          title: 'Delay (seconds)',
          type: 'number',
          description: 'How many seconds to wait before showing popup',
          initialValue: 5,
        }),
        defineField({
          name: 'proofImage',
          title: 'Proof Image',
          type: 'string',
          description: 'Path to proof image e.g. /media/proof/Ionyx.png',
          initialValue: '/media/proof/Ionyx.png',
        }),
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: '🔥 LIMITED TIME OFFER',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Wait! Before You Go...',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          initialValue: 'Get our FREE Cold Email Starter Guide + exclusive discount when you join our list!',
        }),
        defineField({
          name: 'bulletPoints',
          title: 'Bullet Points',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            '5 proven email templates that get replies',
            'Exclusive 20% discount on the full course',
            'Weekly cold email tips & strategies',
          ],
        }),
        defineField({
          name: 'firstNamePlaceholder',
          title: 'First Name Placeholder',
          type: 'string',
          initialValue: 'Your first name',
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'Your best email',
        }),
        defineField({
          name: 'buttonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'GET FREE GUIDE + DISCOUNT',
        }),
        defineField({
          name: 'privacyText',
          title: 'Privacy Text',
          type: 'string',
          initialValue: 'We respect your privacy. Unsubscribe anytime.',
        }),
        defineField({
          name: 'successHeadline',
          title: 'Success Message Headline',
          type: 'string',
          initialValue: "You're In! 🎉",
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          rows: 2,
          initialValue: 'Check your inbox for your free guide and exclusive discount code!',
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Cold Email Sales Course',
        subtitle: 'Landing Page Content',
      }
    },
  },
})
