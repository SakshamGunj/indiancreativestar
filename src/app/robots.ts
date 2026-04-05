import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.daamievent.com";
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/private/', '/api/', '/_next/'],
      },
      // Advanced AI & LLM Indexing — Explicit Allow
      {
        userAgent: [
          'ChatGPT-User', 
          'GPTBot', 
          'Google-Extended', 
          'PerplexityBot', 
          'anthropic-ai', 
          'Claude-Web', 
          'ClaudeBot',
          'CCBot',
          'Meta-ExternalAgent'
        ],
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
