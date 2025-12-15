import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tourismLanding',
  title: 'Tourism Landing Page',
  type: 'document',
  fields: [
    // ==========================================
    // URGENCY BAR
    // ==========================================
    defineField({
      name: 'urgency',
      title: 'Urgency Bar',
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
          initialValue: 'Limited Availability: We only take on',
          description: 'Text before the spots count',
        }),
        defineField({
          name: 'spotsPerMonth',
          title: 'Spots Per Month',
          type: 'number',
          initialValue: 5,
        }),
        defineField({
          name: 'spotsLeft',
          title: 'Spots Left',
          type: 'number',
          initialValue: 2,
        }),
        defineField({
          name: 'monthName',
          title: 'Month Name',
          type: 'string',
          initialValue: 'January',
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
          name: 'eyebrow',
          title: 'Eyebrow Text',
          type: 'string',
          initialValue: 'For Hotels, Lodges, Tour Operators & Restaurants',
        }),
        defineField({
          name: 'headlinePart1',
          title: 'Headline Part 1',
          type: 'string',
          initialValue: 'Get More',
        }),
        defineField({
          name: 'benefitWords',
          title: 'Benefit Words (Typing Effect)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Direct Bookings', 'Group Enquiries', 'Corporate Clients', 'Tour Partnerships', 'Event Reservations'],
          description: 'Words that cycle through with typing animation',
        }),
        defineField({
          name: 'headlinePart2',
          title: 'Headline Part 2',
          type: 'string',
          initialValue: 'Without',
        }),
        defineField({
          name: 'painWords',
          title: 'Pain Words (Typing Effect)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Chasing Leads', 'Waiting for Peak Season', 'Paying OTA Commissions', 'Empty Room Stress', 'Begging for Referrals'],
          description: 'Pain points that cycle through with typing animation',
        }),
        defineField({
          name: 'typingDelay',
          title: 'Typing Delay (ms)',
          type: 'number',
          initialValue: 4000,
          description: 'How long each word stays visible before changing (in milliseconds). 4000 = 4 seconds.',
          validation: (Rule) => Rule.min(1000).max(10000),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'We help Travel, Tourism & Hospitality businesses get 10-30+ high-intent booking enquiries every month with a done-for-you outreach system that works while you sleep.',
        }),
        defineField({
          name: 'subtitleHighlight',
          title: 'Text to Bold in Subtitle',
          type: 'string',
          initialValue: '10-30+ high-intent booking enquiries',
        }),
        defineField({
          name: 'proofItems',
          title: 'Proof Items (Below Subtitle)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['No upfront fees', 'Results in 14 days', 'Cancel anytime'],
        }),
        defineField({
          name: 'stats',
          title: 'Hero Stats',
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
          initialValue: [
            { value: 'R2.7M+', label: 'Pipeline Generated' },
            { value: '103', label: 'Booking Enquiries' },
            { value: '81%', label: 'Positive Replies' },
          ],
        }),
      ],
    }),

    // ==========================================
    // HERO FORM SETTINGS
    // ==========================================
    defineField({
      name: 'heroForm',
      title: 'Hero Form Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Form Badge',
          type: 'string',
          initialValue: 'Only 2 Spots Left for January',
        }),
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
          initialValue: 'Book Your Free Strategy Call',
        }),
        defineField({
          name: 'subtitle',
          title: 'Form Subtitle',
          type: 'string',
          initialValue: 'See how we can fill your rooms with direct bookings',
        }),
        defineField({
          name: 'buttonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Book My Free Strategy Call',
        }),
        defineField({
          name: 'privacyText',
          title: 'Privacy Text',
          type: 'string',
          initialValue: 'Your information is 100% secure. No spam, ever.',
        }),
        defineField({
          name: 'businessTypes',
          title: 'Business Type Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Hotel',
            'Lodge / Safari Lodge',
            'Guest House / B&B',
            'Resort / Spa',
            'Tour Operator',
            'Restaurant / Venue',
            'Other Hospitality Business',
          ],
        }),
        defineField({
          name: 'revenueRanges',
          title: 'Revenue Range Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Under R50,000',
            'R50,000 - R150,000',
            'R150,000 - R500,000',
            'R500,000 - R1M',
            'R1M+',
          ],
        }),
      ],
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
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: 'The Problem',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: "You're Working Harder Than Ever...",
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'But Bookings Are Still Inconsistent',
        }),
        defineField({
          name: 'intro',
          title: 'Intro Paragraph',
          type: 'text',
          rows: 3,
          initialValue: "You didn't get into hospitality to spend your days chasing leads, begging for referrals, or watching OTAs take 20% of every booking. But somehow, that's exactly where you are.",
        }),
        defineField({
          name: 'painCards',
          title: 'Pain Point Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'icon', title: 'Emoji Icon', type: 'string' }),
              defineField({ name: 'title', title: 'Card Title', type: 'string' }),
              defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'icon' },
            },
          }],
          initialValue: [
            { icon: '📉', title: 'Feast or Famine Bookings', description: "Peak season is chaos. Off-season is crickets. You never know what next month will bring — and you can't plan your business on \"hope.\"" },
            { icon: '💸', title: 'OTAs Eating Your Profits', description: "Booking.com takes 15-20% of every reservation. Airbnb owns your guests. You're building their business, not yours." },
            { icon: '👻', title: 'Leads That Ghost You', description: 'You run Facebook ads, get enquiries, send quotes... then nothing. They vanish. Time wasted. Money burned.' },
            { icon: '🙏', title: 'Waiting for Referrals', description: "Word of mouth is great — but you can't scale \"someone might recommend us.\" You need a system, not luck." },
          ],
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Show Me The Solution',
        }),
        defineField({
          name: 'transitionText',
          title: 'Transition Text',
          type: 'string',
          initialValue: "Sound familiar? There's a better way.",
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
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: 'The Solution',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'A Done-For-You System That Brings',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Serious Bookers To Your Door',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'We build and run your entire guest acquisition system. You just show up to close the bookings.',
        }),
        defineField({
          name: 'steps',
          title: 'Solution Steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'number', title: 'Step Number', type: 'number' }),
              defineField({ name: 'title', title: 'Step Title', type: 'string' }),
              defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'number' },
              prepare({ title, subtitle }) {
                return { title: `${subtitle}. ${title}` }
              },
            },
          }],
          initialValue: [
            { number: 1, title: 'We Find Your Ideal Guests', description: 'Corporate travel managers. Tour operators. Event planners. We identify and reach the decision-makers who book properties like yours — and actually have budget.' },
            { number: 2, title: 'We Run Multi-Channel Outreach', description: "Cold email. LinkedIn. Paid ads. Cold calling. We use every channel that works for hospitality — so you're not relying on one traffic source." },
            { number: 3, title: 'We Qualify & Warm Your Leads', description: 'No more time-wasters. We filter out the tyre-kickers and only send you enquiries from people ready to book — with dates, group sizes, and budgets.' },
            { number: 4, title: 'You Close Direct Bookings', description: 'No OTA commissions. No middlemen. You get direct relationships with guests who book again and again — and refer their colleagues.' },
          ],
        }),
      ],
    }),

    // ==========================================
    // RESULTS SECTION
    // ==========================================
    defineField({
      name: 'results',
      title: 'Results Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Real Results',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'This System Has Already Generated',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Millions in Bookings',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: "Here's what we've done for hospitality businesses like yours",
        }),
        defineField({
          name: 'bigNumber',
          title: 'Big Featured Number',
          type: 'string',
          initialValue: 'R2.7M+',
        }),
        defineField({
          name: 'bigLabel',
          title: 'Big Number Label',
          type: 'string',
          initialValue: 'Booking Pipeline Generated',
        }),
        defineField({
          name: 'bigSubtext',
          title: 'Big Number Subtext',
          type: 'string',
          initialValue: 'In just 120 days for South African hospitality businesses',
        }),
        defineField({
          name: 'stats',
          title: 'Stats Grid',
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
          initialValue: [
            { value: '103', label: 'Qualified Enquiries' },
            { value: '19,000+', label: 'Decision-Makers Reached' },
            { value: '242', label: 'Positive Responses' },
            { value: '81%', label: 'Reply Rate' },
          ],
        }),
      ],
    }),

    // ==========================================
    // WHAT YOU GET SECTION
    // ==========================================
    defineField({
      name: 'whatYouGet',
      title: 'What You Get Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: "What's Included",
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Everything You Need To Fill Your',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Rooms With Direct Bookings',
        }),
        defineField({
          name: 'benefits',
          title: 'Benefits List',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Benefit Title', type: 'string' }),
              defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
              defineField({
                name: 'isBonus',
                title: 'Is Bonus?',
                type: 'boolean',
                initialValue: false,
              }),
            ],
            preview: {
              select: { title: 'title', isBonus: 'isBonus' },
              prepare({ title, isBonus }) {
                return { title: isBonus ? `${title} [BONUS]` : title }
              },
            },
          }],
          initialValue: [
            { title: 'Done-For-You Lead Generation', description: "We find and contact your ideal guests across email, LinkedIn, paid ads, and phone. You don't lift a finger.", isBonus: false },
            { title: 'Custom Outreach Campaigns', description: 'Tailored messaging for your property, your ideal guest profile, and your unique selling points. No generic templates.', isBonus: false },
            { title: 'Lead Qualification & Filtering', description: 'We ask the right questions upfront so you only speak to guests who are ready to book — not browse.', isBonus: false },
            { title: 'Automated Follow-Up Sequences', description: 'Most leads need 5-7 touchpoints before they book. We handle all the follow-ups so no one slips through the cracks.', isBonus: false },
            { title: 'Weekly Performance Reports', description: 'See exactly how many people we reached, how many responded, and how many enquiries are in your pipeline.', isBonus: false },
            { title: 'CRM Setup & Integration', description: "We'll set up a simple CRM so you can track every lead, every conversation, and every booking in one place.", isBonus: true },
            { title: 'Dedicated Account Manager', description: 'You get a real person managing your campaigns, not a chatbot. Weekly calls to review results and optimize.', isBonus: true },
          ],
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get Started Today',
        }),
      ],
    }),

    // ==========================================
    // TESTIMONIALS SECTION
    // ==========================================
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Success Stories',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Hospitality Owners Are Getting',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Consistent Direct Bookings',
        }),
        defineField({
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
              defineField({ name: 'result', title: 'Key Result', type: 'string', description: 'e.g. "12 group bookings in 60 days"' }),
              defineField({ name: 'name', title: 'Name', type: 'string' }),
              defineField({ name: 'initials', title: 'Initials', type: 'string' }),
              defineField({ name: 'role', title: 'Role & Location', type: 'string' }),
            ],
            preview: {
              select: { title: 'name', subtitle: 'result' },
            },
          }],
          initialValue: [
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
        }),
      ],
    }),

    // ==========================================
    // WHO THIS IS FOR SECTION
    // ==========================================
    defineField({
      name: 'whoFor',
      title: 'Who This Is For Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Is This Right For',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'You?',
        }),
        defineField({
          name: 'yesTitle',
          title: 'Yes Box Title',
          type: 'string',
          initialValue: 'This IS For You If...',
        }),
        defineField({
          name: 'yesItems',
          title: 'Yes Items',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'You run a hotel, lodge, guest house, or tour operation',
            'You\'re tired of relying on OTAs and paying 15-20% commissions',
            'You want consistent bookings, not feast-or-famine months',
            'You\'re ready to invest in growth (not looking for free hacks)',
            'You can handle more bookings if we send them your way',
            'You want to build direct relationships with your guests',
          ],
        }),
        defineField({
          name: 'noTitle',
          title: 'No Box Title',
          type: 'string',
          initialValue: 'This Is NOT For You If...',
        }),
        defineField({
          name: 'noItems',
          title: 'No Items',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'You just launched and have no track record',
            'You\'re not willing to invest in marketing',
            'You can\'t handle more than 5 bookings per month',
            'You\'re looking for "get rich quick" schemes',
            'You don\'t respond to leads within 24 hours',
            'You\'re happy with the OTA-dependent status quo',
          ],
        }),
      ],
    }),

    // ==========================================
    // GUARANTEE SECTION
    // ==========================================
    defineField({
      name: 'guarantee',
      title: 'Guarantee Section',
      type: 'object',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon Emoji',
          type: 'string',
          initialValue: '🛡️',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Our "No Results, No Pay"',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Guarantee',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          initialValue: "We're so confident in our system that we guarantee results. If we don't deliver qualified booking enquiries within 30 days, we work for free until we do. No questions asked. No risk on your side. You only pay when you see real results hitting your inbox.",
        }),
      ],
    }),

    // ==========================================
    // FAQ SECTION
    // ==========================================
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Frequently Asked',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Questions',
        }),
        defineField({
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'question', title: 'Question', type: 'string' }),
              defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
            ],
            preview: {
              select: { title: 'question' },
            },
          }],
          initialValue: [
            { question: 'How quickly will I see results?', answer: 'Most clients start seeing qualified enquiries within 14-21 days of launch. Full pipeline typically builds over 60-90 days as campaigns optimize.' },
            { question: 'What kind of leads will I receive?', answer: 'Corporate travel managers, tour operators, event planners, and group bookers. People with budgets who book multiple rooms or repeat bookings — not random tourists browsing.' },
            { question: 'How is this different from running Facebook ads myself?', answer: 'Facebook ads give you clicks. We give you qualified, warm leads with contact details, dates, group sizes, and budgets. We also handle the follow-up until they\'re ready to book.' },
            { question: 'Do I need any technical skills?', answer: 'Zero. We handle everything — the tech, the campaigns, the messaging, the follow-ups. You just need to answer the phone when qualified bookers call.' },
            { question: "What if it doesn't work for my property?", answer: "Our guarantee covers you. If we don't deliver results in 30 days, we work for free until we do. But honestly? This system works for any hospitality business that can handle more bookings." },
            { question: 'How many new clients do you take on?', answer: "We limit ourselves to 5 new clients per month to ensure quality. Each client gets a dedicated account manager and custom campaign strategy. When spots are full, there's a waitlist." },
          ],
        }),
      ],
    }),

    // ==========================================
    // FINAL CTA SECTION
    // ==========================================
    defineField({
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Ready To Stop Chasing Bookings',
        }),
        defineField({
          name: 'headingPart2',
          title: 'Heading Part 2',
          type: 'string',
          initialValue: 'And Start',
        }),
        defineField({
          name: 'headingHighlight',
          title: 'Heading Highlight (Green)',
          type: 'string',
          initialValue: 'Receiving Them?',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: "Book your free strategy call today. We'll show you exactly how many bookings we can generate for your property — no pressure, no obligations.",
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book Your Free Strategy Call',
        }),
        defineField({
          name: 'ctaNote',
          title: 'Note Below CTA',
          type: 'string',
          initialValue: 'Only 2 spots remaining for January • Free 30-min call • No obligations',
        }),
        defineField({
          name: 'trustItems',
          title: 'Trust Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'icon', title: 'Icon Emoji', type: 'string' }),
              defineField({ name: 'text', title: 'Text', type: 'string' }),
            ],
          }],
          initialValue: [
            { icon: '🔒', text: '100% Confidential' },
            { icon: '✓', text: 'No Upfront Fees' },
            { icon: '🛡️', text: 'Results Guaranteed' },
            { icon: '📞', text: 'Cancel Anytime' },
          ],
        }),
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
        defineField({
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          initialValue: 'Mumbo Leads',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          initialValue: 'Helping Travel, Tourism & Hospitality businesses get more direct bookings.',
        }),
        defineField({
          name: 'year',
          title: 'Copyright Year',
          type: 'string',
          initialValue: '2025',
        }),
      ],
    }),

    // ==========================================
    // DASHBOARD PROOF SECTION
    // ==========================================
    defineField({
      name: 'dashboardProof',
      title: 'Dashboard Proof Section',
      description: 'Campaign dashboard screenshots showing real results',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: '📊 REAL CAMPAIGN RESULTS',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'These Results Speak for Themselves',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          initialValue: 'Actual dashboard screenshots from live outreach campaigns',
        }),
        defineField({
          name: 'campaigns',
          title: 'Campaign Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Image', type: 'string', description: 'Path to image (e.g. /media/proof/DAAS.png)' }),
              defineField({ name: 'title', title: 'Campaign Title', type: 'string' }),
              defineField({ name: 'stats', title: 'Campaign Stats', type: 'string', description: 'e.g. "16.7K sent • 46.7% open rate"' }),
              defineField({ name: 'revenue', title: 'Revenue Generated', type: 'string', description: 'e.g. "$160,000"' }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'revenue' },
            },
          }],
          initialValue: [
            { image: '/media/proof/DAAS.png', title: 'DAAS Campaign', stats: '16.7K sent • 46.7% open rate', revenue: '$160,000' },
            { image: '/media/proof/Martech.png', title: 'Martech Campaign', stats: '31.8K sent • 3.1% reply rate', revenue: '$19,000' },
            { image: '/media/proof/Ionyx.png', title: 'Ionyx Campaign', stats: '12.4K sent • 52% open rate', revenue: '$95,000' },
            { image: '/media/proof/Fintech.png', title: 'Fintech Campaign', stats: '8.2K sent • 4.2% reply rate', revenue: '$75,000' },
          ],
        }),
      ],
    }),

    // ==========================================
    // RESPONSE PROOF SECTION
    // ==========================================
    defineField({
      name: 'responseProof',
      title: 'Response Proof Section',
      description: 'Email response screenshots showing real replies',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: '📬 ACTUAL INBOX SCREENSHOTS',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Decision-Makers Actually Reply',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          initialValue: 'Real responses from cold outreach campaigns',
        }),
        defineField({
          name: 'responses',
          title: 'Response Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Image', type: 'string', description: 'Path to image (e.g. /media/proof/Response 35.png)' }),
              defineField({ name: 'label', title: 'Response Label', type: 'string', description: 'e.g. "Positive Response from CEO"' }),
            ],
            preview: {
              select: { title: 'label' },
            },
          }],
          initialValue: [
            { image: '/media/proof/Response 35.png', label: 'Positive Response from CEO' },
            { image: '/media/proof/Response 28.png', label: 'Meeting Request' },
            { image: '/media/proof/Response 12.png', label: 'Interested Response' },
            { image: '/media/proof/Response 15.png', label: 'Follow-up Request' },
          ],
        }),
        defineField({
          name: 'closingText',
          title: 'Closing Text',
          type: 'string',
          initialValue: "These aren't cherry-picked examples. This is what happens when you use the right system.",
        }),
      ],
    }),

    // ==========================================
    // MORE PROOF SECTION (Before Final CTA)
    // ==========================================
    defineField({
      name: 'moreProof',
      title: 'More Proof Section',
      description: 'Additional proof section displayed before the final CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: '🚀 MORE PROVEN RESULTS',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'We Do This Across Multiple Industries',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          initialValue: 'The same system works for any business that wants qualified leads',
        }),
        defineField({
          name: 'campaigns',
          title: 'Campaign Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Screenshot Image', type: 'string', description: 'Path to image (e.g. /media/proof/ai.png)' }),
              defineField({ name: 'title', title: 'Campaign Title', type: 'string' }),
              defineField({ name: 'stats', title: 'Campaign Stats', type: 'string' }),
              defineField({ name: 'revenue', title: 'Revenue Generated', type: 'string' }),
            ],
            preview: {
              select: { title: 'title', subtitle: 'revenue' },
            },
          }],
          initialValue: [
            { image: '/media/proof/ai.png', title: 'AI Solutions', stats: '9.8K sent • 48% open rate', revenue: '$120,000' },
            { image: '/media/proof/saas.png', title: 'SaaS Campaign', stats: '15.2K sent • 3.8% reply rate', revenue: '$85,000' },
          ],
        }),
      ],
    }),

    // ==========================================
    // SEO & SOCIAL SHARING
    // ==========================================
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'object',
      description: 'Settings for search engines and social media sharing',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          initialValue: 'Get More Direct Bookings | Mumbo Leads - Travel & Hospitality',
          validation: (Rule) => Rule.max(70).warning('Keep under 70 characters for best SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          initialValue: 'Done-for-you lead generation for hotels, lodges, and tour operators. Get 10-30+ qualified booking enquiries every month. No upfront fees. Results guaranteed.',
          validation: (Rule) => Rule.max(170).warning('Keep under 170 characters for best SEO'),
        }),
        defineField({
          name: 'metaKeywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['hotel marketing', 'direct bookings', 'hospitality leads', 'tourism marketing', 'lodge marketing', 'tour operator leads'],
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
        }),
        defineField({
          name: 'ogTitle',
          title: 'Social Share Title',
          type: 'string',
        }),
        defineField({
          name: 'ogDescription',
          title: 'Social Share Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Recommended: 1200x630px',
        }),
        defineField({
          name: 'twitterCard',
          title: 'Twitter Card Type',
          type: 'string',
          options: {
            list: [
              { title: 'Summary with Large Image', value: 'summary_large_image' },
              { title: 'Summary', value: 'summary' },
            ],
          },
          initialValue: 'summary_large_image',
        }),
        defineField({
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Tourism Landing Page',
        subtitle: 'Travel, Tourism & Hospitality',
      }
    },
  },
})
