export default {
  name: 'analytics',
  title: 'Analytics & Tracking',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Analytics & Tracking Settings',
      readOnly: true,
    },
    {
      name: 'googleAnalytics',
      title: 'Google Analytics 4 (GA4)',
      type: 'object',
      description: 'Google Analytics 4 tracking configuration',
      fields: [
        {
          name: 'enabled',
          title: 'Enable GA4',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'measurementId',
          title: 'GA4 Measurement ID',
          type: 'string',
          description: 'Format: G-XXXXXXXXXX',
          placeholder: 'G-XXXXXXXXXX',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Measurement ID is required when GA4 is enabled'
              }
              if (value && !value.match(/^G-[A-Z0-9]+$/)) {
                return 'Invalid format. Should be G-XXXXXXXXXX'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'googleTagManager',
      title: 'Google Tag Manager (GTM)',
      type: 'object',
      description: 'Google Tag Manager configuration',
      fields: [
        {
          name: 'enabled',
          title: 'Enable GTM',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'containerId',
          title: 'GTM Container ID',
          type: 'string',
          description: 'Format: GTM-XXXXXXX',
          placeholder: 'GTM-XXXXXXX',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Container ID is required when GTM is enabled'
              }
              if (value && !value.match(/^GTM-[A-Z0-9]+$/)) {
                return 'Invalid format. Should be GTM-XXXXXXX'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'mixpanel',
      title: 'Mixpanel',
      type: 'object',
      description: 'Mixpanel analytics configuration',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Mixpanel',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'token',
          title: 'Mixpanel Project Token',
          type: 'string',
          description: 'Your Mixpanel project token',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Project token is required when Mixpanel is enabled'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'clarity',
      title: 'Microsoft Clarity',
      type: 'object',
      description: 'Microsoft Clarity heatmaps and session recording',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Clarity',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'projectId',
          title: 'Clarity Project ID',
          type: 'string',
          description: 'Your Microsoft Clarity project ID',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Project ID is required when Clarity is enabled'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'hotjar',
      title: 'Hotjar',
      type: 'object',
      description: 'Hotjar heatmaps and behavior analytics',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Hotjar',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'siteId',
          title: 'Hotjar Site ID',
          type: 'number',
          description: 'Your Hotjar site ID (numeric)',
          validation: (Rule: any) =>
            Rule.custom((value: number, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Site ID is required when Hotjar is enabled'
              }
              return true
            }),
        },
        {
          name: 'version',
          title: 'Hotjar Version',
          type: 'number',
          description: 'Hotjar tracking code version (usually 6)',
          initialValue: 6,
        },
      ],
    },
    {
      name: 'crazyEgg',
      title: 'Crazy Egg',
      type: 'object',
      description: 'Crazy Egg heatmaps and A/B testing',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Crazy Egg',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'accountNumber',
          title: 'Crazy Egg Account Number',
          type: 'string',
          description: 'Your Crazy Egg account number',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Account number is required when Crazy Egg is enabled'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'facebookPixel',
      title: 'Facebook Pixel',
      type: 'object',
      description: 'Facebook Pixel for conversion tracking',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Facebook Pixel',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'pixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: 'Your Facebook Pixel ID',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Pixel ID is required when Facebook Pixel is enabled'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'linkedInInsight',
      title: 'LinkedIn Insight Tag',
      type: 'object',
      description: 'LinkedIn Insight Tag for conversion tracking',
      fields: [
        {
          name: 'enabled',
          title: 'Enable LinkedIn Insight',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'partnerId',
          title: 'Partner ID',
          type: 'string',
          description: 'Your LinkedIn Partner ID',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (context.parent?.enabled && !value) {
                return 'Partner ID is required when LinkedIn Insight is enabled'
              }
              return true
            }),
        },
      ],
    },
    {
      name: 'customScripts',
      title: 'Custom Tracking Scripts',
      type: 'object',
      description: 'Add custom tracking scripts (e.g., other analytics tools)',
      fields: [
        {
          name: 'headScripts',
          title: 'Head Scripts',
          type: 'array',
          description: 'Scripts to inject in <head> (before </head>)',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Script Name',
                  type: 'string',
                  description: 'For your reference (e.g., "Custom Analytics")',
                },
                {
                  name: 'enabled',
                  title: 'Enabled',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'code',
                  title: 'Script Code',
                  type: 'text',
                  rows: 5,
                  description: 'Paste the script tag or code here',
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  enabled: 'enabled',
                },
                prepare({title, enabled}: any) {
                  return {
                    title: title || 'Unnamed Script',
                    subtitle: enabled ? 'Enabled' : 'Disabled',
                  }
                },
              },
            },
          ],
        },
        {
          name: 'bodyScripts',
          title: 'Body Scripts',
          type: 'array',
          description: 'Scripts to inject at start of <body>',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Script Name',
                  type: 'string',
                  description: 'For your reference',
                },
                {
                  name: 'enabled',
                  title: 'Enabled',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'code',
                  title: 'Script Code',
                  type: 'text',
                  rows: 5,
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  enabled: 'enabled',
                },
                prepare({title, enabled}: any) {
                  return {
                    title: title || 'Unnamed Script',
                    subtitle: enabled ? 'Enabled' : 'Disabled',
                  }
                },
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Analytics & Tracking Settings',
        subtitle: 'Configure analytics and tracking tools',
      }
    },
  },
}
