import type { Metadata } from 'next'
import CrmSatShowcase from '@/components/projects/crm-sat/CrmSatShowcase'

export const metadata: Metadata = {
  title: 'CRM-SAT | Case Study',
  description: 'Sanitized portfolio-ready case study for the CRM-SAT omnichannel CRM.',
}

export default function CrmSatPage() {
  return <CrmSatShowcase />
}
