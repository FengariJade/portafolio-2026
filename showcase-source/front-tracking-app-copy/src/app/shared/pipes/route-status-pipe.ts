// route-status.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const LABELS: Record<string, string> = {
  ACTIVE:    'Activa',
  INACTIVE:  'Inactiva',
  SUSPENDED: 'Suspendida',
};

const CLASSES: Record<string, string> = {
  ACTIVE:    'bg-emerald-50 text-emerald-700',
  INACTIVE:  'bg-gray-100   text-gray-500',
  SUSPENDED: 'bg-orange-50  text-orange-600',
};

@Pipe({ name: 'routeStatus', standalone: true })
export class RouteStatusPipe implements PipeTransform {
  transform(value: string, type: 'class' | 'label' = 'label'): string {
    return type === 'class' ? (CLASSES[value] ?? '') : (LABELS[value] ?? value);
  }
}