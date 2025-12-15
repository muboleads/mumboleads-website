import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tourismLead',
  title: 'Tourism Leads',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'businessType',
      title: 'Business Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hotel', value: 'hotel' },
          { title: 'Lodge / Safari Lodge', value: 'lodge' },
          { title: 'Guest House / B&B', value: 'guesthouse' },
          { title: 'Resort / Spa', value: 'resort' },
          { title: 'Tour Operator', value: 'tour-operator' },
          { title: 'Restaurant / Venue', value: 'restaurant' },
          { title: 'Other Hospitality Business', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyRevenue',
      title: 'Monthly Revenue',
      type: 'string',
      options: {
        list: [
          { title: 'Under R50,000', value: 'under-50k' },
          { title: 'R50,000 - R150,000', value: '50k-150k' },
          { title: 'R150,000 - R500,000', value: '150k-500k' },
          { title: 'R500,000 - R1M', value: '500k-1m' },
          { title: 'R1M+', value: '1m-plus' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'primaryGoal',
      title: 'Primary Goal',
      type: 'string',
      options: {
        list: [
          { title: 'More Leads', value: 'leads' },
          { title: 'More Sales', value: 'sales' },
          { title: 'Brand Awareness', value: 'awareness' },
          { title: 'Direct Bookings', value: 'bookings' },
          { title: 'All of the Above', value: 'all' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'budget',
      title: 'Growth Budget',
      type: 'string',
      options: {
        list: [
          { title: 'Under R5,000/mo', value: 'under-5k' },
          { title: 'R5,000 - R15,000/mo', value: '5k-15k' },
          { title: 'R15,000 - R30,000/mo', value: '15k-30k' },
          { title: 'R30,000+/mo', value: '30k-plus' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Lead Source',
      type: 'string',
      initialValue: 'tourism-landing',
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Lead Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Meeting Scheduled', value: 'meeting-scheduled' },
          { title: 'Proposal Sent', value: 'proposal-sent' },
          { title: 'Won', value: 'won' },
          { title: 'Lost', value: 'lost' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'company',
      email: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, email, status }) {
      return {
        title: title || 'Unknown',
        subtitle: `${subtitle || 'No company'} • ${email || ''} • ${status || 'new'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'createdAtAsc',
      by: [{ field: 'createdAt', direction: 'asc' }],
    },
    {
      title: 'Company A-Z',
      name: 'companyAsc',
      by: [{ field: 'company', direction: 'asc' }],
    },
  ],
})
