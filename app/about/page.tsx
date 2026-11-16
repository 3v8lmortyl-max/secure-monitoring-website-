import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, DataTable } from '@/components/content-blocks'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from '@/lib/business'

const title = 'About Secure Monitoring'
const description = 'Secure Monitoring is an India-based, Udyam-registered sole proprietorship providing live, human-led remote CCTV monitoring to retail businesses in the United States.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/about' })

const principles = [
  'People make the decisions. We do not hand monitoring to automated analytics.',
  'Your staff’s safety comes first. We never ask employees to confront anyone.',
  'Facts over judgement. We report what we see, with times and cameras.',
  'Least access. We use view-only accounts, and you can revoke access at any time.',
  'Honesty about limits. We say clearly what monitoring can and cannot do.',
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/about', type: 'AboutPage' })} />
      <PageHero eyebrow="About us" title="About Secure Monitoring" breadcrumbs={[{ name: 'About', path: '/about' }]}>
        <p>Secure Monitoring is an India-based sole proprietorship that provides live, human-led remote CCTV monitoring to retail businesses in the United States. We watch the cameras our clients already have and alert their staff when something needs attention.</p>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5 leading-7 text-muted-foreground">
          <h2 className="text-3xl font-bold text-foreground">Why we exist</h2>
          <p>Most small retailers have cameras, but nobody watches them in real time. Footage gets checked after a loss is discovered, when it is too late to act. Hiring someone to watch screens full-time, or an on-site guard, is out of reach for many independent stores.</p>
          <p>Secure Monitoring closes that gap. Our operators watch the live feeds, recognize shoplifting, suspicious behaviour and procedure problems, and contact the right person at the store while there is still time to respond. Every incident is logged so owners can see patterns over time.</p>
          <h2 className="pt-4 text-3xl font-bold text-foreground">Our India-based delivery model</h2>
          <p>Our monitoring team works from India, and we serve US clients entirely remotely. We have no US office and no US-based staff, and we will never claim otherwise. Because US nights fall during India’s working day, overnight coverage is staffed the same way as daytime coverage. All client communication is in English, by phone, WhatsApp and email.</p>
          <p>Remote access to client cameras is view-only and limited to the operators assigned to that client, who are bound by confidentiality obligations. We monitor video only, never audio. How we handle data is set out in our <Link href="/privacy" className="text-primary underline underline-offset-4">Privacy Policy</Link>.</p>
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-7">
            <ShieldCheck className="h-9 w-9 text-primary" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold">How we work</h2>
            <ul className="mt-5 space-y-4">{principles.map((p) => <li key={p} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{p}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-xl font-bold">Business facts</h2>
            <DataTable rows={[
              ['Fact', 'Detail'],
              ['Business name', BUSINESS.name],
              ['Legal structure', `${BUSINESS.legalStructure} (not a private limited company)`],
              ['Proprietor', BUSINESS.proprietor],
              ['Registration', `Udyam (MSME), ${BUSINESS.udyamNumber}, Micro Enterprise, Services`],
              ['Registered address', BUSINESS_ADDRESS_ONE_LINE],
              ['Market served', 'Retail businesses in the United States'],
              ['Service', 'Live, human-led remote CCTV monitoring of existing cameras'],
              ['Not offered', 'Camera sales or installation, guards, audio monitoring, AI analytics'],
            ]} />
          </div>
        </aside>
      </section>
      <CtaBand title="Talk to the team" text="Tell us about your store and cameras. We will explain honestly whether remote monitoring is a good fit." />
    </>
  )
}
