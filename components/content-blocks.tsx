import Link from 'next/link'
import { ArrowRight, Check, Info } from 'lucide-react'
import type { ContentSection, FAQ } from '@/lib/content-types'

export function SectionBlock({ section, id }: { section: ContentSection; id?: string }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.heading}</h2>
      {section.paragraphs?.map((p, i) => <p key={i} className="mt-4 leading-7 text-muted-foreground">{p}</p>)}
      {section.bullets && (
        <ul className="mt-5 space-y-3">
          {section.bullets.map((b) => <li key={b} className="flex gap-3 leading-7"><Check className="mt-1.5 h-4 w-4 shrink-0 text-primary" aria-hidden /><span>{b}</span></li>)}
        </ul>
      )}
      {section.table && <DataTable rows={section.table} />}
    </section>
  )
}

export function DataTable({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead className="bg-secondary/40"><tr>{head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{body.map((r, i) => <tr key={i} className="border-t border-border align-top">{r.map((c, j) => j === 0 ? <th key={j} scope="row" className="px-4 py-3 font-medium">{c}</th> : <td key={j} className="px-4 py-3 leading-6 text-muted-foreground">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export function FaqList({ faqs, heading = 'Frequently asked questions' }: { faqs: FAQ[]; heading?: string }) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden" open>
            <summary className="cursor-pointer list-none font-semibold"><h3 className="inline">{f.q}</h3></summary>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function CheckList({ title, items, tone = 'default' }: { title: string; items: string[]; tone?: 'default' | 'note' }) {
  return (
    <div className={`rounded-xl border p-6 ${tone === 'note' ? 'border-border bg-secondary/30' : 'border-primary/30 bg-primary/5'}`}>
      <h2 className="flex items-center gap-2 text-lg font-bold">{tone === 'note' && <Info className="h-5 w-5 text-primary" aria-hidden />}{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm leading-6">
        {items.map((i) => <li key={i} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span className={tone === 'note' ? 'text-muted-foreground' : ''}>{i}</span></li>)}
      </ul>
    </div>
  )
}

export function LinkCards({ title, items }: { title: string; items: { href: string; name: string; text: string }[] }) {
  if (!items.length) return null
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
            <h3 className="font-semibold">{i.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{i.text}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function CtaBand({ title = 'See it working on your own cameras', text = 'Start a 7-day free trial with no card and no setup fees, or ask for a custom quote for your store.' }: { title?: string; text?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-primary-foreground/80">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/contact#quote-form" className="inline-flex items-center justify-center gap-2 rounded-md bg-background px-5 py-3 font-semibold text-foreground hover:bg-background/90">Start free trial <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <Link href="/contact#quote-form" className="inline-flex items-center justify-center rounded-md border border-primary-foreground/40 px-5 py-3 font-semibold hover:bg-primary-foreground/10">Get a custom quote</Link>
        </div>
      </div>
    </section>
  )
}
