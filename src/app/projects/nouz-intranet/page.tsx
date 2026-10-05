import type { Metadata } from 'next'
import NouzIntranetShowcase from '@/components/projects/nouz-intranet/NouzIntranetShowcase'

export const metadata: Metadata = {
  title: 'NOUZ Intranet | Case Study',
  description: 'Sanitized portfolio-ready case study for the NOUZ Intranet productivity platform.',
}

export default function NouzIntranetPage() {
  return <NouzIntranetShowcase />
}
