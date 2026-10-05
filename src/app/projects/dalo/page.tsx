import type { Metadata } from 'next'
import DaloShowcase from '@/components/projects/dalo/DaloShowcase'

export const metadata: Metadata = {
  title: 'Dalo | Case Study',
  description: 'Landing page para conectar clientes con profesionales. Customer and professional marketplace landing page case study.',
}

export default function DaloPage() {
  return <DaloShowcase />
}
