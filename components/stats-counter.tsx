'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 24, suffix: '/7', label: 'Hours Active', sublabel: 'Every single day' },
  { value: 100, suffix: '%', label: 'Human-Powered', sublabel: 'Zero automation' },
  { value: 60, suffix: 's', label: 'Response Time', sublabel: 'Avg. incident escalation' },
  { value: 500, suffix: '+', label: 'Cameras Monitored', sublabel: 'Across all clients' },
]

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatItem({ value, suffix, label, sublabel, delay }: typeof stats[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(value, 2000, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="text-center reveal"
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="text-5xl lg:text-6xl font-bold font-mono stat-number mb-2">
        {count}{suffix}
      </div>
      <div className="font-semibold text-sm tracking-wider uppercase mb-1">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  )
}

export function StatsCounter() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
      {stats.map((s, i) => (
        <StatItem key={i} {...s} delay={i} />
      ))}
    </div>
  )
}
