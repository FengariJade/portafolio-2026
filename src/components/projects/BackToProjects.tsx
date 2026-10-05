'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import styles from './BackToProjects.module.css'

export default function BackToProjects() {
  const { lang } = useLang()
  return (
    <Link href="/#projects" className={styles.button} aria-label={lang === 'es' ? 'Volver a proyectos' : 'Back to projects'}>
      <ArrowLeft size={20} aria-hidden="true" />
    </Link>
  )
}
