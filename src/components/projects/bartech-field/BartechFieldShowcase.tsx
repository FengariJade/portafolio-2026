'use client'

import Image from 'next/image'
import Link from 'next/link'
import BackToProjects from '../BackToProjects'
import { useState } from 'react'
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FolderSearch2,
  LayoutPanelTop,
  Map,
  Search,
  ShieldAlert,
  User,
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import {
  bartechFieldAlerts,
  bartechFieldDashboardKpis,
  bartechFieldDaySummary,
  bartechFieldDepartments,
  bartechFieldPrimaryNav,
  bartechFieldProjectStats,
  bartechFieldProjects,
  bartechFieldRouteStops,
  bartechFieldSecondaryNav,
  bartechFieldShellPills,
  bartechFieldStages,
  type BartechFieldNavItem,
  type BartechFieldView,
} from './bartechFieldData'

const toneMap = {
  slate: 'bg-slate-100 text-slate-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  rose: 'bg-rose-100 text-rose-700',
} as const

function NavButton({
  item,
  active,
  expanded,
  isEs,
  onActivate,
}: {
  item: BartechFieldNavItem
  active: boolean
  expanded: boolean
  isEs: boolean
  onActivate: () => void
}) {
  const Icon = item.icon
  const label = isEs ? item.labelEs : item.labelEn

  return (
    <button
      onClick={onActivate}
      disabled={item.disabled}
      className={`flex items-center rounded-full px-3 py-3 text-left text-sm transition-all duration-200 ${
        expanded ? 'w-full gap-3' : 'mx-auto h-10 w-10 justify-center px-0'
      } ${
        active
          ? 'bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)]'
          : item.disabled
            ? 'text-slate-500/45'
            : 'text-slate-300 hover:bg-slate-800 hover:text-blue-300'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
          expanded ? 'max-w-[12rem] opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        {label}
      </span>
      {item.disabled && expanded ? <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-slate-500">Off</span> : null}
    </button>
  )
}

export default function BartechFieldShowcase() {
  const { lang } = useLang()
  const isEs = lang === 'es'
  const [activeView, setActiveView] = useState<BartechFieldView>('projects')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const headerTitle =
    activeView === 'projects'
      ? isEs ? 'Proyectos' : 'Projects'
      : activeView === 'dashboard'
        ? isEs ? 'Dashboard operativo' : 'Operational dashboard'
        : activeView === 'monitoring'
          ? isEs ? 'Monitoreo' : 'Monitoring'
          : isEs ? 'Planificacion de rutas' : 'Route planning'

  return (
    <main className="min-h-screen bg-[#08131a] text-white">
      <section className="bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(135deg,_#061019_0%,_#0b1722_44%,_#0f172a_100%)]">
        <div className="mx-auto max-w-[92rem] px-6 py-18 md:px-10 md:py-20">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50">
            <BackToProjects />
            <Link href="/" className="transition-colors hover:text-white">
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-white/80">Bartech Field</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{isEs ? 'Demo sanitizada' : 'Sanitized demo'}</p>
              <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.04em] text-white md:text-6xl">BARTECH FIELD</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                {isEs
                  ? 'Version portfolio-ready de la intranet de operaciones de campo. Reproduce el shell oscuro, la navegacion lateral expandible y los modulos mas fuertes del sistema real, pero con datos totalmente mockeados y una ventana mas compacta para mostrar el frontend con claridad.'
                  : 'A portfolio-ready version of the field operations intranet. It recreates the dark shell, expandable side navigation, and strongest modules from the real system, but with fully mocked data and a more compact window to showcase the frontend clearly.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {bartechFieldShellPills.map(item => (
                  <span key={item.labelEs} className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                    {isEs ? item.labelEs : item.labelEn}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{isEs ? 'Se mantuvo' : 'Preserved'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                  <li>{isEs ? 'Sidebar oscura y navbar corporativa del sistema real.' : 'Dark sidebar and corporate topbar from the real system.'}</li>
                  <li>{isEs ? 'Jerarquia de tarjetas, tablas y modulos internos.' : 'Hierarchy of cards, tables, and internal modules.'}</li>
                  <li>{isEs ? 'Lectura enterprise para proyectos, monitoreo y rutas.' : 'Enterprise reading for projects, monitoring, and routes.'}</li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-blue-400/15 bg-blue-400/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{isEs ? 'Se adapto' : 'Adapted'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/80">
                  <li>{isEs ? 'Mini app mas compacta para portfolio.' : 'More compact mini app for the portfolio.'}</li>
                  <li>{isEs ? 'Sin login, sin sesiones ni capas privadas.' : 'No login, no sessions, and no private layers.'}</li>
                  <li>{isEs ? 'Recorrido curado con los modulos mas vendibles.' : 'Curated walkthrough with the most sellable modules.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-[90rem] px-4 pb-12 md:mt-8 md:px-8 md:pb-16">
        <div className="mx-auto max-w-[76rem] overflow-hidden rounded-[2rem] bg-[#0d1822] shadow-[0_35px_110px_rgba(0,0,0,0.42)]">
          <div className="overflow-hidden rounded-[1.9rem] bg-[#0f1721]">
            <div className="min-h-[48rem]">
              <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-5 text-white">
                <div className="flex items-center gap-4">
                  <Image src="/showcase/bartech-field/logo.svg" alt="Bartech Field logo" width={140} height={28} className="ml-2 h-6 w-auto md:ml-4 md:mr-4" />
                  <div className="hidden h-6 w-px bg-slate-700 md:block" />
                  <button
                    onClick={() => setSidebarExpanded(prev => !prev)}
                    className="hidden items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-800 hover:text-white lg:flex lg:h-10 lg:w-10"
                    aria-label={sidebarExpanded ? (isEs ? 'Cerrar barra lateral' : 'Collapse sidebar') : (isEs ? 'Abrir barra lateral' : 'Expand sidebar')}
                  >
                    {sidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-800 hover:text-white">
                    <Bell className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-slate-800">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">U</div>
                    <span className="hidden text-sm font-medium text-white/90 sm:block">{isEs ? 'Usuario' : 'User'}</span>
                    <ChevronDown className="hidden h-4 w-4 text-white/70 sm:block" />
                  </button>
                </div>
              </header>

              <div
                className={`grid grid-cols-1 transition-[grid-template-columns] duration-300 ${sidebarExpanded ? 'lg:grid-cols-[15rem_minmax(0,1fr)]' : 'lg:grid-cols-[4.5rem_minmax(0,1fr)]'}`}
              >
                <aside className="hidden flex-col border-r border-slate-800 bg-slate-900 lg:flex">
                  <nav className="flex-1 px-2 py-5">
                    <div className="space-y-1">
                      {bartechFieldPrimaryNav.map(item => (
                        <NavButton
                          key={item.id}
                          item={item}
                          active={item.view === activeView}
                          expanded={sidebarExpanded}
                          isEs={isEs}
                          onActivate={() => {
                            if (item.view) setActiveView(item.view)
                          }}
                        />
                      ))}
                    </div>

                    <div className="mx-3 my-4 border-t border-slate-800" />

                    <div className="space-y-1">
                      {bartechFieldSecondaryNav.map(item => (
                        <NavButton
                          key={item.id}
                          item={item}
                          active={false}
                          expanded={sidebarExpanded}
                          isEs={isEs}
                          onActivate={() => undefined}
                        />
                      ))}
                    </div>
                  </nav>

                  <div className="border-t border-slate-800 px-3 py-4">
                    <div className={`flex items-center rounded-2xl bg-slate-800/80 p-3 ${sidebarExpanded ? 'gap-3' : 'justify-center'}`}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">B</div>
                      <div className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${sidebarExpanded ? 'max-w-[8rem] opacity-100' : 'max-w-0 opacity-0'}`}>
                        <p className="text-xs font-semibold text-slate-100">Bartech</p>
                        <p className="text-[11px] text-slate-400">© 2026</p>
                      </div>
                    </div>
                  </div>
                </aside>

                <div className="min-w-0 bg-[#f3f6fb] text-slate-900">
                  <nav aria-label={isEs ? 'Módulos de Bartech Field' : 'Bartech Field modules'} className="flex flex-wrap gap-2 border-b border-slate-200 bg-white p-4 lg:hidden">
                    {bartechFieldPrimaryNav.filter(item => item.view).map(item => (
                      <button key={item.id} aria-pressed={activeView === item.view} onClick={() => item.view && setActiveView(item.view)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${activeView === item.view ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                        {isEs ? item.labelEs : item.labelEn}
                      </button>
                    ))}
                  </nav>
                  <div className="p-4 md:p-5">
                    <div className="rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{isEs ? 'App interna' : 'Internal app'}</p>
                          <h2 className="mt-2 text-2xl font-black text-slate-900">{headerTitle}</h2>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              readOnly
                              value={isEs ? 'Buscar modulo...' : 'Search module...'}
                              className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-500 outline-none"
                            />
                          </div>
                          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
                            <LayoutPanelTop className="h-4 w-4" />
                          </button>
                          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
                            <User className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {activeView === 'projects' ? (
                        <div className="space-y-5 p-5">
                          <div className="grid gap-3 md:grid-cols-3">
                            {bartechFieldProjectStats.map(stat => (
                              <div key={stat.labelEs} className={`rounded-2xl border border-slate-200 p-4 ${toneMap[stat.tone as keyof typeof toneMap]}`}>
                                <p className="text-xs uppercase tracking-[0.18em] opacity-70">{isEs ? stat.labelEs : stat.labelEn}</p>
                                <p className="mt-2 text-3xl font-black">{stat.value}</p>
                              </div>
                            ))}
                          </div>

                          <div className="grid gap-4 xl:grid-cols-2">
                            {bartechFieldProjects.map(project => (
                              <article key={project.name} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm">
                                <div className="border-b border-slate-200 px-5 py-4">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                                      <p className="mt-1 text-sm text-slate-400">{project.client}</p>
                                    </div>
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                      {isEs ? project.phaseEs : project.phaseEn}
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-4 px-5 py-4">
                                  <p className="text-sm leading-7 text-slate-600">{isEs ? project.summaryEs : project.summaryEn}</p>
                                  <div>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                      <span>{isEs ? 'Avance' : 'Progress'}</span>
                                      <span className="font-semibold text-blue-700">{project.progress}%</span>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                                      <div className="h-2 rounded-full bg-blue-600" style={{ width: `${project.progress}%` }} />
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {project.phases.map(phase => (
                                      <span key={phase} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                        {phase}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>{isEs ? 'Deadline' : 'Deadline'}</span>
                                    <span className="font-medium text-slate-700">{project.deadline}</span>
                                  </div>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {activeView === 'dashboard' ? (
                        <div className="space-y-5 p-5">
                          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {bartechFieldDashboardKpis.map(kpi => (
                              <div key={kpi.labelEs} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? kpi.labelEs : kpi.labelEn}</p>
                                <p className="mt-3 text-3xl font-black text-slate-900">{kpi.value}</p>
                                <p className="mt-2 text-sm text-slate-500">{isEs ? kpi.noteEs : kpi.noteEn}</p>
                              </div>
                            ))}
                          </div>

                          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm">
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Forecast general' : 'Overall forecast'}</p>
                              <div className="mt-4 flex items-end justify-between gap-4">
                                <div>
                                  <p className="text-5xl font-black text-blue-700">68%</p>
                                  <p className="mt-2 text-sm text-slate-500">{isEs ? '41 de 60 sedes completadas' : '41 of 60 venues completed'}</p>
                                </div>
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-[10px] border-blue-100 text-xl font-bold text-blue-700">
                                  68%
                                </div>
                              </div>
                              <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-slate-100">
                                <div className="h-3 bg-emerald-500" style={{ width: '36%' }} />
                                <div className="h-3 bg-blue-500" style={{ width: '22%' }} />
                                <div className="h-3 bg-amber-400" style={{ width: '18%' }} />
                                <div className="h-3 bg-slate-200" style={{ width: '24%' }} />
                              </div>
                            </div>

                            <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Resumen visual' : 'Visual summary'}</p>
                              <div className="mt-5 space-y-3">
                                {[
                                  { labelEs: 'Prob. cumplimiento', labelEn: 'Completion probability', value: '79%' },
                                  { labelEs: 'Tasa diaria', labelEn: 'Daily rate', value: '2.4 sedes' },
                                  { labelEs: 'Sedes en riesgo', labelEn: 'At-risk venues', value: '5' },
                                  { labelEs: 'Fecha proyectada', labelEn: 'Projected end', value: '18 Aug 2026' },
                                ].map(item => (
                                  <div key={item.labelEs} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                    <span className="text-sm text-slate-500">{isEs ? item.labelEs : item.labelEn}</span>
                                    <span className="text-sm font-bold text-slate-900">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {activeView === 'monitoring' ? (
                        <div className="space-y-5 p-5">
                          <div className="flex flex-wrap gap-3">
                            {[
                              isEs ? 'Kanban' : 'Kanban',
                              isEs ? 'Control de calidad' : 'Quality control',
                              isEs ? 'Manifiestos' : 'Manifests',
                              isEs ? 'CRM' : 'CRM',
                            ].map((tab, index) => (
                              <span
                                key={tab}
                                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                                  index === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {tab}
                              </span>
                            ))}
                          </div>

                          <div className="grid gap-4 lg:grid-cols-3">
                            {bartechFieldStages.map(stage => (
                              <div key={stage.id} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                                <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneMap[stage.tone as keyof typeof toneMap]}`}>
                                  {isEs ? stage.titleEs : stage.titleEn}
                                </div>
                                <div className="mt-4 space-y-3">
                                  {stage.items.map(item => (
                                    <div key={item} className="rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700">
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Lectura operativa' : 'Operational reading'}</p>
                              <p className="mt-3 text-sm leading-7 text-slate-600">
                                {isEs
                                  ? 'La vista real mezcla tabs, columnas de estado, seguimiento de incidencias y lectura rapida de modulos. Aqui se concentra esa complejidad en un tablero limpio y escaneable.'
                                  : 'The real view mixes tabs, status columns, incident follow-up, and fast module scanning. Here that complexity is condensed into a clean, scannable board.'}
                              </p>
                              <div className="mt-5 space-y-3">
                                {bartechFieldAlerts.map(alert => (
                                  <div key={alert.titleEs} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className={`mt-0.5 rounded-full p-2 ${toneMap[alert.tone as keyof typeof toneMap]}`}>
                                      <ShieldAlert className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-slate-900">{isEs ? alert.titleEs : alert.titleEn}</p>
                                      <p className="mt-1 text-sm text-slate-500">{isEs ? alert.detailEs : alert.detailEn}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Valor frontend' : 'Frontend value'}</p>
                              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                                <li>{isEs ? 'Subtabs y cambios de contexto sin romper jerarquia.' : 'Subtabs and context switches without breaking hierarchy.'}</li>
                                <li>{isEs ? 'Estados de color para operaciones, calidad e incidencias.' : 'Color states for operations, quality, and incidents.'}</li>
                                <li>{isEs ? 'Composicion de tablas, cards y paneles enterprise.' : 'Composition of enterprise tables, cards, and panels.'}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {activeView === 'planning' ? (
                        <div className="grid gap-5 p-5 lg:grid-cols-[0.78fr_1.22fr]">
                          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm">
                            <div className="border-b border-slate-200 p-4">
                              <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <Map className="h-4 w-4 text-blue-600" />
                                {isEs ? 'Planificacion de rutas' : 'Route planning'}
                              </p>
                              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                {bartechFieldDepartments.map(dept => (
                                  <div key={dept.name} className="rounded-xl border border-slate-200 bg-white px-2 py-3">
                                    <p className="text-sm font-semibold text-slate-800">{dept.name}</p>
                                    <p className="mt-1 text-[11px] text-slate-400">{isEs ? dept.detailEs : dept.detailEn}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-3 p-4">
                              {bartechFieldRouteStops.map(stop => (
                                <div key={stop.code} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    {stop.order}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="truncate text-sm font-semibold text-slate-900">{stop.name}</p>
                                      <span className="font-mono text-[11px] text-slate-400">{stop.code}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500">
                                      <span>{stop.city} · {stop.time}</span>
                                      <span className="rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-700">
                                        {isEs ? stop.statusEs : stop.statusEn}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-4 divide-x divide-slate-200 border-t border-slate-200 bg-white">
                              {bartechFieldDaySummary.map(item => (
                                <div key={item.labelEs} className="px-3 py-3 text-center">
                                  <p className="text-sm font-bold text-slate-800">{item.value}</p>
                                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">{isEs ? item.labelEs : item.labelEn}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[radial-gradient(circle_at_18%_20%,_rgba(59,130,246,0.22),_transparent_16%),linear-gradient(135deg,_#eef4fb_0%,_#f6f9fc_48%,_#e7eff9_100%)] shadow-sm">
                            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
                            <svg viewBox="0 0 700 420" className="absolute inset-0 h-full w-full">
                              <path d="M90 300 C170 210, 260 170, 330 184 S460 250, 610 120" fill="none" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" strokeDasharray="10 16" />
                              {[
                                { x: 90, y: 300 },
                                { x: 235, y: 188 },
                                { x: 390, y: 212 },
                                { x: 610, y: 120 },
                              ].map((point, index) => (
                                <g key={index}>
                                  <circle cx={point.x} cy={point.y} r="16" fill="#2563eb" />
                                  <circle cx={point.x} cy={point.y} r="7" fill="#fff" />
                                </g>
                              ))}
                            </svg>

                            <div className="absolute right-5 top-5 rounded-2xl border border-slate-200 bg-white/92 p-4 shadow-sm backdrop-blur">
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Vista de mapa' : 'Map view'}</p>
                              <p className="mt-2 text-sm font-semibold text-slate-900">Ancash</p>
                              <p className="mt-1 text-sm text-slate-500">{isEs ? '4 paradas activas · 116 km' : '4 active stops · 116 km'}</p>
                            </div>

                            <div className="absolute bottom-5 left-5 rounded-2xl border border-slate-200 bg-white/92 p-4 shadow-sm backdrop-blur">
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Lectura frontend' : 'Frontend reading'}</p>
                              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                                {isEs
                                  ? 'La version real combina panel lateral, dias, cuadrillas y lectura geografica. Aqui se conserva esa mezcla pero en una demo compacta y navegable.'
                                  : 'The real version combines a side panel, day tabs, crews, and geographic reading. Here that mix is preserved in a compact, navigable demo.'}
                              </p>
                            </div>

                            <div className="absolute bottom-5 right-5 flex gap-2">
                              <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/92 text-slate-500 shadow-sm backdrop-blur">
                                <FolderSearch2 className="h-4 w-4" />
                              </button>
                              <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/92 text-slate-500 shadow-sm backdrop-blur">
                                <Map className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null}
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
