'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { studies } from '@/data/portfolio'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Studies() {
  const { t } = useLang()
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
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          once: true,
        }
      }
    )
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="studies"
      className="section-padding bg-white"
    >
      <div className="max-w-5xl mx-auto">

        {/* Title — MinionPro Bold + animated line from left */}
        <div className="relative flex items-center gap-5 mb-12">
          {/* Line drawn from left — starts outside the section padding */}
          <div
            ref={lineRef}
            className="absolute h-[2px] bg-[#2563C4]"
            style={{ width: 0, right: '100%', marginRight: '1.25rem' }}
          />
          <h2
            data-reveal
            className="font-black text-[#2563C4] text-5xl md:text-6xl uppercase"
            style={{ fontFamily: "'MinionPro', serif", fontWeight: 700 }}
          >
            {t('studies.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Studies list */}
          <div className="flex flex-col gap-6">
            {studies.map((s, i) => (
              <div data-reveal key={i} className="flex gap-4">
                <span className="deco-asterisk mt-0.5">✳</span>
                <div>
                  {/* Study title — MinionPro Medium */}
                  <h3
                    className="font-bold text-[#050D1A] text-xl leading-snug"
                    style={{ fontFamily: "'MinionPro', serif", fontWeight: 500 }}
                  >
                    {s.title}
                  </h3>
                  {/* Place & period — MyriadPro */}
                  <p
                    className="text-[#050D1A]/70 text-base mt-1"
                    style={{ fontFamily: "'MyriadPro', sans-serif" }}
                  >
                    {s.place}
                  </p>
                  <p
                    className="text-[#0A1628] text-sm font-semibold mt-1 tracking-wide"
                    style={{ fontFamily: "'MyriadPro', sans-serif" }}
                  >
                    {s.period}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div data-reveal className="bg-[#1B3A6B] text-white rounded-2xl p-8">
            {/* Card title — MinionPro Bold */}
            <h3
              className="text-[#ffffff] text-3xl mb-6 flex items-center gap-3"
              style={{ fontFamily: "'MinionPro', serif", fontWeight: 700 }}
            >
              <span className="deco-asterisk text-[#7A9BBF]">✳</span>
              {t('studies.languages')}
            </h3>

            <div className="mb-5">
              <p
                className="text-white text-lg"
                style={{ fontFamily: "'MinionPro', serif", fontWeight: 500 }}
              >
                {t('studies.spanish')}:
              </p>
              <p
                className="text-white/70 text-base mt-1"
                style={{ fontFamily: "'MyriadPro', sans-serif" }}
              >
                — {t('studies.native')}
              </p>
            </div>
          
            <div>
              <p
                className="text-white text-lg"
                style={{ fontFamily: "'MinionPro', serif", fontWeight: 500 }}
              >
                {t('studies.english')}:
              </p>
              <p
                className="text-white/70 text-base mt-1"
                style={{ fontFamily: "'MyriadPro', sans-serif" }}
              >
                — {t('studies.grammar')}
              </p>
              <p
                className="text-white/70 text-base"
                style={{ fontFamily: "'MyriadPro', sans-serif" }}
              >
                — {t('studies.phonetics')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
