'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LangContext'
import { gsap } from 'gsap'

const INTRO_FONTS = [
  'Aromatron',
  'MyriadPro',
  'Beckan',
  'MinionPro',
  'Pask',
  'Arroy',
  'Aromatron',
  'MyriadPro',
  'Narnia',
]

function AnimatedName({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            data-letter
            className="inline-block"
            style={{ opacity: 0 }}
          >
            {char}
          </span>
        )
      )}
    </span>
  )
}

export default function Hero() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    const nameEl = nameRef.current
    if (!el || !nameEl) return

    const letters = el.querySelectorAll<HTMLSpanElement>('[data-letter]')

    const fixedHeight = nameEl.getBoundingClientRect().height || 160
    nameEl.style.height = `${fixedHeight + 20}px`
    nameEl.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('[data-hero-line-top]',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: 'power2.inOut', transformOrigin: 'right center' },
        0
      )
      tl.fromTo('[data-hero-line-bottom]',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: 'power2.inOut', transformOrigin: 'left center' },
        0
      )

      tl.to(letters, { opacity: 1, duration: 0.1, stagger: 0.03, ease: 'power2.out' }, 0.8)

      const RANDOM_STEPS = 3

      for (let i = 0; i < RANDOM_STEPS; i++) {
        tl.to(letters, { opacity: 0.1, duration: 0.10, ease: 'power1.inOut' }, `+=${i === 0 ? 0.1 : 0.30}`)
          .add(() => {
            letters.forEach((letter) => {
              const font = INTRO_FONTS[Math.floor(Math.random() * INTRO_FONTS.length)]
              letter.style.fontFamily = `'${font}', serif`
            })
          })
          .to(letters, { opacity: 1, duration: 0.10, ease: 'power1.inOut' })
      }

      tl.fromTo('[data-hero-role]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.0
      )
      tl.fromTo('[data-hero-deco]',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        1.1
      )

      tl.to(letters, {
        filter: 'blur(8px)',
        opacity: 0.0,
        duration: 0.25,
        ease: 'power2.in',
      }, '+=0.30')
      .add(() => {
        letters.forEach((letter) => {
          letter.style.fontFamily = `'Narnia', serif`
        })
      })
      .to(letters, {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to top right, #050D1A 0%, #0A1628 5%, #1A1A2E 12%, #1B3A6B 40%, #2563C4 62%, #7A9BBF 80%, #C2D4E4 100%)',
      }}
    >
      {/* ── Decorative icons ───────────────────────────────────────── */}
      
      <div data-hero-deco className="absolute top-8 left-8 opacity-40">
        <Image src="/icons/triangeIsoseles.svg" alt="" width={28} height={28} />
      </div>
      <div data-hero-deco className="absolute bottom-14 right-8 opacity-30">
        <Image src="/icons/TriangleRect.svg" alt="" width={48} height={48} />
      </div>

      {/* ── Lines ─────────────────────────────────────────────────── */}
      <div
        data-hero-line-top
        className="absolute origin-right"
        style={{
          top: 'calc(50% - 7rem)',
          right: 0,
          width: '50%',
          height: '2px',
          background: '#F0F0F0',
        }}
      />
      <div
        data-hero-line-bottom
        className="absolute origin-left"
        style={{
          top: 'calc(50% + 7rem)',
          left: 0,
          width: '50%',
          height: '2px',
          background: '#F0F0F0',
        }}
      />

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ marginTop: '8rem' }}>

        <h1
          ref={nameRef}
          className="uppercase leading-none flex items-center pt-8"
          style={{
            fontSize: 'clamp(4rem, 11vw, 12rem)',
            fontFamily: "'Aromatron', serif",
            letterSpacing: '0.05em',
            color: '#F0F0F0',
          }}
        >
          <AnimatedName text="Kevin Velez" />
        </h1>

        {/* Role — MinionPro weight 500 */}
        <p
          data-hero-role
          className="text-2xl md:text-3xl tracking-widest uppercase mt-14 mb-10"
          style={{
            opacity: 0,
            fontFamily: "'MinionPro', serif",
            fontWeight: 500,
            color: '#F0F0F0',
          }}
        >
          {t('hero.role')}
        </p>

      </div>

      {/* ── Social circles — bottom left ───────────────────────────── */}
      <div className="absolute bottom-10 left-10 flex gap-4 z-10">
        {[
          {
            href: 'mailto:Kevingomezeloy02@gmail.com',
            label: 'Email',
            accent: 'rgba(200,169,122,0.80)',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            ),
          },
          {
            href: 'https://wa.me/51923857961',
            label: 'WhatsApp',
            accent: 'rgba(200,200,200,0.70)',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            ),
          },
          {
            href: 'https://github.com/',
            label: 'GitHub',
            accent: 'rgba(200,200,200,0.70)',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            ),
          },
          {
            href: 'https://linkedin.com/in/',
            label: 'LinkedIn',
            accent: 'rgba(200,200,200,0.70)',
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            ),
          },
        ].map(({ href, label, accent, icon }) => (
          <a
            key={label}
            data-hero-deco
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110"
            style={{
              background: '#0A0A0A',
              border: `2.5px solid ${accent}`,
              opacity: 0,
            }}
          >
            {icon}
          </a>
        ))}
      </div>
    </section>
  )
}