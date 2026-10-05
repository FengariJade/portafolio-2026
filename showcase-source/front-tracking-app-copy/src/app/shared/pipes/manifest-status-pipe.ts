// manifest-status.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const LABELS: Record<string, string> = {
  DRAFT:             'Borrador',
  READY_TO_DISPATCH: 'Listo para despacho',
  IN_TRANSIT:        'En tránsito',
  COMPLETED:         'Completado',
  CANCELLED:         'Cancelado',
};

const CLASSES: Record<string, string> = {
  DRAFT:             'bg-gray-100   text-gray-500',
  READY_TO_DISPATCH: 'bg-blue-50    text-blue-700',
  IN_TRANSIT:        'bg-amber-50   text-amber-700',
  COMPLETED:         'bg-emerald-50 text-emerald-700',
  CANCELLED:         'bg-red-50     text-red-500',
};

@Pipe({ name: 'manifestStatus', standalone: true })
export class ManifestStatusPipe implements PipeTransform {
  transform(value: string, type: 'class' | 'label' = 'label'): string {
    return type === 'class' ? (CLASSES[value] ?? '') : (LABELS[value] ?? value);
  }
}