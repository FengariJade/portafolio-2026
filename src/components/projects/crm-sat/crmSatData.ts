'use client'

export type CrmSatView = 'inbox' | 'supervision' | 'reports'

export type CrmSatSidebarIcon =
  | 'inbox'
  | 'supervision'
  | 'reports'
  | 'dashboard'
  | 'mail'
  | 'phone'
  | 'portfolio'
  | 'campaigns'
  | 'settings'
  | 'users'

export type CrmSatSidebarItem = {
  id: string
  labelEs: string
  labelEn: string
  icon: CrmSatSidebarIcon
  view?: CrmSatView
  disabled?: boolean
}

export const crmSatSidebarPrimary: CrmSatSidebarItem[] = [
  { id: 'dashboard', labelEs: 'Dashboard', labelEn: 'Dashboard', icon: 'dashboard', disabled: true },
  { id: 'inbox', labelEs: 'Inbox omnicanal', labelEn: 'Omnichannel inbox', icon: 'inbox', view: 'inbox' },
  { id: 'mail', labelEs: 'Correo', labelEn: 'Mail', icon: 'mail', disabled: true },
  { id: 'phone', labelEs: 'Telefonia', labelEn: 'Telephony', icon: 'phone', disabled: true },
  { id: 'supervision', labelEs: 'Supervision', labelEn: 'Supervision', icon: 'supervision', view: 'supervision' },
]

export const crmSatSidebarSecondary: CrmSatSidebarItem[] = [
  { id: 'portfolio', labelEs: 'Cartera', labelEn: 'Portfolio', icon: 'portfolio', disabled: true },
  { id: 'campaigns', labelEs: 'Campanas', labelEn: 'Campaigns', icon: 'campaigns', disabled: true },
  { id: 'reports', labelEs: 'Reportes', labelEn: 'Reports', icon: 'reports', view: 'reports' },
  { id: 'users', labelEs: 'Usuarios', labelEn: 'Users', icon: 'users', disabled: true },
  { id: 'settings', labelEs: 'Configuracion', labelEn: 'Settings', icon: 'settings', disabled: true },
]

export const crmSatTopChannels = [
  { id: 'whatsapp', label: 'WhatsApp', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'webchat', label: 'Webchat', tone: 'bg-sky-50 text-sky-700 border-sky-200' },
  { id: 'messenger', label: 'Messenger', tone: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'email', label: 'Email', tone: 'bg-amber-50 text-amber-700 border-amber-200' },
]

export const crmSatConversations = [
  {
    id: 'sat-201',
    citizen: 'Maria Torres',
    channel: 'WhatsApp',
    topicEs: 'Devolucion de pago duplicado',
    topicEn: 'Duplicate payment refund',
    time: '09:14',
    statusEs: 'En atencion',
    statusEn: 'In progress',
    unread: true,
  },
  {
    id: 'sat-318',
    citizen: 'Jose Alvarez',
    channel: 'Webchat',
    topicEs: 'Fraccionamiento de deuda',
    topicEn: 'Debt installment plan',
    time: '09:28',
    statusEs: 'Pendiente',
    statusEn: 'Pending',
    unread: false,
  },
  {
    id: 'sat-411',
    citizen: 'Lucia Ramos',
    channel: 'Email',
    topicEs: 'Estado de expediente',
    topicEn: 'Case status',
    time: '09:42',
    statusEs: 'Escalado',
    statusEn: 'Escalated',
    unread: false,
  },
  {
    id: 'sat-527',
    citizen: 'Carlos Vega',
    channel: 'Messenger',
    topicEs: 'Consulta de multa',
    topicEn: 'Fine inquiry',
    time: '10:02',
    statusEs: 'Resuelto',
    statusEn: 'Resolved',
    unread: false,
  },
]

export const crmSatMessages = [
  {
    role: 'assistant' as const,
    bodyEs: 'Buenos dias, Maria. Ya validamos el pago duplicado y el expediente se encuentra en revision.',
    bodyEn: 'Good morning, Maria. We already validated the duplicate payment and the case is under review.',
    meta: '09:16',
  },
  {
    role: 'user' as const,
    bodyEs: 'Perfecto, necesito saber si debo adjuntar nuevamente el voucher.',
    bodyEn: 'Perfect, I need to know whether I should attach the voucher again.',
    meta: '09:17',
  },
  {
    role: 'assistant' as const,
    bodyEs: 'No es necesario. Ya aparece asociado al expediente SAT-201 y el siguiente paso es validacion contable.',
    bodyEn: 'That will not be necessary. It is already linked to case SAT-201 and the next step is accounting validation.',
    meta: '09:18',
  },
]

export const crmSatCitizenDetails = [
  { labelEs: 'Documento', labelEn: 'Document', value: 'DNI 45892117' },
  { labelEs: 'Telefono', labelEn: 'Phone', value: '+51 944 208 321' },
  { labelEs: 'Correo', labelEn: 'Email', value: 'maria.torres@example.com' },
  { labelEs: 'Canal', labelEn: 'Channel', value: 'WhatsApp Business' },
]

export const crmSatSupervisorRows = [
  {
    agent: 'Andrea Rojas',
    queueEs: 'Cobranza preventiva',
    queueEn: 'Preventive collections',
    statusEs: 'Escuchando',
    statusEn: 'Listening',
    calls: 12,
    sla: '94%',
  },
  {
    agent: 'Luis Fernandez',
    queueEs: 'Orientacion tributaria',
    queueEn: 'Tax guidance',
    statusEs: 'Disponible',
    statusEn: 'Available',
    calls: 9,
    sla: '97%',
  },
  {
    agent: 'Valeria Soto',
    queueEs: 'Campana saliente',
    queueEn: 'Outbound campaign',
    statusEs: 'Intervencion',
    statusEn: 'Intervention',
    calls: 15,
    sla: '89%',
  },
]

export const crmSatSupervisorPanels = [
  {
    titleEs: 'Escucha en vivo',
    titleEn: 'Live monitoring',
    descriptionEs: 'Acceso rapido a la llamada activa, notas y transcripcion parcial.',
    descriptionEn: 'Quick access to the active call, notes, and partial transcription.',
  },
  {
    titleEs: 'Intervenir llamada',
    titleEn: 'Intervene call',
    descriptionEs: 'Controles sensibles para asistencia inmediata y contencion del caso.',
    descriptionEn: 'Sensitive controls for immediate assistance and case containment.',
  },
  {
    titleEs: 'Control de grabacion',
    titleEn: 'Recording control',
    descriptionEs: 'Registro operativo y trazabilidad para auditoria interna.',
    descriptionEn: 'Operational record and traceability for internal auditing.',
  },
]

export const crmSatReportCards = [
  {
    labelEs: 'Atenciones del dia',
    labelEn: 'Daily attentions',
    value: '1,284',
    deltaEs: '+12% vs ayer',
    deltaEn: '+12% vs yesterday',
  },
  {
    labelEs: 'Tiempo promedio',
    labelEn: 'Average time',
    value: '06:42',
    deltaEs: '-00:38 optimizado',
    deltaEn: '-00:38 optimized',
  },
  {
    labelEs: 'Canal lider',
    labelEn: 'Top channel',
    value: 'WhatsApp',
    deltaEs: '46% del volumen',
    deltaEn: '46% of total volume',
  },
  {
    labelEs: 'SLA general',
    labelEn: 'Overall SLA',
    value: '93%',
    deltaEs: 'Dentro del objetivo',
    deltaEn: 'Within target',
  },
]

export const crmSatReportRows = [
  {
    moduleEs: 'Inbox omnicanal',
    moduleEn: 'Omnichannel inbox',
    owner: 'Operacion digital',
    metric: '2.4k',
    trendEs: 'Alta demanda',
    trendEn: 'High demand',
  },
  {
    moduleEs: 'Supervision de llamadas',
    moduleEn: 'Call supervision',
    owner: 'Supervisor central',
    metric: '318',
    trendEs: 'Monitoreo estable',
    trendEn: 'Stable monitoring',
  },
  {
    moduleEs: 'Reportes ejecutivos',
    moduleEn: 'Executive reports',
    owner: 'BI + coordinacion',
    metric: '84',
    trendEs: 'Actualizacion diaria',
    trendEn: 'Daily refresh',
  },
]
