'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const allSlides = [
  {
    name: 'Ewallaú',
    category: 'Diseño UI/UX',
    image: '/image/projects/ewallú.webp',
    descEs: 'Prototipo completo en Figma de una app móvil de turismo comunitario que conecta viajeros con comunidades locales. Permite explorar destinos, compartir experiencias, dejar reseñas y descubrir la cultura de cada lugar, dando visibilidad a comunidades que pocas veces aparecen en el mapa. El flujo cubre desde el onboarding hasta el social feed, escaneo QR y perfil del usuario, bajo una identidad visual colorida que refleja la calidez de las comunidades que representa.',
    descEn: 'Complete Figma prototype of a community tourism mobile app connecting travelers with local communities. Explore destinations, share experiences, leave reviews and discover local culture. Flow covers onboarding through social feed, QR scanning and user profile.',
  },
  {
    name: 'Go Play',
    category: 'Diseño UI/UX',
    image: '/image/projects/GoPlay.webp',
    descEs: 'Prototipo completo de una app móvil deportiva que resuelve el clásico problema de que alguien falte al partido. Go Play permite encontrar y contratar jugadores disponibles, reservar canchas, gestionar pagos con Yape, Plin o tarjeta, y calificar con estrellas a quienes juegan contigo. Todo esto potenciado con gamificación que incentiva la participación y construye una comunidad competitiva. El flujo completo fue prototipado con navegación interactiva sobre una identidad visual oscura en tonos violeta que transmite energía y dinamismo.',
    descEn: 'Complete prototype of a sports mobile app that solves the classic problem of someone missing the game. Go Play lets you find and hire available players, book courts, manage payments with Yape, Plin or card, and rate those you play with. All powered by gamification that incentivizes participation and builds a competitive community.',
  },
  {
    name: 'Bartech',
    category: 'Diseño Gráfico',
    image: '/image/projects/bartechdesign.webp',
    descEs: 'En Bartech, además del desarrollo frontend, participé en la creación de piezas gráficas para comunicación digital: publicaciones para redes sociales, banners promocionales, historias y campañas de mailing. Estas tareas se complementaron con trabajos de maquetación web y apoyo en distintos requerimientos del equipo, lo que me permitió desenvolverme tanto en el área de diseño visual como en el ámbito técnico del desarrollo.',
    descEn: 'At Bartech, in addition to frontend development, I contributed to the creation of graphic pieces for digital communication: social media posts, promotional banners, stories and mailing campaigns. These tasks were complemented with web layout work and support for various team requirements.',
  },
  {
    name: 'Food Prime',
    category: 'Diseño Gráfico',
    image: '/image/projects/foodPrime.webp',
    descEs: 'En Food Prime trabajé en la construcción de su identidad visual para redes sociales, desarrollando piezas gráficas que reforzaran la presencia de la marca y su comunicación con el público. A partir de esta identidad se crearon publicaciones, promociones y materiales visuales que ayudaron a mantener una línea estética consistente mientras la marca evolucionaba en su actividad diaria.',
    descEn: 'At Food Prime I worked on building the brand visual identity for social media, developing graphic pieces that strengthened the brand presence and communication with its audience. Posts, promotions and visual materials were created to maintain a consistent aesthetic while the brand evolved.',
  },
];

export default function DesignSection() {
  const { lang, t } = useLang()
  const ref = useGsapReveal()
  const titleLineRef = useRef<HTMLDivElement>(null)
  const slideContentRef = useRef<HTMLDivElement>(null)

  const blinkRef = useRef<HTMLDivElement>(null)
  const flowerRef = useRef<HTMLDivElement>(null)
  const triangleRef = useRef<HTMLDivElement>(null)

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animating, setAnimating] = useState(false)
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const animateTo = useCallback((index: number) => {
    const el = slideContentRef.current
    if (!el) {
      setCurrent(index)
      return
    }

    setAnimating(true)
    gsap.to(el, {
      opacity: 0,
      x: -30,
      duration: 0.24,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        gsap.fromTo(
          el,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.34,
            ease: 'power2.out',
            onComplete: () => setAnimating(false),
          }
        )
      },
    })
  }, [])

  const goTo = useCallback((index: number) => {
    if (animating) return
    animateTo(index)
  }, [animating, animateTo])

  const next = useCallback(() => {
    goTo((current + 1) % allSlides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + allSlides.length) % allSlides.length)
  }, [current, goTo])

  useEffect(() => {
    if (paused) {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
      return
    }

    autoplayRef.current = setTimeout(() => {
      const nextIndex = (current + 1) % allSlides.length
      const el = slideContentRef.current

      if (el) {
        gsap.to(el, {
          opacity: 0,
          x: -30,
          duration: 0.24,
          ease: 'power2.in',
          onComplete: () => {
            setCurrent(nextIndex)
            gsap.fromTo(el, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.34, ease: 'power2.out' })
          },
        })
        return
      }

      setCurrent(nextIndex)
    }, 4500)

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
    }
  }, [current, paused])

  useEffect(() => {
    const line = titleLineRef.current
    if (!line) return

    gsap.fromTo(
      line,
      { width: 0 },
      {
        width: 'calc(100vw - 100%)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 85%', once: true },
      }
    )

    if (blinkRef.current) {
      gsap.to(blinkRef.current, { y: -20, duration: 4.3, ease: 'sine.inOut', repeat: -1, yoyo: true })
    }
    if (flowerRef.current) {
      gsap.to(flowerRef.current, { y: -16, duration: 6.1, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.4 })
    }
    if (triangleRef.current) {
      gsap.to(triangleRef.current, { y: -12, duration: 5.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.2 })
    }
  }, [])

  const slide = allSlides[current]

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="design" className="section-padding bg-white relative overflow-hidden">
      <div ref={blinkRef} className="absolute bottom-20 left-30 pointer-events-none z-10">
        <Image src="/icons/Blink.svg" alt="" width={126} height={126} />
      </div>
      <div
        ref={flowerRef}
        className="absolute pointer-events-none z-10"
        style={{ top: '32%', right: '40px', transform: 'translateY(-50%)' }}
      >
        <Image src="/icons/Flower.svg" alt="" width={164} height={164} />
      </div>
      {/* <div ref={triangleRef} className="absolute top-14 left-4 pointer-events-none z-10">
        <Image src="/icons/TriangleRect.svg" alt="" width={52} height={52} />
      </div> */}

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="relative flex items-center gap-5 mb-16">
          <div
            ref={titleLineRef}
            className="absolute h-[2px]"
            style={{ width: 0, right: '100%', marginRight: '1.25rem', background: '#2563C4' }}
          />
          <h2
            className="text-5xl md:text-6xl uppercase"
            style={{ fontFamily: "'MinionPro', serif", fontWeight: 700, color: '#2563C4' }}
          >
            {t('design.title')}
          </h2>
        </div>

        <div
          className="rounded-[2.7rem_0_2.7rem_0] px-5 py-7 md:px-8 md:py-9"
          style={{ background: 'linear-gradient(145deg, #050D1A 0%, #0A1628 18%, #1A1A2E 40%, #1B3A6B 68%, #2563C4 100%)' }}
        >
          <div className="relative">
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110"
              style={{
                transform: 'translate(-185%, -50%)',
                background: '#2563C4',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: '#ffffff',
                boxShadow: '0 16px 30px rgba(0,0,0,0.16)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="10,3 5,8 10,13" />
              </svg>
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110"
              style={{
                transform: 'translate(185%, -50%)',
                background: '#2563C4',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: '#ffffff',
                boxShadow: '0 16px 30px rgba(0,0,0,0.16)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,3 11,8 6,13" />
              </svg>
            </button>

            <div ref={slideContentRef} className="flex min-h-[43rem] flex-col">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ fontFamily: "'MyriadPro', sans-serif", color: 'rgba(255,255,255,0.72)' }}
                >
                  {lang === 'es' ? 'Proyecto visual' : 'Visual project'}
                </p>
                <h3
                  className="mt-2 text-4xl md:text-5xl"
                  style={{ fontFamily: "'MinionPro', serif", fontWeight: 700, color: '#ffffff' }}
                >
                  {slide.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-semibold shrink-0"
                  style={{
                    fontFamily: "'MyriadPro', sans-serif",
                    background: 'rgba(255,255,255,0.14)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.22)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {slide.category}
                </span>

                <button
                  onClick={() => setPaused(prevState => !prevState)}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all"
                  style={{
                    fontFamily: "'MyriadPro', sans-serif",
                    background: 'rgba(14, 20, 3, 0.32)',
                    color: 'rgba(255,255,255,0.92)',
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}
                >
                  {paused ? (
                    <>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <polygon points="2,1 9,5 2,9" />
                      </svg>
                      Reanudar
                    </>
                  ) : (
                    <>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <rect x="2" y="1" width="2.5" height="8" rx="0.5" />
                        <rect x="5.5" y="1" width="2.5" height="8" rx="0.5" />
                      </svg>
                      Pausar
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="overflow-hidden rounded-[2.2rem_0_2.2rem_0] border px-4 py-5 md:px-6 md:py-6"
                style={{
                  background: 'rgba(247, 249, 243, 0.12)',
                  borderColor: 'rgba(255,255,255,0.18)',
                }}
              >
                <div
                  className="relative h-[24rem] md:h-[31rem] rounded-[1.8rem_0_1.8rem_0]"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    fill
                    className="object-contain p-4 md:p-6"
                  />
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {allSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goTo(index)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: index === current ? '24px' : '8px',
                        height: '8px',
                        background: index === current ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.38)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="mt-7 rounded-[1.8rem] border px-5 py-5 md:px-6"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.16)',
              }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: "'MyriadPro', sans-serif", color: 'rgba(255,255,255,0.94)' }}
              >
                {lang === 'es' ? slide.descEs : slide.descEn}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
