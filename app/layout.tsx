import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RevealInit } from '@/components/reveal-init'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Secure Monitoring — 24/7 Professional CCTV Monitoring',
    template: '%s | Secure Monitoring',
  },
  description:
    'Professional human-based CCTV monitoring services 24/7. Real operators. No AI. Instant threat detection and incident escalation for retail, warehouses, offices and more.',
  keywords: [
    '24/7 CCTV monitoring', 'remote security monitoring', 'human monitoring',
    'professional surveillance', 'retail security', 'live monitoring service',
    'security operations center', 'CCTV operators', 'incident escalation',
  ],
  openGraph: {
    type: 'website',
    url: 'https://securemonitoring24hr.com',
    title: 'Secure Monitoring — 24/7 Professional CCTV Monitoring',
    description: 'Real human operators monitoring your cameras 24/7. No AI, no automation. Instant response.',
    siteName: 'Secure Monitoring',
    images: [{ url: '/professional-control-room-with-operators-monitorin.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Monitoring — 24/7 Professional CCTV Monitoring',
    description: 'Real human operators monitoring your cameras 24/7.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://securemonitoring24hr.com'),
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SecurityService',
  name: 'Secure Monitoring',
  url: 'https://securemonitoring24hr.com',
  description: 'Professional 24/7 human-based CCTV monitoring services. Real-time threat detection and incident escalation.',
  telephone: '+919392525869',
  email: 'securemonitoring24hr@gmail.com',
  sameAs: ['https://instagram.com/secure.monitoring'],
  areaServed: { '@type': 'Country', name: 'India' },
  availableLanguage: 'English',
  openingHours: 'Mo-Su 00:00-24:00',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <Navigation />
          <main>{children}</main>
          <Footer />
          <RevealInit />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
