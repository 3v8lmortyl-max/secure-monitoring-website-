import type { Metadata } from 'next'
import Link from 'next/link'
import { ClipboardCheck, FileText, KeyRound, PhoneCall, SearchCheck, Settings2, Video } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { JsonLd } from '@/components/json-ld'
import { CheckList, CtaBand, DataTable } from '@/components/content-blocks'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'

const title = 'How Remote CCTV Monitoring Works'
const description = 'Step by step: how Secure Monitoring connects to your existing cameras, watches them live, alerts your staff, escalates incidents and reports what happened.'
export const metadata: Metadata = pageMetadata({ title, description, path: '/how-it-works' })

const steps = [
  { icon: SearchCheck, title: 'Consultation and camera review', text: 'We discuss your store, your risks and your existing system, then confirm that your cameras support secure remote viewing.' },
  { icon: KeyRound, title: 'Secure, authorized access', text: 'You create a separate view-only user for us on your NVR, DVR or camera app. You stay in control and can revoke access at any time.' },
  { icon: Settings2, title: 'Monitoring plan', text: 'Together we agree on monitoring hours, priority cameras, what counts as an incident, your designated contacts and your escalation order.' },
  { icon: Video, title: 'Live monitoring', text: 'Trained operators watch your feeds during the agreed hours, with extra attention on priority cameras such as entrances and registers.' },
  { icon: PhoneCall, title: 'Alert and escalation', text: 'When something needs attention, we target beginning our response within 30 seconds by calling or messaging your designated contact, then follow your escalation path.' },
  { icon: FileText, title: 'Logs and reports', text: 'Every incident, alert and contact attempt is logged with the time and camera, and summaries are sent by email or WhatsApp on your schedule.' },
  { icon: ClipboardCheck, title: 'Review and adjust', text: 'We review patterns with you and adjust priority cameras, hours or procedures as your store changes.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: '/how-it-works' })} />
      <PageHero eyebrow="How it works" title="How remote CCTV monitoring works" breadcrumbs={[{ name: 'How It Works', path: '/how-it-works' }]}>
        <p>Remote CCTV monitoring connects your store’s existing cameras to trained operators who watch them live and alert your team when something needs attention. Here is exactly how Secure Monitoring does it, from the first call to daily reports.</p>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our monitoring process in seven steps</h2>
        <ol className="mt-8 space-y-4">
          {steps.map(({ icon: Icon, title: t, text }, i) => (
            <li key={t} className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-[3rem_1fr]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-6 w-6" aria-hidden /></div>
              <div><p className="text-sm font-bold text-primary">Step {i + 1}</p><h3 className="mt-1 text-xl font-semibold">{t}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What kind of monitoring this is</h2>
          <p className="mt-4 leading-7 text-muted-foreground">“Remote monitoring” can mean very different things. Secure Monitoring provides live human monitoring only.</p>
          <DataTable rows={[
            ['Approach', 'What it means', 'Secure Monitoring'],
            ['Live human monitoring', 'A person actively watches live feeds during agreed hours.', 'Yes. This is our service.'],
            ['Event-based monitoring', 'Someone looks only after an alarm or motion trigger.', 'No'],
            ['AI-assisted analytics', 'Software flags people or objects automatically.', 'No'],
            ['Automated alerts', 'Notifications are sent without a person checking.', 'No. Every alert is checked by a person.'],
          ]} />
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Who does the monitoring</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Secure Monitoring is an India-based business. Our monitoring team works from India and serves US retail clients remotely. We have no US offices or US-based staff. Overnight hours in the United States fall during the working day in India, which makes round-the-clock coverage practical. All communication is in English.</p>
          <p className="mt-4 leading-7 text-muted-foreground">Access to your feeds is limited to the operators assigned to your account, who are bound by confidentiality obligations. See our <Link href="/privacy" className="text-primary underline underline-offset-4">Privacy Policy</Link>.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Escalation and law enforcement</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Your escalation list sets who we contact and in what order, for example the cashier on shift, then the manager, then the owner. On the Professional plan, and only where you have authorized it, the procedure can include contacting local law enforcement.</p>
          <p className="mt-4 leading-7 text-muted-foreground">We are not an emergency service and cannot guarantee a police response. In an emergency, staff on site should call 911 directly.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <CheckList title="What you need" items={['A CCTV system that supports secure remote viewing', 'A stable internet connection at the store', 'A view-only user account for our team', 'Designated contacts who can answer during monitoring hours', 'Audio disabled on shared feeds']} />
        <CheckList title="Limits of remote monitoring" tone="note" items={['We can only see what your cameras show', 'Video only, with no audio and no talk-down speakers', 'No guards, patrols or dispatch', 'Monitoring supports loss prevention but cannot guarantee prevention', 'The 30-second figure is a target to begin our response, not a guarantee of outcome']} />
      </section>
      <CtaBand />
    </>
  )
}
