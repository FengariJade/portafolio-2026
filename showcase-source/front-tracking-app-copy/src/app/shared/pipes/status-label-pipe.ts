import { Pipe, PipeTransform } from '@angular/core';

type TrackingStatus = 'CREATED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'EXCEPTION' | 'DELIVERED' | 'FAILED';

const STATUS_LABEL: Record<string, string> = {
  CREATED:           'Pendiente',
  IN_TRANSIT:        'En tránsito',
  OUT_FOR_DELIVERY:  'En camino',
  COMPLETED:         'Completado',
  EXCEPTION:         'Excepción',
  DELIVERED:         'Entregado',
  FAILED:            'Fallido',
};

const STATUS_CLASS: Record<string, string> = {
  CREATED:           'bg-yellow-100 text-yellow-700',
  IN_TRANSIT:        'bg-blue-100 text-blue-700',
  OUT_FOR_DELIVERY:  'bg-indigo-100 text-indigo-700',
  COMPLETED:         'bg-green-100 text-green-700',
  EXCEPTION:         'bg-orange-100 text-orange-700',
  DELIVERED:         'bg-green-100 text-green-700',
  FAILED:            'bg-red-100 text-red-700',
};

@Pipe({
  name: 'statusLabel',
  standalone: true,
})
export class StatusLabelPipe implements PipeTransform {
  transform(status: string, type: 'label' | 'class' = 'label'): string {
    if (type === 'class') return STATUS_CLASS[status] ?? 'bg-gray-100 text-gray-500';
    return STATUS_LABEL[status] ?? status;
  }
}