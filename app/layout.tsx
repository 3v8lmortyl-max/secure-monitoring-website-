import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: { default: 'Secure Monitoring | Managed Security Operations', template: '%s | Secure Monitoring' },
  description: 'Human-led managed security operations for incident monitoring, response coordination, escalation, and reporting.',
  openGraph: { title: 'Secure Monitoring | Managed Security Operations', description: 'Human-led monitoring, incident response, escalation, and reporting.', type: 'website' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}><ThemeProvider attribute="class" defaultTheme="dark"><Navigation /><main>{children}</main><Footer /></ThemeProvider><Analytics /></body></html>
}