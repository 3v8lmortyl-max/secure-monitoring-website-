// JSON-LD builders (schema.org). Only factual, verifiable business data is used:
// no ratings, reviews, awards or certifications are declared anywhere.
//
// Type choice: the business has no customer-facing premises and serves US customers
// remotely from India, so it is described as an Organization (not LocalBusiness /
// ProfessionalService, which Google treats as physical, visitable locations).
import { BUSINESS } from './business'
import { SITE_URL, absoluteUrl } from './seo'
import type { FAQ } from './content-types'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 600, height: 321 },
    description:
      'Secure Monitoring is an India-based sole proprietorship that provides live, human-led remote CCTV monitoring for retail businesses in the United States, using the customer’s existing camera systems.',
    email: BUSINESS.email,
    telephone: BUSINESS.phone.replace(/\s/g, ''),
    founder: { '@type': 'Person', name: BUSINESS.proprietor },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.line1,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.pin,
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    identifier: { '@type': 'PropertyValue', propertyID: 'Udyam Registration Number (MSME, India)', value: BUSINESS.udyamNumber },
    knowsAbout: [
      'Remote CCTV monitoring',
      'Live video monitoring',
      'Retail loss prevention',
      'Employee theft prevention',
      'Retail store surveillance',
      'Multi-location CCTV monitoring',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: BUSINESS.phone.replace(/\s/g, ''),
        email: BUSINESS.email,
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    description: 'Remote CCTV monitoring services for US retail stores.',
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  }
}

export function webPageSchema({ name, description, path, type = 'WebPage' }: { name: string; description: string; path: string; type?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  }
}

export function serviceSchema({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Retail businesses' },
  }
}

export function pricingSchema() {
  const offer = (name: string, price: string, description: string) => ({
    '@type': 'Offer',
    name,
    description,
    price,
    priceCurrency: 'USD',
    priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'USD', unitText: 'per site per month' },
    seller: { '@id': ORG_ID },
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl('/pricing')}#service`,
    name: 'Remote CCTV monitoring plans',
    serviceType: 'Remote CCTV monitoring',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Monitoring plans',
      itemListElement: [
        offer('Basic', '199', '24/7 live CCTV monitoring of one site with employee notification and incident reporting. Final price tailored to cameras and monitoring hours.'),
        offer('Professional', '299', '24/7 live CCTV monitoring of one site with enhanced escalation and response coordination. Final price tailored to cameras and monitoring hours.'),
      ],
    },
  }
}

export function articleSchema({ title, description, path, datePublished, dateModified }: { title: string; description: string; path: string; datePublished: string; dateModified: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified,
    inLanguage: 'en-US',
    image: absoluteUrl('/opengraph-image.jpg'),
    author: { '@type': 'Organization', '@id': ORG_ID, name: BUSINESS.name, url: SITE_URL },
    publisher: { '@id': ORG_ID },
  }
}

// FAQPage rich results are currently limited by Google to authoritative government and
// health sites; the markup is still valid schema.org and helps machines read the Q&A,
// so it is used only on pages whose visible content is a genuine FAQ.
export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
