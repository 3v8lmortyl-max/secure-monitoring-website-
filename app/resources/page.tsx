import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, LinkCards } from '@/components/content-blocks'
import { GUIDES } from '@/lib/guides'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'

const title = 'Retail CCTV Monitoring Guides'
const description = 'Practical guides for US retail owners on remote CCTV monitoring: how it works, how it compares with guards, and how to prepare your existing cameras.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/resources' })

export default function ResourcesHub() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/resources', type: 'CollectionPage' })} />
      <PageHero eyebrow="Resources" title="Guides for retail owners" breadcrumbs={[{ name: 'Resources', path: '/resources' }]}>
        <p>Plain-English guides to help you decide whether remote CCTV monitoring is right for your store, and how to get the most from the cameras you already have.</p>
      </PageHero>
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:px-6 lg:px-8">
        <LinkCards title="Guides" items={GUIDES.map((g) => ({ href: `/resources/${g.slug}`, name: g.title, text: g.cardText }))} />
        <LinkCards title="Quick answers" items={[{ href: '/faq', name: 'Frequently asked questions', text: 'Pricing, trial, cameras, alerts, privacy and how our India-based team works.' }, { href: '/camera-compatibility', name: 'Camera compatibility', text: 'What your CCTV system needs for remote monitoring.' }, { href: '/how-it-works', name: 'How remote monitoring works', text: 'Our process from onboarding to daily reports.' }]} />
      </div>
      <CtaBand />
    </>
  )
}
