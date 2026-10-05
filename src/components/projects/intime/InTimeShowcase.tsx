'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowDown, Check, Clock, Fingerprint, MapPin, Monitor, Smartphone, Users } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { newProjects } from '@/data/newProjects'
import CaseStudyHeader from '../CaseStudyHeader'
import styles from '../LandingShowcase.module.css'

const products = [
  { name: 'InTime Web', icon: Monitor, titleEs: 'Todo tu equipo, en un solo lugar.', titleEn: 'Your entire team, in one place.', descEs: 'Centraliza organización, asistencia, planilla y configuración para decidir con más claridad.', descEn: 'Centralize organization, attendance, payroll, and settings for clearer decisions.', tagsEs: ['Reportes', 'Horarios', 'Planilla'], tagsEn: ['Reports', 'Schedules', 'Payroll'] },
  { name: 'InTime Tick', icon: Clock, titleEs: 'Marca en segundos. Confía siempre.', titleEn: 'Clock in in seconds. Trust every record.', descEs: 'Valida cada entrada y salida con reconocimiento facial, dispositivo y ubicación GPS.', descEn: 'Validate each clock-in and clock-out with facial recognition, device information, and GPS location.', tagsEs: ['Rostro', 'GPS', 'Tiempo real'], tagsEn: ['Face', 'GPS', 'Real time'] },
  { name: 'InTime Admin', icon: Smartphone, titleEs: 'Tu operación, estés donde estés.', titleEn: 'Your operation, wherever you are.', descEs: 'Consulta el estado del personal por fecha y sede para actuar justo cuando hace falta.', descEn: 'Review workforce status by date and location to act when needed.', tagsEs: ['Sedes', 'Alertas', 'Asistencia'], tagsEn: ['Locations', 'Alerts', 'Attendance'] },
  { name: 'InTime Face', icon: Fingerprint, titleEs: 'Cada rostro, una validación segura.', titleEn: 'Every face, a reliable validation.', descEs: 'Transforma cada captura facial en una identidad verificable para registros más confiables.', descEn: 'Turn facial captures into verifiable identities for more reliable records.', tagsEs: ['Biometría', 'Validación', 'Identidad'], tagsEn: ['Biometrics', 'Validation', 'Identity'] },
]

export default function InTimeShowcase() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [selected, setSelected] = useState(0)
  const product = products[selected]
  const Icon = product.icon
  return (
    <main className={`${styles.page} ${styles.intime}`}>
      <CaseStudyHeader project={newProjects[2]} />
      <div className={`${styles.brandBar} ${styles.darkBar}`}><a href="#intime-home"><Image src="/showcase/intime/Logo%20Blanco.svg" alt="InTime" width={112} height={40} /></a><a href="#intime-platform">{es ? 'Explorar la plataforma' : 'Explore the platform'} <ArrowDown size={16} /></a></div>
      <section id="intime-home" className={styles.intimeHero}>
        <div className={`${styles.shell} ${styles.hero}`}>
          <div><p className={styles.kicker}>{es ? 'Control de asistencia inteligente' : 'Intelligent attendance management'}</p><h2 className={styles.heroTitle}>{es ? 'Tu equipo, ' : 'Your team, '}<em>{es ? 'siempre a tiempo.' : 'always on time.'}</em></h2><p className={styles.lead}>{es ? 'Controla asistencia, personal y planilla desde una sola plataforma. Marcaciones confiables con reconocimiento facial y ubicación GPS.' : 'Manage attendance, people, and payroll from a single platform. Reliable clock-ins with facial recognition and GPS location.'}</p><a className={styles.primary} href="#intime-platform">{es ? 'Conocer el ecosistema' : 'Explore the ecosystem'} <ArrowDown size={18} /></a><div className={styles.trust}><Check size={18} /><span>{es ? 'Personas, evidencias y asistencia conectadas.' : 'People, evidence, and attendance connected.'}</span></div></div>
          <div className={styles.universe}>
            <div className={styles.orbit} aria-hidden="true" /><div className={styles.innerOrbit} aria-hidden="true" />
            <div className={styles.core}><Image src="/showcase/intime/Logo%20Blanco.svg" alt="InTime" width={130} height={55} /><span>{es ? 'TODO CONECTADO' : 'ALL CONNECTED'}</span></div>
            {[{ file: 'imagen%202.png', es: 'Personas', en: 'People' }, { file: 'imagen%201.png', es: 'Asistencia', en: 'Attendance' }, { file: 'imagen%203.png', es: 'Evidencias', en: 'Evidence' }].map((item, index) => <figure key={item.file} className={`${styles.orbitPhoto} ${styles[`photo${index}`]}`}><Image src={`/showcase/intime/${item.file}`} alt={es ? item.es : item.en} fill sizes="(max-width:760px) 35vw, 180px" priority /><figcaption>{es ? item.es : item.en}</figcaption></figure>)}
          </div>
        </div>
      </section>
      <div className={styles.signalStrip}>{[{ icon: Fingerprint, es: 'Reconocimiento facial', en: 'Facial recognition' }, { icon: MapPin, es: 'Evidencia con GPS', en: 'GPS evidence' }, { icon: Users, es: 'Gestión centralizada', en: 'Centralized management' }].map(item => <span key={item.en}><item.icon size={22} />{es ? item.es : item.en}</span>)}</div>
      <section className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHeading}><p className={styles.kicker}>{es ? 'UNA OPERACIÓN CONECTADA' : 'A CONNECTED OPERATION'}</p><h2>{es ? 'Más claridad para decidir. Menos tiempo administrando.' : 'More clarity for decisions. Less time on administration.'}</h2></div>
        <div className={styles.steps}>{[{ icon: Fingerprint, es: 'Identidad', en: 'Identity', descEs: 'Cada registro empieza con una persona identificada.', descEn: 'Every record starts with an identified person.' }, { icon: Users, es: 'Equipo', en: 'Team', descEs: 'Personal, visitas y turnos organizados en un mismo lugar.', descEn: 'People, visits, and shifts organized in one place.' }, { icon: MapPin, es: 'Evidencia', en: 'Evidence', descEs: 'Ubicación y contexto para entender cada marcación.', descEn: 'Location and context to understand every clock-in.' }].map((item, index) => <article key={item.en}><span>0{index + 1}</span><item.icon className={styles.featureIcon} size={40} /><h3>{es ? item.es : item.en}</h3><p>{es ? item.descEs : item.descEn}</p></article>)}</div>
      </section>
      <section id="intime-platform" className={styles.platformSection}>
        <div className={styles.shell}><div className={styles.sectionHeading}><p className={styles.kicker}>{es ? 'ECOSISTEMA INTIME' : 'INTIME ECOSYSTEM'}</p><h2>{es ? 'Cuatro piezas. Una plataforma.' : 'Four pieces. One platform.'}</h2><p>{es ? 'Selecciona un producto para conocer su función dentro del recorrido.' : 'Select a product to explore its role in the journey.'}</p></div>
          <div className={styles.productButtons} role="group" aria-label={es ? 'Productos InTime' : 'InTime products'}>{products.map((item, index) => <button key={item.name} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls="intime-product"><item.icon size={20} />{item.name}</button>)}</div>
          <article id="intime-product" className={styles.productDetail} aria-live="polite"><div className={styles.productSymbol}><Icon size={100} strokeWidth={1} aria-hidden="true" /><span>0{selected + 1}</span></div><div><p className={styles.kicker}>{product.name}</p><h3>{es ? product.titleEs : product.titleEn}</h3><p>{es ? product.descEs : product.descEn}</p><div className={styles.pills}>{(es ? product.tagsEs : product.tagsEn).map(tag => <span key={tag}>{tag}</span>)}</div></div></article>
        </div>
      </section>
      <section className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHeading}><p className={styles.kicker}>{es ? 'DEL REGISTRO A LA DECISIÓN' : 'FROM RECORD TO DECISION'}</p><h2>{es ? 'Cada minuto cuenta una historia.' : 'Every minute tells a story.'}</h2></div>
        <ol className={styles.timeline}>{(es ? [['Marcación', 'La persona registra su ingreso o salida.'], ['Validación', 'Identidad y ubicación dan contexto al registro.'], ['Supervisión', 'El equipo consulta asistencia y novedades.'], ['Información', 'Administración cuenta con registros organizados.']] : [['Clock-in', 'The person records their arrival or departure.'], ['Validation', 'Identity and location give the record context.'], ['Supervision', 'The team reviews attendance and updates.'], ['Information', 'Administration works with organized records.']]).map(([title, detail], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol>
      </section>
      <footer className={styles.projectFooter}><Image src="/showcase/intime/Logo%20Naranja.svg" alt="InTime" width={112} height={40} /><p>{es ? 'Control inteligente para equipos que no se detienen.' : 'Intelligent management for teams that keep moving.'}</p></footer>
    </main>
  )
}
