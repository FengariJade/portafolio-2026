import type { Metadata } from 'next'
import InTimeShowcase from '@/components/projects/intime/InTimeShowcase'

export const metadata: Metadata = {
  title: 'InTime | Case Study',
  description: 'Landing page de control de asistencia y gestión de personal. Attendance management landing page case study.',
}

export default function InTimePage() {
  return <InTimeShowcase />
}
