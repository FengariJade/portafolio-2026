'use client'

import Image from 'next/image'
import Link from 'next/link'
import BackToProjects from '../BackToProjects'
import { useState } from 'react'
import {
  BarChart3,
  Bell,
  Briefcase,
  ChevronDown,
  Gauge,
  Headphones,
  LayoutGrid,
  Mailbox,
  Mail,
  MessageSquare,
  PhoneCall,
  Settings2,
  Search,
  Shield,
  Users,
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import {
  crmSatCitizenDetails,
  crmSatConversations,
  crmSatMessages,
  crmSatReportCards,
  crmSatReportRows,
  crmSatSidebarPrimary,
  crmSatSidebarSecondary,
  crmSatSupervisorPanels,
  crmSatSupervisorRows,
  crmSatTopChannels,
  type CrmSatSidebarIcon,
  type CrmSatSidebarItem,
  type CrmSatView,
} from './crmSatData'

function SidebarIcon({ icon }: { icon: CrmSatSidebarIcon }) {
  const cls = 'h-[1.05rem] w-[1.05rem]'
  switch (icon) {
    case 'dashboard':
      return <Gauge className={cls} />
    case 'inbox':
      return <MessageSquare className={cls} />
    case 'mail':
      return <Mailbox className={cls} />
    case 'phone':
      return <PhoneCall className={cls} />
    case 'supervision':
      return <Shield className={cls} />
    case 'portfolio':
      return <Briefcase className={cls} />
    case 'campaigns':
      return <LayoutGrid className={cls} />
    case 'reports':
      return <BarChart3 className={cls} />
    case 'users':
      return <Users className={cls} />
    case 'settings':
      return <Settings2 className={cls} />
  }
}

function SidebarButton({
  item,
  isEs,
  active,
  sidebarExpanded,
  onClick,
}: {
  item: CrmSatSidebarItem
  isEs: boolean
  active: boolean
  sidebarExpanded: boolean
  onClick: () => void
}) {
  return (
    <button
      key={item.id}
      onClick={onClick}
      disabled={item.disabled}
      className={`group mx-auto flex items-center overflow-hidden rounded-full text-left text-sm transition-all ${
        !sidebarExpanded
          ? item.disabled
            ? 'h-[3.45rem] w-[3.45rem] cursor-not-allowed justify-center gap-0 px-0 py-0 opacity-45'
            : active
              ? 'h-[3.45rem] w-[3.45rem] justify-center gap-0 bg-[#9993F5] px-0 py-0 text-white shadow-[0_10px_24px_rgba(153,147,245,0.28)]'
              : 'h-[3.45rem] w-[3.45rem] justify-center gap-0 px-0 py-0 text-slate-700 hover:bg-white hover:text-slate-900'
          : item.disabled
            ? 'w-full gap-3 px-3 py-2.5 cursor-not-allowed opacity-45'
            : active
              ? 'w-[88%] gap-3 bg-[#9993F5] px-3 py-2.5 text-white shadow-[0_10px_24px_rgba(153,147,245,0.28)]'
              : 'w-full gap-3 px-3 py-2.5 text-slate-700 hover:bg-white hover:text-slate-900'
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
          item.disabled
            ? 'bg-[#ECEBF0] text-slate-400'
            : active
              ? 'bg-white/18 text-white'
              : 'bg-transparent text-slate-500 group-hover:text-[#9993F5]'
        }`}
      >
        <SidebarIcon icon={item.icon} />
      </div>
      <div
        className={`min-w-0 flex-1 overflow-hidden transition-[max-width,opacity,transform] duration-200 ${
          sidebarExpanded ? 'max-w-[14rem] translate-x-0 opacity-100 delay-75' : 'max-w-0 -translate-x-1 opacity-0'
        }`}
      >
        <p className="truncate whitespace-nowrap font-medium">{isEs ? item.labelEs : item.labelEn}</p>
      </div>
      {item.disabled && sidebarExpanded && (
        <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {isEs ? 'Off' : 'Off'}
        </span>
      )}
    </button>
  )
}

function statusTone(status: string) {
  const key = status.toLowerCase()
  if (key.includes('progress') || key.includes('atencion') || key.includes('listening')) return 'bg-amber-50 text-amber-700'
  if (key.includes('available') || key.includes('resuelto') || key.includes('resolved')) return 'bg-emerald-50 text-emerald-700'
  if (key.includes('intervention') || key.includes('escalado')) return 'bg-rose-50 text-rose-700'
  return 'bg-slate-100 text-slate-600'
}

export default function CrmSatShowcase() {
  const { lang } = useLang()
  const isEs = lang === 'es'
  const [activeView, setActiveView] = useState<CrmSatView>('inbox')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const pageTitle =
    activeView === 'inbox'
      ? isEs ? 'Inbox omnicanal' : 'Omnichannel inbox'
      : activeView === 'supervision'
        ? isEs ? 'Panel de supervision' : 'Supervision panel'
        : isEs ? 'Resumen ejecutivo' : 'Executive summary'

  return (
    <main className="min-h-screen bg-[#eef2f7] text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#0e1727_0%,#1f3659_44%,#2d5277_100%)] text-white">
        <div className="mx-auto max-w-[92rem] px-6 py-20 md:px-10 md:py-24">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/55">
            <BackToProjects />
            <Link href="/" className="transition-colors hover:text-white">
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-white/80">CRM-SAT</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                {isEs ? 'Demo sanitizada' : 'Sanitized demo'}
              </p>
              <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.04em] md:text-6xl">CRM-SAT</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                {isEs
                  ? 'Reinterpretacion portfolio-ready del CRM omnicanal real, inspirada en su shell enterprise, su alta densidad operativa y sus modulos de inbox, supervision y reportes.'
                  : 'A portfolio-ready reinterpretation of the real omnichannel CRM, inspired by its enterprise shell, high-density operational UI, and its inbox, supervision, and reporting modules.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Angular 19', 'Omnichannel CRM', 'Enterprise UI', 'Supervisor tools', 'Sanitized case study'].map(tag => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/12 bg-white/8 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-200">{isEs ? 'Se mantuvo' : 'Preserved'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                  <li>{isEs ? 'Shell oscuro, barra superior y paneles redondeados.' : 'Dark shell, top bar, and rounded panels.'}</li>
                  <li>{isEs ? 'Jerarquia enterprise para operar muchos modulos a la vez.' : 'Enterprise hierarchy for operating many modules at once.'}</li>
                  <li>{isEs ? 'Sensacion de plataforma real, no de landing resumida.' : 'A real-platform feeling instead of a summarized landing.'}</li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-sky-200/20 bg-sky-300/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-100">{isEs ? 'Se adapto' : 'Adapted'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/82">
                  <li>{isEs ? 'Datos, conversaciones y agentes totalmente mockeados.' : 'Data, conversations, and agents fully mocked.'}</li>
                  <li>{isEs ? 'Recorrido curado para mostrar frontend complejo.' : 'Curated flow focused on complex frontend work.'}</li>
                  <li>{isEs ? 'Sin auth, sin canales reales y sin informacion sensible.' : 'No auth, no live channels, and no sensitive information.'}</li>
                </ul>
              </div>
            </div>
        </div>
      </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-4 py-10 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.1)]">
          <div className="min-h-[62rem] bg-white">
            <header className="flex h-20 items-center justify-between bg-white px-5 md:px-6">
              <div className="relative z-30 flex items-center gap-4">
                <div className="flex h-[3.45rem] w-[3.45rem] items-center justify-center">
                  <span className="text-[3rem] font-black leading-none tracking-[-0.08em] text-[#9993F5]">B</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F1F8] text-slate-600 transition hover:bg-[#ECEBF5]">
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F1F8] text-slate-700 transition hover:bg-[#ECEBF5]">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F1F8] text-slate-700 transition hover:bg-[#ECEBF5]">
                  <Users className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="relative min-h-[calc(62rem-5rem)] bg-white">
              <aside
                onMouseEnter={() => setSidebarExpanded(true)}
                onMouseLeave={() => setSidebarExpanded(false)}
                className={`absolute bottom-0 left-0 top-0 z-20 hidden bg-white text-slate-900 transition-[width] duration-300 ease-out lg:flex lg:flex-col ${
                  sidebarExpanded ? 'w-[17rem]' : 'w-[4.6rem]'
                }`}
              >
                <div className="flex-1 overflow-hidden pt-6">
                  <nav className="px-2">
                    <div className="space-y-1.5">
                      {crmSatSidebarPrimary.map(item => (
                        <SidebarButton
                          key={item.id}
                          item={item}
                          isEs={isEs}
                          active={item.view === activeView}
                          sidebarExpanded={sidebarExpanded}
                          onClick={() => item.view && setActiveView(item.view)}
                        />
                      ))}
                    </div>

                    <div className="mx-3 my-5 h-px bg-[#E6EAF3]" />

                    <p
                      className={`overflow-hidden px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 transition-all duration-300 ${
                        sidebarExpanded ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
                      }`}
                    >
                      {isEs ? 'Mas modulos' : 'More modules'}
                    </p>

                    <div className="space-y-1.5">
                      {crmSatSidebarSecondary.map(item => (
                        <SidebarButton
                          key={item.id}
                          item={item}
                          isEs={isEs}
                          active={item.view === activeView}
                          sidebarExpanded={sidebarExpanded}
                          onClick={() => item.view && setActiveView(item.view)}
                        />
                      ))}
                    </div>
                  </nav>
                </div>

                <div className="border-t border-[#E6EAF3] px-3 py-4">
                  <div className={`rounded-[1.5rem] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ${sidebarExpanded ? 'p-4 opacity-100' : 'p-2 opacity-100'}`}>
                    <div className="flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F2FF] text-[#9993F5]">
                        <Shield className="h-4 w-4" />
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        sidebarExpanded ? 'mt-3 max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{isEs ? 'Producto' : 'Product'}</p>
                      <p className="mt-2 text-sm text-slate-600">{isEs ? 'CRM omnicanal con capas de control y supervision.' : 'Omnichannel CRM with control and supervision layers.'}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#9993F5]">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#9993F5]" />
                        {isEs ? 'Vista portfolio curada' : 'Curated portfolio view'}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              <div
                className={`min-w-0 bg-white transition-[padding-left] duration-300 ease-out ${
                  sidebarExpanded ? 'lg:pl-[17rem]' : 'lg:pl-[4.6rem]'
                }`}
              >
                <div className="min-h-[calc(62rem-5rem)] bg-white">
                  <div
                    className="relative overflow-hidden bg-[#EEF3FB] px-4 pb-8 pt-6 md:px-6 lg:rounded-tl-[3.2rem] lg:px-8"
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                          <span className="text-slate-400">›</span>{' '}
                          <span>{isEs ? 'Inicio' : 'Home'}</span>
                          {activeView !== 'reports' && (
                            <>
                              {' '}<span className="text-slate-400">›</span>{' '}
                              <span className="text-slate-600">{pageTitle}</span>
                            </>
                          )}
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#9A96F4] text-white shadow-[0_10px_24px_rgba(153,147,245,0.35)]">
                            <Users className="h-5 w-5" />
                          </button>
                          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#9A96F4] text-white shadow-[0_10px_24px_rgba(153,147,245,0.35)]">
                            <MessageSquare className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 min-w-0">

              <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
                {[...crmSatSidebarPrimary, ...crmSatSidebarSecondary].filter(item => item.view).map(item => (
                  <button
                    key={item.id}
                    onClick={() => item.view && setActiveView(item.view)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                      activeView === item.view ? 'bg-[#9993F5] text-white' : 'border border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    {isEs ? item.labelEs : item.labelEn}
                  </button>
                ))}
              </div>

              <div className="p-5 md:p-8">
                {activeView === 'inbox' && (
                  <div className="space-y-6">
                    <div className="rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="grid gap-3 md:grid-cols-4">
                        {crmSatTopChannels.map(channel => (
                          <div key={channel.id} className={`flex items-center justify-between rounded-[1.3rem] border px-4 py-4 ${channel.tone}`}>
                            <div>
                              <p className="text-sm font-semibold">{channel.label}</p>
                              <p className="mt-1 text-xs opacity-80">{isEs ? 'Canal operativo' : 'Operational channel'}</p>
                            </div>
                            {channel.id === 'email' ? <Mail className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_minmax(0,0.75fr)]">
                      <aside className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-5 py-4">
                          <p className="text-sm font-semibold text-slate-800">{isEs ? 'Conversaciones activas' : 'Active conversations'}</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {crmSatConversations.map((item, index) => (
                            <button key={item.id} className={`flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-slate-50 ${index === 0 ? 'bg-sky-50/70' : ''}`}>
                              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#15243b] text-xs font-bold text-white">
                                {item.citizen.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="truncate text-sm font-semibold text-slate-900">{item.citizen}</p>
                                  <span className="text-xs text-slate-400">{item.time}</span>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">{item.channel}</p>
                                <p className="mt-2 truncate text-sm text-slate-600">{isEs ? item.topicEs : item.topicEn}</p>
                              </div>
                              {item.unread && <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sky-500" />}
                            </button>
                          ))}
                        </div>
                      </aside>

                      <section className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                          <div>
                            <p className="text-base font-semibold text-slate-900">Maria Torres</p>
                            <p className="text-xs text-slate-500">SAT-201 / WhatsApp Business</p>
                          </div>
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                            {isEs ? 'En atencion' : 'In progress'}
                          </span>
                        </div>

                        <div className="space-y-4 bg-[#f7f9fc] px-6 py-6">
                          {crmSatMessages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                              <div className={`max-w-[80%] rounded-[1.25rem] px-4 py-3 text-sm leading-7 shadow-sm ${
                                message.role === 'assistant'
                                  ? 'rounded-tl-sm bg-white text-slate-700'
                                  : 'rounded-tr-sm bg-[#15243b] text-white'
                              }`}>
                                <p>{isEs ? message.bodyEs : message.bodyEn}</p>
                                <p className={`mt-2 text-[11px] ${message.role === 'assistant' ? 'text-slate-400' : 'text-white/55'}`}>{message.meta}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-100 px-6 py-4">
                          <div className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3">
                            <MessageSquare className="h-4 w-4 text-slate-400" />
                            <span className="flex-1 text-sm text-slate-400">{isEs ? 'Escribe una respuesta al ciudadano...' : 'Write a reply to the citizen...'}</span>
                            <button className="rounded-full bg-[#15243b] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                              {isEs ? 'Enviar' : 'Send'}
                            </button>
                          </div>
                        </div>
                      </section>

                      <aside className="min-w-0 space-y-4 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:col-span-1 xl:block xl:space-y-4">
                        <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
                          <div className="border-b border-slate-100 px-5 py-4">
                            <p className="text-sm font-semibold text-slate-800">{isEs ? 'Ficha del ciudadano' : 'Citizen record'}</p>
                          </div>
                          <div className="space-y-4 px-5 py-5">
                            {crmSatCitizenDetails.map(item => (
                              <div key={item.labelEs}>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{isEs ? item.labelEs : item.labelEn}</p>
                                <p className="mt-1 text-sm font-medium text-slate-700">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
                          <div className="border-b border-slate-100 px-5 py-4">
                            <p className="text-sm font-semibold text-slate-800">{isEs ? 'Acciones rapidas' : 'Quick actions'}</p>
                          </div>
                          <div className="grid gap-3 px-5 py-5">
                            {[
                              { icon: PhoneCall, es: 'Escalar a llamada', en: 'Escalate to call' },
                              { icon: Headphones, es: 'Solicitar apoyo', en: 'Request support' },
                              { icon: LayoutGrid, es: 'Abrir expediente', en: 'Open case file' },
                            ].map(action => {
                              const Icon = action.icon
                              return (
                                <button key={action.es} className="flex items-center gap-3 rounded-[1rem] border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50">
                                  <Icon className="h-4 w-4 text-[#15243b]" />
                                  <span>{isEs ? action.es : action.en}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                )}

                {activeView === 'supervision' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 xl:grid-cols-3">
                      {crmSatSupervisorPanels.map(panel => (
                        <div key={panel.titleEs} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Panel activo' : 'Active panel'}</p>
                          <h3 className="mt-3 text-xl font-bold text-slate-900">{isEs ? panel.titleEs : panel.titleEn}</h3>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{isEs ? panel.descriptionEs : panel.descriptionEn}</p>
                        </div>
                      ))}
                    </div>

                    <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{isEs ? 'Supervision en vivo' : 'Live supervision'}</h3>
                          <p className="text-sm text-slate-500">{isEs ? 'Agentes, colas y control operativo en una sola vista.' : 'Agents, queues, and operational control in a single view.'}</p>
                        </div>
                        <button className="rounded-full bg-[#15243b] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                          {isEs ? 'Ver detalles' : 'View details'}
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50">
                            <tr>
                              {[
                                isEs ? 'Agente' : 'Agent',
                                isEs ? 'Cola' : 'Queue',
                                isEs ? 'Estado' : 'Status',
                                isEs ? 'Llamadas' : 'Calls',
                                'SLA',
                              ].map(head => (
                                <th key={head} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                  {head}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {crmSatSupervisorRows.map(row => (
                              <tr key={row.agent} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{row.agent}</td>
                                <td className="px-6 py-4 text-slate-600">{isEs ? row.queueEs : row.queueEn}</td>
                                <td className="px-6 py-4">
                                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(isEs ? row.statusEs : row.statusEn)}`}>
                                    {isEs ? row.statusEs : row.statusEn}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{row.calls}</td>
                                <td className="px-6 py-4 font-semibold text-slate-800">{row.sla}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'reports' && (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {crmSatReportCards.map(card => (
                        <div key={card.labelEs} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                          <p className="text-sm font-medium text-slate-500">{isEs ? card.labelEs : card.labelEn}</p>
                          <p className="mt-4 text-3xl font-black text-slate-900">{card.value}</p>
                          <p className="mt-3 text-sm text-emerald-600">{isEs ? card.deltaEs : card.deltaEn}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{isEs ? 'Resumen de modulos' : 'Module summary'}</h3>
                            <p className="text-sm text-slate-500">{isEs ? 'Lectura ejecutiva de las capas principales del CRM.' : 'Executive reading of the CRM core layers.'}</p>
                          </div>
                          <BarChart3 className="h-5 w-5 text-[#15243b]" />
                        </div>

                        <div className="mt-6 space-y-4">
                          {crmSatReportRows.map(row => (
                            <div key={row.moduleEs} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-5 py-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{isEs ? row.moduleEs : row.moduleEn}</p>
                                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{row.owner}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-black text-slate-900">{row.metric}</p>
                                  <p className="text-xs text-sky-600">{isEs ? row.trendEs : row.trendEn}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[1.8rem] border border-slate-200 bg-[#15243b] p-6 text-white shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-sky-200">{isEs ? 'Lectura del case study' : 'Case study reading'}</p>
                        <h3 className="mt-4 text-2xl font-bold">{isEs ? 'Frontend enterprise con alta densidad' : 'High-density enterprise frontend'}</h3>
                        <p className="mt-4 text-sm leading-7 text-white/74">
                          {isEs
                            ? 'Este case enseña como ordenas interfaces complejas sin perder claridad: listas, canales, perfiles, supervision, metricas y controles sensibles dentro de una sola arquitectura visual.'
                            : 'This case shows how you organize complex interfaces without losing clarity: lists, channels, profiles, supervision, metrics, and sensitive controls inside a single visual architecture.'}
                        </p>
                        <div className="mt-6 grid gap-3">
                          {[
                            isEs ? 'Jerarquia visual fuerte' : 'Strong visual hierarchy',
                            isEs ? 'Modulos coordinados entre si' : 'Coordinated modules',
                            isEs ? 'Lenguaje consistente para operacion real' : 'Consistent language for real operations',
                          ].map(item => (
                            <div key={item} className="rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/85">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
          </div>
        </div>
      </section>
    </main>
  )
}
