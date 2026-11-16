import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Camera, CreditCard, Gift, Globe2, PhoneCall, ShieldCheck, UserCheck } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { CtaBand, DataTable, FaqList, LinkCards } from '@/components/content-blocks'
import { SERVICES } from '@/lib/services'
import { INDUSTRIES } from '@/lib/industries'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'

const title = 'Remote Video Monitoring for US Retail Stores | Secure Monitoring'
const description = 'Live, human-led remote video and CCTV monitoring for US convenience, liquor, grocery and retail stores using your existing cameras. From $199/site/month.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/', absoluteTitle: true })

const featured = ['remote-cctv-monitoring', 'live-video-monitoring', 'retail-loss-prevention', 'employee-theft-prevention', 'security-incident-alerts', 'multi-location-cctv-monitoring']

const reasons = [
  { icon: UserCheck, title: 'Real people, not software', text: 'Trained operators watch your live feeds. Every alert is checked by a person before it reaches your staff.' },
  { icon: Camera, title: 'Your existing cameras', text: 'No hardware to buy and no installation. If your system supports remote viewing, we can usually monitor it.' },
  { icon: CreditCard, title: 'Published, per-site pricing', text: 'From $199 per site per month for 24/7 monitoring, tailored to cameras and hours. No setup fees.' },
  { icon: Gift, title: '7-day free trial, no card', text: 'See the service on your own cameras before paying anything. Plans are month to month after that.' },
  { icon: PhoneCall, title: 'Alerts your team can act on', text: 'Phone calls and WhatsApp messages to the right person, following the escalation path you choose.' },
  { icon: Globe2, title: 'Transparent about who we are', text: 'An India-based, Udyam-registered business serving US retailers remotely. No US office claims, no invented credentials.' },
]

const faqs = [
  { q: 'What is remote video monitoring?', a: 'It is a service in which trained operators watch your store’s security cameras live from another location and alert your staff when something needs attention, instead of only reviewing recordings after a loss.' },
  { q: 'Who is Secure Monitoring?', a: 'An India-based sole proprietorship (Udyam/MSME registered) providing live, human-led remote CCTV monitoring to retail businesses in the United States.' },
  { q: 'Do I need new cameras?', a: 'No. We monitor your existing system if it supports secure remote viewing. Compatibility is confirmed for free during your consultation and trial.' },
  { q: 'How much does it cost?', a: 'Basic is $199 and Professional is $299 per site per month for 24/7 monitoring, tailored to cameras and hours. Enterprise starts from $699 per month. There are no setup fees and a 7-day free trial is included.' },
]

export default function Home() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/' })} />
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,oklch(0.4_0.12_250_/_0.2),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary"><span className="h-px w-8 bg-primary" /> Remote video monitoring for retail</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Live CCTV monitoring for US retail stores, using the cameras you already have.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Secure Monitoring’s trained operators watch your store cameras live, 24/7 or on your schedule, and call or message your staff the moment something needs attention. No new hardware, no setup fees, no long contracts.</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {['From $199 / site / month', '7-day free trial, no card', 'Month to month'].map((t) => <li key={t} className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-primary" aria-hidden />{t}</li>)}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#quote-form" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-accent">Start 7-day free trial <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 font-semibold hover:bg-secondary">See pricing</Link>
            </div>
          </div>
          <figure className="relative min-h-[320px] overflow-hidden rounded-xl border border-border shadow-2xl lg:min-h-full">
            <Image src="/monitoring-room.webp" alt="Illustrative image of operators watching CCTV feeds in a monitoring room" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6 pt-20 text-sm"><span className="font-semibold">Human monitoring, clear communication.</span> <span className="text-muted-foreground">Illustrative image.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">What we do</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Outsourced, human-led CCTV monitoring for retail</h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p><strong className="text-foreground">Secure Monitoring</strong> is an India-based, Udyam-registered business that provides remote CCTV monitoring to retail stores in the United States. Store owners give us authorized, view-only access to their existing cameras. Our operators then watch the live feeds, spot shoplifting, suspicious behaviour and procedure issues, alert the designated staff by phone or WhatsApp, and log every incident.</p>
            <p>We serve convenience stores, liquor stores, grocery stores, smoke shops, gas station stores and other independent or multi-location retailers. We do not sell cameras, install hardware, provide guards or use AI analytics. Our service is trained people watching your cameras.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl space-y-14 px-4 py-16 sm:px-6 lg:px-8">
          <LinkCards title="Monitoring services" items={SERVICES.filter((s) => featured.includes(s.slug)).map((s) => ({ href: `/services/${s.slug}`, name: s.name, text: s.cardText }))} />
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">View all services <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">How it works</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">From your cameras to your phone in four steps</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {[['Connect', 'You share secure, view-only remote access to your existing CCTV system.'], ['Plan', 'We agree on hours, priority cameras, alert rules and who to contact.'], ['Monitor & alert', 'Operators watch live and call or message your staff when action is needed.'], ['Report', 'Every incident is logged, with summaries sent by email or WhatsApp.']].map(([t, d], i) => (
            <li key={t} className="rounded-lg border border-border bg-card p-5"><span className="text-sm font-bold text-primary">0{i + 1}</span><h3 className="mt-4 font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p></li>
          ))}
        </ol>
        <Link href="/how-it-works" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">See the full monitoring process <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Why retailers choose Secure Monitoring</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title: t, text }) => <article key={t} className="rounded-xl border border-border bg-background p-6"><Icon className="h-7 w-7 text-primary" aria-hidden /><h3 className="mt-4 text-lg font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">How it compares with the alternatives</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">A general comparison of common options for a single retail store. Your situation may differ.</p>
        <DataTable rows={[
          ['', 'Recorded CCTV only', 'On-site security guard', 'Secure Monitoring'],
          ['Someone watching live', 'No', 'Yes, at one spot at a time', 'Yes, across all priority cameras'],
          ['New hardware needed', 'No', 'No', 'No, uses your existing cameras'],
          ['Physical presence on site', 'No', 'Yes', 'No. We alert your staff.'],
          ['Typical commitment', 'None', 'Usually staffing contracts', 'Month to month'],
          ['Incident records', 'Footage only', 'Varies', 'Timestamped logs and reports'],
        ]} />
        <Link href="/resources/remote-monitoring-vs-security-guards" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Read the full comparison guide <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <LinkCards title="Built for these retail businesses" items={INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, name: i.name, text: i.cardText }))} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <FaqList faqs={faqs} heading="Quick answers" />
        <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ShieldCheck className="h-4 w-4" aria-hidden /> All frequently asked questions</Link>
      </section>
      <CtaBand />
    </>
  )
}
