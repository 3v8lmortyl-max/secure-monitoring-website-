import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CheckList, CtaBand, FaqList, LinkCards, SectionBlock } from '@/components/content-blocks'
import { INDUSTRIES, getIndustry } from '@/lib/industries'
import { getService } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { serviceSchema, webPageSchema } from '@/lib/schema'

export const dynamicParams = false
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = getIndustry((await params).slug)
  if (!i) return {}
  return pageMetadata({ title: i.metaTitle, description: i.metaDescription, path: `/industries/${i.slug}` })
}

export default async function IndustryPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const ind = getIndustry((await params).slug)
  if (!ind) notFound()
  const path = `/industries/${ind.slug}`
  const services = ind.relatedServices.map(getService).filter((x): x is NonNullable<typeof x> => !!x).map((x) => ({ href: `/services/${x.slug}`, name: x.name, text: x.cardText }))

  return (
    <>
      <JsonLd data={[webPageSchema({ name: ind.h1, description: ind.metaDescription, path }), serviceSchema({ name: `Remote CCTV monitoring for ${ind.name.toLowerCase()}`, description: ind.summary, path, serviceType: 'Remote CCTV monitoring' })]} />
      <PageHero eyebrow="Industry" title={ind.h1} breadcrumbs={[{ name: 'Industries', path: '/industries' }, { name: ind.name, path }]}>
        <p>{ind.summary}</p>
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article className="min-w-0 space-y-14">
          <section>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Common security risks for {ind.name.toLowerCase()}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ind.risks.map((r) => <div key={r.title} className="rounded-xl border border-border bg-card p-5"><h3 className="font-semibold">{r.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{r.text}</p></div>)}
            </div>
          </section>
          {ind.sections.map((sec) => <SectionBlock key={sec.heading} section={sec} />)}
          <section className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Illustrative example, not a real case</p>
            <h2 className="mt-2 text-xl font-bold">{ind.exampleScenario.title}</h2>
            <ol className="mt-4 space-y-3">
              {ind.exampleScenario.steps.map((st, i) => <li key={i} className="flex gap-3 text-sm leading-6"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span><span className="text-muted-foreground">{st}</span></li>)}
            </ol>
          </section>
          <FaqList faqs={ind.faqs} />
        </article>
        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <CheckList title="What our operators focus on" items={ind.focus} />
          <CheckList title="Camera readiness tips" items={ind.cameraNotes} tone="note" />
          <CheckList title="Limitations to know" items={ind.limitations} tone="note" />
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LinkCards title="Services for this industry" items={services} />
      </div>
      <CtaBand title={`Try remote monitoring at your ${ind.name.toLowerCase().replace(/s$/, '')}`} />
    </>
  )
}
