'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LangContext'
import { useGsapReveal } from '@/hooks/useGsap'
import { Phone, Mail, Send, Loader2 } from 'lucide-react'

const contactEndpoint = 'https://formsubmit.co/ajax/Kevingomezeloy02@gmail.com'

export default function Contact() {
  const { t } = useLang()
  const ref = useGsapReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending' || website) return

    setStatus('sending')
    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `Nuevo mensaje del portafolio - ${form.name.trim()}`,
          _template: 'table',
          _honey: website,
        }),
      })
      const result = await response.json()
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Contact form submission failed')
      }
      setForm({ name: '', email: '', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
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
          <form data-reveal onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="contact-name" className="sr-only">{t('contact.name')}</label>
            <input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.name')}
              autoComplete="name"
              maxLength={100}
              required
              className="bg-white border border-[#1B3A6B]/20 rounded-xl px-5 py-3.5 text-[#050D1A] text-sm placeholder:text-[#050D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#2563C4]/40"
            />
            <label htmlFor="contact-email" className="sr-only">{t('contact.email')}</label>
            <input
              id="contact-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.email')}
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className="bg-white border border-[#1B3A6B]/20 rounded-xl px-5 py-3.5 text-[#050D1A] text-sm placeholder:text-[#050D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#2563C4]/40"
            />
            <label htmlFor="contact-message" className="sr-only">{t('contact.message')}</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder={t('contact.message')}
              maxLength={5000}
              required
              className="bg-white border border-[#1B3A6B]/20 rounded-xl px-5 py-3.5 text-[#050D1A] text-sm placeholder:text-[#050D1A]/40 focus:outline-none focus:ring-2 focus:ring-[#2563C4]/40 resize-none"
            />
            <input
              name="website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[10000px]"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center justify-center gap-2 bg-[#050D1A] hover:bg-[#1B3A6B] disabled:opacity-60 disabled:cursor-wait text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-colors duration-300"
            >
              {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
            <p role="status" aria-live="polite" className={`min-h-5 text-sm ${status === 'error' ? 'text-red-700' : 'text-[#1B3A6B]'}`}>
              {status === 'success' ? t('contact.success') : status === 'error' ? t('contact.error') : ''}
            </p>
          </form>

        </div>
      </div>
    </section>
  )
}
