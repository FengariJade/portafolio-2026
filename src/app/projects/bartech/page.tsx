import type { Metadata } from 'next'
import BartechHomeShowcase from '@/components/projects/bartech/BartechHomeShowcase'

export const metadata: Metadata = {
  title: 'Bartech | Case Study',
  description: 'Sanitized portfolio-ready case study for the Bartech corporate website.',
}

export default function BartechPage() {
  return <BartechHomeShowcase />
}
