import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { SERVICES } from '@/lib/services'
import { INDUSTRIES } from '@/lib/industries'
import { GUIDES } from '@/lib/guides'

// Update when page content changes materially.
const CONTENT_UPDATED = new Date('2026-11-16')

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly', lastModified = CONTENT_UPDATED) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority })
  return [
    page('/', 1.0, 'weekly'),
    page('/services', 0.9),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.9)),
    page('/industries', 0.8),
    ...INDUSTRIES.map((i) => page(`/industries/${i.slug}`, 0.8)),
    page('/pricing', 0.9),
    page('/how-it-works', 0.8),
    page('/camera-compatibility', 0.7),
    page('/faq', 0.7),
    page('/resources', 0.6),
    ...GUIDES.map((g) => page(`/resources/${g.slug}`, 0.6, 'monthly', new Date(g.dateModified))),
    page('/professional-services', 0.5),
    page('/about', 0.6),
    page('/contact', 0.8),
    page('/terms', 0.3, 'yearly'),
    page('/privacy', 0.3, 'yearly'),
    page('/refund-policy', 0.3, 'yearly'),
    page('/cancellation-policy', 0.3, 'yearly'),
  ]
}
