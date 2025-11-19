'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Why Us', href: '/why-us' },
    { label: 'Contact', href: '/contact' },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-16">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">SM</span>
            </div>
            <span className="font-bold text-lg">Secure Monitoring</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden sm:inline bg-primary hover:bg-accent text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="md:hidden overflow-x-auto pb-2">
          <div className="flex space-x-1 min-w-min px-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => handleNavClick('/contact')}
              className="bg-primary hover:bg-accent text-primary-foreground px-3 py-2 rounded-md font-medium transition-colors text-sm whitespace-nowrap flex-shrink-0"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
