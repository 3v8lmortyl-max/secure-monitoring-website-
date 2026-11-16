import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CheckList, CtaBand, FaqList, LinkCards, SectionBlock } from '@/components/content-blocks'
import { SERVICES, getService } from '@/lib/services'
import { INDUSTRIES } from '@/lib/industries'
import { pageMetadata } from '@/lib/seo'
import { serviceSchema, webPageSchema } from '@/lib/schema'

export const dynamicParams = false
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug)
  if (!s) return {}
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` })
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug)
  if (!s) notFound()
  const path = `/services/${s.slug}`
  const related = s.relatedServices.map(getService).filter((x): x is NonNullable<typeof x> => !!x).map((x) => ({ href: `/services/${x.slug}`, name: x.name, text: x.cardText }))
  const industries = INDUSTRIES.filter((i) => s.relatedIndustries.includes(i.slug)).map((i) => ({ href: `/industries/${i.slug}`, name: i.name, text: i.cardText }))

  return (
    <>
      <JsonLd data={[webPageSchema({ name: s.h1, description: s.metaDescription, path }), serviceSchema({ name: s.name, description: s.summary, path, serviceType: s.serviceType })]} />
      <PageHero eyebrow="Service" title={s.h1} breadcrumbs={[{ name: 'Services', path: '/services' }, { name: s.name, path }]}>
        <p>{s.summary}</p>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article className="min-w-0 space-y-14">
          <section>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Who this service is for</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.forWho.map((w) => <li key={w} className="rounded-lg border border-border bg-card p-4 text-sm leading-6">{w}</li>)}
            </ul>
          </section>
          {s.sections.map((sec) => <SectionBlock key={sec.heading} section={sec} />)}
          <FaqList faqs={s.faqs} />
        </article>
        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <CheckList title="What you get" items={s.deliverables} />
          <CheckList title="Limitations to know" items={s.limitations} tone="note" />
          <div className="rounded-xl border border-border bg-card p-6 text-sm">
            <p className="font-semibold">Pricing</p>
            <p className="mt-2 leading-6 text-muted-foreground">From $199 per site per month. Tailored to your cameras and monitoring hours. No setup fees, 7-day free trial.</p>
            <a href="/pricing" className="mt-3 inline-block font-semibold text-primary hover:underline">See plans →</a>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-4 pb-16 sm:px-6 lg:px-8">
        <LinkCards title="Related services" items={related} />
        <LinkCards title="Industries that use this service" items={industries} />
      </div>
      <CtaBand />
    </>
  )
}
