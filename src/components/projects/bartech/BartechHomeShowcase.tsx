'use client'

import Image from 'next/image'
import BackToProjects from '../BackToProjects'
import { useEffect, useRef, useState } from 'react'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { heroSlides } from './bartechData'
import BartechClients from './BartechClients'
import BartechContact from './BartechContact'
import presentation from './BartechPresentation.module.css'
import { BartechGradientRing, BartechCircuitTopLeft, BartechCircuitRight } from './BartechDecor'
import { BartechServicesSection } from './Bartechservicesection'

// ─── DATA ────────────────────────────────────────────────────────────────────

const footerLinks = ['Blog', 'Servicios', 'Nosotros', 'Portafolio', 'Oportunidad laboral', 'Contáctanos']

const worldPins = [
  { top: '29%', left: '19%' },
  { top: '59%', left: '27%' },
  { top: '74%', left: '30%' },
  { top: '24%', left: '48%' },
  { top: '36%', left: '58%' },
  { top: '33%', left: '77%' },
  { top: '13%', left: '64%' },
]

const serviceList = [
  {
    titleEs: 'Desarrollo de aplicaciones',
    titleEn: 'App development',
    descEs: 'Lleva tu negocio al siguiente nivel con aplicaciones móviles de alto impacto. Desarrollamos apps que van más allá de la funcionalidad: son intuitivas, atractivas y diseñadas para brindar una experiencia de usuario excepcional.',
    descEn: 'Take your business to the next level with high-impact mobile apps — intuitive, attractive, and designed for exceptional user experience.',
  },
  { titleEs: 'Automatización de procesos (RPA)', titleEn: 'Process automation (RPA)', descEs: 'Optimiza tus flujos de trabajo con robots de software que eliminan tareas repetitivas y mejoran la eficiencia operativa.', descEn: 'Optimize workflows with software bots that eliminate repetitive tasks and boost operational efficiency.' },
  { titleEs: 'Soluciones de data y analítica', titleEn: 'Data & analytics', descEs: 'Transforma datos en decisiones. Implementamos plataformas de analítica avanzada para que tu empresa opere con inteligencia.', descEn: 'Turn data into decisions with advanced analytics platforms for intelligent operations.' },
  { titleEs: 'Outsourcing tecnológico', titleEn: 'Tech outsourcing', descEs: 'Extiende tu equipo con talento especializado en tecnología, bajo el respaldo y la calidad de Bartech.', descEn: 'Extend your team with specialized tech talent backed by Bartech\'s quality standards.' },
  { titleEs: 'No-Code y Low-Code', titleEn: 'No-Code & Low-Code', descEs: 'Desarrollamos soluciones ágiles y escalables usando plataformas modernas sin código o con poco código.', descEn: 'Build agile, scalable solutions using modern no-code and low-code platforms.' },
  { titleEs: 'IA y modelos de Machine Learning', titleEn: 'AI & Machine Learning', descEs: 'Integramos inteligencia artificial en tus procesos para automatizar decisiones y generar valor real desde los datos.', descEn: 'Integrate AI into your processes to automate decisions and generate real value from data.' },
  { titleEs: 'Infraestructura y soporte de TI', titleEn: 'IT infrastructure & support', descEs: 'Garantizamos la continuidad y seguridad de tus sistemas con soporte experto e infraestructura robusta.', descEn: 'Ensure continuity and security of your systems with expert support and robust infrastructure.' },
]

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function BartechLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 502.84 111.64" className={className} aria-hidden="true">
      <path fill="currentColor" d="M458.72,41.36a15.46,15.46,0,0,1,8.08,2.29V12.86H451v30.6A15.35,15.35,0,0,1,458.72,41.36Z" transform="translate(-12.22 -12.36)" />
      <path fill="currentColor" d="M498.61,12.86l.11,36.5-26.4.08a15.43,15.43,0,0,1-.08,15l26.48.3v37.77l15.84.15V12.86Z" transform="translate(-12.22 -12.36)" />
      <path fill="currentColor" d="M458.72,72.36A15.45,15.45,0,0,1,451,70.27v32.37h16.16V69.87A15.38,15.38,0,0,1,458.72,72.36Z" transform="translate(-12.22 -12.36)" />
      <circle fill="currentColor" cx="446.5" cy="44.5" r="7.5" />
      <path fill="currentColor" d="M435.83,28.26H409.22a12,12,0,0,0-12,12v35.1a12,12,0,0,0,12,12h26.61v15.28H409.37a28.56,28.56,0,0,1-28.56-28.79l.27-32.39A28.54,28.54,0,0,1,409.6,13.14l26.23,0Z" transform="translate(-12.22 -12.36)" />
      <polygon fill="currentColor" points="227.8 0.74 227.8 16.04 245.28 16.04 245.28 90.28 261.28 90.28 261.28 16.04 279.86 16.04 279.86 0.74 227.8 0.74" />
      <path fill="currentColor" d="M160.07,13.11V28.45h39.07a13,13,0,0,1,13,13v2.6a13,13,0,0,1-13,13H178.46a7.76,7.76,0,0,0-7,11.18l16.86,34.41H205.8l-13.05-26.4a2.85,2.85,0,0,1,2.56-4.12h5.13a27.8,27.8,0,0,0,27.8-27.79V43.19a30.08,30.08,0,0,0-30.09-30.08Z" transform="translate(-12.22 -12.36)" />
      <circle fill="currentColor" cx="85.02" cy="79.65" r="7.5" />
      <rect fill="currentColor" x="118.72" y="73.72" width="15.83" height="37.42" />
      <path fill="currentColor" d="M120.53,13.11h-5.1a26,26,0,0,0-26.05,26V73.64h0a11.12,11.12,0,0,1,15.71,0h0V38.72A10.32,10.32,0,0,1,115.41,28.4h5.69a9.85,9.85,0,0,1,9.84,9.84v35.4h15.83V39.34A26.23,26.23,0,0,0,120.53,13.11Z" transform="translate(-12.22 -12.36)" />
      <path fill="currentColor" d="M73.59,71C72,63.78,67.2,57.9,65.71,57.08h0c1.63.23,7.26-6.7,7.48-14.29v-3.7a26,26,0,0,0-26-26H12.72V28.4H48.94a10,10,0,0,1,10,10v1.13a10,10,0,0,1-10,10H12.72v7.55h0v8.67H50a10,10,0,0,1,10,10v1.13a10,10,0,0,1-10,10H12.72l0,15.76H47.23c16.76-.67,25.38-9.5,26.71-26V74.4A15.7,15.7,0,0,0,73.59,71Z" transform="translate(-12.22 -12.36)" />
      <path fill="currentColor" d="M304.84,71c1.57-7.2,6.39-13.08,7.89-13.9h0c-1.63.23-7.26-6.7-7.48-14.29v-3.7a26,26,0,0,1,26-26h34.46V28.4H329.49a10,10,0,0,0-10,10v1.13a10,10,0,0,0,10,10h36.23v7.55h0v8.67H328.41a10,10,0,0,0-10,10v1.13a10,10,0,0,0,10,10h37.31l-.06,15.76H331.21c-16.77-.67-25.38-9.5-26.72-26V74.4A15.7,15.7,0,0,1,304.84,71Z" transform="translate(-12.22 -12.36)" />
    </svg>
  )
}

function Marker({ top, left }: { top: string; left: string }) {
  return (
    <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      <svg viewBox="0 0 48 64" className="h-10 w-8 md:h-12 md:w-10" aria-hidden="true">
        <path
          d="M24 4C13.5 4 5 12.51 5 23c0 14.2 16.3 30.27 18.16 32.03a1.25 1.25 0 0 0 1.68 0C26.7 53.27 43 37.2 43 23 43 12.51 34.5 4 24 4Z"
          fill="#fff"
          stroke="#F43D73"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="23" r="7.5" fill="#35C3EA" />
      </svg>
    </div>
  )
}

// Animated gradient B — matches BrandBMasked behaviour
function BrandBMasked({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        WebkitMaskImage: "url('/showcase/bartech/images/home/brand-b-mask.svg')",
        maskImage: "url('/showcase/bartech/images/home/brand-b-mask.svg')",
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 bartech-brand-gradient" />
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function BartechHomeShowcase() {
  const { lang } = useLang()
  const isEs = lang === 'es'

  /* hero accordion */
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHoveringHero, setIsHoveringHero] = useState(false)

  /* services accordion */
  const [activeService, setActiveService] = useState<number | null>(null)

  useEffect(() => {
    if (isHoveringHero) return
    const id = window.setInterval(() => setActiveSlide(p => (p + 1) % heroSlides.length), 4000)
    return () => window.clearInterval(id)
  }, [isHoveringHero])

  return (
    <main className="w-full overflow-x-hidden bg-[#EFF4FB] text-slate-800">
      <style jsx global>{`
        @font-face { font-family:'BartechDM'; src:url('/showcase/bartech/fonts/newfonts/DMSans-Bold.ttf') format('truetype'); }
        @font-face { font-family:'BartechMyriad'; src:url('/showcase/bartech/fonts/MyriadPro/MyriadPro-Regular.otf') format('opentype'); }
        @font-face { font-family:'BartechConthrax'; src:url('/showcase/bartech/fonts/Conthrax-SemiBold.otf') format('opentype'); }

        .bartech-title   { font-family:'BartechDM', sans-serif; font-weight:700; }
        .bartech-copy    { font-family:'BartechMyriad', sans-serif; }
        .bartech-tech    { font-family:'BartechConthrax', sans-serif; }

        /* animations */
        @keyframes bartechLogoTrack { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .bartech-logo-track { animation: bartechLogoTrack 18s linear infinite; }

        @keyframes bartechFloatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .bartech-float-a { animation: bartechFloatA 6s ease-in-out infinite; }

        @keyframes bartechFloatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(16px)} }
        .bartech-float-b { animation: bartechFloatB 8s ease-in-out infinite 1.2s; }

        @keyframes bartechRingSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .bartech-ring-spin { animation: bartechRingSpin 24s linear infinite; transform-origin:center; }

        @keyframes brandGradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bartech-brand-gradient {
          background-size: 200% 200%;
          animation: brandGradientShift 5s ease infinite;
        }

        /* circuit draw animations */
        @keyframes bartechDrawY { from{scaleY:0} to{scaleY:1} }
        @keyframes bartechDrawX { from{scaleX:0} to{scaleX:1} }
        @keyframes bartechPop   { 0%{opacity:0;transform:scale(0)} 70%{transform:scale(1.2)} 100%{opacity:1;transform:scale(1)} }
        .bartech-circuit-draw-y  { animation: bartechDrawY 0.6s ease forwards; }
        .bartech-circuit-draw-x  { animation: bartechDrawX 0.6s ease forwards; }
        .bartech-circuit-pop     { animation: bartechPop 0.4s ease forwards; }
        .bartech-circuit-delay-1 { animation-delay:0.3s; opacity:0; animation-fill-mode:forwards; }
        .bartech-circuit-delay-2 { animation-delay:0.5s; opacity:0; animation-fill-mode:forwards; }
        .bartech-circuit-delay-3 { animation-delay:0.7s; opacity:0; animation-fill-mode:forwards; }

        /* stats gradient */
        .bartech-stats-bg {
          background: linear-gradient(180deg, #60C3DC 0%, #4DAFE3 44%, #504D9B 100%);
        }

        /* service item hover */
        .bartech-service-item { transition: all 0.25s ease; }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════
          HEADER — portfolio description (keep as-is)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-white">
        <div className="w-full bg-[#203A63] px-6 py-10 text-white md:px-10 xl:py-14">
          <div className="mx-auto max-w-[92rem]">
            <BackToProjects />

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <div className="bartech-copy flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/55">
                  <span>{isEs ? 'Inicio' : 'Home'}</span>
                  <span>/</span>
                  <span className="text-white/80">Bartech</span>
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                  {isEs ? 'Sitio corporativo' : 'Corporate website'}
                </p>
                <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.04em] md:text-6xl">BARTECH</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                  {isEs
                    ? 'Reinterpretación portfolio-ready del sitio corporativo de Bartech, inspirada en su hero tipo acordeón, su narrativa tecnológica y su estructura visual enfocada en reputación, servicios y posicionamiento comercial.'
                    : 'A portfolio-ready reinterpretation of the Bartech corporate website, inspired by its accordion hero, technological storytelling, and visual structure focused on trust, services, and commercial positioning.'}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Corporate UX', 'Visual redesign', 'Accordion hero', 'Brand storytelling'].map(tag => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[2rem] border border-white/12 bg-white/8 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200">{isEs ? 'Se mantuvo' : 'Preserved'}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                    <li>{isEs ? 'Hero de impacto, acentos en gradiente y narrativa institucional.' : 'Impact hero, gradient accents, and institutional storytelling.'}</li>
                    <li>{isEs ? 'Composición amplia y jerarquía visual corporativa.' : 'Wide composition and corporate visual hierarchy.'}</li>
                    <li>{isEs ? 'Sensación de marca tecnológica y comercial.' : 'A technological and commercial brand feel.'}</li>
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-sky-200/20 bg-sky-300/10 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-100">{isEs ? 'Se adaptó' : 'Adapted'}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/82">
                    <li>{isEs ? 'Contenido curado como case visual dentro del portfolio.' : 'Content curated as a visual case study inside the portfolio.'}</li>
                    <li>{isEs ? 'Recorrido simplificado para mostrar mejor el frontend.' : 'Simplified flow to better showcase the frontend.'}</li>
                    <li>{isEs ? 'Sin módulos secundarios ni ruido de navegación extra.' : 'No secondary modules or extra navigation noise.'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — HERO ACCORDION
        ══════════════════════════════════════════════════════════ */}
        <div className="relative h-[28rem] w-full overflow-hidden sm:h-[32rem] md:h-[36rem] lg:h-[50rem]">
          <div className="absolute inset-0 flex h-full w-full">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeSlide
              return (
                <button
                  key={slide.image}
                  onMouseEnter={() => { setIsHoveringHero(true); setActiveSlide(index) }}
                  onMouseLeave={() => setIsHoveringHero(false)}
                  className="relative h-full overflow-hidden bg-slate-300"
                  style={{
                    flex: isActive ? 3 : 1,
                    transition: 'flex 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.titleEs}
                    fill
                    className="object-cover"
                    style={{
                      scale: isActive ? '1.04' : '1',
                      filter: isActive ? 'blur(0px)' : 'blur(2px)',
                      transition: 'scale 0.7s ease, filter 0.7s ease',
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: isActive ? 0.08 : 0.42, transition: 'opacity 0.7s ease' }}
                  />
                  {isActive && (
                    <div className="absolute bottom-10 left-8 z-20 text-left text-white">
                      <p className="bartech-copy text-xs uppercase tracking-widest opacity-80">
                        {isEs ? 'Proyecto destacado' : 'Featured project'}
                      </p>
                      <h2 className="bartech-title mt-1 text-xl md:text-3xl">
                        {isEs ? slide.titleEs : slide.titleEn}
                      </h2>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — MARCA LA DIFERENCIA
      ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#EFF4FB] px-6 py-24 md:px-10 xl:px-16 xl:py-32">
        {/* decorative circuit lines — top-left */}
        <div className="absolute left-0 top-[3rem] md:top-[7rem] h-[2px] w-[14rem] bg-gradient-to-r from-[#60C3DC] to-[#504D9B]" />
        <div className="absolute left-[14rem] top-[2.4rem] md:top-[6.4rem] h-6 w-6 rounded-full bg-[#504D9B]" />
        {/* decorative circuit lines — bottom-right */}
        <div className="absolute bottom-[7rem] right-0 h-[2px] w-[14rem] bg-gradient-to-r from-[#504D9B] to-[#60C3DC]" />
        <div className="absolute bottom-[6.4rem] right-[14rem] h-6 w-6 rounded-full bg-[#504D9B]" />

        <h2 className="bartech-title text-center text-[2.5rem] uppercase tracking-tight text-[#3F3F46] md:text-[4rem] xl:text-[5rem]">
          {isEs ? 'Marca la diferencia' : 'Make the difference'}
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] xl:gap-24">
          {/* left column */}
          <div className="mx-auto flex max-w-[24rem] flex-col border-l-[3px] border-[#60C3DC] pl-5 lg:mx-0 lg:justify-self-end">
            <h3 className="bartech-title text-xl uppercase text-[#5A93D6]">
              {isEs ? 'Nuestro propósito' : 'Our purpose'}
            </h3>
            <p className="bartech-copy mt-3 text-lg leading-relaxed text-slate-700">
              {isEs
                ? 'Es empoderar a las empresas con tecnología avanzada y soluciones personalizadas que les permitan alcanzar sus objetivos estratégicos y enfrentar los desafíos del futuro.'
                : 'Empowering companies with advanced technology and tailored solutions that help them achieve strategic goals and face future challenges.'}
            </p>
          </div>

          {/* centre — masked B */}
          <div className="flex justify-center">
            <BrandBMasked className="h-[18rem] w-[14rem] md:h-[24rem] md:w-[18rem] xl:h-[30rem] xl:w-[22rem]" />
          </div>

          {/* right column */}
          <div className="mx-auto flex max-w-[24rem] flex-col border-l-[3px] border-[#60C3DC] pl-5 lg:mx-0 lg:justify-self-start">
            <h3 className="bartech-title text-xl uppercase text-[#5A93D6]">
              {isEs ? 'Tenemos ISO 9001' : 'We have ISO 9001'}
            </h3>
            <p className="bartech-copy mt-3 text-lg leading-relaxed text-slate-700">
              {isEs
                ? 'Contamos con la certificación ISO 9001, un reconocimiento a nuestro compromiso con la calidad y la excelencia en cada uno de nuestros procesos.'
                : 'We hold ISO 9001 certification, a recognition of our commitment to quality and excellence in every one of our processes.'}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — INNOVA / TRANSFORMA / Y CRECE
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#EFF4FB] px-6 pb-12 pt-4 md:px-10 xl:px-16">
        <div className={`bartech-tech flex flex-col gap-1 text-[#3F3F46] ${presentation.slogan}`}>
          <div className="text-right leading-none">INNOVA</div>
          <div
            className="text-left leading-none"
            style={{ background: 'linear-gradient(90deg,#60C3DC,#504D9B)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent' }}
          >
            TRANSFORMA
          </div>
          <div className="text-left leading-none">Y CRECE</div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — SERVICES
      ══════════════════════════════════════════════════════════ */}
      <BartechServicesSection isEs={isEs} />

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — NUESTROS CLIENTES (logos + buildings + stats)
      ══════════════════════════════════════════════════════════ */}
      <BartechClients isEs={isEs} />

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — UNIDOS EN UN MISMO EQUIPO (world map)
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#EFF4FB] px-6 py-24 md:px-10 xl:px-16">
        <h2 className="bartech-title mb-14 text-center text-[2.5rem] uppercase tracking-tight text-[#3F3F46] md:text-[4rem] xl:text-[5rem]">
          {isEs ? 'Unidos en un mismo equipo' : 'United as one team'}
        </h2>
        <div className="relative mx-auto max-w-[110rem]">
          <Image
            src="/showcase/bartech/images/home/map.svg"
            alt="Mapa Bartech"
            width={1820}
            height={920}
            className="h-auto w-full object-contain"
          />
          {worldPins.map((pin, i) => (
            <Marker key={i} top={pin.top} left={pin.left} />
          ))}
          {/* chatbot bubble */}
          <div className="absolute bottom-[-1.5rem] right-4 z-30 flex items-end gap-3 md:bottom-[-2rem] md:right-8">
            <div className="relative hidden rounded-[1.25rem] bg-white px-5 py-3 shadow-lg md:block">
              <p className="text-sm font-medium text-[#3f3f46]">
                ¿Necesitas ayuda?<br /><span className="font-bold">¡Conversemos!</span>
              </p>
              <div className="absolute right-[-0.65rem] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white" />
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#60C3DC] shadow-xl md:h-16 md:w-16">
              <Image
                src="/showcase/bartech/images/home/robotface.svg"
                alt="Chat robot"
                width={48}
                height={48}
                className="h-auto w-8 md:w-9"
                onError={() => {}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — ¿AÚN TIENES DUDAS? (CTA)
      ══════════════════════════════════════════════════════════ */}
      <BartechContact isEs={isEs} />

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="w-full bg-[#EFF4FB] text-slate-800">
        <div className="grid gap-12 px-6 py-14 md:grid-cols-3 md:px-10 xl:px-16">
          {/* left */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-7 w-7 text-[#0E86E8]" />
              <p className="bartech-copy text-base leading-relaxed">
                Hermanos Villarán 112,<br />oficina 102 Rimac, Lima – Perú
              </p>
            </div>
            <div className="flex gap-5 text-[#0E86E8]">
              {[Instagram, Linkedin, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="transition-transform hover:scale-110">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* centre */}
          <div className="flex flex-col gap-2 text-base">
            {footerLinks.map(item => (
              <a key={item} href="#" className="bartech-copy transition-colors hover:text-[#2563C4]">
                {item}
              </a>
            ))}
          </div>

          {/* right */}
          <div className="flex flex-col items-start gap-6 md:items-end">
            <BartechLogo className="h-9 w-auto text-slate-700" />
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-[#0E86E8]" />
              <span className="bartech-copy text-base">info@bartech.pe</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-[#0E86E8]" />
              <span className="bartech-copy text-base">(511) 501-7488 / (511) 501-748</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-black px-6 py-5 text-sm text-white md:flex-row md:items-center md:justify-between md:px-10 xl:px-16">
          <span className="bartech-copy opacity-80">© 2026 Bartech. Todos los derechos reservados.</span>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="bartech-copy opacity-80 transition hover:opacity-100">Políticas y privacidad</a>
            <a href="#" className="bartech-copy opacity-80 transition hover:opacity-100">Políticas de cookies</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
