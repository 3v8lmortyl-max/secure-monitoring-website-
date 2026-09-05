'use client'

import Link from 'next/link'
import { Menu, Shield, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Operations', href: '/operations' },
  { label: 'Professional Services', href: '/professional-services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Shield className="h-5 w-5" /></span>
          <span className="text-sm font-bold tracking-wide sm:text-base">SECURE MONITORING</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">{navItems.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{item.label}</Link>)}</div>
        <Link href="/contact" className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent sm:inline-flex">Book a Consultation</Link>
        <button type="button" className="inline-flex rounded-md p-2 text-foreground lg:hidden" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>
      {isOpen && <div id="mobile-navigation" className="border-t border-border bg-background px-4 py-3 lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-1">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">{item.label}</Link>)}<Link href="/contact" onClick={() => setIsOpen(false)} className="mt-2 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">Book a Consultation</Link></div></div>}
    </header>
  )
}