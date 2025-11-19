import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mumbo Leads - B2B Lead Generation',
    short_name: 'Mumbo Leads',
    description: 'Fill your calendar with more sales-qualified leads. Expert B2B cold email agency.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#7bca52',
  }
}
