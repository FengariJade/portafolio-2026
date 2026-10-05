import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import styles from './BartechPresentation.module.css'

export default function BartechContact({ isEs }: { isEs: boolean }) {
  return (
    <section className={styles.contact} aria-labelledby="bartech-contact-title">
      <div className={styles.contactInner}>
        <div className={styles.robotSlot}>
          <Image src="/showcase/bartech/images/home/robot1.webp" alt={isEs ? 'Robot de Bartech' : 'Bartech robot'} width={600} height={800} className={styles.contactRobot} />
        </div>
        <div className={styles.contactCopy}>
          <p className={styles.eyebrow}>{isEs ? 'EL SIGUIENTE PASO, JUNTOS' : 'THE NEXT STEP, TOGETHER'}</p>
          <h2 id="bartech-contact-title" className="bartech-tech">{isEs ? '¿Aún tienes dudas?' : 'Still have questions?'}</h2>
          <p className="bartech-copy">{isEs ? 'Contáctanos y te brindaremos toda la información que necesites. Crecemos juntos con el éxito de tu empresa.' : 'Contact us for all the information you need. We grow together with your company’s success.'}</p>
          <div className={styles.contactActions}>
            <a href="mailto:info@bartech.pe">{isEs ? 'Quiero más detalles' : 'Tell me more'}<ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href={isEs ? 'mailto:info@bartech.pe?subject=Consulta%20para%20una%20reuni%C3%B3n' : 'mailto:info@bartech.pe?subject=Meeting%20enquiry'}>{isEs ? 'Consultar una reunión' : 'Enquire about a meeting'}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
