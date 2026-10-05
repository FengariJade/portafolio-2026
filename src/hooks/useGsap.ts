'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook that reveals elements when they enter the viewport.
 * Usage:
 *   const ref = useGsapReveal()
 *   <section ref={ref}> ...children with data-reveal attribute... </section>
 *
 * Add  data-reveal=""  to any child element you want animated.
 * Optional: data-reveal-delay="0.2"  to stagger
 */
export function useGsapReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * Hook for a GSAP timeline that plays once on mount.
 * Used in the Hero section.
 */
export function useGsapHero() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('[data-hero-line]',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.15 }
      )
      .fromTo('[data-hero-name]',
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        '-=0.4'
      )
      .fromTo('[data-hero-role]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo('[data-hero-info]',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      )
      .fromTo('[data-hero-btn]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo('[data-hero-deco]',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
        '-=0.6'
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
