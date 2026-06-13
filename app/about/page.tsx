import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export default function About() {
  const highlights = [
    'Dedicated 24/7 control room operations',
    'Professionally trained security operators',
    'Strict Standard Operating Procedures (SOPs)',
    'Privacy-compliant monitoring',
    'Industry-leading response times',
    'Zero automation or AI involvement'
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-card to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Secure Monitoring</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We are a dedicated remote surveillance operations company providing professional, human-based CCTV monitoring services.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Secure Monitoring exists to provide reliable, professional CCTV monitoring services that property owners can depend on. We believe in the irreplaceable value of human judgment and expertise in security operations.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                With our team of trained professionals working around the clock, we ensure your property is protected by real people who care about your security.
              </p>
            </div>
            <Image
              src="/professional-security-operations-center-with-train.jpg"
              alt="Professional security operations"
              width={500}
              height={400}
              className="rounded-lg shadow-xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Image
              src="/24-7-security-monitoring-control-room.jpg"
              alt="24/7 control room"
              width={500}
              height={400}
              className="rounded-lg shadow-xl border border-border order-2 md:order-1"
            />
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Human Monitoring Matters</h2>
              <ul className="space-y-4">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <span className="text-lg text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Operations Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-4xl font-bold text-primary mb-4">24/7</div>
              <h3 className="font-bold text-xl mb-4">Round-The-Clock Operations</h3>
              <p className="text-muted-foreground">Our control room never sleeps. Professional operators monitor feeds at all hours, including overnight surveillance.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-4xl font-bold text-primary mb-4">100%</div>
              <h3 className="font-bold text-xl mb-4">Human-Powered</h3>
              <p className="text-muted-foreground">No AI, no automation, no machine learning. Just trained professionals making intelligent decisions in real-time.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-4xl font-bold text-primary mb-4">∞</div>
              <h3 className="font-bold text-xl mb-4">Reliable</h3>
              <p className="text-muted-foreground">Consistent, dependable service backed by strict SOPs and dedicated staff committed to your security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
