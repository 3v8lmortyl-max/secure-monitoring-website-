import Image from 'next/image'
import Link from 'next/link'
import { Shield, Clock, Users, AlertCircle } from 'lucide-react'
import { Testimonials } from '@/components/testimonials'

export default function Home() {
  const benefits = [
    {
      icon: Clock,
      title: 'Real-Time Threat Detection',
      description: 'Our trained operators monitor your feeds 24/7 to identify threats instantly.'
    },
    {
      icon: AlertCircle,
      title: 'Incident Escalation',
      description: 'Fast escalation process ensures quick response to security incidents.'
    },
    {
      icon: Users,
      title: 'Dedicated Operators',
      description: 'Professional human operators with strict SOPs and extensive training.'
    },
    {
      icon: Shield,
      title: 'Night Surveillance',
      description: 'Complete surveillance coverage including 24/7 night monitoring.'
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-card to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                24/7 Professional CCTV Monitoring You Can Depend On
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Human-based surveillance monitoring with no AI, no automation. Just dedicated professionals watching your cameras, protecting your assets, around the clock.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-accent text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Contact Us Today
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/professional-control-room-with-operators-monitorin.jpg"
                alt="Control room with professional operators monitoring CCTV feeds"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Human Monitoring?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our experienced operators provide intelligent, real-time monitoring that AI simply cannot replicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Protect Your Property?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with our team today to learn how Secure Monitoring can protect what matters most to you.
          </p>
          <Link
            href="/contact"
            className="bg-primary hover:bg-accent text-primary-foreground px-10 py-4 rounded-lg font-bold transition-colors inline-block text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}
