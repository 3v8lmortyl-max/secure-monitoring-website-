import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, DataTable, LinkCards } from '@/components/content-blocks'
import { SERVICES } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'

const title = 'Remote CCTV Monitoring Services'
const description = 'Human-led remote CCTV monitoring services for US retail: live monitoring, loss prevention, employee theft prevention, incident alerts, reports and multi-store coverage.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/services' })

export default function ServicesHub() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/services', type: 'CollectionPage' })} />
      <PageHero eyebrow="Services" title="Remote CCTV monitoring services for retail businesses" breadcrumbs={[{ name: 'Services', path: '/services' }]}>
        <p>Secure Monitoring provides live, human-led monitoring of your existing CCTV cameras for US retail stores. Every service below is delivered by trained operators from our monitoring team in India, with alerts to your staff and written records of what happened.</p>
      </PageHero>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        <LinkCards title="Our monitoring services" items={SERVICES.map((s) => ({ href: `/services/${s.slug}`, name: s.name, text: s.cardText }))} />
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is included, and what is not</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">We want you to compare services accurately. This is the full scope of what Secure Monitoring does.</p>
          <DataTable rows={[
            ['', 'Secure Monitoring'],
            ['Live monitoring by trained people', 'Included, up to 24/7'],
            ['Uses your existing cameras', 'Yes. No new hardware and no setup fees.'],
            ['Alerts to your staff', 'Phone call and WhatsApp'],
            ['Incident logs and reports', 'Included'],
            ['Law-enforcement contact', 'Professional plan, where you authorize it'],
            ['AI or automated video analytics', 'Not offered'],
            ['Audio monitoring or talk-down speakers', 'Not offered (video only)'],
            ['Camera sales or installation', 'Not offered'],
            ['On-site guards or patrol dispatch', 'Not offered'],
          ]} />
        </section>
        <LinkCards title="Setup and consulting" items={[{ href: '/professional-services', name: 'Monitoring setup & consulting', text: 'Camera coverage review, escalation workflows and monitoring procedures for your stores.' }, { href: '/camera-compatibility', name: 'Camera compatibility', text: 'Check whether your existing CCTV system can be monitored remotely.' }]} />
      </div>
      <CtaBand />
    </>
  )
}
