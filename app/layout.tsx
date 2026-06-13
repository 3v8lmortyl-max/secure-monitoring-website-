import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Secure Monitoring — 24/7 Professional CCTV Monitoring',
  description: 'Professional human-based CCTV monitoring services 24/7. Real operators. No AI. Instant threat detection and incident escalation.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: 'https://securemonitoring24hr.com',
    title: 'Secure Monitoring — 24/7 Professional CCTV Monitoring',
    description: 'Real human operators monitoring your cameras 24/7. No AI, no automation.',
    siteName: 'Secure Monitoring',
    images: [{ url: '/professional-control-room-with-operators-monitorin.jpg', width: 1200, height: 630 }],
  },
  metadataBase: new URL('https://securemonitoring24hr.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
