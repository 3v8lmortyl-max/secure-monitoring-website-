// Shared shapes for data-driven content pages (services, industries, guides).

export type FAQ = { q: string; a: string }

export type ContentSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  /** Optional simple table: first row is the header row. */
  table?: string[][]
}

export type ServicePage = {
  slug: string
  /** Short name used in nav, cards and breadcrumbs, e.g. "Retail Loss Prevention". */
  name: string
  /** schema.org serviceType, e.g. "Retail loss prevention monitoring". */
  serviceType: string
  /** <title> without brand suffix (brand is appended by the layout template). Aim ≤ 60 chars incl. brand. */
  metaTitle: string
  /** Unique meta description, ~140–160 chars. */
  metaDescription: string
  h1: string
  /** Answer-first definition paragraph (what it is, who it's for, how it's delivered). */
  summary: string
  /** One-line card text used on hub pages. */
  cardText: string
  forWho: string[]
  sections: ContentSection[]
  deliverables: string[]
  limitations: string[]
  faqs: FAQ[]
  relatedServices: string[]
  relatedIndustries: string[]
}

export type IndustryPage = {
  slug: string
  /** Plural short name, e.g. "Convenience Stores". */
  name: string
  metaTitle: string
  metaDescription: string
  h1: string
  summary: string
  cardText: string
  /** Industry-specific risks: title + explanation. */
  risks: { title: string; text: string }[]
  /** What monitoring operators focus on for this store type. */
  focus: string[]
  /** Camera placement / readiness notes specific to this store type. */
  cameraNotes: string[]
  /** Illustrative example of how an alert is handled (clearly labelled as an example on the page). */
  exampleScenario: { title: string; steps: string[] }
  sections: ContentSection[]
  limitations: string[]
  faqs: FAQ[]
  relatedServices: string[]
}

export type GuidePage = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Answer-first summary shown under the H1 ("Short answer"). */
  summary: string
  cardText: string
  datePublished: string // ISO date
  dateModified: string // ISO date
  readingMinutes: number
  sections: ContentSection[]
  faqs: FAQ[]
  /** External references actually cited in the text. */
  sources: { label: string; url: string }[]
  relatedServices: string[]
}
