import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { QuoteForm } from '@/components/quote-form'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from '@/lib/business'

const title = 'Contact Us: Free Trial & Custom Quote'
const description = 'Request a 7-day free trial or a custom remote CCTV monitoring quote for your US retail store. Contact Secure Monitoring by form, email, phone or WhatsApp.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/contact' })

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/contact', type: 'ContactPage' })} />
      <PageHero eyebrow="Contact" title="Start a free trial or get a custom quote" breadcrumbs={[{ name: 'Contact', path: '/contact' }]}>
        <p>Tell us about your store, cameras and the hours you need covered. We will confirm compatibility, recommend a plan and set up your 7-day free trial. No card is needed.</p>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <QuoteForm />
        <aside className="space-y-4">
          <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"><MessageCircle className="h-6 w-6 shrink-0 text-primary" aria-hidden /><div><h2 className="font-semibold">WhatsApp</h2><p className="mt-1 text-sm text-muted-foreground">{BUSINESS.phone}</p></div></a>
          <div className="flex gap-4 rounded-xl border border-border bg-card p-5"><Phone className="h-6 w-6 shrink-0 text-primary" aria-hidden /><div><h2 className="font-semibold">Call us</h2><p className="mt-1 space-y-0.5 text-sm"><a href={BUSINESS.phoneHref} className="block text-muted-foreground hover:text-foreground">{BUSINESS.phone}</a><a href={BUSINESS.phone2Href} className="block text-muted-foreground hover:text-foreground">{BUSINESS.phone2}</a></p></div></div>
          <a href={`mailto:${BUSINESS.email}`} className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"><Mail className="h-6 w-6 shrink-0 text-primary" aria-hidden /><div className="min-w-0"><h2 className="font-semibold">Email</h2><p className="mt-1 break-all text-sm text-muted-foreground">{BUSINESS.email}</p></div></a>
          <div className="flex gap-4 rounded-xl border border-border bg-card p-5"><Clock className="h-6 w-6 shrink-0 text-primary" aria-hidden /><div><h2 className="font-semibold">Response time</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">We aim to reply to enquiries within one business day. Our team is based in India (IST, UTC+5:30).</p></div></div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold"><MapPin className="h-5 w-5 text-primary" aria-hidden /> Business details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div><dt className="text-muted-foreground">Business</dt><dd>{BUSINESS.name} ({BUSINESS.legalStructure})</dd></div>
              <div><dt className="text-muted-foreground">Proprietor</dt><dd>{BUSINESS.proprietor}</dd></div>
              <div><dt className="text-muted-foreground">Udyam registration</dt><dd>{BUSINESS.udyamNumber}</dd></div>
              <div><dt className="text-muted-foreground">Registered address</dt><dd>{BUSINESS_ADDRESS_ONE_LINE}</dd></div>
            </dl>
          </div>
        </aside>
      </section>
    </>
  )
}
