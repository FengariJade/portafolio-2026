import type { Metadata } from 'next'
import HereditatemShowcase from '@/components/projects/hereditatem/HereditatemShowcase'

export const metadata: Metadata = {
  title: 'Hereditatem | Case Study',
  description: 'Desarrollo del sitio web de Hereditatem y su aplicación de gestión. Website and management application case study.',
}

export default function HereditatemPage() {
  return <HereditatemShowcase />
}
