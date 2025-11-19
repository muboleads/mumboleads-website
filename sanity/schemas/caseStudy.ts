export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'metric',
            title: 'Metric Label',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'e.g., "1,247", "67%", "$2.4M"',
            validation: (Rule: any) => Rule.required(),
          },
        ],
        preview: {
          select: {
            title: 'metric',
            subtitle: 'value',
          },
        },
      }],
      validation: (Rule: any) => Rule.required().min(1).max(6),
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
        },
        {
          name: 'position',
          title: 'Author Position & Company',
          type: 'string',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'seo',
      title: 'SEO',
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
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
    },
  },
}
