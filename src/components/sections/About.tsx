'use client'

import Image from 'next/image'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'

export default function About() {
  const { t } = useLang()
  const ref = useGsapReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="section-padding mt-20 rounded-tl-[15rem] rounded-br-[15rem] overflow-hidden"
      style={{ background: 'linear-gradient(to top right, #050D1A 0%, #0A1628 8%, #1A1A2E 20%, #1B3A6B 48%, #2563C4 70%, #7A9BBF 88%, #C2D4E4 100%)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-20">

        {/* Text — compact */}
        <div className="w-full md:max-w-[300px] flex-shrink-0">

          {/* Role badge — MinionPro Medium */}
          <div data-reveal className="inline-block bg-[#7A9BBF]/20 border border-[#7A9BBF]/40 rounded-xl px-4 py-2 mb-5">
            <p
              className="text-[#C2D4E4] text-base tracking-wide"
              style={{ fontFamily: "'MinionPro', serif", fontWeight: 500 }}
            >
              {t('about.role')}
            </p>
          </div>

          {/* Bio — MyriadPro */}
          <p
            data-reveal
            className="text-white/80 text-lg leading-relaxed"
            style={{ fontFamily: "'MyriadPro', sans-serif" }}
          >
            {t('about.bio')}
          </p>
        </div>

        {/* Photo — circular with real image and SVG decos */}
        <div data-reveal className="relative flex-shrink-0 flex items-center justify-center">

          {/* Blink icon — top right */}
          <div className="absolute -top-6 -right-24 z-10">
            <Image src="/icons/Blink.svg" alt="deco" width={76} height={76} />
          </div>

          {/* Circle photo */}
          <div
            className="rounded-full overflow-hidden border-[4px] border-[#7A9BBF]/60 shadow-2xl"
            style={{ width: '380px', height: '380px' }}
          >
            <Image
              src="/image/perfil.webp"
              alt="Kevin Gomez/Jade Velez"
              width={380}
              height={380}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Flower icon — bottom right */}
          <div className="absolute -bottom-6 -right-56 z-10 opacity-70">
            <Image src="/icons/Flower.svg" alt="deco" width={102} height={102} />
          </div>

        </div>
      </div>
    </section>
  )
}
