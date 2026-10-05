'use client'

import Link from 'next/link'
import BackToProjects from './BackToProjects'
import { useState } from 'react'
import { useLang } from '@/lib/LangContext'

type Localized = {
  es: string
  en: string
}

type TabCard = {
  title: Localized
  value: string
  description: Localized
  tone?: 'default' | 'accent' | 'success' | 'warning'
}

type ShowcaseTab = {
  id: string
  label: Localized
  eyebrow: Localized
  title: Localized
  description: Localized
  bullets: Localized[]
  cards: TabCard[]
  footer: Localized
}

export type ShowcaseConfig = {
  name: string
  variant: 'violet' | 'cyan' | 'amber' | 'rose' | 'emerald'
  eyebrow: Localized
  description: Localized
  tags: string[]
  metrics: Array<{ label: Localized; value: Localized }>
  highlightsTitle: Localized
  highlights: Localized[]
  problem: Localized
  solution: Localized
  outcome: Localized
  tabs: ShowcaseTab[]
  closingTitle: Localized
  closingDescription: Localized
  closingStatus: Localized
}

const themeMap = {
  violet: {
    page: 'bg-[#0d0a18]',
    hero: 'bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_36%),linear-gradient(135deg,_#120d23_0%,_#160f2c_40%,_#0f172a_100%)]',
    accentText: 'text-violet-300',
    chip: 'border-violet-400/30 bg-violet-400/10 text-violet-100',
    metric: 'bg-[#1a1530]',
    highlight: 'border-violet-400/20 bg-gradient-to-br from-violet-500/18 to-fuchsia-500/8',
    section: 'bg-[#0f1020]',
    tabActive: 'bg-violet-500 text-white',
    tabIdle: 'border border-white/12 bg-white/4 text-white/64 hover:border-white/25 hover:text-white',
    panelFrame: 'bg-[#141327]',
    panel: 'bg-[#f8f8fc]',
    panelAccent: 'text-violet-600',
    closing: 'border-violet-400/20 bg-violet-500/10 text-violet-100/85',
  },
  cyan: {
    page: 'bg-[#08131a]',
    hero: 'bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.2),_transparent_28%),linear-gradient(135deg,_#061019_0%,_#0b1820_42%,_#0f172a_100%)]',
    accentText: 'text-cyan-300',
    chip: 'border-cyan-400/25 bg-cyan-400/8 text-cyan-100',
    metric: 'bg-[#10212a]',
    highlight: 'border-cyan-400/15 bg-gradient-to-br from-cyan-400/12 to-transparent',
    section: 'bg-[#09141b]',
    tabActive: 'bg-cyan-500 text-slate-950',
    tabIdle: 'border border-white/12 bg-white/4 text-white/65 hover:border-white/25 hover:text-white',
    panelFrame: 'bg-[#101c24]',
    panel: 'bg-[#f8fafc]',
    panelAccent: 'text-cyan-600',
    closing: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100/85',
  },
  amber: {
    page: 'bg-[#181109]',
    hero: 'bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.22),_transparent_30%),linear-gradient(135deg,_#161006_0%,_#23170a_42%,_#111827_100%)]',
    accentText: 'text-amber-300',
    chip: 'border-amber-400/30 bg-amber-400/10 text-amber-100',
    metric: 'bg-[#2b1f11]',
    highlight: 'border-amber-400/18 bg-gradient-to-br from-amber-400/14 to-transparent',
    section: 'bg-[#16110b]',
    tabActive: 'bg-amber-400 text-slate-950',
    tabIdle: 'border border-white/12 bg-white/4 text-white/65 hover:border-white/25 hover:text-white',
    panelFrame: 'bg-[#22170e]',
    panel: 'bg-[#fdfaf5]',
    panelAccent: 'text-amber-700',
    closing: 'border-amber-400/20 bg-amber-400/10 text-amber-100/85',
  },
  rose: {
    page: 'bg-[#1b0d19]',
    hero: 'bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.24),_transparent_30%),linear-gradient(135deg,_#170b16_0%,_#241020_44%,_#111827_100%)]',
    accentText: 'text-rose-300',
    chip: 'border-rose-400/30 bg-rose-400/10 text-rose-100',
    metric: 'bg-[#2d1628]',
    highlight: 'border-rose-400/18 bg-gradient-to-br from-rose-500/14 to-transparent',
    section: 'bg-[#170f18]',
    tabActive: 'bg-rose-500 text-white',
    tabIdle: 'border border-white/12 bg-white/4 text-white/64 hover:border-white/25 hover:text-white',
    panelFrame: 'bg-[#221324]',
    panel: 'bg-[#fff7fb]',
    panelAccent: 'text-rose-600',
    closing: 'border-rose-400/20 bg-rose-500/10 text-rose-100/85',
  },
  emerald: {
    page: 'bg-[#0c1712]',
    hero: 'bg-[radial-gradient(circle_at_top_left,_rgba(52,211,153,0.18),_transparent_30%),linear-gradient(135deg,_#0c1511_0%,_#122118_45%,_#111827_100%)]',
    accentText: 'text-emerald-300',
    chip: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
    metric: 'bg-[#13251c]',
    highlight: 'border-emerald-400/18 bg-gradient-to-br from-emerald-500/14 to-transparent',
    section: 'bg-[#0e1712]',
    tabActive: 'bg-emerald-500 text-slate-950',
    tabIdle: 'border border-white/12 bg-white/4 text-white/64 hover:border-white/25 hover:text-white',
    panelFrame: 'bg-[#14221b]',
    panel: 'bg-[#f7fcfa]',
    panelAccent: 'text-emerald-700',
    closing: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100/85',
  },
} as const

const toneMap = {
  default: 'bg-white',
  accent: 'bg-slate-50',
  success: 'bg-emerald-50',
  warning: 'bg-amber-50',
} as const

function pick(item: Localized, lang: 'es' | 'en') {
  return lang === 'es' ? item.es : item.en
}

export default function ProductShowcase({ config }: { config: ShowcaseConfig }) {
  const { lang } = useLang()
  const [activeTab, setActiveTab] = useState(config.tabs[0]?.id ?? '')

  const isEs = lang === 'es'
  const theme = themeMap[config.variant]
  const currentTab = config.tabs.find(tab => tab.id === activeTab) ?? config.tabs[0]

  return (
    <main className={`min-h-screen text-white ${theme.page}`}>
      <section className={`border-b border-white/10 ${theme.hero}`}>
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-28">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/55">
            <BackToProjects />
            <Link href="/" className="transition-colors hover:text-white">
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-white/75">{config.name}</span>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${theme.accentText}`}>
                {pick(config.eyebrow, lang)}
              </p>
              <h1 className="mt-3 text-4xl font-black uppercase tracking-[0.05em] text-white md:text-5xl">
                {config.name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
                {pick(config.description, lang)}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {config.tags.map(tag => (
                  <span key={tag} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${theme.chip}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                {config.metrics.map(metric => (
                  <div key={metric.label.es + metric.value.es} className={`rounded-[1.4rem] border border-white/10 p-4 ${theme.metric}`}>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">{pick(metric.label, lang)}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{pick(metric.value, lang)}</p>
                  </div>
                ))}
              </div>

              <div className={`mt-4 rounded-[1.6rem] border p-5 ${theme.highlight}`}>
                <p className={`text-xs uppercase tracking-[0.18em] ${theme.accentText}`}>
                  {pick(config.highlightsTitle, lang)}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/78">
                  {config.highlights.map(item => (
                    <li key={item.es}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`border-b border-white/10 ${theme.section}`}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:px-10 md:grid-cols-3">
          {[
            { titleEs: 'Problema', titleEn: 'Problem', body: config.problem },
            { titleEs: 'Solucion', titleEn: 'Solution', body: config.solution },
            { titleEs: 'Resultado', titleEn: 'Outcome', body: config.outcome },
          ].map(card => (
            <div key={card.titleEs} className="rounded-[1.6rem] border border-white/10 bg-white/4 p-6">
              <p className={`text-xs uppercase tracking-[0.18em] ${theme.accentText}`}>
                {isEs ? card.titleEs : card.titleEn}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/75">{pick(card.body, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className={`text-xs uppercase tracking-[0.22em] ${theme.accentText}`}>
              {isEs ? 'Vistas clave' : 'Key views'}
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.05em] text-white md:text-4xl">
              {isEs ? 'Recorrido del producto' : 'Product walkthrough'}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {config.tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-all ${
                  currentTab.id === tab.id ? theme.tabActive : theme.tabIdle
                }`}
              >
                {pick(tab.label, lang)}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-10 rounded-[2rem] border border-white/10 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:p-6 ${theme.panelFrame}`}>
          <div className={`overflow-hidden rounded-[1.6rem] border border-white/10 text-slate-800 ${theme.panel}`}>
            <div className="border-b border-slate-200 bg-white px-5 py-4">
              <p className={`text-xs uppercase tracking-[0.18em] ${theme.panelAccent}`}>
                {pick(currentTab.eyebrow, lang)}
              </p>
              <h3 className="mt-2 text-2xl font-black text-slate-900">{pick(currentTab.title, lang)}</h3>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="rounded-[1.3rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">{pick(currentTab.description, lang)}</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                  {currentTab.bullets.map(item => (
                    <li key={item.es}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {currentTab.cards.map(card => (
                  <div
                    key={card.title.es + card.value}
                    className={`rounded-[1.3rem] border border-slate-200 p-5 shadow-sm ${toneMap[card.tone ?? 'default']}`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{pick(card.title, lang)}</p>
                    <p className="mt-3 text-2xl font-black text-slate-900">{card.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{pick(card.description, lang)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4">
              <p className="text-sm leading-7 text-slate-600">{pick(currentTab.footer, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#101121]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className={`text-xs uppercase tracking-[0.2em] ${theme.accentText}`}>
                {isEs ? 'Siguiente paso' : 'Next step'}
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.05em] text-white md:text-4xl">
                {pick(config.closingTitle, lang)}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/72">
                {pick(config.closingDescription, lang)}
              </p>
            </div>
            <div className={`rounded-[1.75rem] border p-6 ${theme.closing}`}>
              <p className="text-sm leading-7">{pick(config.closingStatus, lang)}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
