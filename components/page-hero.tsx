import type { ReactNode } from 'react'

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="border-b border-border bg-card"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"><p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">{eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1><div className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{children}</div></div></section>
}