import { Alert, RecentDelivery, StatCard } from '../models/dashboard-model';

export const DASHBOARD_STATS: StatCard[] = [
  { label: 'Entregas hoy', value: 24, sub: '+3 vs ayer', icon: 'mdi:package-variant-closed', color: 'text-violet-600', bg: 'bg-violet-100' },
  { label: 'En tránsito', value: 18, sub: '6 llegan hoy', icon: 'mdi:truck-delivery', color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Entregados (mes)', value: 312, sub: '+12% vs mes anterior', icon: 'mdi:check-circle', color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Fallidos (mes)', value: 7, sub: '2.2% tasa de fallo', icon: 'mdi:close-circle', color: 'text-red-500', bg: 'bg-red-100' },
  { label: 'Camiones activos', value: '3/5', sub: '1 en mantenimiento', icon: 'mdi:truck', color: 'text-orange-500', bg: 'bg-orange-100' },
  { label: 'Conductores disp.', value: '4/5', sub: '1 en viaje', icon: 'mdi:account-tie', color: 'text-teal-600', bg: 'bg-teal-100' },
];

export const DASHBOARD_RECENT_DELIVERIES: RecentDelivery[] = [
  { id: 'DEL-021', sender: 'Juan Pérez', destination: 'Arequipa', status: 'in_transit', date: 'Hoy, 09:14' },
  { id: 'DEL-020', sender: 'Empresa SAC', destination: 'Cusco', status: 'delivered', date: 'Hoy, 08:30' },
  { id: 'DEL-019', sender: 'Lucía Mendoza', destination: 'Lima', status: 'pending', date: 'Hoy, 07:55' },
  { id: 'DEL-018', sender: 'Distribuidora Norte', destination: 'Piura', status: 'failed', date: 'Ayer, 18:42' },
  { id: 'DEL-017', sender: 'Rosa Chávez', destination: 'Iquitos', status: 'in_transit', date: 'Ayer, 16:10' },
];

export const DASHBOARD_ALERTS: Alert[] = [
  { type: 'danger', icon: 'mingcute:alert-fill', message: 'SOAT vencido', detail: 'Camión XYZ-456 — venció el 20/03/2026' },
  { type: 'warning', icon: 'mingcute:alert-fill', message: 'Licencia por vencer', detail: 'Ana Torres — vence en 18 días' },
  { type: 'warning', icon: 'mingcute:alert-fill', message: 'Revisión técnica próxima', detail: 'Camión ABC-123 — vence en 24 días' },
  { type: 'danger', icon: 'mingcute:alert-fill', message: 'Entrega fallida', detail: 'DEL-018 · Distribuidora Norte → Piura' },
];

export const DASHBOARD_WEEK_ACTIVITY = [
  { day: 'Lun', delivered: 38, failed: 2 },
  { day: 'Mar', delivered: 45, failed: 1 },
  { day: 'Mié', delivered: 30, failed: 4 },
  { day: 'Jue', delivered: 52, failed: 1 },
  { day: 'Vie', delivered: 41, failed: 3 },
  { day: 'Sáb', delivered: 20, failed: 0 },
  { day: 'Dom', delivered: 10, failed: 1 },
];