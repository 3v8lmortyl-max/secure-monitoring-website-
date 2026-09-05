import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BellRing, CheckCircle2, ClipboardCheck, Clock3, PhoneCall, ShieldCheck, Users } from 'lucide-react'

const capabilities = [
  { icon: Users, title: 'Human-led monitoring', text: 'Operators review connected camera feeds and apply agreed procedures when an incident needs attention.' },
  { icon: BellRing, title: 'Response coordination', text: 'We contact designated employees and coordinate through WhatsApp when action is required.' },
  { icon: ClipboardCheck, title: 'Incident reporting', text: 'Clear incident records help your team understand what happened and what was communicated.' },
]

export default function Home() {
  return <div>
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,oklch(0.4_0.12_250_/_0.2),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-[0.16em] text-primary uppercase"><span className="h-px w-8 bg-primary" /> Managed security operations</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Security operations that respond when it matters.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Connect existing camera infrastructure to a professional, human-led monitoring operation for incident detection, response coordination, escalation, and reporting.</p>
          <div className="mt-7 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p><strong>30-second response target.</strong> When an actionable incident is detected, our monitoring team targets response initiation within 30 seconds.</p></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-accent">View plans <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 font-semibold hover:bg-secondary">Book a consultation</Link></div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-border shadow-2xl lg:min-h-full"><Image src="/professional-control-room-with-operators-monitorin.jpg" alt="Professional monitoring operators in a control room" fill className="object-cover" priority /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6 pt-20"><p className="text-sm font-semibold">Human monitoring. Clear operational communication.</p></div></div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">What we do</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">A managed operational service—not another dashboard.</h2><p className="mt-4 leading-7 text-muted-foreground">Secure Monitoring supports the people and procedures behind your cameras. Our work focuses on the operational moment: identifying what needs attention, starting the right response, and documenting the outcome.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{capabilities.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-border bg-card p-6"><Icon className="h-8 w-8 text-primary" /><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
    </section>

    <section className="border-y border-border bg-card"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">How operations work</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">A response path your team can understand.</h2></div><Link href="/operations" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Explore operations <ArrowRight className="h-4 w-4" /></Link></div><ol className="mt-12 grid gap-4 md:grid-cols-4">{[['01','Detection','Connected camera feeds are monitored for actionable incidents.'],['02','Verification','An operator reviews the situation against agreed procedures.'],['03','Response & escalation','Designated employees are contacted; authorized escalation follows the plan.'],['04','Reporting','The incident and operational communications are documented.']].map(([n,t,d])=><li key={n} className="rounded-lg border border-border bg-background p-5"><span className="text-sm font-bold text-primary">{n}</span><h3 className="mt-5 font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p></li>)}</ol></div></section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">Built around real operations</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Coverage for the moments that need a response.</h2></div><div className="grid gap-3 sm:grid-cols-2">{['Employee monitoring','Shoplifting monitoring','Night camera monitoring','Incident response','WhatsApp operational communication','Incident reporting'].map(item=><div key={item} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4 text-sm font-medium"><CheckCircle2 className="h-5 w-5 text-primary" />{item}</div>)}</div></div></section>

    <section className="bg-primary py-16 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"><div><h2 className="text-3xl font-bold">Bring your monitoring requirements to the table.</h2><p className="mt-2 max-w-2xl text-primary-foreground/80">Discuss existing cameras, escalation preferences, coverage, and reporting needs with our team.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-background px-5 py-3 font-semibold text-foreground hover:bg-background/90"><PhoneCall className="h-4 w-4" /> Book a consultation</Link></div></section>
  </div>
}