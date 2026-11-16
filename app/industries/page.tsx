import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, LinkCards } from '@/components/content-blocks'
import { INDUSTRIES } from '@/lib/industries'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'

const title = 'CCTV Monitoring by Retail Industry'
const description = 'Remote CCTV monitoring tailored to convenience stores, liquor stores, grocery stores, smoke shops, gas stations and small retail businesses in the United States.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/industries' })

export default function IndustriesHub() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/industries', type: 'CollectionPage' })} />
      <PageHero eyebrow="Industries" title="Remote CCTV monitoring for your type of store" breadcrumbs={[{ name: 'Industries', path: '/industries' }]}>
        <p>Different stores face different risks. These pages explain what our operators focus on, how cameras should be set up and what monitoring can and cannot do for each type of US retail business.</p>
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <LinkCards title="Industries we serve" items={INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, name: i.name, text: i.cardText }))} />
      </div>
      <CtaBand />
    </>
  )
}
