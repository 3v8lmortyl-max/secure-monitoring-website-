import type { ReactNode } from 'react'
import Link from 'next/link'
import { Building2, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE, POLICIES_LAST_UPDATED, POLICY_LINKS } from '@/lib/business'

export type LegalSection = { id: string; title: string; content: ReactNode }

// Typography for policy body text. The Tailwind typography plugin is not installed,
// so descendant styles are applied explicitly here.
const bodyStyles =
  'space-y-4 text-[15px] leading-7 text-muted-foreground ' +
  '[&_strong]:font-semibold [&_strong]:text-foreground ' +
  '[&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground ' +
  '[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 ' +
  '[&_li]:pl-1 [&_li::marker]:text-primary ' +
  '[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-primary [&_a]:underline-offset-4 hover:[&_a]:decoration-2'

// Inline contact sentence used in policy text: email plus both phone numbers.
export function ContactLine() {
  return <>email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>, or call <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a> (also WhatsApp) or <a href={BUSINESS.phone2Href}>{BUSINESS.phone2}</a></>
}

export function LegalPage({ title, summary, path, sections }: { title: string; summary: ReactNode; path: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">Legal</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <div className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{summary}</div>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex gap-2"><dt className="text-muted-foreground">Last updated:</dt><dd className="font-medium">{POLICIES_LAST_UPDATED}</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground">Business:</dt><dd className="font-medium">{BUSINESS.name} ({BUSINESS.legalStructure})</dd></div>
            <div className="flex gap-2"><dt className="text-muted-foreground">Udyam Reg. No.:</dt><dd className="font-medium">{BUSINESS.udyamNumber}</dd></div>
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="On this page" className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">On this page</p>
            <ol className="mt-3 space-y-1.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`} className="flex gap-2 rounded py-0.5 text-muted-foreground hover:text-foreground"><span className="w-5 shrink-0 tabular-nums text-primary">{i + 1}.</span>{s.title}</a></li>
              ))}
            </ol>
          </nav>
          <nav aria-label="Other policies" className="mt-4 rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Policies</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {POLICY_LINKS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} aria-current={p.href === path ? 'page' : undefined} className={`flex items-center gap-2 py-0.5 ${p.href === path ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><FileText className="h-3.5 w-3.5 text-primary" />{p.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-border py-8 first:pt-0 last:border-b-0">
              <h2 className="flex gap-3 text-xl font-bold tracking-tight sm:text-2xl"><span className="tabular-nums text-primary">{i + 1}.</span>{s.title}</h2>
              <div className={`mt-4 ${bodyStyles}`}>{s.content}</div>
            </section>
          ))}

          <section aria-labelledby="business-details" className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-7">
            <h2 id="business-details" className="flex items-center gap-2 text-lg font-bold"><Building2 className="h-5 w-5 text-primary" />Business details</h2>
            <dl className="mt-5 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <div><dt className="text-muted-foreground">Business name</dt><dd className="mt-1 font-medium">{BUSINESS.name}</dd></div>
              <div><dt className="text-muted-foreground">Proprietor</dt><dd className="mt-1 font-medium">{BUSINESS.proprietor}</dd></div>
              <div><dt className="text-muted-foreground">Legal structure</dt><dd className="mt-1 font-medium">{BUSINESS.legalStructure}</dd></div>
              <div><dt className="text-muted-foreground">Udyam (MSME) registration</dt><dd className="mt-1 font-medium">{BUSINESS.udyamNumber}</dd></div>
              <div><dt className="text-muted-foreground">Business activity</dt><dd className="mt-1 font-medium">{BUSINESS.activity}</dd></div>
              <div className="sm:col-span-2"><dt className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />Registered address</dt><dd className="mt-1 font-medium">{BUSINESS_ADDRESS_ONE_LINE}</dd></div>
              <div><dt className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3.5 w-3.5" />Email</dt><dd className="mt-1 font-medium"><a href={`mailto:${BUSINESS.email}`} className="break-all hover:text-primary">{BUSINESS.email}</a></dd></div>
              <div><dt className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3.5 w-3.5" />Phone</dt><dd className="mt-1 space-y-0.5 font-medium"><a href={BUSINESS.phoneHref} className="block hover:text-primary">{BUSINESS.phone} <span className="font-normal text-muted-foreground">(also WhatsApp)</span></a><a href={BUSINESS.phone2Href} className="block hover:text-primary">{BUSINESS.phone2}</a></dd></div>
            </dl>
          </section>
        </article>
      </div>
    </>
  )
}
