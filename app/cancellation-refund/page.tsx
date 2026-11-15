import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Ban, RotateCcw } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = { title: 'Cancellation & Refunds', description: 'Summary of Secure Monitoring’s cancellation and refund policies for monthly remote CCTV monitoring subscriptions.' }

const cards = [
  { href: '/cancellation-policy', icon: Ban, title: 'Cancellation Policy', points: ['7-day free trial, no card required', 'Month-to-month, no cancellation fee', 'Cancel by email or WhatsApp at any time', 'Give 3 business days’ notice before your next billing date', 'Service runs to the end of the paid month'] },
  { href: '/refund-policy', icon: RotateCcw, title: 'Refund Policy', points: ['No charge during the free trial', '100% refund if cancelled before paid service starts', 'Full refund of duplicate or incorrect charges', 'Pro-rata refund if service is not delivered because of us', 'Refunds initiated within 5–7 business days of approval'] },
]

export default function CancellationRefundPage() {
  return <><PageHero eyebrow="Legal" title="Cancellation & Refunds">Our cancellation and refund terms are set out in two separate policies. A summary of each is below. The full policy applies.</PageHero><section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">{cards.map(({ href, icon: Icon, title, points }) => <Link key={href} href={href} className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary"><Icon className="h-8 w-8 text-primary" /><h2 className="mt-5 text-2xl font-bold">{title}</h2><ul className="mt-4 flex-1 space-y-2 text-sm leading-6 text-muted-foreground">{points.map(p => <li key={p} className="flex gap-2"><span className="text-primary">•</span>{p}</li>)}</ul><span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read the full policy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span></Link>)}</section></>
}
