export default {
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    {
      name: 'planName',
      title: 'Plan Name',
      type: 'string',
      description: 'e.g., "Monthly billing", "Quarterly billing"',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Monthly billing',
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      description: 'Select currency symbol',
      options: {
        list: [
          {title: 'Rands (R)', value: 'R'},
          {title: 'Dollars ($)', value: '$'},
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: '$',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price amount (numbers only)',
      validation: (Rule: any) => Rule.required().min(0),
      initialValue: 2000,
    },
    {
      name: 'period',
      title: 'Period Label',
      type: 'string',
      description: 'e.g., "/month", "/quarter"',
      validation: (Rule: any) => Rule.required(),
      initialValue: '/month',
    },
    {
      name: 'highlight',
      title: 'Highlight Badge',
      type: 'string',
      description: 'e.g., "Most flexible", "Best value"',
    },
    {
      name: 'savingsNote',
      title: 'Savings Note',
      type: 'string',
      description: 'e.g., "Save $1,000" - shown as a green badge',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of features included (only needs to be set on the first pricing option)',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Get Started',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL or hash (e.g., "#contact", "/contact")',
      validation: (Rule: any) => Rule.required(),
      initialValue: '#contact',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
      validation: (Rule: any) => Rule.required().min(0),
      initialValue: 1,
    },
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'planName',
      price: 'price',
      currency: 'currency',
      period: 'period',
      order: 'order',
    },
    prepare({title, price, currency, period, order}: any) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${currency || '$'}${price?.toLocaleString() || 0}${period}`,
      }
    },
  },
}
