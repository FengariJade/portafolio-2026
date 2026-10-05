import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'driverStatus', standalone: true })
export class DriverStatusPipe implements PipeTransform {
  transform(status: string, type: 'label' | 'class' = 'label'): string {
    const map: Record<string, { label: string; css: string }> = {
      AVAILABLE: { label: 'Disponible', css: 'bg-green-100 text-green-700' },
      ON_ROUTE:  { label: 'En ruta',    css: 'bg-blue-100 text-blue-700'  },
      OFF_DUTY:  { label: 'Inactivo',   css: 'bg-gray-100 text-gray-500'  },
    };
    const entry = map[status] ?? { label: status, css: 'bg-gray-100 text-gray-500' };
    return type === 'class' ? entry.css : entry.label;
  }
}