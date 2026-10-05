export type FlotexView = 'dashboard' | 'tracking' | 'packages' | 'trucks' | 'deliveries'

export const flotexViews: Array<{ id: FlotexView; es: string; en: string }> = [
  { id: 'dashboard', es: 'Dashboard', en: 'Dashboard' },
  { id: 'tracking', es: 'Tracking publico', en: 'Public tracking' },
  { id: 'packages', es: 'Registrar paquete', en: 'Package wizard' },
  { id: 'trucks', es: 'Camiones', en: 'Trucks' },
  { id: 'deliveries', es: 'Entregas', en: 'Deliveries' },
]

export const flotexSidebarMain = [
  { es: 'Dashboard', en: 'Dashboard' },
  { es: 'Rutas', en: 'Routes' },
  { es: 'Manifiestos', en: 'Manifests' },
  { es: 'Almacenes', en: 'Warehouses' },
]

export const flotexSidebarOperations = [
  { es: 'Conductores', en: 'Drivers' },
  { es: 'Camiones', en: 'Trucks' },
  { es: 'Entregas', en: 'Deliveries' },
  { es: 'Usuarios', en: 'Users' },
]

export const flotexStats = [
  { labelEs: 'Entregas hoy', labelEn: 'Deliveries today', value: '24', subEs: '+3 vs ayer', subEn: '+3 vs yesterday', tone: 'violet' },
  { labelEs: 'En transito', labelEn: 'In transit', value: '18', subEs: '6 llegan hoy', subEn: '6 arrive today', tone: 'blue' },
  { labelEs: 'Entregados (mes)', labelEn: 'Delivered (month)', value: '312', subEs: '+12% vs mes anterior', subEn: '+12% vs previous month', tone: 'green' },
  { labelEs: 'Fallidos (mes)', labelEn: 'Failed (month)', value: '07', subEs: '2.2% tasa de fallo', subEn: '2.2% failure rate', tone: 'rose' },
  { labelEs: 'Camiones activos', labelEn: 'Active trucks', value: '3/5', subEs: '1 en mantenimiento', subEn: '1 under maintenance', tone: 'amber' },
  { labelEs: 'Conductores disp.', labelEn: 'Drivers avail.', value: '4/5', subEs: '1 en viaje', subEn: '1 on route', tone: 'teal' },
] as const

export const flotexRecentDeliveries = [
  { id: 'DEL-021', sender: 'Juan Perez', destination: 'Arequipa', statusEs: 'En transito', statusEn: 'In transit', dateEs: 'Hoy, 09:14', dateEn: 'Today, 09:14' },
  { id: 'DEL-020', sender: 'Empresa SAC', destination: 'Cusco', statusEs: 'Entregado', statusEn: 'Delivered', dateEs: 'Hoy, 08:30', dateEn: 'Today, 08:30' },
  { id: 'DEL-019', sender: 'Lucia Mendoza', destination: 'Lima', statusEs: 'Pendiente', statusEn: 'Pending', dateEs: 'Hoy, 07:55', dateEn: 'Today, 07:55' },
  { id: 'DEL-018', sender: 'Distribuidora Norte', destination: 'Piura', statusEs: 'Fallido', statusEn: 'Failed', dateEs: 'Ayer, 18:42', dateEn: 'Yesterday, 18:42' },
]

export const flotexAlerts = [
  { titleEs: 'SOAT vencido', titleEn: 'Expired insurance', detailEs: 'Camion XYZ-456, vencio el 20/03/2026', detailEn: 'Truck XYZ-456, expired on 03/20/2026', tone: 'danger' },
  { titleEs: 'Licencia por vencer', titleEn: 'License expiring soon', detailEs: 'Ana Torres, vence en 18 dias', detailEn: 'Ana Torres, expires in 18 days', tone: 'warning' },
  { titleEs: 'Entrega fallida', titleEn: 'Failed delivery', detailEs: 'DEL-018, Distribuidora Norte a Piura', detailEn: 'DEL-018, Distribuidora Norte to Piura', tone: 'danger' },
]

export const flotexWeekActivity = [
  { dayEs: 'Lun', dayEn: 'Mon', delivered: 38, failed: 2 },
  { dayEs: 'Mar', dayEn: 'Tue', delivered: 45, failed: 1 },
  { dayEs: 'Mie', dayEn: 'Wed', delivered: 30, failed: 4 },
  { dayEs: 'Jue', dayEn: 'Thu', delivered: 52, failed: 1 },
  { dayEs: 'Vie', dayEn: 'Fri', delivered: 41, failed: 3 },
  { dayEs: 'Sab', dayEn: 'Sat', delivered: 20, failed: 0 },
  { dayEs: 'Dom', dayEn: 'Sun', delivered: 10, failed: 1 },
]

export const flotexTimeline = [
  { labelEs: 'Pedido registrado', labelEn: 'Order created', status: 'done' },
  { labelEs: 'En almacen', labelEn: 'At warehouse', status: 'done' },
  { labelEs: 'En ruta', labelEn: 'On route', status: 'active' },
  { labelEs: 'Entregado', labelEn: 'Delivered', status: 'upcoming' },
]

export const flotexPackageSteps = [
  { step: 1, labelEs: 'Contactos', labelEn: 'Contacts' },
  { step: 2, labelEs: 'Paquete', labelEn: 'Package' },
  { step: 3, labelEs: 'Confirmacion', labelEn: 'Confirmation' },
]

export const flotexTruckRows = [
  { plate: 'ABC-123', unit: 'Volvo FH16', typeEs: 'Propio', typeEn: 'Owned', capacity: '18 t / 44 m3', driver: 'Luis Ramirez', statusEs: 'Disponible', statusEn: 'Available' },
  { plate: 'XYZ-456', unit: 'Scania R500', typeEs: 'Tercerizado', typeEn: 'Third-party', capacity: '22 t / 60 m3', driver: 'Mario Ponce', statusEs: 'En ruta', statusEn: 'On route' },
  { plate: 'TRK-901', unit: 'Mercedes Actros', typeEs: 'Propio', typeEn: 'Owned', capacity: '16 t / 38 m3', driver: 'Carlos Vega', statusEs: 'Mantenimiento', statusEn: 'Maintenance' },
]

export const flotexDeliveryRows = [
  { code: 'PKG-008E3FBC', tracking: 'AA4A57759FD6', sender: 'Logistica Norte', receiver: 'Carlos Ramos', statusEs: 'En ruta', statusEn: 'On route' },
  { code: 'PKG-11AD72F0', tracking: 'BD9X1721QWE2', sender: 'Empresa SAC', receiver: 'Lucia Gomez', statusEs: 'Pendiente', statusEn: 'Pending' },
  { code: 'PKG-90FF34AA', tracking: 'CX7L00478RT1', sender: 'Juan Perez', receiver: 'Centro Sur', statusEs: 'Entregado', statusEn: 'Delivered' },
]
