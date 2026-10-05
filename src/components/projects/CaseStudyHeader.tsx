'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import BackToProjects from './BackToProjects'
import { useLang } from '@/lib/LangContext'
import { newProjects } from '@/data/newProjects'
import styles from './CaseStudyHeader.module.css'

export default function CaseStudyHeader({ project }: { project: (typeof newProjects)[number] }) {
  const { lang, toggleLang } = useLang()
  const es = lang === 'es'
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.navigation} aria-label={es ? 'Navegación del proyecto' : 'Project navigation'}>
          <BackToProjects />
          <Link href="/#projects">{es ? 'Proyectos' : 'Projects'}</Link><span>/</span><span>{project.name}</span>
          <button className={styles.language} onClick={toggleLang} aria-label={es ? 'Switch to English' : 'Cambiar a español'}>{es ? 'EN' : 'ES'}</button>
        </nav>
        <div className={styles.grid}>
          <div>
            <p className={styles.eyebrow}>CASE STUDY · {es ? 'DESARROLLO WEB' : 'WEB DEVELOPMENT'}</p>
            <h1>{project.name}</h1>
            <p className={styles.description}>{es ? project.descEs : project.descEn}</p>
            {project.name === 'HEREDITATEM' && (
              <div className={styles.links}>
                <a href="https://hereditatem.com/" target="_blank" rel="noopener noreferrer">{es ? 'Sitio web' : 'Website'} · hereditatem.com <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a href="https://app.hereditatem.com/login" target="_blank" rel="noopener noreferrer">{es ? 'App de gestión' : 'Management app'} <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            )}
            <ul className={styles.tags}>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
          </div>
          <aside className={styles.note}>
            <h2>{es ? 'MI APORTE' : 'MY ROLE'}</h2>
            <p>{es ? project.roleEs : project.roleEn}</p>
            <h2>{es ? 'SOBRE ESTA VISTA' : 'ABOUT THIS PREVIEW'}</h2>
            <p>{es ? 'Adaptación interactiva del proyecto para este portafolio, con sus recursos visuales originales. Las interacciones son demostrativas.' : 'An interactive adaptation of the project for this portfolio, using its original visual assets. Interactions are illustrative.'}</p>
          </aside>
        </div>
      </div>
    </header>
  )
}
