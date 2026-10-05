import type { Metadata } from 'next'
import NouzWebsiteShowcase from '@/components/projects/nouz-website/NouzWebsiteShowcase'

export const metadata: Metadata = {
  title: 'NOUZ Website | Case Study',
  description: 'Sanitized portfolio-ready case study for the NOUZ Website landing page.',
}

export default function NouzWebsitePage() {
  return <NouzWebsiteShowcase />
}
