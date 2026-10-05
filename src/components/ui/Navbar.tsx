'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/LangContext'
import { Menu, X } from 'lucide-react'

const navKeys = [
  { key: 'nav.about',      href: '#about' },
  { key: 'nav.studies',    href: '#studies' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.skills',     href: '#skills' },
  { key: 'nav.projects',   href: '#projects' },
  { key: 'nav.design',     href: '#design' },
  { key: 'nav.contact',    href: '#contact' },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050D1A]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-16 py-4">
        {/* Logo */}
        <a href="#" className="font-display font-black text-white text-xl tracking-widest uppercase">
          
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navKeys.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 uppercase"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Lang toggle + mobile burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors duration-200 border border-white/20"
            style={{ background: '#2563C4' }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#050D1A]/98 border-t border-white/10">
          <ul className="flex flex-col py-4">
            {navKeys.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-white/80 hover:text-white text-sm uppercase tracking-wide transition-colors"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
