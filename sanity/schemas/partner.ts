export default {
  name: 'partner',
  title: 'Partners & Companies',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Official Partner', value: 'official'},
          {title: 'Company (Clients)', value: 'company'},
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order within its type',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Optional link to company website',
    },
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Type',
      name: 'type',
      by: [{field: 'type', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      type: 'type',
      order: 'order',
    },
    prepare({title, media, type, order}: any) {
      return {
        title: `${order}. ${title}`,
        subtitle: type === 'official' ? 'Official Partner' : 'Client Company',
        media,
      }
    },
  },
}
