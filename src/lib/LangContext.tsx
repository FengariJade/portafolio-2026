'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'es' | 'en'

interface LangContextType {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<Lang, Record<string, string>> = {
  es: {
    // Nav
    'nav.about':      'Sobre mí',
    'nav.studies':    'Estudios',
    'nav.experience': 'Experiencia',
    'nav.skills':     'Conocimientos',
    'nav.projects':   'Proyectos',
    'nav.design':     'Diseño',
    'nav.contact':    'Contacto',

    // Hero
    'hero.role':     'Desarrollador FrontEnd & Diseñador',
    'hero.cta':      'Ver proyectos',
    'hero.contact':  'Contactar',

    // About
    'about.title':   'Sobre mí',
    'about.role':    'Front-End developer especializado en Angular',
    'about.bio':     'Apasionado por el diseño, la interactividad y versatilidad de las aplicaciones web. Siempre dispuesto a aprender para llevar mis proyectos al máximo nivel.',

    // Studies
    'studies.title': 'Estudios',
    'studies.languages': 'Idiomas',
    'studies.spanish': 'Español',
    'studies.native': 'Nativo',
    'studies.english': 'Inglés',
    'studies.grammar': 'Gramática - Avanzado',
    'studies.phonetics': 'Fonética - Medio',

    // Experience
    'exp.title':   'Experiencia',
    'exp.years':   'Años de Experiencia',
    'exp.clients': 'Clientes Satisfechos',
    'exp.projects':'Proyectos Realizados',
    'exp.current': 'Actualidad',
    'exp.freelance':'Freelance',

    // Skills
    'skills.title':      'Conocimientos',
    'skills.languages':  'Lenguajes',
    'skills.frameworks': 'Frameworks',
    'skills.design':     'Diseño',
    'skills.others':     'Otros',

    // Projects
    'projects.title':    'Proyectos Destacados',
    'projects.more':     'Más Proyectos',

    // Design
    'design.title':      'Diseño UI/UX',
    'design.graphic':    'Diseño Gráfico',

    // Contact
    'contact.title':     'Contacto',
    'contact.subtitle':  '¿Tenés un proyecto en mente? Hablemos.',
    'contact.name':      'Nombre',
    'contact.message':   'Mensaje',
    'contact.send':      'Enviar mensaje',
    'contact.email':     'Email',
    'contact.phone':     'Teléfono',
  },
  en: {
    // Nav
    'nav.about':      'About',
    'nav.studies':    'Studies',
    'nav.experience': 'Experience',
    'nav.skills':     'Skills',
    'nav.projects':   'Projects',
    'nav.design':     'Design',
    'nav.contact':    'Contact',

    // Hero
    'hero.role':     'FrontEnd Developer & Designer',
    'hero.cta':      'View projects',
    'hero.contact':  'Contact me',

    // About
    'about.title':   'About me',
    'about.role':    'Front-End developer specialized in Angular',
    'about.bio':     'Passionate about design, interactivity and the versatility of web applications. Always eager to learn to take my projects to the next level.',

    // Studies
    'studies.title': 'Studies',
    'studies.languages': 'Languages',
    'studies.spanish': 'Spanish',
    'studies.native': 'Native',
    'studies.english': 'English',
    'studies.grammar': 'Grammar - Advanced',
    'studies.phonetics': 'Phonetics - Intermediate',

    // Experience
    'exp.title':   'Experience',
    'exp.years':   'Years of Experience',
    'exp.clients': 'Happy Clients',
    'exp.projects':'Projects Done',
    'exp.current': 'Present',
    'exp.freelance':'Freelance',

    // Skills
    'skills.title':      'Skills',
    'skills.languages':  'Languages',
    'skills.frameworks': 'Frameworks',
    'skills.design':     'Design',
    'skills.others':     'Others',

    // Projects
    'projects.title':    'Featured Projects',
    'projects.more':     'More Projects',

    // Design
    'design.title':      'UI/UX Design',
    'design.graphic':    'Graphic Design',

    // Contact
    'contact.title':     'Contact',
    'contact.subtitle':  'Have a project in mind? Let\'s talk.',
    'contact.name':      'Name',
    'contact.message':   'Message',
    'contact.send':      'Send message',
    'contact.email':     'Email',
    'contact.phone':     'Phone',
  },
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es')
  const t = (key: string) => translations[lang][key] ?? key

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
