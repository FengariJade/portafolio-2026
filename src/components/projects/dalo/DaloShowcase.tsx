'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Check, ShieldCheck, Star, Zap, Droplets, Paintbrush, Hammer, Sparkles, Wind } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { newProjects } from '@/data/newProjects'
import CaseStudyHeader from '../CaseStudyHeader'
import styles from '../LandingShowcase.module.css'

const categories = [
  { es: 'Electricidad', en: 'Electrical', icon: Zap }, { es: 'Gasfitería', en: 'Plumbing', icon: Droplets },
  { es: 'Pintura', en: 'Painting', icon: Paintbrush }, { es: 'Carpintería', en: 'Carpentry', icon: Hammer },
  { es: 'Limpieza', en: 'Cleaning', icon: Sparkles }, { es: 'Climatización', en: 'Climate control', icon: Wind },
]
const people = [
  { name: 'Carlos Rojas', category: 0, image: 'carlos.png', rating: '4.9', initials: 'CR' },
  { name: 'Lucía Mendoza', category: 2, image: 'lucia.png', rating: '5.0', initials: 'LM' },
  { name: 'José Paredes', category: 1, image: '', rating: '4.8', initials: 'JP' },
]
const faqs = [
  { es: '¿Cómo se presenta la confianza?', en: 'How is trust communicated?', answerEs: 'La interfaz propone perfiles con verificación, especialidades y reseñas para facilitar la comparación. En esta muestra se usan los perfiles ilustrativos de la landing.', answerEn: 'The interface presents verification, specialties, and reviews to make comparison easier. This preview uses the illustrative profiles from the landing page.' },
  { es: '¿Puedo contratar desde esta vista?', en: 'Can I book through this preview?', answerEs: 'Esta es una demostración del frontend dentro del portafolio. No genera solicitudes, contrataciones ni pagos reales.', answerEn: 'This is a frontend demonstration within the portfolio. It does not create real requests, bookings, or payments.' },
  { es: '¿Qué cambia para un profesional?', en: 'What changes for a professional?', answerEs: 'El recorrido se enfoca en presentar sus especialidades, construir un perfil y encontrar oportunidades cercanas.', answerEn: 'The journey focuses on presenting specialties, building a profile, and finding nearby opportunities.' },
]

export default function DaloShowcase() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [mode, setMode] = useState<'client' | 'pro'>('client')
  const [category, setCategory] = useState<number | null>(null)
  const pro = mode === 'pro'
  const visiblePeople = category === null ? people : people.filter(person => person.category === category)
  const steps = pro
    ? (es ? ['Presenta tus especialidades', 'Conecta con clientes cercanos', 'Haz crecer tu reputación'] : ['Present your specialties', 'Connect with nearby customers', 'Grow your reputation'])
    : (es ? ['Cuéntanos qué necesitas', 'Elige con confianza', 'Coordina y resuelve'] : ['Tell us what you need', 'Choose with confidence', 'Coordinate and get it done'])
  return (
    <main className={`${styles.page} ${styles.dalo}`}>
      <CaseStudyHeader project={newProjects[1]} />
      <div className={styles.brandBar}>
        <a href="#dalo-home"><Image src="/showcase/dalo/DALO%20LOGO.svg" alt="Dalo" width={115} height={42} /></a>
        <div className={styles.modeSwitch} role="group" aria-label={es ? 'Tipo de usuario' : 'User type'}><button onClick={() => setMode('client')} aria-pressed={!pro}>{es ? 'Cliente' : 'Customer'}</button><button onClick={() => setMode('pro')} aria-pressed={pro}>{es ? 'Profesional' : 'Professional'}</button></div>
      </div>
      <section id="dalo-home" className={styles.daloHero}>
        <div className={`${styles.shell} ${styles.hero}`}>
          <div><p className={styles.kicker}>{es ? 'Oficios de confianza · Perú' : 'Trusted local services · Peru'}</p>
            <h2 className={styles.heroTitle}>{pro ? (es ? 'Tu talento merece ' : 'Your skills deserve ') : (es ? 'El profesional ideal, ' : 'The right professional, ')}<em>{pro ? (es ? 'más oportunidades.' : 'more opportunities.') : (es ? 'más cerca de ti.' : 'closer to you.')}</em></h2>
            <p className={styles.lead}>{pro ? (es ? 'Haz visible tu experiencia, conecta con nuevos clientes y construye tu reputación con cada trabajo.' : 'Showcase your experience, connect with new customers, and build your reputation with every job.') : (es ? 'Encuentra especialistas, explora sus oficios y descubre una forma más simple de resolver lo que necesitas.' : 'Find specialists, explore their skills, and discover a simpler way to get things done.')}</p>
            <a href="#dalo-journey" className={styles.primary}>{es ? 'Explorar el recorrido' : 'Explore the journey'} <ArrowRight size={18} /></a>
            <div className={styles.trust}><ShieldCheck size={21} /><span>{es ? 'Perfiles claros. Decisiones con confianza.' : 'Clear profiles. Confident decisions.'}</span></div>
          </div>
          <div className={styles.daloVisual}>
            <div className={styles.daloMark}><Image src={`/showcase/dalo/${pro ? 'DALO%20PROFESIONAL.svg' : 'DALO%20CLIENTE.svg'}`} alt={pro ? 'Dalo Pro' : 'Dalo'} width={110} height={110} /><span>{pro ? 'DALO PRO' : 'DALO'}</span><strong>{es ? 'Conectamos lo que sabes con quien lo necesita.' : 'Connecting your skills with those who need them.'}</strong></div>
            <div className={styles.miniProfile}><span className={styles.check}><Check size={20} /></span><div><b>{es ? 'Una red de confianza' : 'A network of trust'}</b><small>{es ? 'Clientes + profesionales' : 'Customers + professionals'}</small></div></div>
            <div className={styles.daloCategories}>{categories.slice(0, 3).map(item => <div key={item.en}><item.icon size={23} /><span>{es ? item.es : item.en}</span></div>)}</div>
          </div>
        </div>
      </section>
      <section id="dalo-journey" className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHeading}><p className={styles.kicker}>{es ? 'ASÍ DE SIMPLE' : 'THAT SIMPLE'}</p><h2>{es ? 'De “lo necesito” a listo.' : 'From “I need it” to done.'}</h2></div>
        <div className={styles.steps}>{steps.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{es ? ['Un punto de partida claro para cada usuario.', 'Información organizada para dar el siguiente paso.', 'Un recorrido que mantiene a ambas partes conectadas.'][index] : ['A clear starting point for every user.', 'Organized information to take the next step.', 'A journey that keeps both sides connected.'][index]}</p></article>)}</div>
      </section>
      <section className={styles.flowSection}>
        <div className={styles.shell}><div className={styles.sectionHeading}><p className={styles.kicker}>{es ? 'DOS EXPERIENCIAS, UNA CONEXIÓN' : 'TWO EXPERIENCES, ONE CONNECTION'}</p><h2>{es ? 'Para quien busca. Y para quien resuelve.' : 'For those who need help. And those who can help.'}</h2><p>{es ? 'Vistas originales del flujo de la aplicación.' : 'Original views of the application flow.'}</p></div><Image src="/showcase/dalo/dalo-app-flows.png" alt={es ? 'Flujos de Dalo para clientes y profesionales' : 'Dalo customer and professional flows'} width={1600} height={1000} sizes="90vw" className={styles.flowImage} /></div>
      </section>
      <section id="dalo-professionals" className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHeading}><p className={styles.kicker}>{es ? 'EXPLORA LA DEMO' : 'EXPLORE THE DEMO'}</p><h2>{es ? 'Un oficio para cada necesidad.' : 'A skill for every need.'}</h2><p>{es ? 'Selecciona una categoría. Perfiles ilustrativos, sin contrataciones reales.' : 'Select a category. Illustrative profiles, without real bookings.'}</p></div>
        <div className={styles.categoryGrid} role="group" aria-label={es ? 'Filtrar por oficio' : 'Filter by specialty'}>{categories.map((item, index) => <button key={item.en} onClick={() => setCategory(category === index ? null : index)} aria-pressed={category === index}><item.icon size={25} aria-hidden="true" />{es ? item.es : item.en}</button>)}</div>
        <button className={styles.resetFilter} onClick={() => setCategory(null)}>{es ? 'Ver todos los perfiles' : 'View all profiles'}</button>
        <div className={styles.profileGrid} aria-live="polite">{visiblePeople.length ? visiblePeople.map(person => <article key={person.name}>
          <div className={styles.portrait}>{person.image ? <Image src={`/showcase/dalo/${person.image}`} alt={person.name} fill sizes="(max-width:760px) 90vw, 30vw" /> : <span>{person.initials}</span>}</div>
          <div className={styles.profileCopy}><small>{es ? 'PERFIL DE DEMOSTRACIÓN' : 'DEMO PROFILE'}</small><h3>{person.name}</h3><p>{es ? categories[person.category].es : categories[person.category].en} · Lima, {es ? 'Perú' : 'Peru'}</p><span className={styles.rating}><Star size={16} fill="currentColor" />{person.rating}</span></div>
        </article>) : <p className={styles.empty}>{es ? 'Esta categoría no tiene perfiles en la demo. Explora otra especialidad.' : 'This category has no profiles in the demo. Explore another specialty.'}</p>}</div>
      </section>
      <section className={styles.faqSection}><div className={`${styles.shell} ${styles.faqGrid}`}><div><p className={styles.kicker}>{es ? 'SIN DUDAS' : 'CLEAR ANSWERS'}</p><h2>{es ? 'Preguntas frecuentes.' : 'Frequently asked questions.'}</h2></div><div>{faqs.map(faq => <details key={faq.en}><summary>{es ? faq.es : faq.en}</summary><p>{es ? faq.answerEs : faq.answerEn}</p></details>)}</div></div></section>
      <footer className={styles.projectFooter}><Image src="/showcase/dalo/DALO%20LOGO.svg" alt="Dalo" width={95} height={40} /><p>{es ? 'Dos públicos. Una experiencia que los conecta.' : 'Two audiences. One experience connecting them.'}</p></footer>
    </main>
  )
}
