export default {
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'SEO Configuration',
      readOnly: true,
    },
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Your website name (e.g., "Mumbo Leads")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Your website URL (e.g., "https://www.mumboleads.com")',
      validation: (Rule: any) => Rule.required().uri({scheme: ['https', 'http']}),
    },
    {
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      description: 'Default title for pages without a specific title',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Default description for pages without a specific description',
      validation: (Rule: any) => Rule.required().min(50).max(160),
    },
    {
      name: 'defaultOgImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Default social sharing image (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'keywords',
      title: 'Site Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main keywords for your site (comma-separated)',
      validation: (Rule: any) => Rule.max(10),
    },
    {
      name: 'author',
      title: 'Default Author',
      type: 'string',
      description: 'Default author name for content',
    },
    {
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
      description: '@username for Twitter cards',
      validation: (Rule: any) =>
        Rule.custom((value: string) => {
          if (value && !value.startsWith('@')) {
            return 'Twitter handle must start with @'
          }
          return true
        }),
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32px or 64x64px)',
    },
    {
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon',
      type: 'image',
      description: 'Apple touch icon (180x180px)',
    },
    {
      name: 'structuredData',
      title: 'Structured Data (JSON-LD)',
      type: 'object',
      description: 'Organization structured data for rich results',
      fields: [
        {
          name: 'organizationName',
          title: 'Organization Name',
          type: 'string',
        },
        {
          name: 'organizationType',
          title: 'Organization Type',
          type: 'string',
          options: {
            list: [
              {title: 'Corporation', value: 'Corporation'},
              {title: 'Organization', value: 'Organization'},
              {title: 'Local Business', value: 'LocalBusiness'},
              {title: 'Professional Service', value: 'ProfessionalService'},
            ],
          },
          initialValue: 'Organization',
        },
        {
          name: 'logo',
          title: 'Organization Logo',
          type: 'image',
          description: 'Your company logo for search results',
        },
        {
          name: 'address',
          title: 'Business Address',
          type: 'object',
          fields: [
            {name: 'streetAddress', title: 'Street Address', type: 'string'},
            {name: 'city', title: 'City', type: 'string'},
            {name: 'region', title: 'State/Region', type: 'string'},
            {name: 'postalCode', title: 'Postal Code', type: 'string'},
            {name: 'country', title: 'Country Code', type: 'string', description: 'e.g., ZA, US, GB'},
          ],
        },
        {
          name: 'contactPoint',
          title: 'Contact Information',
          type: 'object',
          fields: [
            {name: 'telephone', title: 'Phone Number', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
            {
              name: 'contactType',
              title: 'Contact Type',
              type: 'string',
              options: {
                list: ['Customer Service', 'Sales', 'Support', 'General'],
              },
            },
          ],
        },
        {
          name: 'sameAs',
          title: 'Social Media Profiles',
          type: 'array',
          description: 'URLs to your social media profiles',
          of: [{type: 'url'}],
        },
      ],
    },
    {
      name: 'searchConsole',
      title: 'Search Console Verification',
      type: 'object',
      description: 'Verification codes for search engines',
      fields: [
        {
          name: 'googleVerification',
          title: 'Google Search Console Verification',
          type: 'string',
          description: 'Google verification meta tag content',
        },
        {
          name: 'bingVerification',
          title: 'Bing Webmaster Verification',
          type: 'string',
          description: 'Bing verification meta tag content',
        },
      ],
    },
    {
      name: 'robotsSettings',
      title: 'Robots.txt Settings',
      type: 'object',
      fields: [
        {
          name: 'allowAllRobots',
          title: 'Allow All Robots',
          type: 'boolean',
          description: 'Allow search engines to crawl all pages',
          initialValue: true,
        },
        {
          name: 'disallowPaths',
          title: 'Disallow Paths',
          type: 'array',
          description: 'Paths to block from crawling (e.g., /admin, /api)',
          of: [{type: 'string'}],
        },
        {
          name: 'customRobotsTxt',
          title: 'Custom robots.txt Content',
          type: 'text',
          rows: 10,
          description: 'Override with custom robots.txt content',
        },
      ],
    },
    {
      name: 'sitemapSettings',
      title: 'Sitemap Settings',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Sitemap Generation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'excludePaths',
          title: 'Exclude Paths from Sitemap',
          type: 'array',
          description: 'Paths to exclude from sitemap',
          of: [{type: 'string'}],
        },
        {
          name: 'priority',
          title: 'Default Priority',
          type: 'number',
          description: 'Default priority for pages (0.0 to 1.0)',
          validation: (Rule: any) => Rule.min(0).max(1),
          initialValue: 0.7,
        },
        {
          name: 'changeFreq',
          title: 'Default Change Frequency',
          type: 'string',
          options: {
            list: [
              {title: 'Always', value: 'always'},
              {title: 'Hourly', value: 'hourly'},
              {title: 'Daily', value: 'daily'},
              {title: 'Weekly', value: 'weekly'},
              {title: 'Monthly', value: 'monthly'},
              {title: 'Yearly', value: 'yearly'},
              {title: 'Never', value: 'never'},
            ],
          },
          initialValue: 'weekly',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO Settings',
        subtitle: 'Manage site SEO configuration',
      }
    },
  },
}
