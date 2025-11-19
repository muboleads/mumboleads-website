export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Brief site description',
    },
    {
      name: 'headerCta',
      title: 'Header CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Book a Consultation',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
          description: 'Leave empty to use Calendly booking modal. Add URL (e.g., /contact or https://example.com) to link to a page instead.',
        },
      ],
    },
    {
      name: 'calendlySettings',
      title: 'Calendly Booking Settings',
      type: 'object',
      fields: [
        {
          name: 'calendlyUrl',
          title: 'Calendly URL',
          type: 'url',
          description: 'Your full Calendly booking URL',
          placeholder: 'https://calendly.com/your-username/meeting',
          initialValue: 'https://calendly.com/hopewell-mumboleads/30min',
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Footer Description',
          type: 'text',
          rows: 2,
          description: 'Appears in Column 1 below the logo',
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'string',
          description: 'Appears in Column 2',
        },
        {
          name: 'links',
          title: 'Footer Links',
          type: 'array',
          description: 'Navigation links in Column 3',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Link Label',
                type: 'string',
              },
              {
                name: 'href',
                title: 'Link URL',
                type: 'string',
              },
            ],
          }],
        },
        {
          name: 'addresses',
          title: 'Addresses',
          type: 'array',
          description: 'Appears in Column 4 under "Contact" heading',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'line1',
                title: 'Address Line 1',
                type: 'string',
              },
              {
                name: 'line2',
                title: 'Address Line 2',
                type: 'string',
              },
              {
                name: 'city',
                title: 'City/Postal Code',
                type: 'string',
              },
            ],
          }],
        },
      ],
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'faqSection',
      title: 'FAQ Section Headings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'What the FAQ',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Have a question? I trust you do! If you can\'t find your answer here, let\'s check email.',
        },
      ],
    },
    {
      name: 'howItWorksSection',
      title: 'How It Works Section Headings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'How does Mumbo Leads work?',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Generate Business Development calls and deals with your exact ICP in 4 easy steps.',
        },
      ],
    },
    {
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'metaKeywords',
          title: 'Default Meta Keywords',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'ogImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Default image for social media sharing (1200x630px recommended)',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
}
