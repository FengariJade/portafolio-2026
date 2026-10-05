'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Landmark, Layers, ScanLine } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { newProjects } from '@/data/newProjects'
import CaseStudyHeader from '../CaseStudyHeader'
import styles from '../LandingShowcase.module.css'

const services = [
  { es: 'Gestión arqueológica', en: 'Archaeological management', icon: Landmark, image: 'banner_gestion_arqueologica_detalle.png', descEs: 'Certificados, evaluaciones, monitoreos y planes para acompañar proyectos con seguridad normativa.', descEn: 'Certificates, assessments, monitoring, and plans to support projects throughout their regulatory process.', tags: ['CIRA', 'DAS', 'PMAR', 'PEA', 'PRA'] },
  { es: 'Museografía y contenidos', en: 'Museography & content', icon: Layers, image: 'banner_museografia_y_contenidos_detalle.png', descEs: 'Espacios interpretativos, museos y piezas editoriales que conectan conocimiento y comunidad.', descEn: 'Interpretive spaces, museums, and editorial pieces connecting knowledge and communities.', tags: ['Museos / Museums', 'Editorial', 'Señalética / Signage'] },
  { es: 'Servicios técnicos', en: 'Technical services', icon: ScanLine, image: 'banner_servicio_tecnico_detalle.png', descEs: 'Dron, topografía y fotogrametría para registrar el territorio y dejar evidencia precisa.', descEn: 'Drones, surveying, and photogrammetry to document the landscape and create precise records.', tags: ['Dron / Drone', 'Topografía / Surveying', 'Fotogrametría / Photogrammetry'] },
]
const gallery = [
  { file: 'Cada_capa_cuenta_una_historia.png', es: 'Cada capa cuenta una historia.', en: 'Every layer tells a story.' },
  { file: 'Del_hallazgo_al_conocimiento.png', es: 'Del hallazgo al conocimiento.', en: 'From discovery to knowledge.' },
  { file: 'hacer_visible_nuestro_legado.png', es: 'Hacer visible nuestro legado.', en: 'Making our legacy visible.' },
]

export default function HereditatemShowcase() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [active, setActive] = useState(0)
  const service = services[active]
  const project = newProjects[0]
  return (
    <main className={`${styles.page} ${styles.heritage}`}>
      <CaseStudyHeader project={project} />
      <div className={styles.brandBar}>
        <a href="#heritage-home" className={styles.wordmark}><Image src="/showcase/hereditatem/Recurso%201.svg" alt="" width={35} height={35} />HEREDITATEM</a>
        <a href="#heritage-services">{es ? 'Explorar servicios' : 'Explore services'} <ArrowDown size={16} /></a>
      </div>
      <section id="heritage-home" className={`${styles.shell} ${styles.hero}`}>
        <div>
          <p className={styles.kicker}>{es ? 'Patrimonio cultural · Perú' : 'Cultural heritage · Peru'}</p>
          <h2 className={styles.heroTitle}>{es ? 'Cuidamos lo que ' : 'We care for what '}<em>{es ? 'nos trasciende.' : 'outlives us.'}</em></h2>
          <p className={styles.lead}>{es ? 'Arqueología, conservación y difusión para convertir el patrimonio en una decisión técnica, sostenible y con futuro.' : 'Archaeology, conservation, and outreach to approach heritage with technical rigor, sustainability, and a vision for the future.'}</p>
          <a className={styles.primary} href="https://hereditatem.com/" target="_blank" rel="noopener noreferrer">{es ? 'Conocer la web real' : 'Visit the live website'} <ArrowUpRight size={18} /></a>
          <div className={styles.heroFacts}><span><b>360°</b>{es ? 'Gestión integral' : 'End-to-end management'}</span><span><b>{es ? 'Perú' : 'Peru'}</b>{es ? 'Alcance nacional' : 'Nationwide reach'}</span></div>
        </div>
        <figure className={styles.heritagePhoto}>
          <Image src="/showcase/hereditatem/Hero.png" alt={es ? 'Conservación de una pieza de cerámica del patrimonio peruano' : 'Conservation of a Peruvian heritage ceramic artifact'} fill sizes="(max-width: 760px) 90vw, 46vw" priority />
          <figcaption>{es ? 'El territorio también guarda memoria.' : 'The landscape holds memories, too.'}<span>01</span></figcaption>
        </figure>
      </section>
      <div className={styles.strata} aria-hidden="true" />
      <section className={`${styles.shell} ${styles.section}`}>
        <div className={styles.sectionHeading}><p className={styles.kicker}>01 / {es ? 'EL TERRITORIO' : 'THE LANDSCAPE'}</p><h2>{es ? 'Leer el pasado. Proyectar el futuro.' : 'Read the past. Shape the future.'}</h2></div>
        <div className={styles.gallery}>{gallery.map((item, index) => <figure key={item.file}><Image src={`/showcase/hereditatem/${item.file}`} alt={es ? item.es : item.en} fill sizes="(max-width: 760px) 90vw, 30vw" /><figcaption><small>0{index + 1}</small><h3>{es ? item.es : item.en}</h3></figcaption></figure>)}</div>
      </section>
      <section id="heritage-services" className={styles.serviceSection}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}><p className={styles.kicker}>02 / {es ? 'SERVICIOS' : 'SERVICES'}</p><h2>{es ? 'Del territorio al relato.' : 'From landscape to story.'}</h2><p>{es ? 'Un solo equipo para resolver lo técnico, lo normativo y lo cultural.' : 'One team bringing together technical, regulatory, and cultural expertise.'}</p></div>
          <div className={styles.serviceLayout}>
            <div className={styles.serviceChoices}>{services.map((item, index) => <button key={item.en} onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="heritage-service" className={active === index ? styles.chosen : ''}><span>0{index + 1}</span><item.icon size={25} aria-hidden="true" /><span>{es ? item.es : item.en}</span><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
            <article id="heritage-service" className={styles.serviceDetail} aria-live="polite">
              <Image src={`/showcase/hereditatem/${service.image}`} alt={es ? service.es : service.en} width={1000} height={560} sizes="(max-width: 760px) 90vw, 55vw" />
              <div><h3>{es ? service.es : service.en}</h3><p>{es ? service.descEs : service.descEn}</p><div className={styles.pills}>{service.tags.map(tag => <span key={tag}>{tag.includes(' / ') ? tag.split(' / ')[es ? 0 : 1] : tag}</span>)}</div></div>
            </article>
          </div>
        </div>
      </section>
      <section className={`${styles.shell} ${styles.section} ${styles.aboutGrid}`}>
        <div><p className={styles.kicker}>03 / {es ? 'NOSOTROS' : 'ABOUT'}</p><h2>{es ? 'Rigor técnico. Mirada humana.' : 'Technical rigor. Human perspective.'}</h2><p className={styles.lead}>{es ? 'Una empresa peruana que protege y activa el patrimonio cultural, material e inmaterial. Un equipo multidisciplinario acompaña cada proyecto desde el diagnóstico hasta su difusión.' : 'A Peruvian company protecting and bringing tangible and intangible cultural heritage to life. A multidisciplinary team supports each project from assessment to outreach.'}</p></div>
        <Image src="/showcase/hereditatem/Imagen_de_equipo_de_nosotros.png" alt={es ? 'Equipo de Hereditatem' : 'The Hereditatem team'} width={1000} height={700} sizes="(max-width: 760px) 90vw, 50vw" />
      </section>
      <section className={styles.ecosystem}>
        <div className={styles.shell}>
          <p className={styles.kicker}>{es ? 'MI TRABAJO · DOS PRODUCTOS' : 'MY WORK · TWO PRODUCTS'}</p>
          <h2>{es ? 'Una identidad. Dos experiencias digitales.' : 'One identity. Two digital experiences.'}</h2>
          <p className={styles.lead}>{es ? 'Desarrollé tanto el sitio institucional de Hereditatem como su propia aplicación de gestión.' : 'I developed both the Hereditatem corporate website and its own management application.'}</p>
          <div className={styles.twoCards}>
            <a href="https://hereditatem.com/" target="_blank" rel="noopener noreferrer"><span>01 / {es ? 'PRESENCIA PÚBLICA' : 'PUBLIC PRESENCE'}</span><h3>{es ? 'Sitio web' : 'Website'} <ArrowUpRight /></h3><p>hereditatem.com</p><p>{es ? 'Servicios, equipo y propuesta de valor de la empresa.' : 'The company’s services, team, and value proposition.'}</p></a>
            <a href="https://app.hereditatem.com/login" target="_blank" rel="noopener noreferrer"><span>02 / {es ? 'GESTIÓN' : 'MANAGEMENT'}</span><h3>{es ? 'Aplicación de gestión' : 'Management application'} <ArrowUpRight /></h3><p>app.hereditatem.com</p><p>{es ? 'Producto independiente con acceso mediante inicio de sesión.' : 'A separate product accessed through its login page.'}</p></a>
          </div>
        </div>
      </section>
    </main>
  )
}
