'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BadgeCheck, Mail, Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { BUSINESS } from '@/lib/business'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center gap-3" onClick={onClick}>
      <Image src="/logo-mark.webp" alt="" width={240} height={155} priority className="h-9 w-auto sm:h-10" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold italic tracking-wide sm:text-base">SECURE</span>
        <span className="text-[15px] font-extrabold italic tracking-wide sm:text-base">MONITORING</span>
      </span>
    </Link>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="hidden border-b border-border/60 bg-card/60 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-primary" />Udyam-registered MSME, India<span className="hidden lg:inline"> · Remote CCTV monitoring for US retail businesses</span></p>
          <div className="flex items-center gap-5">
            <a href={BUSINESS.phoneHref} className="flex items-center gap-1.5 hover:text-foreground"><Phone className="h-3.5 w-3.5" />{BUSINESS.phone}</a>
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-1.5 hover:text-foreground"><Mail className="h-3.5 w-3.5" />{BUSINESS.email}</a>
          </div>
        </div>
      </div>
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Logo onClick={() => setIsOpen(false)} />
        <div className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${isActive(item.href) ? 'text-foreground' : 'text-muted-foreground'}`}>{item.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/contact#quote-form" className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent sm:inline-flex">Start Free Trial</Link>
          <button type="button" className="inline-flex rounded-md p-2 text-foreground xl:hidden" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {isOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background px-4 py-3 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} aria-current={isActive(item.href) ? 'page' : undefined} className={`rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary ${isActive(item.href) ? 'bg-secondary' : ''}`}>{item.label}</Link>)}
            <Link href="/contact#quote-form" onClick={() => setIsOpen(false)} className="mt-2 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">Start Free Trial</Link>
          </div>
        </div>
      )}
    </header>
  )
}
