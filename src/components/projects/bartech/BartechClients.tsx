'use client'

import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { clientLogos, figureCards } from './bartechData'
import styles from './BartechPresentation.module.css'

const clientNames = ['SERNANP', 'INGEMMET', 'OSIPTEL', 'RINSA', 'TT']

export default function BartechClients({ isEs }: { isEs: boolean }) {
  const [paused, setPaused] = useState(false)

  return (
    <section className={styles.clients} aria-labelledby="bartech-clients-title">
      <div className={styles.container}>
        <div className={styles.clientsHeading}>
          <div>
            <p className={styles.eyebrow}>{isEs ? 'CONFIANZA QUE NOS CONECTA' : 'TRUST THAT CONNECTS US'}</p>
            <h2 id="bartech-clients-title" className="bartech-title">{isEs ? 'Nuestros clientes' : 'Our clients'}</h2>
          </div>
          <p>{isEs ? 'Tecnología al servicio de organizaciones que siguen avanzando.' : 'Technology for organizations that keep moving forward.'}</p>
        </div>
        <div className={styles.ribbonHeader}>
          <span>{isEs ? 'Algunas marcas que confían en Bartech' : 'Some of the brands that trust Bartech'}</span>
          <button onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={isEs ? 'Pausar animación de marcas' : 'Pause brand animation'}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {paused ? (isEs ? 'Continuar' : 'Resume') : (isEs ? 'Pausar' : 'Pause')}
          </button>
        </div>
        <div className={styles.ribbon} data-paused={paused}>
          <div className={styles.track}>
            {[0, 1].map(copy => <ul className={styles.logoGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {clientLogos.map((logo, index) => <li key={logo}><Image src={logo} alt={copy === 0 ? clientNames[index] : ''} width={180} height={80} /></li>)}
            </ul>)}
          </div>
        </div>
        <dl className={styles.metrics}>
          {figureCards.map((card, index) => <div className={styles.metric} key={card.value}>
            <dt>{isEs ? (index === 0 ? 'Años de experiencia' : card.labelEs) : card.labelEn}</dt>
            <dd className="bartech-tech">{card.value}</dd>
            <span className={styles.metricLine} aria-hidden="true" />
          </div>)}
        </dl>
      </div>
    </section>
  )
}
