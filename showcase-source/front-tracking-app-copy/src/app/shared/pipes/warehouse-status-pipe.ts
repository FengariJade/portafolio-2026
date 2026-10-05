// warehouse-type.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const TYPE_LABELS: Record<string, string> = {
  ORIGIN:              'Origen',
  DESTINATION:         'Destino',
  TRANSIT:             'Tránsito',
  DISTRIBUTION_CENTER: 'Distribución',
};

const TYPE_CLASSES: Record<string, string> = {
  ORIGIN:              'bg-violet-100  text-violet-700',
  DESTINATION:         'bg-blue-100    text-blue-700',
  TRANSIT:             'bg-amber-100   text-amber-700',
  DISTRIBUTION_CENTER: 'bg-emerald-100 text-emerald-700',
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE:   'Activo',
  INACTIVE: 'Inactivo',
};

const STATUS_CLASSES: Record<string, string> = {
  ACTIVE:   'bg-emerald-50 text-emerald-700',
  INACTIVE: 'bg-gray-100   text-gray-500',
};

@Pipe({ name: 'warehouseType', standalone: true })
export class WarehouseTypePipe implements PipeTransform {
  transform(value: string, type: 'class' | 'label' | 'statusClass' | 'statusLabel' = 'label'): string {
    if (type === 'class')        return TYPE_CLASSES[value]  ?? '';
    if (type === 'statusClass')  return STATUS_CLASSES[value] ?? '';
    if (type === 'statusLabel')  return STATUS_LABELS[value]  ?? value;
    return TYPE_LABELS[value] ?? value;
  }
}