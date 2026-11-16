import type { Metadata } from 'next'
import { BUSINESS } from './business'

export const SITE_URL = BUSINESS.website
export const SITE_NAME = BUSINESS.name
// Served by the app/opengraph-image.jpg file convention; listed explicitly because a page-level
// openGraph object replaces (rather than merges with) the inherited default image.
const OG_IMAGE = { url: '/opengraph-image.jpg', width: 1200, height: 630, alt: `${BUSINESS.name} logo` }

/**
 * Builds consistent per-page metadata: unique title/description, a self-referencing
 * canonical URL (resolved against metadataBase = SITE_URL), Open Graph and Twitter cards.
 * The Open Graph image comes from app/opengraph-image.jpg (file convention).
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  noindex?: boolean
  absoluteTitle?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type, siteName: SITE_NAME, locale: 'en_US', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`
