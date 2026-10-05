'use client'

import Link from 'next/link'
import BackToProjects from '../BackToProjects'
import { useState } from 'react'
import {
  AlertCircle,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MapPin,
  Package,
  PackagePlus,
  Search,
  Truck,
  TruckIcon,
  User,
  Users,
  Warehouse,
} from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import {
  flotexAlerts,
  flotexDeliveryRows,
  flotexPackageSteps,
  flotexRecentDeliveries,
  flotexSidebarMain,
  flotexSidebarOperations,
  flotexStats,
  flotexTimeline,
  flotexTruckRows,
  flotexViews,
  flotexWeekActivity,
  type FlotexView,
} from './flotexData'

const toneMap = {
  violet: 'bg-violet-100 text-violet-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-emerald-100 text-emerald-600',
  rose: 'bg-rose-100 text-rose-600',
  amber: 'bg-amber-100 text-amber-600',
  teal: 'bg-teal-100 text-teal-600',
} as const

function SidebarIcon({ id }: { id: FlotexView | 'routes' | 'manifests' | 'warehouses' | 'drivers' | 'users' }) {
  const iconClass = 'h-4 w-4'
  switch (id) {
    case 'dashboard':
      return <LayoutDashboard className={iconClass} />
    case 'tracking':
      return <MapPin className={iconClass} />
    case 'packages':
      return <PackagePlus className={iconClass} />
    case 'trucks':
      return <Truck className={iconClass} />
    case 'deliveries':
      return <Package className={iconClass} />
    case 'routes':
      return <MapPin className={iconClass} />
    case 'manifests':
      return <Package className={iconClass} />
    case 'warehouses':
      return <Warehouse className={iconClass} />
    case 'drivers':
      return <User className={iconClass} />
    case 'users':
      return <Users className={iconClass} />
  }
}

function statusPill(label: string) {
  if (label.toLowerCase().includes('ruta') || label.toLowerCase().includes('transit')) return 'bg-amber-100 text-amber-700'
  if (label.toLowerCase().includes('entregado') || label.toLowerCase().includes('delivered') || label.toLowerCase().includes('available') || label.toLowerCase().includes('disponible')) {
    return 'bg-emerald-100 text-emerald-700'
  }
  if (label.toLowerCase().includes('mantenimiento') || label.toLowerCase().includes('maintenance') || label.toLowerCase().includes('fallido') || label.toLowerCase().includes('failed')) {
    return 'bg-rose-100 text-rose-700'
  }
  return 'bg-slate-100 text-slate-600'
}

export default function FlotexShowcase() {
  const { lang } = useLang()
  const isEs = lang === 'es'
  const [activeView, setActiveView] = useState<FlotexView>('dashboard')

  const pageTitle =
    activeView === 'dashboard'
      ? isEs ? 'Dashboard' : 'Dashboard'
      : activeView === 'tracking'
        ? isEs ? 'Consulta de envio' : 'Shipment lookup'
        : activeView === 'packages'
          ? isEs ? 'Registrar paquete' : 'Register package'
          : activeView === 'trucks'
            ? isEs ? 'Camiones' : 'Trucks'
            : isEs ? 'Entregas' : 'Deliveries'

  const maxActivity = Math.max(...flotexWeekActivity.map(day => day.delivered + day.failed))

  return (
    <main className="min-h-screen bg-[#f3f2f8] text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f7f4ff_50%,#eef2ff_100%)]">
        <div className="mx-auto max-w-[92rem] px-6 py-20 md:px-10 md:py-24">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
            <BackToProjects />
            <Link href="/" className="transition-colors hover:text-slate-900">
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-slate-800">FLOTEX</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500">{isEs ? 'Demo sanitizada' : 'Sanitized demo'}</p>
              <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.04em] text-slate-900 md:text-6xl">
                {isEs ? 'FLOTEX tracking app' : 'FLOTEX tracking app'}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {isEs
                  ? 'Reconstruccion portfolio-ready inspirada directamente en la intranet real: tracking publico, dashboard operativo, flota, entregas y wizard de paquetes, manteniendo el look limpio violeta/gris del producto y eliminando toda dependencia sensible.'
                  : 'A portfolio-ready reconstruction inspired directly by the real intranet: public tracking, operations dashboard, fleet, deliveries, and package wizard, preserving the clean violet/gray product language while removing every sensitive dependency.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Angular 20', 'Tailwind UI', 'Operational dashboards', 'Internal tools', 'Sanitized portfolio demo'].map(tag => (
                  <span key={tag} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{isEs ? 'Se mantuvo' : 'Preserved'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>{isEs ? 'Jerarquia visual del dashboard y los listados.' : 'Dashboard hierarchy and list views.'}</li>
                  <li>{isEs ? 'Look & feel de formularios, filtros y tablas.' : 'Form, filter, and table look & feel.'}</li>
                  <li>{isEs ? 'Branding y tono visual del sistema.' : 'Branding and system visual tone.'}</li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-violet-200 bg-violet-50 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-violet-500">{isEs ? 'Se adapto' : 'Adapted'}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  <li>{isEs ? 'Datos operativos totalmente mockeados.' : 'Operational data fully mocked.'}</li>
                  <li>{isEs ? 'Navegacion curada para mostrar los mejores modulos.' : 'Curated navigation to show the strongest modules.'}</li>
                  <li>{isEs ? 'Sin auth, sin endpoints privados, sin credenciales.' : 'No auth, no private endpoints, no credentials.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-4 py-10 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f7fc] shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
          <div className="grid min-h-[62rem] lg:grid-cols-[16rem_1fr]">
            <aside className="hidden border-r border-slate-200 bg-white lg:flex lg:flex-col">
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5">
                <img src="/showcase/flotex/logo-violeta.svg" alt="Flotex logo" className="h-8 w-auto" />
              </div>

              <div className="flex items-center justify-between px-4 pt-5">
                <div className="rounded-full bg-violet-50 p-2 text-violet-700">
                  <ChevronLeft className="h-4 w-4" />
                </div>
              </div>

              <nav className="flex-1 px-3 py-4">
                <div className="space-y-1">
                  {flotexSidebarMain.map(item => {
                    const viewId =
                      item.es === 'Dashboard'
                        ? 'dashboard'
                        : item.es === 'Rutas'
                          ? 'tracking'
                          : item.es === 'Manifiestos'
                            ? 'packages'
                            : 'deliveries'
                    const active = activeView === viewId
                    return (
                      <button
                        key={item.es}
                        onClick={() => setActiveView(viewId as FlotexView)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${
                          active ? 'bg-violet-100 font-semibold text-violet-700' : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                        }`}
                      >
                        <SidebarIcon id={item.es === 'Rutas' ? 'routes' : item.es === 'Manifiestos' ? 'manifests' : item.es === 'Almacenes' ? 'warehouses' : 'dashboard'} />
                        <span>{isEs ? item.es : item.en}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  {flotexSidebarOperations.map(item => {
                    const viewId =
                      item.es === 'Camiones'
                        ? 'trucks'
                        : item.es === 'Entregas'
                          ? 'deliveries'
                          : item.es === 'Conductores'
                            ? 'dashboard'
                            : 'packages'
                    const active = activeView === viewId
                    return (
                      <button
                        key={item.es}
                        onClick={() => setActiveView(viewId as FlotexView)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${
                          active ? 'bg-violet-100 font-semibold text-violet-700' : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                        }`}
                      >
                        <SidebarIcon id={item.es === 'Conductores' ? 'drivers' : item.es === 'Usuarios' ? 'users' : viewId} />
                        <span>{isEs ? item.es : item.en}</span>
                      </button>
                    )
                  })}
                </div>
              </nav>

              <div className="border-t border-slate-200 px-4 py-4">
                <div className="flex items-center gap-3 rounded-xl bg-violet-50 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">B</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Bartech</p>
                    <p className="text-xs text-slate-500">© 2026</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 bg-[#f8f7fc]">
              <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
                <div className="flex items-center gap-4">
                  <div className="hidden items-center gap-4 lg:flex">
                    <img src="/showcase/flotex/logo-violeta.svg" alt="Flotex logo" className="h-7 w-auto" />
                    <div className="h-6 w-px bg-slate-300" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">{pageTitle}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <Bell className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-slate-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">U</div>
                    <span className="hidden text-sm font-medium text-slate-700 sm:block">{isEs ? 'Usuario' : 'User'}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </header>

              <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
                {flotexViews.map(view => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                      activeView === view.id ? 'bg-violet-600 text-white' : 'border border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    {isEs ? view.es : view.en}
                  </button>
                ))}
              </div>

              <div className="p-5 md:p-8">
                {activeView === 'dashboard' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800">{isEs ? 'Buenos dias, Admin' : 'Good morning, Admin'}</h3>
                        <p className="mt-1 text-base text-slate-500">{isEs ? 'Aqui tienes el resumen de operaciones de hoy.' : 'Here is today’s operations summary.'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">{isEs ? '23 de abril de 2026' : 'April 23, 2026'}</span>
                        <button
                          onClick={() => setActiveView('packages')}
                          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                          + {isEs ? 'Nuevo paquete' : 'New package'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                      {flotexStats.map(stat => (
                        <div key={stat.labelEs} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneMap[stat.tone]}`}>
                            <LayoutDashboard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                            <p className="text-sm text-slate-500">{isEs ? stat.labelEs : stat.labelEn}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{isEs ? stat.subEs : stat.subEn}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-6 xl:grid-cols-3">
                      <div className="xl:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                          <h4 className="text-base font-semibold text-slate-800">{isEs ? 'Entregas recientes' : 'Recent deliveries'}</h4>
                          <button onClick={() => setActiveView('deliveries')} className="text-sm font-medium text-violet-600 hover:underline">
                            {isEs ? 'Ver todas' : 'View all'} →
                          </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                          {flotexRecentDeliveries.map(item => (
                            <div key={item.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50">
                              <p className="w-20 shrink-0 font-mono text-xs text-slate-400">{item.id}</p>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-slate-800">{item.sender}</p>
                                <p className="text-xs text-slate-400">→ {item.destination}</p>
                              </div>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusPill(isEs ? item.statusEs : item.statusEn)}`}>
                                {isEs ? item.statusEs : item.statusEn}
                              </span>
                              <p className="w-24 shrink-0 text-right text-xs text-slate-400">{isEs ? item.dateEs : item.dateEn}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                          <h4 className="text-base font-semibold text-slate-800">{isEs ? 'Alertas' : 'Alerts'}</h4>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                            {flotexAlerts.length}
                          </span>
                        </div>
                        <div className="divide-y divide-slate-50">
                          {flotexAlerts.map(alert => (
                            <div key={alert.titleEs} className="flex items-start gap-3 px-6 py-4">
                              <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${alert.tone === 'danger' ? 'text-rose-500' : 'text-amber-500'}`} />
                              <div>
                                <p className={`text-sm font-semibold ${alert.tone === 'danger' ? 'text-rose-600' : 'text-amber-600'}`}>
                                  {isEs ? alert.titleEs : alert.titleEn}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400">{isEs ? alert.detailEs : alert.detailEn}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-3">
                      <div className="rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm xl:col-span-2">
                        <h4 className="mb-6 text-base font-semibold text-slate-800">{isEs ? 'Actividad semanal' : 'Weekly activity'}</h4>
                        <div className="flex h-36 items-end gap-3">
                          {flotexWeekActivity.map(day => (
                            <div key={day.dayEs} className="flex flex-1 flex-col items-center gap-1">
                              <div className="flex w-full flex-col justify-end gap-0.5" style={{ height: 112 }}>
                                <div className="w-full rounded-t bg-rose-200" style={{ height: `${(day.failed / maxActivity) * 100}px` }} />
                                <div className="w-full rounded-t bg-violet-500" style={{ height: `${(day.delivered / maxActivity) * 100}px` }} />
                              </div>
                              <p className="text-xs text-slate-400">{isEs ? day.dayEs : day.dayEn}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center gap-5">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-sm bg-violet-500" />
                            <span className="text-xs text-slate-500">{isEs ? 'Entregados' : 'Delivered'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-sm bg-rose-200" />
                            <span className="text-xs text-slate-500">{isEs ? 'Fallidos' : 'Failed'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-sm">
                        <h4 className="mb-5 text-base font-semibold text-slate-800">{isEs ? 'Accesos rapidos' : 'Quick access'}</h4>
                        <div className="space-y-3">
                          {[
                            { icon: PackagePlus, labelEs: 'Registrar paquete', labelEn: 'Register package', subEs: 'Nuevo envio', subEn: 'New shipment', action: 'packages' },
                            { icon: TruckIcon, labelEs: 'Camiones', labelEn: 'Trucks', subEs: 'Gestionar flota', subEn: 'Manage fleet', action: 'trucks' },
                            { icon: Package, labelEs: 'Entregas', labelEn: 'Deliveries', subEs: 'Ver todos los envios', subEn: 'View all shipments', action: 'deliveries' },
                          ].map(item => {
                            const Icon = item.icon
                            return (
                              <button
                                key={item.labelEs}
                                onClick={() => setActiveView(item.action as FlotexView)}
                                className="group flex w-full items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5 text-left transition-colors hover:bg-slate-100"
                              >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-200">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-700">{isEs ? item.labelEs : item.labelEn}</p>
                                  <p className="text-xs text-slate-400">{isEs ? item.subEs : item.subEn}</p>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'tracking' && (
                  <div className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-slate-50 shadow-sm">
                    <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-violet-600" />
                        <span className="text-lg font-bold text-slate-800">Flotexs</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="text-sm text-slate-500">{isEs ? 'Consulta de envio' : 'Shipment lookup'}</span>
                      </div>
                      <button className="text-sm font-medium text-violet-600 transition-colors hover:text-violet-700">
                        {isEs ? 'Iniciar sesion' : 'Log in'}
                      </button>
                    </header>

                    <div className="px-4 pb-16 pt-14">
                      <div className="mb-8 text-center">
                        <h3 className="text-4xl font-bold text-slate-800">{isEs ? '¿Donde esta tu paquete?' : 'Where is your package?'}</h3>
                        <p className="mt-3 text-lg text-slate-500">{isEs ? 'Ingresa tu codigo de tracking o de paquete' : 'Enter your tracking or package code'}</p>
                      </div>

                      <div className="mx-auto flex w-full max-w-xl gap-3">
                        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
                          <Search className="h-5 w-5 shrink-0 text-slate-400" />
                          <span className="text-sm text-slate-700">AA4A57759FD6 o PKG-008E3FBC</span>
                        </div>
                        <button className="rounded-2xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-violet-700">
                          {isEs ? 'Rastrear' : 'Track'}
                        </button>
                      </div>

                      <div className="mx-auto mt-10 w-full max-w-2xl space-y-5">
                        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-50 px-7 py-5">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                                <Truck className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="mb-0.5 text-xs uppercase tracking-widest text-slate-400">{isEs ? 'Estado actual' : 'Current status'}</p>
                                <p className="text-xl font-bold text-slate-800">{isEs ? 'En ruta' : 'On route'}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-400">{isEs ? 'Codigo' : 'Code'}</p>
                              <p className="font-mono font-bold text-slate-700">AA4A57759FD6</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-b border-slate-50 px-7 py-5 text-sm">
                            <div>
                              <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">{isEs ? 'Remitente' : 'Sender'}</p>
                              <p className="font-medium text-slate-800">Logistica Norte</p>
                              <p className="text-xs text-slate-400">Av. Colonial 1420, Lima</p>
                            </div>
                            <div>
                              <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">{isEs ? 'Destinatario' : 'Receiver'}</p>
                              <p className="font-medium text-slate-800">Carlos Ramos</p>
                              <p className="text-xs text-slate-400">Cercado, Arequipa</p>
                            </div>
                          </div>

                          <div className="px-7 py-6">
                            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-400">{isEs ? 'Progreso del envio' : 'Shipment progress'}</p>
                            <div className="relative">
                              <div className="absolute bottom-5 left-5 top-5 w-0.5 bg-slate-100" />
                              <div className="space-y-6">
                                {flotexTimeline.map(step => (
                                  <div key={step.labelEs} className="relative flex items-start gap-5">
                                    <div
                                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                        step.status === 'done'
                                          ? 'bg-emerald-500 text-white'
                                          : step.status === 'active'
                                            ? 'bg-violet-600 text-white ring-4 ring-violet-100'
                                            : 'bg-slate-100 text-slate-300'
                                      }`}
                                    >
                                      {step.status === 'done' ? '✓' : '•'}
                                    </div>
                                    <div className="pt-1.5">
                                      <p className={`text-sm font-semibold ${step.status === 'upcoming' ? 'text-slate-300' : 'text-slate-800'}`}>
                                        {isEs ? step.labelEs : step.labelEn}
                                      </p>
                                      {step.status === 'active' && (
                                        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-violet-500">
                                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                                          {isEs ? 'Estado actual' : 'Current status'}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-center text-xs text-slate-400">
                          {isEs ? 'Registrado el 23 Abr 2026, 09:14 · Acceso operadores' : 'Registered on Apr 23, 2026, 09:14 · Operator access'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'packages' && (
                  <div className="space-y-6">
                    <div className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-sm">
                      <div className="flex flex-col items-center justify-center gap-8 py-6 text-center">
                        <div>
                          <h3 className="text-5xl font-bold text-slate-800">{isEs ? 'Registrar Paquete' : 'Register Package'}</h3>
                          <p className="mt-4 text-xl text-slate-500">{isEs ? '¿El remitente es una persona o una empresa?' : 'Is the sender a person or a company?'}</p>
                        </div>
                        <div className="flex flex-col gap-8 xl:flex-row xl:gap-16">
                          {[
                            { titleEs: 'Persona', titleEn: 'Person', icon: User },
                            { titleEs: 'Empresa', titleEn: 'Company', icon: Warehouse },
                          ].map(item => {
                            const Icon = item.icon
                            return (
                              <button
                                key={item.titleEs}
                                className="group flex h-72 w-72 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-violet-500 hover:shadow-xl"
                              >
                                <Icon className="h-24 w-24 text-slate-300 transition-colors duration-200 group-hover:text-violet-500" />
                                <span className="text-2xl font-bold text-slate-700 transition-colors group-hover:text-violet-600">
                                  {isEs ? item.titleEs : item.titleEn}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-sm">
                      <div className="mb-8">
                        <h3 className="text-3xl font-bold text-slate-800">{isEs ? 'Registrar Paquete' : 'Register Package'}</h3>
                        <p className="mt-1 text-base text-slate-500">
                          {isEs ? 'Remitente: Empresa' : 'Sender: Company'} <span className="font-semibold text-violet-600">{isEs ? 'Empresa' : 'Company'}</span>
                        </p>
                      </div>

                      <div className="mb-10 flex items-center overflow-x-auto pl-2">
                        {flotexPackageSteps.map((step, index) => (
                          <div key={step.step} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-bold ${step.step <= 2 ? 'bg-violet-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                {step.step < 2 ? '✓' : step.step}
                              </div>
                              <span className={`mt-1 text-sm font-medium ${step.step <= 2 ? 'text-violet-600' : 'text-slate-400'}`}>
                                {isEs ? step.labelEs : step.labelEn}
                              </span>
                            </div>
                            {index < flotexPackageSteps.length - 1 && (
                              <div className={`mb-5 mx-3 h-0.5 min-w-16 flex-1 ${step.step < 2 ? 'bg-violet-600' : 'bg-slate-200'}`} />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Datos del remitente' : 'Sender data'}</p>
                          <div className="mt-4 grid gap-3">
                            {['Empresa SAC', 'RUC 20111222333', 'operaciones@empresa.pe', '+51 999 333 221'].map(value => (
                              <div key={value} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                                {value}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{isEs ? 'Resumen del paquete' : 'Package summary'}</p>
                          <div className="mt-4 grid gap-3">
                            {[
                              isEs ? 'Destino: Arequipa' : 'Destination: Arequipa',
                              isEs ? 'Peso: 12 kg' : 'Weight: 12 kg',
                              isEs ? 'Volumen: 0.6 m3' : 'Volume: 0.6 m3',
                              isEs ? 'Precio estimado: S/ 148.00' : 'Estimated price: S/ 148.00',
                            ].map(value => (
                              <div key={value} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                                {value}
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 flex justify-end">
                            <button className="rounded-full bg-violet-600 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                              {isEs ? 'Continuar' : 'Continue'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'trucks' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800">{isEs ? 'Camiones' : 'Trucks'}</h3>
                        <p className="mt-1 text-base text-slate-500">{isEs ? 'Gestion de flota vehicular' : 'Vehicle fleet management'}</p>
                      </div>
                      <button className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
                        + {isEs ? 'Registrar camion' : 'Register truck'}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex min-w-64 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                        <Search className="h-4 w-4 shrink-0 text-slate-400" />
                        <span className="text-sm text-slate-500">{isEs ? 'Buscar por placa, marca, modelo, conductor...' : 'Search by plate, brand, model, driver...'}</span>
                      </div>
                      {[
                        isEs ? 'Todos los estados' : 'All statuses',
                        isEs ? 'Todos los tipos' : 'All types',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                          <span>{item}</span>
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                      ))}
                      <span className="ml-auto text-sm text-slate-400">{isEs ? '3 camiones' : '3 trucks'}</span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                      <table className="w-full text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50">
                          <tr>
                            {[
                              isEs ? 'Placa' : 'Plate',
                              isEs ? 'Vehiculo' : 'Vehicle',
                              isEs ? 'Tipo' : 'Type',
                              isEs ? 'Capacidad' : 'Capacity',
                              isEs ? 'Conductor' : 'Driver',
                              isEs ? 'Estado' : 'Status',
                              isEs ? 'Acciones' : 'Actions',
                            ].map(head => (
                              <th key={head} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {flotexTruckRows.map(row => (
                            <tr key={row.plate} className="transition-colors hover:bg-slate-50">
                              <td className="px-6 py-4 font-mono font-semibold text-slate-800">{row.plate}</td>
                              <td className="px-6 py-4">
                                <p className="font-medium text-slate-800">{row.unit}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                                  {isEs ? row.typeEs : row.typeEn}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-600">{row.capacity}</td>
                              <td className="px-6 py-4 text-slate-600">{row.driver}</td>
                              <td className="px-6 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPill(isEs ? row.statusEs : row.statusEn)}`}>
                                  {isEs ? row.statusEs : row.statusEn}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <button className="rounded-lg bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100">
                                  {isEs ? 'Opciones' : 'Options'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeView === 'deliveries' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">{isEs ? 'Entregas' : 'Deliveries'}</h3>
                      <p className="mt-1 text-base text-slate-500">{isEs ? 'Listado de todos los envios registrados' : 'List of all registered shipments'}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex min-w-64 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                        <Search className="h-4 w-4 shrink-0 text-slate-400" />
                        <span className="text-sm text-slate-500">{isEs ? 'Buscar por codigo, remitente o destinatario...' : 'Search by code, sender, or recipient...'}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                        <span>{isEs ? 'Estado: todos' : 'Status: all'}</span>
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                      <table className="w-full text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50">
                          <tr>
                            {[
                              isEs ? 'Codigo' : 'Code',
                              isEs ? 'Tracking' : 'Tracking',
                              isEs ? 'Remitente' : 'Sender',
                              isEs ? 'Destinatario' : 'Receiver',
                              isEs ? 'Estado' : 'Status',
                              isEs ? 'Acciones' : 'Actions',
                            ].map(head => (
                              <th key={head} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {flotexDeliveryRows.map(row => (
                            <tr key={row.code} className="transition-colors hover:bg-slate-50">
                              <td className="px-6 py-4 font-mono text-xs text-slate-500">{row.code}</td>
                              <td className="px-6 py-4 font-mono text-xs text-slate-700">{row.tracking}</td>
                              <td className="px-6 py-4 font-medium text-slate-800">{row.sender}</td>
                              <td className="px-6 py-4 text-slate-600">{row.receiver}</td>
                              <td className="px-6 py-4">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPill(isEs ? row.statusEs : row.statusEn)}`}>
                                  {isEs ? row.statusEs : row.statusEn}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-end">
                                  <button className="rounded-lg bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-100">
                                    {isEs ? 'Opciones' : 'Options'}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <p className="text-sm text-slate-400">{isEs ? 'Mostrando 1-3 de 24 registros' : 'Showing 1-3 of 24 records'}</p>
                      <div className="flex items-center gap-1">
                        <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        {[1, 2, 3].map(page => (
                          <button
                            key={page}
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium ${page === 1 ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600 transition hover:bg-slate-100'}`}
                          >
                            {page}
                          </button>
                        ))}
                        <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
