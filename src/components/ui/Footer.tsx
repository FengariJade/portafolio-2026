'use client'

import { useLang } from '@/lib/LangContext'

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer className="bg-[#1B3A6B] border-t border-white/5 py-8 px-6 text-center">
      <p className="font-display font-bold text-white/20 text-sm uppercase tracking-widest">
        Jade Velez © {new Date().getFullYear()}
      </p>
      <p className="text-white/20 text-xs mt-1">
        {lang === 'es' ? 'Desarrollador FrontEnd & Diseñador' : 'FrontEnd Developer & Designer'}
      </p>
    </footer>
  )
}
