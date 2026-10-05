'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { skills } from '@/data/portfolio'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, string> = {
  'HTML 5':      '/icons/html.svg',
  'CSS 3':       '/icons/css3.svg',
  'JavaScript':  '/icons/javascript.svg',
  'TypeScript':  '/icons/typescript.svg',
  'Angular':     '/icons/angular.svg',
  'React':       '/icons/react.svg',
  'Next.js':     '/icons/next.svg',
  'Vue':         '/icons/vue.svg',
  'Astro':       '/icons/astro.svg',
  'Tailwind CSS':'/icons/tailwind.svg',
  'Bootstrap':   '/icons/bootstrap.svg',
  'GSAP':        '/icons/gsap.svg',
  'Framer':      '/icons/framer.svg',
  'Figma':       '/icons/figma.svg',
  'Photoshop':   '/icons/photoshop.svg',
  'Illustrator': '/icons/illustrator.svg',
  'WordPress':   '/icons/wordpress.svg',
}

function SkillBadge({ name }: { name: string }) {
  const src = iconMap[name]
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}
      >
        {src
          ? <Image src={src} alt={name} width={38} height={38} className="object-contain" />
          : <span className="text-white text-[10px] font-bold text-center px-1">{name.slice(0, 4)}</span>
        }
      </div>
      <span
        className="text-white/80 text-sm text-center leading-tight"
        style={{ fontFamily: "'MyriadPro', sans-serif" }}
      >
        {name}
      </span>
    </div>
  )
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
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
        scrollTrigger: { trigger: line, start: 'top 90%', once: true }
      }
    )
  }, [])

  return (
    <div data-reveal className="mb-10">
      {/* Category label with line extending to left edge */}
      <div className="relative flex items-center gap-5 mb-6">
        <div
          ref={lineRef}
          className="absolute h-[1.5px] flex-shrink-0"
          style={{ width: 0, right: '100%', marginRight: '1.25rem', background: 'rgba(255,255,255,0.55)' }}
        />
        <span
          className="text-white text-2xl whitespace-nowrap"
          style={{ fontFamily: "'MinionPro', serif", fontWeight: 600 }}
        >
          {title}
        </span>
      </div>

      {/* Icons */}
      <div className="flex flex-wrap gap-6 pl-1">
        {items.map(name => <SkillBadge key={name} name={name} />)}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const ref = useGsapReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="w-full"
    >
      {/* Full-width card that reaches screen edges */}
      <div
        className="w-full px-8 md:px-20 py-20 relative overflow-hidden rounded-tl-[15rem] rounded-br-[15rem]"
        style={{
          background: 'linear-gradient(to top right, #050D1A 0%, #0A1628 8%, #1A1A2E 20%, #1B3A6B 48%, #2563C4 70%, #7A9BBF 88%, #C2D4E4 100%)',
        }}
      >
        {/* Deco icons */}
        <div className="absolute top-8 right-12 opacity-50">
          <Image src="/icons/Blink.svg" alt="" width={40} height={40} />
        </div>
        <div className="absolute bottom-[5.5rem] right-[5.75rem] opacity-55 pointer-events-none">
          <Image src="/icons/Flower.svg" alt="" width={350} height={350} />
        </div>

        {/* Inner content max-width */}
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <h2
            data-reveal
            className="text-white text-5xl md:text-6xl uppercase mb-28"
            style={{ fontFamily: "'MinionPro', serif", fontWeight: 700, letterSpacing: '0.06em' }}
          >
            {t('skills.title')}
          </h2>

          {/* Skill groups */}
          <SkillGroup title={t('skills.languages')}  items={skills.languages} />
          <SkillGroup title={t('skills.frameworks')} items={skills.frameworks} />
          <SkillGroup title={t('skills.design')}     items={skills.design} />
          <SkillGroup title={t('skills.others')}     items={skills.others} />

        </div>
      </div>
    </section>
  )
}
