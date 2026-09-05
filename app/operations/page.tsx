import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock3, FileText, PhoneCall, SearchCheck, Video } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = { title: 'Security Operations', description: 'An honest view of how Secure Monitoring coordinates human monitoring, response, escalation, and reporting.' }
const steps = [
 { icon: Video, number: '01', title: 'Camera feeds', text: 'Existing camera infrastructure is connected for monitoring according to the agreed service scope.' },
 { icon: SearchCheck, number: '02', title: 'Human monitoring & verification', text: 'An operator reviews a potential incident and follows the agreed operational procedure.' },
 { icon: Clock3, number: '03', title: 'Response & escalation', text: 'Our team targets response initiation within 30 seconds when an actionable incident is detected, then contacts designated employees or follows authorized escalation procedures.' },
 { icon: PhoneCall, number: '04', title: 'Operational communication', text: 'Phone and WhatsApp communication keep the right people informed at the right point in the response.' },
 { icon: FileText, number: '05', title: 'Incident reporting', text: 'Incidents and key operational communications are recorded for follow-up and review.' },
]

export default function OperationsPage() {
 return <><PageHero eyebrow="Operations" title="A human-led operational system around your cameras.">Secure Monitoring is a managed service. We do not present this as proprietary software; our value is in the monitoring operation, procedures, response coordination, and reporting behind it.</PageHero><section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><ol className="space-y-4">{steps.map(({icon: Icon,number,title,text})=><li key={number} className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-[3rem_1fr]"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div><div><p className="text-sm font-bold text-primary">{number}</p><h2 className="mt-1 text-xl font-semibold">{title}</h2><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div></li>)}</ol><aside className="mt-10 rounded-xl bg-secondary/50 p-6"><h2 className="text-lg font-semibold">A note on escalation</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Law-enforcement contact is used only when appropriate, authorized, and included in the agreed plan. It is not a guarantee of police response or incident resolution.</p><Link href="/pricing" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Compare plans →</Link></aside></section></>
}