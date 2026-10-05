import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Map,
  MapPin,
  Navigation,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'

export type BartechFieldView = 'projects' | 'dashboard' | 'monitoring' | 'planning'

export type BartechFieldNavItem = {
  id: string
  view?: BartechFieldView
  labelEs: string
  labelEn: string
  icon: LucideIcon
  disabled?: boolean
}

export const bartechFieldPrimaryNav: BartechFieldNavItem[] = [
  { id: 'projects', view: 'projects', labelEs: 'Proyectos', labelEn: 'Projects', icon: FolderKanban },
  { id: 'dashboard', view: 'dashboard', labelEs: 'Dashboard', labelEn: 'Dashboard', icon: LayoutDashboard },
  { id: 'monitoring', view: 'monitoring', labelEs: 'Monitoreo', labelEn: 'Monitoring', icon: ClipboardList },
  { id: 'planning', view: 'planning', labelEs: 'Rutas', labelEn: 'Routes', icon: Navigation },
  { id: 'manifests', labelEs: 'Manifiestos', labelEn: 'Manifests', icon: Truck, disabled: true },
  { id: 'crews', labelEs: 'Cuadrillas', labelEn: 'Crews', icon: Users, disabled: true },
]

export const bartechFieldSecondaryNav: BartechFieldNavItem[] = [
  { id: 'clients', labelEs: 'Clientes', labelEn: 'Clients', icon: Briefcase, disabled: true },
  { id: 'equipment', labelEs: 'Equipos', labelEn: 'Equipment', icon: Wrench, disabled: true },
  { id: 'venues', labelEs: 'Sedes', labelEn: 'Venues', icon: MapPin, disabled: true },
  { id: 'quality', labelEs: 'Calidad', labelEn: 'Quality', icon: ShieldCheck, disabled: true },
  { id: 'settings', labelEs: 'Configuracion', labelEn: 'Settings', icon: Settings, disabled: true },
]

export const bartechFieldProjectStats = [
  { labelEs: 'Total', labelEn: 'Total', value: '16', tone: 'slate' },
  { labelEs: 'Activos', labelEn: 'Active', value: '9', tone: 'blue' },
  { labelEs: 'En riesgo', labelEn: 'At risk', value: '3', tone: 'amber' },
]

export const bartechFieldProjects = [
  {
    name: 'OSIPTEL rollout',
    client: 'OSIPTEL',
    phaseEs: 'Activo',
    phaseEn: 'Active',
    progress: 74,
    deadline: '18 Aug 2026',
    summaryEs: 'Despliegue nacional con control de fases, usuarios asignados y proveedores por frente.',
    summaryEn: 'National rollout with phase control, assigned users, and provider mapping by workstream.',
    phases: ['Permisos', 'Despacho', 'Instalacion'],
  },
  {
    name: 'INGEMMET deployment',
    client: 'INGEMMET',
    phaseEs: 'Activo',
    phaseEn: 'Active',
    progress: 61,
    deadline: '02 Sep 2026',
    summaryEs: 'Seguimiento de sedes, cuadrillas y avance diario desde una sola tarjeta operativa.',
    summaryEn: 'Venue follow-up, crews, and daily progress from a single operational card.',
    phases: ['Planificacion', 'Despacho', 'CRM'],
  },
  {
    name: 'SERNANP field ops',
    client: 'SERNANP',
    phaseEs: 'Planeado',
    phaseEn: 'Planned',
    progress: 28,
    deadline: '21 Sep 2026',
    summaryEs: 'Preparacion previa a campo con asignacion de tecnicos y lectura de rutas territoriales.',
    summaryEn: 'Pre-field preparation with technician assignment and territory route reading.',
    phases: ['Kickoff', 'Logistica', 'Cuadrillas'],
  },
  {
    name: 'Regional SDWAN pack',
    client: 'Regional network',
    phaseEs: 'Cierre',
    phaseEn: 'Closing',
    progress: 92,
    deadline: '30 Jul 2026',
    summaryEs: 'Proyecto cercano a cierre con validacion final de entregables e incidencias menores.',
    summaryEn: 'Near-closing project with final deliverable validation and minor issue handling.',
    phases: ['Checklist', 'Calidad', 'Cierre'],
  },
]

export const bartechFieldDashboardKpis = [
  { labelEs: 'Sedes completadas', labelEn: 'Completed venues', value: '41/60', noteEs: '68% global', noteEn: '68% overall' },
  { labelEs: 'Cuadrillas activas', labelEn: 'Active crews', value: '12', noteEs: '3 regiones', noteEn: '3 regions' },
  { labelEs: 'Despachos hoy', labelEn: 'Shipments today', value: '18', noteEs: '2 con alerta', noteEn: '2 flagged' },
  { labelEs: 'Prob. cierre', labelEn: 'Close probability', value: '79%', noteEs: 'sobre forecast', noteEn: 'above forecast' },
]

export const bartechFieldStages = [
  {
    id: 'prep',
    titleEs: 'Preparacion',
    titleEn: 'Preparation',
    tone: 'slate',
    items: ['Documentacion lista', 'Material validado', 'Clientes confirmados'],
  },
  {
    id: 'assigned',
    titleEs: 'Asignadas',
    titleEn: 'Assigned',
    tone: 'blue',
    items: ['Cuadrilla Norte', 'Cuadrilla Centro', 'Despacho 042'],
  },
  {
    id: 'completed',
    titleEs: 'Completadas',
    titleEn: 'Completed',
    tone: 'emerald',
    items: ['Barranca', 'Huacho', 'Chancay'],
  },
]

export const bartechFieldAlerts = [
  { titleEs: 'Demora de manifiesto', titleEn: 'Manifest delay', detailEs: 'MNF-223 con +95 min', detailEn: 'MNF-223 at +95 min', tone: 'amber' },
  { titleEs: 'Incidencia tecnica', titleEn: 'Technical issue', detailEs: 'Sede ANC-11 sin energia', detailEn: 'Venue ANC-11 without power', tone: 'rose' },
  { titleEs: 'Control de calidad', titleEn: 'Quality control', detailEs: '7 sedes pendientes de revision', detailEn: '7 venues pending review', tone: 'blue' },
]

export const bartechFieldRouteStops = [
  { order: 1, code: 'ANC-01', name: 'Huaraz Centro', city: 'Huaraz', time: '08:10', statusEs: 'Planificada', statusEn: 'Planned' },
  { order: 2, code: 'ANC-04', name: 'Carhuaz Norte', city: 'Carhuaz', time: '10:35', statusEs: 'En campo', statusEn: 'In field' },
  { order: 3, code: 'ANC-08', name: 'Yungay Sur', city: 'Yungay', time: '13:15', statusEs: 'Pendiente', statusEn: 'Pending' },
  { order: 4, code: 'ANC-11', name: 'Caraz Este', city: 'Caraz', time: '16:40', statusEs: 'Pendiente', statusEn: 'Pending' },
]

export const bartechFieldDaySummary = [
  { labelEs: 'Sedes', labelEn: 'Venues', value: '12' },
  { labelEs: 'Distancia', labelEn: 'Distance', value: '116 km' },
  { labelEs: 'Jornada usada', labelEn: 'Used shift', value: '372 min' },
  { labelEs: 'Restante', labelEn: 'Remaining', value: '108 min' },
]

export const bartechFieldDepartments = [
  { name: 'Ancash', detailEs: '4 paradas activas · 116 km', detailEn: '4 active stops · 116 km' },
  { name: 'Lima Norte', detailEs: '7 sedes · 2 cuadrillas', detailEn: '7 venues · 2 crews' },
  { name: 'La Libertad', detailEs: '5 sedes · 1 cuadrilla', detailEn: '5 venues · 1 crew' },
]

export const bartechFieldShellPills = [
  { labelEs: 'Mini app sanitizada', labelEn: 'Sanitized mini app' },
  { labelEs: 'Angular 20', labelEn: 'Angular 20' },
  { labelEs: 'Field operations UI', labelEn: 'Field operations UI' },
  { labelEs: 'Mock data', labelEn: 'Mock data' },
]
