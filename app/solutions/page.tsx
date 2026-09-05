import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BellRing, ClipboardCheck, Moon, ShieldAlert, Users } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = { title: 'Security Monitoring Solutions', description: 'Human-led security monitoring, incident response, operational communication, and reporting.' }

const solutions = [
  { icon: Users, title: 'Employee monitoring', text: 'Support oversight of employee activity through agreed monitoring procedures and clear incident communication.' },
  { icon: ShieldAlert, title: 'Shoplifting monitoring', text: 'When an incident is detected, operators can contact designated employees by phone so your team can respond appropriately.' },
  { icon: Moon, title: 'Night camera monitoring', text: 'Extend operational attention into the periods when your team may be off site or less available.' },
  { icon: BellRing, title: 'Incident response', text: 'Human operators initiate the agreed response path when an actionable incident needs attention.' },
  { icon: ClipboardCheck, title: 'Incident reporting', text: 'Documented incident information helps teams follow up and review what was communicated.' },
  { icon: ArrowRight, title: 'WhatsApp operations', text: 'Use WhatsApp for practical, timely coordination with your designated employees.' },
]

export default function SolutionsPage() {
 return <><PageHero eyebrow="Solutions" title="Monitoring that connects detection to practical action.">We provide operational support around your existing camera infrastructure—helping teams respond, communicate, and document incidents with more consistency.</PageHero><section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{solutions.map(({icon: Icon,title,text})=><article key={title} className="rounded-xl border border-border bg-card p-6"><Icon className="h-8 w-8 text-primary" /><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div><div className="mt-12 rounded-xl border border-primary/30 bg-primary/10 p-7 sm:flex sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold">Every site needs an agreed response path.</h2><p className="mt-2 max-w-2xl text-sm text-muted-foreground">We discuss your contacts, communication preferences, and escalation procedures before operations begin.</p></div><Link href="/contact" className="mt-5 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground sm:mt-0">Discuss your requirements</Link></div></section></>
}