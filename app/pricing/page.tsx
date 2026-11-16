import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { pageMetadata } from '@/lib/seo'
import { pricingSchema } from '@/lib/schema'
import Link from 'next/link'
import { BadgeCheck, CalendarCheck, Check, CreditCard, Gift, MessagesSquare, RefreshCw } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = pageMetadata({ title: 'Remote Video Monitoring Pricing', description: 'Remote CCTV monitoring pricing: from $199 per site per month for 24/7 monitoring, tailored to cameras and hours. 7-day free trial, no setup fees, month to month.', path: '/pricing' })

const plans = [
  { name: 'Basic', price: '$199', note: 'site / month', intro: '24/7 monitoring with essential employee escalation.', cta: 'Start 7-day free trial', features: ['24/7 live CCTV monitoring of your site', 'Employee monitoring', 'Shoplifting monitoring', '30-second response target', 'Employee notification by phone for detected shoplifting incidents', 'WhatsApp alerts and coordination', 'Incident reporting', 'Operational support through WhatsApp'] },
  { name: 'Professional', price: '$299', note: 'site / month', intro: '24/7 monitoring with enhanced escalation and response coordination.', featured: true, cta: 'Start 7-day free trial', features: ['Everything in Basic', 'Enhanced shoplifting incident escalation', 'Direct contact with designated employees', 'Law-enforcement contact when appropriate and authorized', 'Priority incident escalation', 'Enhanced incident reporting', 'More comprehensive response coordination'] },
  { name: 'Enterprise', price: 'From $699', note: 'month', intro: 'Customized operations for multiple sites and complex requirements.', cta: 'Discuss enterprise requirements', features: ['Everything in Professional', 'Multi-location operations', 'Customized monitoring requirements', 'Customized escalation procedures', 'Dedicated operational support', 'Tailored reporting', 'Pricing adapted to locations, cameras, coverage, and operational complexity'] },
]

const highlights = [
  { icon: Gift, text: '7-day free trial' },
  { icon: CreditCard, text: 'No card required to start' },
  { icon: BadgeCheck, text: 'No setup fees' },
  { icon: RefreshCw, text: 'Month to month, cancel anytime' },
]

const steps = [
  { icon: MessagesSquare, title: 'Consultation & quote', text: 'Tell us about your site, number of cameras and the monitoring hours you need. We confirm your plan and monthly price in writing.' },
  { icon: Gift, title: '7-day free trial', text: 'We connect to your existing cameras and monitor your site free for 7 days. No payment or card details needed.' },
  { icon: CreditCard, title: 'Subscribe', text: 'Happy to continue? Pay your first month securely by card (Visa, Mastercard or American Express) through our payment link.' },
  { icon: CalendarCheck, title: 'Monthly renewal', text: 'Your plan is billed monthly in advance for each site and renews automatically. Cancel anytime with 3 business days’ notice.' },
]

const faqs = [
  { q: 'What does the price include?', a: 'Each plan price covers 24/7 monitoring of one site (one store location) for one month. Your final monthly price is tailored to the number of cameras at the site and the active monitoring hours you need, and is confirmed in writing before you pay.' },
  { q: 'Are there any setup fees?', a: 'No. We monitor the CCTV cameras you already have, so there is no hardware, installation or setup charge. You only pay the monthly monitoring fee.' },
  { q: 'How does the free trial work?', a: 'Your first 7 days of monitoring are free. We do not ask for card details and nothing is charged automatically. At the end of the trial you choose whether to subscribe. One free trial is available per business.' },
  { q: 'How do I pay?', a: 'Fees are charged in US Dollars (USD). We send a secure payment link and you pay by international credit or debit card. We never see or store your full card number.' },
  { q: 'Can I cancel?', a: 'Yes. Plans are month to month with no cancellation fee. Cancel by email or WhatsApp at least 3 business days before your next billing date. Monitoring continues until the end of the month you have paid for.' },
]

export default function PricingPage() {
  return <>
    <JsonLd data={pricingSchema()} />
    <PageHero eyebrow="Pricing" title="Simple monthly pricing per site, with a free trial." breadcrumbs={[{ name: 'Pricing', path: '/pricing' }]}>24/7 remote monitoring of your existing CCTV cameras, priced per site per month. Your final price is tailored to the number of cameras and the active monitoring hours you need.</PageHero>

    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, text }) => <li key={text} className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold"><Icon className="h-5 w-5 shrink-0 text-primary" />{text}</li>)}
      </ul>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">{plans.map(plan => <article key={plan.name} className={`relative flex flex-col rounded-xl border p-6 ${plan.featured ? 'border-primary bg-card shadow-xl ring-1 ring-primary' : 'border-border bg-card'}`}>
        {plan.featured && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">RECOMMENDED</span>}
        <h2 className="text-2xl font-bold">{plan.name}</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.intro}</p>
        <div className="my-6"><span className="text-4xl font-bold">{plan.price}</span><span className="ml-1 text-sm text-muted-foreground">/ {plan.note}</span><p className="mt-1 text-xs text-muted-foreground">{plan.name === 'Enterprise' ? 'Quoted for your sites and requirements' : 'Billed monthly in USD · tailored to your cameras and hours'}</p></div>
        <ul className="space-y-3 text-sm">{plan.features.map(feature => <li key={feature} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}</ul>
        <Link href="/contact" className={`mt-8 block rounded-md px-4 py-3 text-center text-sm font-semibold ${plan.featured ? 'bg-primary text-primary-foreground hover:bg-accent' : 'border border-border hover:bg-secondary'}`}>{plan.cta}</Link>
      </article>)}</div>
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted-foreground">Prices are per site (one store location) per month for 24/7 monitoring. The monthly price for your site is tailored to the number of cameras and active monitoring hours, and confirmed in writing before you pay.</p>
    </section>

    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">How your subscription works</p>
        <h2 className="mt-3 text-3xl font-bold">From consultation to monthly monitoring in four steps.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => <li key={title} className="rounded-xl border border-border bg-background p-6"><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-primary" /><span className="text-sm font-bold tabular-nums text-muted-foreground">0{i + 1}</span></div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></li>)}
        </ol>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold">Pricing questions</h2>
      <dl className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map(f => <div key={f.q} className="p-6"><dt className="font-semibold">{f.q}</dt><dd className="mt-2 text-sm leading-6 text-muted-foreground">{f.a}</dd></div>)}
      </dl>
      <p className="mt-8 text-sm leading-6 text-muted-foreground">The 30-second figure is a target for our team to begin its response when an actionable incident is detected. Law-enforcement contact is available only where appropriate, authorized and covered by the agreed plan; it does not guarantee a police response. Full details are in our <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">Terms &amp; Conditions</Link>, <Link href="/refund-policy" className="underline underline-offset-4 hover:text-foreground">Refund Policy</Link> and <Link href="/cancellation-policy" className="underline underline-offset-4 hover:text-foreground">Cancellation Policy</Link>.</p>
    </section>
  </>
}
