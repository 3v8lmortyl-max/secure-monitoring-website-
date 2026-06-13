'use client'

import { useEffect } from 'react'

export function RevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements.forEach((el) => observer.observe(el))

    // Re-observe on dynamic content
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in)')
        .forEach((el) => observer.observe(el))
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
