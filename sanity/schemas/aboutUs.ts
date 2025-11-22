export default {
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    {
      name: 'ownerName',
      title: 'Owner/Founder Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ownerRole',
      title: 'Owner Role/Title',
      type: 'string',
      description: 'e.g., "Founder & CEO", "Lead Strategist"',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Founder & CEO',
    },
    {
      name: 'ownerImage',
      title: 'Owner Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      description: 'Heading for the About Us section on homepage',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Meet the founder',
    },
    {
      name: 'shortBio',
      title: 'Short Bio (Homepage)',
      type: 'text',
      rows: 12,
      description: 'Bio displayed on the homepage section (can be longer)',
      validation: (Rule: any) => Rule.required().max(2000),
    },
    {
      name: 'extendedBio',
      title: 'Extended Bio (About Page)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Longer form content for the standalone About page',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'missionTitle',
      title: 'Mission/Values Title',
      type: 'string',
      description: 'Heading for mission section on About page',
      initialValue: 'Our Mission',
    },
    {
      name: 'missionDescription',
      title: 'Mission/Values Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Company mission and values for About page',
    },
    {
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      description: 'Company values/principles (shown on About page)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "zap", "target", "heart")',
            },
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'ownerName',
      subtitle: 'ownerRole',
      media: 'ownerImage',
    },
  },
}
