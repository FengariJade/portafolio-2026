import type { Metadata } from 'next'
import BartechFieldShowcase from '@/components/projects/bartech-field/BartechFieldShowcase'

export const metadata: Metadata = {
  title: 'Bartech Field | Case Study',
  description: 'Sanitized portfolio-ready case study for the Bartech Field internal operations platform.',
}

export default function BartechFieldPage() {
  return <BartechFieldShowcase />
}
