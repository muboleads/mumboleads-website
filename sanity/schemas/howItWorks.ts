export default {
  name: 'howItWorks',
  title: 'How It Works Steps',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'File Check', value: 'FileCheck'},
          {title: 'Message Square', value: 'MessageSquare'},
          {title: 'Search', value: 'Search'},
          {title: 'Repeat', value: 'Repeat'},
          {title: 'Target', value: 'Target'},
          {title: 'Zap', value: 'Zap'},
          {title: 'Users', value: 'Users'},
          {title: 'Rocket', value: 'Rocket'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (1, 2, 3, 4...)',
      validation: (Rule: any) => Rule.required().min(1),
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
      title: 'title',
      subtitle: 'description',
      order: 'order',
    },
    prepare({title, subtitle, order}: any) {
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle ? subtitle.substring(0, 60) : '',
      }
    },
  },
}
