'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { experiences } from '@/data/portfolio'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const { lang, t } = useLang()
  const ref = useGsapReveal()
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    gsap.fromTo(line,
      { width: 0 },
      {
        width: 'calc(100vw - 100%)',
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 85%', once: true }
      }
    )
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className="section-padding bg-white"
    >
      <div className="max-w-5xl mx-auto">

        {/* Title + animated line */}
        <div className="relative flex items-center gap-5 mb-14">
          <div
            ref={lineRef}
            className="absolute h-[2px]"
            style={{ width: 0, right: '100%', marginRight: '1.25rem', background: '#2563C4' }}
          />
          <h2
            data-reveal
            className="font-black text-5xl md:text-6xl uppercase"
            style={{ fontFamily: "'MinionPro', serif", fontWeight: 700, color: '#2563C4' }}
          >
            {t('exp.title')}
          </h2>
        </div>

        {/* Stats — blob/pill style */}
        <div data-reveal className="grid grid-cols-3 gap-6 mb-16">
          {[
            { number: '4',  label: t('exp.years') },
            { number: '15', label: t('exp.clients') },
            { number: '20',  label: t('exp.projects') },
          ].map(({ number, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              {/* Blob pill */}
              <div
                className="flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to top right, #050D1A 0%, #0A1628 8%, #1A1A2E 20%, #1B3A6B 48%, #2563C4 70%, #7A9BBF 88%, #C2D4E4 100%)',
                  borderRadius: '999px 999px 0px 999px',
                  width: '160px',
                  height: '120px',
                }}
              >
                <p
                  className="text-white text-5xl md:text-6xl"
                  style={{ fontFamily: "'MinionPro', serif", fontWeight: 700 }}
                >
                  {number}
                </p>
              </div>
              {/* Label */}
              <p
                className="text-center text-sm font-semibold"
                style={{ fontFamily: "'MyriadPro', sans-serif", color: '#2563C4' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Experience cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <div
              data-reveal
              key={i}
              className="relative rounded-[60px] p-6 pb-14 border overflow-hidden"
              style={{
                background: '#fff',
                borderColor: '#2563C4',
              }}
            >
              {/* Company name */}
              <h3
                className="text-2xl flex items-center gap-2 mb-3"
                style={{ fontFamily: "'MinionPro', serif", fontWeight: 700, color: '#2563C4' }}
              >
                <span style={{ color: '#7A9BBF' }}>✳</span>
                {exp.company}
              </h3>

              {/* Description */}
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: "'MyriadPro', sans-serif", color: '#1B3A6B' }}
              >
                {lang === 'es' ? exp.descEs : exp.descEn}
              </p>

              {/* Period pill — bottom right */}
              <div
                className="absolute bottom-0 right-0 px-10 py-3 rounded-tl-2xl"
                style={{
                  background: 'linear-gradient(to top right, #050D1A 0%, #0A1628 8%, #1A1A2E 20%, #1B3A6B 48%, #2563C4 70%, #7A9BBF 88%, #C2D4E4 100%)',
                }}
              >
                <p
                  className="text-white text-xs font-bold tracking-wide"
                  style={{ fontFamily: "'MyriadPro', sans-serif" }}
                >
                  {exp.period}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
