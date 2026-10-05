import type { Metadata } from 'next'
import FlotexShowcase from '@/components/projects/flotex/FlotexShowcase'

export const metadata: Metadata = {
  title: 'FLOTEX | Case Study',
  description: 'Sanitized portfolio-ready case study for the FLOTEX logistics tracking product.',
}

export default function FlotexPage() {
  return <FlotexShowcase />
}
