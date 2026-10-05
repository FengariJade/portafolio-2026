'use client'

import Image from 'next/image'
import Link from 'next/link'
import BackToProjects from '../BackToProjects'
import { useState } from 'react'
import {
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Palette,
  Settings,
  Sparkles,
  StickyNote,
  Users,
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import {
  nouzAgendaEvents,
  nouzBackgrounds,
  nouzChatMessages,
  nouzDashboardWidgets,
  nouzFriendActivity,
  nouzFriends,
  nouzHours,
  nouzNavLinks,
  nouzNotes,
  nouzNotifications,
  nouzPlans,
  nouzPriorities,
  nouzQuickActions,
  nouzSidebarLinks,
  nouzWeekDays,
  type NouzIntranetView,
} from './nouzIntranetData'

function SidebarIcon({ view }: { view: NouzIntranetView }) {
  const cls = 'h-4 w-4'
  switch (view) {
    case 'home':
      return <Sparkles className={cls} />
    case 'agenda':
      return <Clock3 className={cls} />
    case 'chat':
      return <MessageCircle className={cls} />
    case 'friends':
      return <Users className={cls} />
    case 'customize':
      return <Palette className={cls} />
    case 'settings':
      return <Settings className={cls} />
  }
}

export default function NouzIntranetShowcase() {
  const { lang } = useLang()
  const isEs = lang === 'es'
  const [activeView, setActiveView] = useState<NouzIntranetView>('home')
  const [selectedPlan, setSelectedPlan] = useState(nouzPlans[0])
  const [selectedBackground, setSelectedBackground] = useState(nouzBackgrounds[0])

  const glassBg = selectedBackground.gradient

  return (
    <main
      className="min-h-screen overflow-hidden text-slate-900"
      style={{ background: glassBg }}
    >
      <style jsx global>{`
        @font-face {
          font-family: 'NouzIntranetHeavitas';
          src: url('/showcase/nouz-intranet/Heavitas.ttf') format('truetype');
        }

        @font-face {
          font-family: 'NouzIntranetMyriad';
          src: url('/showcase/nouz-intranet/MYRIADPRO-REGULAR.OTF') format('opentype');
        }

        @font-face {
          font-family: 'NouzIntranetPoppins';
          src: url('/showcase/nouz-intranet/Poppins-Light.ttf') format('truetype');
        }

        .nouz-intranet-heavitas {
          font-family: 'NouzIntranetHeavitas', sans-serif;
        }

        .nouz-intranet-myriad {
          font-family: 'NouzIntranetMyriad', sans-serif;
        }

        .nouz-intranet-poppins {
          font-family: 'NouzIntranetPoppins', sans-serif;
        }

        .nouz-glass {
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          box-shadow: 0 18px 60px rgba(30, 41, 59, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.35);
        }

        .nouz-glass-strong {
          background: rgba(255, 255, 255, 0.26);
          backdrop-filter: blur(20px) saturate(145%);
          -webkit-backdrop-filter: blur(20px) saturate(145%);
          box-shadow: 0 18px 60px rgba(30, 41, 59, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.42);
        }

        .nouz-float-slow {
          animation: nouzIntranetFloatSlow 6s ease-in-out infinite;
        }

        @keyframes nouzIntranetFloatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <section className="border-b border-white/30 bg-white/30">
        <div className="mx-auto max-w-[94rem] px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
            <BackToProjects />
            <Link href="/" className="transition-colors hover:text-slate-900">
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-slate-800">NOUZ Intranet</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3535EF]">{isEs ? 'Demo sanitizada' : 'Sanitized demo'}</p>
              <h1 className="nouz-intranet-heavitas mt-4 text-5xl uppercase tracking-[0.04em] text-slate-900 md:text-6xl">
                {isEs ? 'Nouz intranet' : 'Nouz intranet'}
              </h1>
              <p className="nouz-intranet-myriad mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {isEs
                  ? 'Reinterpretación fiel de la intranet personal de NOUZ: una mezcla entre dashboard modular, agenda, notas, IA conversacional, amigos y personalización, con un lenguaje glassmorphism más emocional que una intranet tradicional.'
                  : 'A faithful reinterpretation of the NOUZ personal intranet: a blend of modular dashboard, agenda, notes, conversational AI, friends, and customization, with a more emotional glassmorphism language than a traditional intranet.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Angular 20', 'Glass UI', 'Productivity widgets', 'Personal dashboard', 'Portfolio demo'].map(tag => (
                  <span key={tag} className="rounded-full border border-[#3535EF]/15 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3535EF]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="nouz-glass-strong rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{isEs ? 'Carácter del producto' : 'Product character'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  <li>{isEs ? 'Más humano y visual que una intranet clásica.' : 'More human and visual than a classic intranet.'}</li>
                  <li>{isEs ? 'Módulos pequeños para uso cotidiano repetido.' : 'Small modules for repeated daily use.'}</li>
                  <li>{isEs ? 'Combina organización, bienestar y vínculos.' : 'Combines organization, wellbeing, and relationships.'}</li>
                </ul>
              </div>
              <div className="nouz-glass rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{isEs ? 'Módulos recreados' : 'Recreated modules'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  <li>{isEs ? 'Home con widgets de agenda, calendario y listas.' : 'Home with agenda, calendar, and list widgets.'}</li>
                  <li>{isEs ? 'Agenda semanal editable y vista conversacional.' : 'Editable weekly agenda and conversational view.'}</li>
                  <li>{isEs ? 'Amigos, personalización y opciones de perfil.' : 'Friends, customization, and profile options.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[96rem] px-4 py-8 md:px-8 md:py-10">
        <Image src="/showcase/nouz-intranet/images/star1.png" alt="" width={80} height={80} className="nouz-float-slow pointer-events-none absolute bottom-20 left-16 hidden h-16 w-16 opacity-70 md:block" />
        <Image src="/showcase/nouz-intranet/images/cube.png" alt="" width={110} height={110} className="nouz-float-slow pointer-events-none absolute right-10 top-28 hidden h-24 w-24 opacity-70 md:block" />
        <Image src="/showcase/nouz-intranet/images/circle2.png" alt="" width={52} height={52} className="nouz-float-slow pointer-events-none absolute right-36 top-12 hidden h-10 w-10 opacity-70 md:block" />
        <Image src="/showcase/nouz-intranet/images/cube3.png" alt="" width={52} height={52} className="nouz-float-slow pointer-events-none absolute left-36 top-24 hidden h-10 w-10 opacity-70 md:block" />

        <div className="overflow-hidden rounded-[2.25rem] border border-white/40 bg-white/20 shadow-[0_30px_100px_rgba(30,41,59,0.12)]">
          <div className="relative min-h-[64rem] bg-transparent">
            <nav className="sticky top-0 z-20 flex h-20 w-full items-center justify-center px-4 pt-4">
              <div className="nouz-glass flex h-14 w-full items-center justify-between rounded-full px-6 sm:px-10">
                <div className="flex items-center gap-4">
                  <div className="nouz-intranet-heavitas text-2xl font-black tracking-wide text-[#3535EF]">NOUZ</div>
                </div>
                <div className="flex items-center gap-8">
                  <ul className="hidden items-center gap-8 md:flex">
                    {nouzNavLinks.map(item => (
                      <li key={item.id}>
                        <button className="nouz-intranet-poppins text-base text-slate-800/90 transition hover:text-slate-950">
                          {isEs ? item.labelEs : item.labelEn}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="relative z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-semibold uppercase text-[#3535EF] shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    K
                  </button>
                </div>
              </div>
            </nav>

            <aside className="nouz-glass absolute left-7 top-24 z-10 hidden h-[calc(100%-8.5rem)] w-64 flex-col rounded-3xl px-4 py-5 shadow-xl lg:flex">
              <div className="border-b border-black/10 px-2 pb-4 pt-1" />
              <nav className="flex flex-1 flex-col gap-2 px-1 py-6">
                {nouzSidebarLinks.map(link => {
                  const active = activeView === link.view
                  return (
                    <button
                      key={link.view}
                      onClick={() => setActiveView(link.view)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                        active ? 'bg-white/45 font-semibold text-[#3535EF]' : 'text-slate-700 hover:bg-white/35 hover:text-[#3535EF]'
                      }`}
                    >
                      <SidebarIcon view={link.view} />
                      <span>{isEs ? link.labelEs : link.labelEn}</span>
                    </button>
                  )
                })}
              </nav>
              <div className="px-2 py-2 text-sm text-slate-500">© NOUZ</div>
            </aside>

            <nav aria-label={isEs ? 'Módulos de NOUZ' : 'NOUZ modules'} className="mx-4 mt-5 flex flex-wrap gap-2 lg:hidden">
              {nouzSidebarLinks.map(link => (
                <button key={link.view} aria-pressed={activeView === link.view} onClick={() => setActiveView(link.view)} className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors ${activeView === link.view ? 'border-[#3535EF] bg-[#3535EF] text-white' : 'border-[#3535EF]/20 bg-white/50 text-[#3535EF]'}`}>
                  {isEs ? link.labelEs : link.labelEn}
                </button>
              ))}
            </nav>

            <div className="px-4 pb-10 pt-8 sm:pl-8 lg:pl-80 lg:pt-12">
              {activeView === 'home' && (
                <section className="transition-all">
                  <div className="relative mx-auto mb-8 flex max-w-[1600px] flex-col items-center justify-center gap-4 lg:flex-row lg:gap-6">
                    <div className="relative z-10 text-center">
                      <h1 className="nouz-intranet-poppins text-3xl font-extrabold leading-tight sm:text-4xl xl:text-5xl">
                        {isEs ? nouzDashboardWidgets.greetingEs : nouzDashboardWidgets.greetingEn}
                      </h1>
                      <p className="mt-2 text-base text-slate-500 sm:text-lg">{isEs ? '¿Qué haremos hoy?' : 'What are we doing today?'}</p>
                    </div>
                    <Image src="/showcase/nouz-intranet/images/bot.png" alt="" width={128} height={112} className="pointer-events-none h-24 w-28 shrink-0 select-none object-contain lg:h-28 lg:w-32" />
                  </div>

                  <div className="mx-auto mb-8 h-px max-w-[1600px] bg-black/10" />

                  <div className="mx-auto max-w-[1600px]">
                    <div className="grid grid-cols-1 gap-4 px-2 py-4 sm:grid-cols-2 lg:max-h-[calc(100vh-18rem)] lg:grid-cols-8 lg:overflow-y-auto">
                      <div className="nouz-glass-strong rounded-3xl p-6 lg:col-span-2 lg:row-span-6">
                        <div className="mb-5">
                          <div className="mb-1 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">{isEs ? 'Tu agenda' : 'Your agenda'}</h3>
                            <span className="text-xs font-semibold text-[#3535EF]">{nouzDashboardWidgets.currentTime}</span>
                          </div>
                          <p className="text-sm text-slate-500">{isEs ? nouzDashboardWidgets.currentDateEs : nouzDashboardWidgets.currentDateEn}</p>
                        </div>

                        <div className="mb-4 rounded-2xl border-l-4 border-[#3535EF] bg-[#3535EF]/10 p-4">
                          <div className="mb-1 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#3535EF]" />
                            <span className="text-xs font-bold uppercase tracking-wide text-[#3535EF]">{isEs ? 'Ahora' : 'Now'}</span>
                          </div>
                          <p className="mb-1 text-sm font-semibold text-slate-900">
                            {isEs ? nouzDashboardWidgets.currentEvent.titleEs : nouzDashboardWidgets.currentEvent.titleEn}
                          </p>
                          <p className="text-xs text-slate-500">
                            {nouzDashboardWidgets.currentEvent.time} - {nouzDashboardWidgets.currentEvent.endTime}
                          </p>
                        </div>

                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-px flex-1 bg-slate-300/40" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{isEs ? 'Próximos eventos' : 'Upcoming events'}</span>
                          <div className="h-px flex-1 bg-slate-300/40" />
                        </div>

                        <div className="space-y-3">
                          {nouzDashboardWidgets.upcoming.map((item, index) => (
                            <div key={item.titleEs} className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200">
                              <div className="flex flex-col items-center pt-1">
                                <span className={`h-3 w-3 flex-shrink-0 rounded-full ${item.color === 'violet' ? 'bg-[#3535EF]' : item.color === 'blue' ? 'bg-[#1FA2FF]' : 'bg-green-500'}`} />
                                {index < nouzDashboardWidgets.upcoming.length - 1 && <div className="mt-1 h-full w-px bg-slate-300/30" />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 flex items-start justify-between gap-2">
                                  <p className="text-sm font-semibold leading-tight text-slate-900">{isEs ? item.titleEs : item.titleEn}</p>
                                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.priorityEs === 'Alta' ? 'bg-rose-100 text-rose-700' : item.priorityEs === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {isEs ? item.priorityEs : item.priorityEn}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Clock3 className="h-3.5 w-3.5" />
                                  <span>{item.time}</span>
                                  <span className="opacity-60">• {isEs ? item.durationEs : item.durationEn}</span>
                                </div>
                                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {isEs ? item.locationEs : item.locationEn}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="nouz-glass rounded-3xl p-6 lg:col-span-4 lg:row-span-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-500">{isEs ? 'Calendario' : 'Calendar'}</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">{isEs ? nouzDashboardWidgets.calendarMonthEs : nouzDashboardWidgets.calendarMonthEn}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="rounded-full bg-white/60 p-2 text-slate-500"><ChevronLeft className="h-4 w-4" /></button>
                            <button className="rounded-full bg-white/60 p-2 text-slate-500"><ChevronRight className="h-4 w-4" /></button>
                          </div>
                        </div>
                        <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs">
                          {nouzWeekDays.map(day => (
                            <div key={day.date} className="rounded-2xl bg-white/45 px-2 py-3">
                              <div className="text-slate-400">{isEs ? day.labelEs : day.labelEn}</div>
                              <div className={`mt-2 mx-auto flex h-8 w-8 items-center justify-center rounded-full ${day.isToday ? 'bg-[#3535EF] text-white' : 'text-slate-700'}`}>{day.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="nouz-glass rounded-3xl p-6 lg:col-span-4 lg:row-span-2">
                        <p className="text-sm font-semibold text-slate-500">{isEs ? 'Clima' : 'Weather'}</p>
                        <div className="mt-4 flex items-end justify-between">
                          <div>
                            <p className="text-4xl font-bold text-slate-900">{isEs ? nouzDashboardWidgets.temperatureEs : nouzDashboardWidgets.temperatureEn}</p>
                            <p className="mt-2 text-sm text-slate-500">{isEs ? 'Cielo despejado y humedad baja.' : 'Clear sky and low humidity.'}</p>
                          </div>
                          <div className="rounded-full bg-[#1FA2FF]/15 px-4 py-2 text-sm font-semibold text-[#1FA2FF]">
                            {isEs ? 'Ideal para foco profundo' : 'Great for deep focus'}
                          </div>
                        </div>
                      </div>

                      <div className="nouz-glass rounded-3xl p-6 lg:col-span-4 lg:row-span-2">
                        <p className="text-sm font-semibold text-slate-500">{isEs ? 'Tiempo' : 'Time'}</p>
                        <div className="mt-4 flex items-end justify-between">
                          <div>
                            <p className="text-5xl font-bold tracking-tight text-slate-900">09:24</p>
                            <p className="mt-2 text-sm text-slate-500">{isEs ? nouzDashboardWidgets.timeZoneEs : nouzDashboardWidgets.timeZoneEn}</p>
                          </div>
                          <div className="rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-slate-700">
                            GMT -05
                          </div>
                        </div>
                      </div>

                      {nouzDashboardWidgets.lists.map(list => (
                        <div key={list.titleEs} className="nouz-glass rounded-3xl p-6 lg:col-span-2 lg:row-span-3">
                          <div className="mb-3 text-sm font-medium text-slate-700/80">{isEs ? list.titleEs : list.titleEn}</div>
                          <ul className="flex flex-1 flex-col gap-2">
                            {(isEs ? list.itemsEs : list.itemsEn).map(item => (
                              <li key={item.text} className="flex items-center gap-2 text-sm">
                                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${item.done ? 'border-transparent bg-black/70' : 'border-white/40'}`}>
                                  {item.done && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </span>
                                <span className={`${item.done ? 'line-through opacity-50' : ''} truncate text-slate-800`}>{item.text}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 text-xs text-slate-500/70">+ {isEs ? 'nueva tarea' : 'new task'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {activeView === 'agenda' && (
                <section className="transition-all">
                  <div className="relative mx-auto mb-12 flex max-w-[1600px] justify-center">
                    <div className="relative z-10 text-center">
                      <h1 className="nouz-intranet-poppins text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        {isEs ? 'Agenda Semanal' : 'Weekly agenda'}
                      </h1>
                    </div>
                  </div>

                  <div className="mx-auto max-w-[1600px]">
                    <div className="mb-6 flex items-center justify-between px-4">
                      <button className="text-slate-400 transition hover:text-[#3535EF]"><ChevronLeft className="h-6 w-6" /></button>
                      <p className="text-lg font-medium text-slate-600">{isEs ? '20 - 26 de abril' : 'April 20 - 26'}</p>
                      <button className="text-slate-400 transition hover:text-[#3535EF]"><ChevronRight className="h-6 w-6" /></button>
                    </div>

                    <div className="nouz-glass overflow-x-auto rounded-3xl shadow-lg" tabIndex={0} role="region" aria-label={isEs ? 'Calendario semanal, desplazable horizontalmente' : 'Weekly calendar, scroll horizontally'}>
                      <div className="grid min-w-[800px] grid-cols-[80px_repeat(7,1fr)] border-b border-black/10">
                        <div />
                        {nouzWeekDays.map(day => (
                          <div key={day.date} className="py-4 text-center text-sm font-medium text-slate-500">
                            <div>{isEs ? day.labelEs : day.labelEn}</div>
                            <div className={`mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full ${day.isToday ? 'bg-[#3535EF] text-white' : ''}`}>
                              {day.date}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="relative h-[700px] min-w-[800px] overflow-y-auto">
                        {nouzHours.map((hour, h) => (
                          <div key={hour} className="grid h-[60px] grid-cols-[80px_repeat(7,1fr)] border-t border-black/10">
                            <div className="px-3 py-2 text-xs text-slate-400">{hour}</div>
                            {nouzWeekDays.map((day, d) => (
                              <div key={`${hour}-${day.date}`} className="relative border-l border-black/10 transition hover:bg-violet-50/30">
                                {nouzAgendaEvents
                                  .filter(event => event.day === d && event.hour === h)
                                  .map(event => (
                                    <div
                                      key={`${event.titleEs}-${hour}`}
                                      className="absolute left-1 right-1 top-1 z-10 rounded-lg px-2 py-1 text-xs text-white shadow-sm"
                                      style={{ backgroundColor: event.color, height: `${event.height * 56}px` }}
                                    >
                                      <p className="truncate font-semibold">{isEs ? event.titleEs : event.titleEn}</p>
                                      <p className="truncate text-[10px] opacity-80">{isEs ? event.descriptionEs : event.descriptionEn}</p>
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeView === 'chat' && (
                <section className="transition-all">
                  <div className="relative mx-auto mb-8 flex max-w-[1600px] justify-center">
                    <div className="relative z-10 text-center">
                      <h1 className="nouz-intranet-poppins text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Nouz</h1>
                      <p className="mx-auto max-w-md text-sm text-slate-500 md:text-base">{isEs ? 'Planifica junto a tu compañero virtual.' : 'Plan together with your virtual companion.'}</p>
                    </div>
                  </div>

                  <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-8 lg:flex-row">
                    <div className="flex w-full flex-col items-center justify-start gap-4 pt-4 lg:w-[45%]">
                      <div className="relative">
                        <button className="nouz-glass flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 hover:bg-white/40">
                          <img src={selectedPlan.image} className="h-6 w-6 rounded-full object-contain" alt="robot" />
                          <span className="text-sm font-semibold text-slate-900">{selectedPlan.name}</span>
                          <ChevronDown className="h-4 w-4 text-slate-500" />
                        </button>
                        <div className="nouz-glass absolute left-0 top-12 z-10 w-64 rounded-2xl p-3 shadow-xl">
                          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{isEs ? 'Tu suscripción' : 'Your subscription'}</p>
                          {nouzPlans.map(plan => (
                            <button
                              key={plan.id}
                              onClick={() => setSelectedPlan(plan)}
                              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-white/40 ${selectedPlan.id === plan.id ? 'bg-white/30' : ''}`}
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: plan.color }}>
                                {plan.icon}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                                <p className="text-xs text-slate-500">{isEs ? plan.descriptionEs : plan.descriptionEn}</p>
                              </div>
                              {selectedPlan.id === plan.id && <Check className="ml-auto h-4 w-4 text-[#3535EF]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex h-[380px] w-[380px] items-center justify-center">
                        <img src={selectedPlan.image} alt={selectedPlan.name} className="h-full w-full object-contain drop-shadow-2xl" />
                      </div>
                    </div>

                    <div className="nouz-glass w-full rounded-3xl p-6 lg:w-[55%]">
                      <div className="mb-4 flex max-h-[340px] flex-col gap-4 overflow-y-auto pr-2">
                        {nouzChatMessages.map((message, index) => (
                          <div key={`${message.role}-${index}`} className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                            {message.role === 'assistant' ? (
                              <div className="flex max-w-[85%] flex-col gap-1">
                                <div className="flex items-center gap-2 px-1">
                                  <img src={selectedPlan.image} className="h-5 w-5 rounded-full object-contain" alt="robot" />
                                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Nouz</span>
                                </div>
                                <div className="rounded-2xl rounded-tl-none border border-white/60 bg-white/50 px-4 py-3 text-sm leading-relaxed text-slate-900">
                                  {isEs ? message.contentEs : message.contentEn}
                                </div>
                              </div>
                            ) : (
                              <div className="max-w-[85%] rounded-2xl rounded-tr-none border border-[#3535EF]/25 bg-[#3535EF]/15 px-4 py-3 text-sm font-medium leading-relaxed text-slate-900">
                                {isEs ? message.contentEs : message.contentEn}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {(isEs ? nouzQuickActions.es : nouzQuickActions.en).map(action => (
                          <button key={action} className="rounded-full border border-white/40 bg-white/30 px-3 py-1.5 text-xs font-medium text-slate-900 transition-all duration-200 hover:bg-white/50">
                            {action}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl bg-white/30 px-4 py-3">
                        <textarea
                          rows={1}
                          placeholder={isEs ? 'Describe tu pensamiento...' : 'Describe your thought...'}
                          className="flex-1 resize-none bg-transparent py-1 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                        />
                        <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#3535EF] text-white transition-all duration-200 hover:opacity-90">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeView === 'friends' && (
                <section className="transition-all">
                  <div className="relative mx-auto mb-12 flex max-w-[1600px] justify-center">
                    <div className="relative z-10 text-center">
                      <h1 className="nouz-intranet-poppins text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        {isEs ? 'Amigos' : 'Friends'}
                      </h1>
                      <p className="mx-auto max-w-md text-sm text-slate-500 md:text-base">
                        {isEs ? 'Comparte recordatorios y cuida lo importante para los demás.' : 'Share reminders and care for what matters to others.'}
                      </p>
                    </div>
                  </div>

                  <div className="mx-auto w-full max-w-[1600px] space-y-10">
                    <div className="nouz-glass rounded-3xl p-6 shadow-xl">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900">{isEs ? '¿Quieres que alguien no olvide algo importante?' : 'Want to make sure someone remembers something important?'}</h2>
                          <p className="text-sm text-slate-500">{isEs ? 'Memorae se lo recordará por ti.' : 'Memorae will remember it for them.'}</p>
                        </div>
                        <button className="rounded-full px-6 py-3 font-medium text-[#3535EF] transition-colors duration-300 hover:bg-[#3535EF] hover:text-white">
                          {isEs ? 'Crear recordatorio' : 'Create reminder'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {nouzFriends.map(friend => (
                        <div key={friend.name} className="nouz-glass flex items-center gap-4 rounded-2xl p-4 shadow-xl transition hover:shadow-2xl">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1FA2FF] font-semibold text-white">
                            {friend.initial}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{friend.name}</p>
                            <p className="text-xs text-slate-500">
                              {friend.activeReminders} {isEs ? 'recordatorios activos' : 'active reminders'}
                            </p>
                          </div>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5 active:bg-black/10">
                            <ChevronRight className="h-4 w-4 text-slate-700" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {nouzFriendActivity.map(activity => (
                        <div key={activity.friendEs} className="rounded-xl bg-white/45 p-4 text-sm text-slate-500">
                          {isEs ? 'Recordaste a ' : 'You reminded '}
                          <span className="font-medium text-[#3535EF]">{isEs ? activity.friendEs : activity.friendEn}</span>{' '}
                          {isEs ? activity.actionEs : activity.actionEn} · {isEs ? activity.whenEs : activity.whenEn}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {activeView === 'customize' && (
                <section className="transition-all">
                  <div className="relative mx-auto mb-8 flex max-w-[1600px] justify-center">
                    <div className="relative z-10 text-center">
                      <h1 className="nouz-intranet-poppins text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        {isEs ? 'Personalización' : 'Customization'}
                      </h1>
                    </div>
                  </div>

                  <div className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="nouz-glass rounded-3xl p-7">
                      <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-900">{isEs ? 'Color de fondo' : 'Background color'}</h2>
                        <p className="text-xs text-slate-500">{isEs ? 'Personaliza el color de fondo de tu aplicación' : 'Customize your app background color'}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-4 pb-10 sm:grid-cols-5">
                        {nouzBackgrounds.map(background => (
                          <button
                            key={background.id}
                            onClick={() => setSelectedBackground(background)}
                            className={`group relative h-14 w-14 rounded-xl transition-all duration-200 hover:shadow-lg ${selectedBackground.id === background.id ? 'ring-4 ring-[#3535EF] ring-offset-2' : ''}`}
                            style={{ background: background.gradient }}
                          >
                            {selectedBackground.id === background.id && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="h-6 w-6 text-white drop-shadow-lg" />
                              </div>
                            )}
                            <span className="pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-900 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                              {background.name}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 rounded-xl bg-white/20 p-3">
                        <p className="mb-2 text-xs text-slate-500">{isEs ? 'Vista previa:' : 'Preview:'}</p>
                        <div className="h-16 rounded-lg" style={{ background: selectedBackground.gradient }} />
                      </div>
                    </div>

                    <div className="nouz-glass rounded-3xl p-7">
                      <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-900">{isEs ? 'Tu asistente IA' : 'Your AI assistant'}</h2>
                        <p className="text-xs text-slate-500">{isEs ? 'Elige tu compañero virtual favorito' : 'Choose your favorite virtual companion'}</p>
                      </div>
                      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {nouzPlans.map(plan => (
                          <button
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            className={`relative flex flex-col items-center gap-2 rounded-xl bg-white/30 p-3 transition-all duration-200 hover:bg-white/50 hover:shadow-lg ${selectedPlan.id === plan.id ? 'bg-white/60 ring-4 ring-[#3535EF]' : ''}`}
                          >
                            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-white/50">
                              <img src={plan.image} alt={plan.name} className="h-full w-full object-contain" />
                            </div>
                            <span className="text-xs font-semibold text-slate-900">{plan.name}</span>
                            {selectedPlan.id === plan.id && (
                              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3535EF] text-white">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-5 rounded-xl bg-white/20 p-3 text-center">
                        <p className="mb-2 text-xs text-slate-500">{isEs ? 'Asistente actual:' : 'Current assistant:'}</p>
                        <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-white/50">
                          <img src={selectedPlan.image} alt={selectedPlan.name} className="h-full w-full object-contain" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{selectedPlan.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{isEs ? selectedPlan.descriptionEs : selectedPlan.descriptionEn}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto mt-16 flex max-w-[1600px] justify-center">
                    <button className="rounded-full px-6 py-3 font-medium text-[#3535EF] transition-colors duration-300 hover:bg-[#3535EF] hover:text-white">
                      {isEs ? 'Guardar cambios' : 'Save changes'}
                    </button>
                  </div>
                </section>
              )}

              {activeView === 'settings' && (
                <section className="transition-all">
                  <div className="relative mx-auto mb-12 flex max-w-[1600px] justify-center">
                    <div className="relative z-10 text-center">
                      <h1 className="nouz-intranet-poppins text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                        {isEs ? 'Opciones' : 'Options'}
                      </h1>
                    </div>
                  </div>

                  <div className="nouz-glass mx-auto max-w-[1400px] rounded-[2.5rem] p-12 pt-20 shadow-xl">
                    <div className="flex flex-col gap-16 xl:flex-row">
                      <div className="flex flex-col items-center gap-6 xl:w-1/4">
                        <div className="flex h-40 w-40 items-center justify-center rounded-full border border-[#3535EF]/30 bg-white text-5xl font-bold text-[#3535EF]">
                          K
                        </div>
                        <button className="rounded-full bg-[#3535EF] px-6 py-3 text-base font-medium text-white transition hover:opacity-90">
                          {isEs ? 'Cambiar avatar' : 'Change avatar'}
                        </button>
                      </div>

                      <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-2">
                        {[
                          { labelEs: 'Nombre', labelEn: 'Name', placeholderEs: 'Kevin Gomez', placeholderEn: 'Kevin Gomez' },
                          { labelEs: 'Teléfono', labelEn: 'Phone', placeholderEs: '+51 999 999 999', placeholderEn: '+51 999 999 999' },
                          { labelEs: 'Correo electrónico', labelEn: 'Email', placeholderEs: 'kevin@example.com', placeholderEn: 'kevin@example.com' },
                          { labelEs: 'Nueva contraseña', labelEn: 'New password', placeholderEs: '••••••••', placeholderEn: '••••••••' },
                        ].map(field => (
                          <div key={field.labelEs}>
                            <label className="mb-2 block text-base opacity-70">{isEs ? field.labelEs : field.labelEn}</label>
                            <input
                              type="text"
                              placeholder={isEs ? field.placeholderEs : field.placeholderEn}
                              className="w-full rounded-2xl bg-white/50 p-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-[#3535EF]/40"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-14 flex justify-end">
                      <button className="rounded-full bg-[#3535EF] px-10 py-4 text-base font-medium text-white transition hover:opacity-90">
                        {isEs ? 'Guardar cambios' : 'Save changes'}
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
