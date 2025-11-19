export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'text',
          rows: 2,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'The part of the headline to highlight with brand color',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
        },
        {
          name: 'bulletPoints',
          title: 'Bullet Points',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title (Bold)',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Description',
                type: 'string',
              },
            ],
          }],
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book a Call',
        },
        {
          name: 'ctaUrl',
          title: 'CTA Button URL',
          type: 'string',
          description: 'Leave empty to use Cal.com booking modal. Add URL (e.g., /contact or https://example.com) to link to a page instead.',
        },
      ],
    },
    {
      name: 'stats',
      title: 'Stats Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'iconType',
            title: 'Icon Type',
            type: 'string',
            options: {
              list: [
                {title: '📊 Trending Up (Growth)', value: 'TrendingUp'},
                {title: '📈 Bar Chart (Statistics)', value: 'BarChart3'},
                {title: '💰 Dollar Sign (Revenue)', value: 'DollarSign'},
                {title: '👥 Users (Customers/Leads)', value: 'Users'},
                {title: '✉️ Mail (Emails/Outreach)', value: 'Mail'},
                {title: '🎯 Target (Goals)', value: 'Target'},
                {title: '⚡ Zap (Speed/Performance)', value: 'Zap'},
                {title: '✓ Check Circle (Success)', value: 'CheckCircle2'},
                {title: '🚀 Rocket (Launch/Growth)', value: 'Rocket'},
                {title: '📞 Phone (Calls/Meetings)', value: 'Phone'},
                {title: '🔔 Bell (Notifications/Alerts)', value: 'Bell'},
                {title: '⭐ Star (Quality/Rating)', value: 'Star'},
                {title: '🎁 Gift (Value)', value: 'Gift'},
                {title: '🏆 Award (Achievement)', value: 'Award'},
                {title: '💼 Briefcase (Business)', value: 'Briefcase'},
                {title: '📁 Folder (Organization)', value: 'Folder'},
              ],
            },
            initialValue: 'TrendingUp',
          },
          {
            name: 'metric',
            title: 'Metric',
            type: 'string',
            description: 'e.g., "+19 B2B", "2k+", "$1.7M"',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'bgColor',
            title: 'Background Color',
            type: 'string',
            options: {
              list: [
                {title: 'Primary Green', value: 'bg-primary-300'},
                {title: 'Accent Blue', value: 'bg-blue-200'},
                {title: 'Accent Yellow', value: 'bg-yellow-200'},
                {title: 'Accent Purple', value: 'bg-purple-200'},
              ],
            },
            initialValue: 'bg-primary-300',
          },
          {
            name: 'iconBg',
            title: 'Icon Background Color',
            type: 'string',
            options: {
              list: [
                {title: 'White with Primary Border', value: 'bg-white border-2 border-primary-400 shadow-sm'},
                {title: 'White with Accent Blue Border', value: 'bg-white border-2 border-blue-300 shadow-sm'},
                {title: 'White with Accent Yellow Border', value: 'bg-white border-2 border-yellow-300 shadow-sm'},
                {title: 'White with Accent Purple Border', value: 'bg-white border-2 border-purple-300 shadow-sm'},
              ],
            },
            initialValue: 'bg-white border-2 border-primary-400 shadow-sm',
          },
        ],
        preview: {
          select: {
            title: 'metric',
            subtitle: 'description',
          },
        },
      }],
    },
    {
      name: 'help',
      title: 'Help Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'text',
          rows: 2,
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 3,
        },
        {
          name: 'steps',
          title: 'Numbered Steps',
          type: 'array',
          of: [{type: 'string'}],
          description: 'List of steps or bullet points',
        },
        {
          name: 'services',
          title: 'Service Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Service Title',
                type: 'string',
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: 'description',
                title: 'Service Description',
                type: 'text',
                rows: 4,
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: 'icon',
                title: 'Icon',
                type: 'string',
                options: {
                  list: [
                    {title: 'Document/File', value: 'FileText'},
                    {title: 'Target', value: 'Target'},
                    {title: 'Copy/Clipboard', value: 'Copy'},
                    {title: 'Mail', value: 'Mail'},
                    {title: 'Users', value: 'Users'},
                    {title: 'Zap/Lightning', value: 'Zap'},
                    {title: 'Trending Up', value: 'TrendingUp'},
                    {title: 'Check Circle', value: 'CheckCircle2'},
                  ],
                },
                initialValue: 'FileText',
              },
            ],
            preview: {
              select: {
                title: 'title',
                subtitle: 'description',
              },
            },
          }],
          validation: (Rule: any) => Rule.max(3),
          description: 'Maximum 3 service cards',
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book a Call',
        },
      ],
    },
    {
      name: 'seo',
      title: 'Homepage SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing (1200x630px recommended)',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      }
    },
  },
}
