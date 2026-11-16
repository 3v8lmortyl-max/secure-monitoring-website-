import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// All crawlers (including search engines and AI search/answer crawlers such as
// Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot and ClaudeBot) may crawl the
// whole public site. Nothing on this site needs to be hidden from indexing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
