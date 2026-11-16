import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { ThirdPartyAnalytics } from '@/components/analytics'
import { BUSINESS } from '@/lib/business'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.website),
  title: { default: 'Remote Video Monitoring for US Retail Stores | Secure Monitoring', template: '%s | Secure Monitoring' },
  description: 'Live, human-led remote CCTV monitoring for US retail stores using your existing cameras.',
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: BUSINESS.website }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { type: 'website', siteName: BUSINESS.name, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
  },
}

export const viewport: Viewport = { themeColor: '#000000', colorScheme: 'dark' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <ThirdPartyAnalytics />
      </body>
    </html>
  )
}
