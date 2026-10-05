'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { useState } from 'react'
import BackToProjects from '../BackToProjects'
import { useLang } from '@/lib/LangContext'
import { nouzCapabilities, nouzFaqItems, nouzFeatureCards, nouzPlans, nouzSupportCards } from './nouzWebsiteData'
import styles from './NouzWebsiteShowcase.module.css'

export default function NouzWebsiteShowcase() {
  const { lang, toggleLang } = useLang()
  const isEs = lang === 'es'
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.navigation} aria-label={isEs ? 'Navegación del proyecto' : 'Project navigation'}>
            <BackToProjects /><Link href="/#projects">{isEs ? 'Proyectos' : 'Projects'}</Link><span>/</span><span>NOUZ Website</span>
            <button onClick={toggleLang} aria-label={isEs ? 'Switch to English' : 'Cambiar a español'}>{isEs ? 'EN' : 'ES'}</button>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{isEs ? 'ASISTENTE PERSONAL · CASE STUDY' : 'PERSONAL ASSISTANT · CASE STUDY'}</p>
              <h1>{isEs ? 'Más espacio para vivir. Menos cosas que recordar.' : 'More room to live. Less to remember.'}</h1>
              <p className={styles.intro}>{isEs ? 'Conoce NOUZ: tu asistente inteligente para organizar tareas, conectar tus calendarios y recordar lo que de verdad importa.' : 'Meet NOUZ: your smart assistant for organizing tasks, connecting calendars, and remembering what really matters.'}</p>
              <div className={styles.actions}>
                <Link className={styles.primary} href="/projects/nouz-intranet">{isEs ? 'Explorar la demo' : 'Explore the demo'}<ArrowUpRight size={18} aria-hidden="true" /></Link>
                <a className={styles.secondary} href="#nouz-features">{isEs ? 'Conocer NOUZ' : 'Discover NOUZ'}</a>
              </div>
              <p className={styles.demoNote}>{isEs ? 'Vista de portafolio con recursos originales del proyecto.' : 'Portfolio preview using original project assets.'}</p>
            </div>
            <div className={styles.heroArt}>
              <span className={styles.orbit} aria-hidden="true" />
              <Image src="/showcase/nouz/images/bot/bot.png" alt={isEs ? 'Asistente NOUZ' : 'NOUZ assistant'} width={540} height={600} priority />
              <span className={styles.artLabel}>{isEs ? 'Tu día, en orden.' : 'Your day, organized.'}<Check size={18} aria-hidden="true" /></span>
            </div>
          </div>
          <div className={styles.heroBanner}>
            <Image src="/showcase/nouz/images/decoration/bannerHome.png" alt={isEs ? 'Universo visual de NOUZ' : 'The NOUZ visual universe'} width={1500} height={700} priority />
          </div>
        </div>
      </section>

      <section id="nouz-features" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / {isEs ? 'MENOS RUIDO, MÁS CLARIDAD' : 'LESS NOISE, MORE CLARITY'}</p><h2>{isEs ? 'Una pequeña ayuda. Una gran diferencia.' : 'A little help. A big difference.'}</h2></div>
            <p>{isEs ? 'Recordatorios, listas y calendarios conectados en un solo lugar. Una experiencia cercana para simplificar tu día a día.' : 'Reminders, lists, and connected calendars in one place. A friendly experience to simplify your everyday life.'}</p>
          </div>
          <div className={styles.featureGrid}>
            {nouzFeatureCards.map((feature, index) => <article key={feature.image} className={styles.feature}>
              <div className={styles.featureArt}><Image src={feature.image} alt="" width={620} height={740} /></div>
              <div className={styles.featureCaption}><span>0{index + 1}</span><h3>{isEs ? feature.titleEs : feature.titleEn}</h3></div>
            </article>)}
          </div>
          <ul className={styles.capabilities}>{nouzCapabilities.map(item => <li key={item.icon}><Image src={item.icon} alt="" width={36} height={36} /><span>{isEs ? item.labelEs : item.labelEn}</span></li>)}</ul>
        </div>
      </section>

      <section className={styles.plansSection}>
        <div className={styles.container}>
          <div className={styles.centerHeading}><p className={styles.eyebrow}>02 / {isEs ? 'A TU RITMO' : 'AT YOUR OWN PACE'}</p><h2>{isEs ? 'Un plan para cada universo.' : 'A plan for every universe.'}</h2>
            <div className={styles.billing} aria-label={isEs ? 'Periodo de facturación' : 'Billing period'}>{(['annual', 'monthly'] as const).map(period => <button key={period} aria-pressed={billing === period} onClick={() => setBilling(period)}>{period === 'annual' ? (isEs ? 'Anual' : 'Yearly') : (isEs ? 'Mensual' : 'Monthly')}</button>)}</div>
          </div>
          <div className={styles.planGrid}>{nouzPlans[billing].map((plan, index) => <article key={plan.name} className={styles.plan} data-featured={index === 1}>
            <div className={styles.planTop}><span className={styles.eyebrow}>0{index + 1} / {plan.name}</span><Image src={plan.image} alt="" width={120} height={120} /></div>
            <h3>{plan.name}</h3><p className={styles.price}><span>S/</span> {plan.price}<small>/{isEs ? 'mes' : 'mo'}</small></p>
            <p className={styles.planPeriod}>{isEs ? plan.totalEs : plan.totalEn}</p>
            <p className={styles.planDescription}>{isEs ? ['Organiza lo esencial de tu día.', 'Conecta tus ideas, tareas y calendarios.', 'Más espacio para tus grandes planes.'][index] : ['Organize your everyday essentials.', 'Connect your ideas, tasks, and calendars.', 'More room for your biggest plans.'][index]}</p>
            <Link href="/projects/nouz-intranet" className={styles.planLink}>{isEs ? 'Ver experiencia de la app' : 'Preview the app'}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </article>)}</div>
          <p className={styles.pricingNote}>{isEs ? 'Planes ilustrativos del diseño original. Esta demo no procesa suscripciones ni pagos.' : 'Illustrative plans from the original design. This demo does not process subscriptions or payments.'}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>03 / {isEs ? 'EN TU DÍA A DÍA' : 'IN YOUR EVERYDAY LIFE'}</p><h2>{isEs ? 'Tú lo dices. NOUZ lo recuerda.' : 'You say it. NOUZ remembers.'}</h2></div><p>{isEs ? 'Desde una idea rápida hasta tu próxima reunión: una forma más natural de mantener todo conectado.' : 'From a quick idea to your next meeting: a more natural way to keep everything connected.'}</p></div>
          <div className={styles.supportGrid}>
            <article className={styles.steps}><h3>{isEs ? '¿Cómo funciona?' : 'How does it work?'}</h3><ol>{(isEs ? nouzSupportCards.howItWorks.itemsEs : nouzSupportCards.howItWorks.itemsEn).map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol></article>
            <article className={styles.benefits}><h3>{isEs ? 'Menos pendientes. Más tranquilidad.' : 'Less to do. More peace of mind.'}</h3><ul>{nouzSupportCards.benefits.items.map(item => <li key={item.icon}><Image src={item.icon} alt="" width={52} height={52} /><span>{isEs ? item.textEs : item.textEn}</span></li>)}</ul></article>
          </div>
          <div className={styles.useCases}><p>{isEs ? 'Se adapta a tu mundo' : 'Fits into your world'}</p>{(isEs ? nouzSupportCards.useCases.itemsEs : nouzSupportCards.useCases.itemsEn).map(item => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div><p className={styles.eyebrow}>04 / FAQ</p><h2>{isEs ? 'Lo que quieres saber.' : 'Good to know.'}</h2><p className={styles.faqIntro}>{isEs ? 'Conoce la propuesta del producto y explora su experiencia en la demo de NOUZ Intranet.' : 'Discover the product concept and explore the experience in the NOUZ Intranet demo.'}</p><Link className={styles.primary} href="/projects/nouz-intranet">{isEs ? 'Ir a la demo' : 'Open the demo'}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
            <div>{nouzFaqItems.map(item => <details className={styles.faq} key={item.qEn}><summary>{isEs ? item.qEs : item.qEn}<Plus size={20} aria-hidden="true" /></summary><p>{isEs ? item.aEs : item.aEn}</p></details>)}</div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}><div className={styles.container}><strong>NOUZ</strong><span>{isEs ? 'Una memoria extra. Más vida para ti.' : 'A little extra memory. More life for you.'}</span><BackToProjects /></div></footer>
    </main>
  )
}
