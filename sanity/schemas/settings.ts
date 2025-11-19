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
          description: 'Leave empty to use Cal.com booking modal. Add URL (e.g., /contact or https://example.com) to link to a page instead.',
        },
      ],
    },
    {
      name: 'calSettings',
      title: 'Cal.com Booking Settings',
      type: 'object',
      fields: [
        {
          name: 'calLink',
          title: 'Cal.com Link',
          type: 'string',
          description: 'Your Cal.com booking link (e.g., "your-username/consultation" or full URL)',
          placeholder: 'your-username/consultation',
        },
        {
          name: 'layout',
          title: 'Calendar Layout',
          type: 'string',
          options: {
            list: [
              {title: 'Month View', value: 'month_view'},
              {title: 'Week View', value: 'week_view'},
              {title: 'Column View', value: 'column_view'},
            ],
          },
          initialValue: 'month_view',
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
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'string',
        },
        {
          name: 'addresses',
          title: 'Addresses',
          type: 'array',
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
                title: 'City',
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
