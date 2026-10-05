'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { Phone, Mail, Send } from 'lucide-react'

export default function Contact() {
  const { t } = useLang()
  const ref = useGsapReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    // Hook up to your preferred email service (e.g. Resend, EmailJS, Formspree)
    const mailto = `mailto:Kevingomezeloy02@gmail.com?subject=Portfolio Contact - ${form.name}&body=${encodeURIComponent(form.message)}`
    window.location.href = mailto
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="section-padding bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 data-reveal className="font-display font-black text-[#2563C4] text-5xl md:text-6xl uppercase mb-4">
          {t('contact.title')}
        </h2>
        <p data-reveal className="text-[#0A1628]/60 text-lg mb-12">
          {t('contact.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Info */}
          <div data-reveal className="flex flex-col gap-5">
            <a
              href="tel:+51923857961"
              className="flex items-center gap-4 bg-[#1B3A6B] text-white rounded-2xl px-6 py-5 hover:bg-[#2563C4] transition-colors duration-200 group"
            >
              <Phone size={20} className="text-white" />
              <div>
                <p className="text-white/80 text-xs uppercase tracking-widest mb-0.5">{t('contact.phone')}</p>
                <p className="font-semibold">+51 923 857 961</p>
              </div>
            </a>
            <a
              href="mailto:Kevingomezeloy02@gmail.com"
              className="flex items-center gap-4 bg-[#1B3A6B] text-white rounded-2xl px-6 py-5 hover:bg-[#2563C4] transition-colors duration-200"
            >
              <Mail size={20} className="text-white" />
              <div>
                <p className="text-white/80 text-xs uppercase tracking-widest mb-0.5">{t('contact.email')}</p>
                <p className="font-semibold text-sm">Kevingomezeloy02@gmail.com</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div data-reveal className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.name')}
              className="bg-white border border-[#1B3A6B]/20 rounded-xl px-5 py-3.5 text-[#050D1A] text-sm placeholder:text-[#050D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#2563C4]/40"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.email')}
              type="email"
              className="bg-white border border-[#1B3A6B]/20 rounded-xl px-5 py-3.5 text-[#050D1A] text-sm placeholder:text-[#050D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#2563C4]/40"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder={t('contact.message')}
              className="bg-white border border-[#1B3A6B]/20 rounded-xl px-5 py-3.5 text-[#050D1A] text-sm placeholder:text-[#050D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#2563C4]/40 resize-none"
            />
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-[#050D1A] hover:bg-[#1B3A6B] text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-colors duration-300"
            >
              <Send size={16} />
              {t('contact.send')}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
