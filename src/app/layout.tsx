import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/LangContext'

export const metadata: Metadata = {
  title: 'Jade velez — FrontEnd Developer & Designer',
  description: 'Portfolio de Jade velez, Desarrollador FrontEnd especializado en Angular, React, TypeScript y Diseño UI/UX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
