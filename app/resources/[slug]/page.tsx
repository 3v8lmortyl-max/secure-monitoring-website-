import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, FaqList, LinkCards, SectionBlock } from '@/components/content-blocks'
import { GUIDES, getGuide } from '@/lib/guides'
import { getService } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { articleSchema } from '@/lib/schema'
import { BUSINESS } from '@/lib/business'

export const dynamicParams = false
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug)
  if (!g) return {}
  return pageMetadata({ title: g.metaTitle, description: g.metaDescription, path: `/resources/${g.slug}`, type: 'article' })
}

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

export default async function GuidePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug)
  if (!g) notFound()
  const path = `/resources/${g.slug}`
  const services = g.relatedServices.map(getService).filter((x): x is NonNullable<typeof x> => !!x).map((x) => ({ href: `/services/${x.slug}`, name: x.name, text: x.cardText }))

  return (
    <>
      <JsonLd data={articleSchema({ title: g.title, description: g.metaDescription, path, datePublished: g.datePublished, dateModified: g.dateModified })} />
      <PageHero eyebrow="Guide" title={g.title} breadcrumbs={[{ name: 'Resources', path: '/resources' }, { name: g.title, path }]}>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span>By {BUSINESS.name}</span>
          <span>Updated <time dateTime={g.dateModified}>{fmt(g.dateModified)}</time></span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden />{g.readingMinutes} min read</span>
        </p>
      </PageHero>

      <article className="mx-auto max-w-3xl space-y-12 px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Short answer</h2>
          <p className="mt-3 text-lg leading-8">{g.summary}</p>
        </section>
        {g.sections.map((sec) => <SectionBlock key={sec.heading} section={sec} />)}
        {g.faqs.length > 0 && <FaqList faqs={g.faqs} />}
        {g.sources.length > 0 && (
          <section>
            <h2 className="text-xl font-bold">Sources</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {g.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener" className="text-primary underline underline-offset-4">{s.label}</a></li>)}
            </ul>
          </section>
        )}
      </article>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LinkCards title="Related services" items={services} />
      </div>
      <CtaBand />
    </>
  )
}
