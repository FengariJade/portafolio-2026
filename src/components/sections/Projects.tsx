'use client'

import { useState, useEffect, useRef, useTransition, type MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { featuredProject, moreProjects } from '@/data/portfolio'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)
const allProjects = [featuredProject, ...moreProjects]

// Short summaries keep every project browsable without expanding the gallery.
const previews: Record<string, { category: [string, string]; summary: [string, string] }> = {
  '/projects/crm-sat': { category: ['CRM omnicanal', 'Omnichannel CRM'], summary: ['Conversaciones, clientes y supervisión en una plataforma empresarial.', 'Conversations, customers, and supervision in one enterprise platform.'] },
  '/projects/hereditatem': { category: ['Web + app de gestión', 'Website + management app'], summary: ['Desarrollé la web de patrimonio cultural y su propia app de gestión.', 'I developed the cultural heritage website and its management app.'] },
  '/projects/dalo': { category: ['Landing de producto', 'Product landing page'], summary: ['Una experiencia que conecta clientes con profesionales de oficios.', 'An experience connecting customers with skilled professionals.'] },
  '/projects/intime': { category: ['Landing de producto', 'Product landing page'], summary: ['Personas, asistencia y evidencia conectadas en un ecosistema digital.', 'People, attendance, and evidence connected in a digital ecosystem.'] },
  '/projects/flotex': { category: ['Logística y tracking', 'Logistics & tracking'], summary: ['Seguimiento de flotas, rutas y entregas en una interfaz operativa.', 'Fleet, route, and delivery tracking in an operations-focused interface.'] },
  '/projects/bartech-field': { category: ['Operaciones de campo', 'Field operations'], summary: ['Proyectos, cuadrillas y planificación de rutas en un solo sistema.', 'Projects, field crews, and route planning in one system.'] },
  '/projects/nouz-intranet': { category: ['App de productividad', 'Productivity app'], summary: ['Calendario, notas y tareas en una experiencia personal y modular.', 'Calendar, notes, and tasks in a personal, modular experience.'] },
  '/projects/bartech': { category: ['Sitio corporativo', 'Corporate website'], summary: ['Una presencia tecnológica para comunicar servicios y experiencia.', 'A technology-focused presence communicating services and expertise.'] },
  '/projects/nouz-website': { category: ['Landing de producto', 'Product landing page'], summary: ['Una presentación visual del asistente que organiza tu día a día.', 'A visual introduction to the assistant that organizes your day.'] },
}

export default function Projects() {
  const { lang, t } = useLang()
  const ref = useGsapReveal()
  const lineRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [loadingUrl, setLoadingUrl] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const locale = lang === 'es' ? 0 : 1

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo(line, { width: 0 }, {
        width: 'calc(100vw - 100%)', duration: reducedMotion ? 0 : 1, ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 85%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  function navigate(event: MouseEvent<HTMLAnchorElement>, url: string) {
    // Preserve native links for opening a case study in another tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !url.startsWith('/')) return
    event.preventDefault()
    if (isPending) return
    setLoadingUrl(url)
    startTransition(() => router.push(url))
  }

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="projects" className={`section-padding bg-white ${styles.section}`}>
      <div className="max-w-6xl mx-auto">
        <div data-reveal className="relative flex items-center gap-5 mb-8">
          <div ref={lineRef} className="absolute h-[2px]" style={{ width: 0, right: '100%', marginRight: '1.25rem', background: '#2563C4' }} />
          <h2 className="font-black text-5xl md:text-6xl uppercase" style={{ fontFamily: "'MinionPro', serif", fontWeight: 700, color: '#2563C4' }}>{t('projects.title')}</h2>
        </div>
        <div className={styles.toolbar}>
          <span>{String(allProjects.length).padStart(2, '0')} / {lang === 'es' ? 'PROYECTOS SELECCIONADOS' : 'SELECTED PROJECTS'}</span>
          <span className={styles.desktopHint}>{lang === 'es' ? 'Explora una tarjeta y entra a conocer el proyecto' : 'Explore a card and open its case study'}</span>
          <span className={styles.touchHint}>{lang === 'es' ? 'Toca un proyecto para verlo' : 'Tap a project to explore'}</span>
        </div>
        <div className={styles.grid}>
          {allProjects.map((project, index) => {
            const preview = previews[project.url]
            const stack = 'techStack' in project ? project.techStack : project.stack
            const loading = isPending && loadingUrl === project.url
            const summary = preview?.summary[locale] ?? (lang === 'es' ? project.descEs : project.descEn)
            return (
              <Link key={project.url} href={project.url} onClick={event => navigate(event, project.url)} className={styles.card}
                aria-label={`${lang === 'es' ? 'Ver case study' : 'View case study'}: ${project.name}`} aria-describedby={`project-summary-${index}`} aria-busy={loading}>
                {project.image && <Image src={project.image} alt="" fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 370px" className={styles.image} />}
                <div className={styles.content}>
                  <div className={styles.meta}><span>{String(index + 1).padStart(2, '0')}</span><span>{preview?.category[locale] ?? stack[0]}</span><span className={styles.arrow}>{loading ? <Loader2 className={styles.spinner} size={17} aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}</span></div>
                  <h3>{project.name}</h3>
                  <p id={`project-summary-${index}`} className={styles.summary}>{summary}</p>
                  <div className={styles.bottom}><span>{stack.slice(0, 2).join(' / ')}</span><span className={styles.cta}>{loading ? (lang === 'es' ? 'Cargando…' : 'Loading…') : (lang === 'es' ? 'Ver proyecto' : 'View project')}</span></div>
                </div>
              </Link>
            )
          })}
        </div>
        <span className={styles.status} role="status">{isPending ? (lang === 'es' ? 'Cargando proyecto…' : 'Loading project…') : ''}</span>
      </div>
    </section>
  )
}
