import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly allow AI crawlers
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity', 'Diffbot', 'Bytespider', 'CCBot', 'FacebookBot', 'Google-Extended', 'Applebot-Extended', 'Omgilibot', 'OmgiliBot', 'Amazonbot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.mumboleads.com/sitemap.xml',
  }
}
