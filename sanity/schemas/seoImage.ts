// SEO-optimized image schema
// Use this as a template for all image fields that need full SEO optimization

export const seoImage = {
  name: 'seoImage',
  title: 'SEO Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'REQUIRED for SEO: Describe the image for screen readers and search engines (50-125 characters)',
      validation: (Rule: any) => Rule.required().min(10).max(125),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional: Visible caption displayed below the image',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional: Tooltip text that appears on hover',
    },
  ],
}

// Helper function to use in other schemas
export function createSEOImageField(name: string, title: string, description?: string) {
  return {
    name,
    title,
    type: 'image',
    description: description || `Upload an image with SEO optimization`,
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: 'alt',
        title: 'Alt Text (Required for SEO)',
        type: 'string',
        description: 'Describe what\'s in the image for accessibility and SEO (10-125 characters)',
        validation: (Rule: any) => Rule.required().min(10).max(125).error('Alt text is required for SEO and must be 10-125 characters'),
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
        description: 'Optional: Text displayed below the image',
      },
      {
        name: 'title',
        title: 'Title Attribute',
        type: 'string',
        description: 'Optional: Tooltip text on hover',
      },
    ],
    validation: (Rule: any) => Rule.custom((value: any) => {
      if (value && value.asset && !value.alt) {
        return 'Alt text is required when an image is uploaded'
      }
      return true
    }),
  }
}

export default seoImage
