'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import styles from './BartechPresentation.module.css'

const RAW_SERVICES = [
  {
    titleEs: 'Desarrollo de aplicaciones',
    titleEn: 'App development',
    descEs: 'Lleva tu negocio al siguiente nivel con aplicaciones móviles de alto impacto. Desarrollamos apps que van más allá de la funcionalidad: son intuitivas, atractivas y diseñadas para brindar una experiencia de usuario excepcional.',
    descEn: 'Take your business to the next level with high-impact mobile apps — intuitive, attractive, and designed for an exceptional user experience.',
  },
  {
    titleEs: 'Automatización de procesos (RPA)',
    titleEn: 'Process automation (RPA)',
    descEs: 'Optimiza tus flujos de trabajo con robots de software que eliminan tareas repetitivas y mejoran la eficiencia operativa.',
    descEn: 'Optimize workflows with software bots that eliminate repetitive tasks and boost operational efficiency.',
  },
  {
    titleEs: 'Soluciones de data y analítica',
    titleEn: 'Data & analytics',
    descEs: 'Transforma datos en decisiones. Implementamos plataformas de analítica avanzada para que tu empresa opere con inteligencia.',
    descEn: 'Turn data into decisions with advanced analytics platforms for intelligent operations.',
  },
  {
    titleEs: 'Outsourcing tecnológico',
    titleEn: 'Tech outsourcing',
    descEs: 'Extiende tu equipo con talento especializado en tecnología, bajo el respaldo y la calidad de Bartech.',
    descEn: "Extend your team with specialized tech talent backed by Bartech's quality standards.",
  },
  {
    titleEs: 'No-Code y Low-Code',
    titleEn: 'No-Code & Low-Code',
    descEs: 'Desarrollamos soluciones ágiles y escalables usando plataformas modernas sin código o con poco código.',
    descEn: 'Build agile, scalable solutions using modern no-code and low-code platforms.',
  },
  {
    titleEs: 'IA y modelos de Machine Learning',
    titleEn: 'AI & Machine Learning',
    descEs: 'Integramos inteligencia artificial en tus procesos para automatizar decisiones y generar valor real desde los datos.',
    descEn: 'Integrate AI into your processes to automate decisions and generate real value from data.',
  },
  {
    titleEs: 'Infraestructura y soporte de TI',
    titleEn: 'IT infrastructure & support',
    descEs: 'Garantizamos la continuidad y seguridad de tus sistemas con soporte experto e infraestructura robusta.',
    descEn: 'Ensure continuity and security of your systems with expert support and robust infrastructure.',
  },
]


export function BartechServicesSection({ isEs }: { isEs: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section className={styles.services} aria-labelledby="bartech-services-title">
      <div className={styles.container}>
        <div className={styles.servicesGrid}>
          <div className={styles.servicesIntro}>
            <p className={styles.eyebrow}>{isEs ? 'SOLUCIONES QUE IMPULSAN' : 'SOLUTIONS THAT EMPOWER'}</p>
            <h2 id="bartech-services-title" className="bartech-title">{isEs ? 'Tecnología con un propósito.' : 'Technology with a purpose.'}</h2>
            <div className={styles.serviceArt}>
              <div className={styles.serviceRing} aria-hidden="true" />
              <Image src="/showcase/bartech/images/home/robot1.webp" alt="" width={600} height={800} />
            </div>
          </div>
          <div className={styles.serviceList}>
            {RAW_SERVICES.map((item, index) => (
              <article key={item.titleEn} className={styles.serviceItem} data-active={activeIndex === index}>
                <h3><button id={`service-button-${index}`} aria-expanded={activeIndex === index} aria-controls={`service-panel-${index}`} onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                  <span className={styles.serviceNumber}>0{index + 1}</span>
                  <span>{isEs ? item.titleEs : item.titleEn}</span>
                  <Plus size={20} aria-hidden="true" />
                </button></h3>
                <div id={`service-panel-${index}`} role="region" aria-labelledby={`service-button-${index}`} hidden={activeIndex !== index}>
                  <p className="bartech-copy">{isEs ? item.descEs : item.descEn}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
