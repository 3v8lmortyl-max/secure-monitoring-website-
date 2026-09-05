import type { Metadata } from 'next'
import Link from 'next/link'
import { ClipboardList, Network, Route, Settings2, ShieldCheck, Workflow } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = { title: 'Professional Security Services', description: 'Consultation-based support for CCTV monitoring setup, operational workflows, and incident escalation procedures.' }
const services = [
 [ShieldCheck, 'CCTV infrastructure assessment', 'Review existing camera coverage and discuss readiness for a monitoring operation.'],
 [Network, 'Monitoring setup & integration', 'Plan how available camera feeds can connect to the operational monitoring workflow.'],
 [Workflow, 'Security workflow design', 'Define the people, decisions, and communication points that support response.'],
 [ClipboardList, 'Monitoring procedure & SOP design', 'Develop consultation-based procedures for monitoring and incident handling.'],
 [Route, 'Incident escalation workflow design', 'Clarify designated contacts and when escalation should happen.'],
 [Settings2, 'Operational reporting', 'Discuss a reporting approach that supports follow-up and management review.'],
] as const

export default function ProfessionalServicesPage() {
 return <><PageHero eyebrow="Professional services" title="Consultation-based support for stronger security operations.">For teams building or refining their monitoring process, we can discuss the operational design around cameras, procedures, escalation, and reporting.</PageHero><section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(([Icon,title,text])=><article key={title} className="rounded-xl border border-border bg-card p-6"><Icon className="h-7 w-7 text-primary" /><h2 className="mt-4 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div><div className="mt-14 border-l-2 border-primary pl-6"><h2 className="text-2xl font-bold">Start with your current environment.</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">A consultation is the right place to discuss your existing cameras, operating context, team contacts, and the outcome you need from monitoring.</p><Link href="/contact" className="mt-5 inline-flex rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-accent">Book a consultation</Link></div></section></>
}