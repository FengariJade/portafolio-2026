import { Pipe, PipeTransform } from "@angular/core";

const STATUS_LABEL: Record<string, string> = {
  AVAILABLE:   'Disponible',
  ON_ROUTE:    'En ruta',
  MAINTENANCE: 'Mantenimiento',
};

const STATUS_CLASS: Record<string, string> = {
  AVAILABLE:   'bg-green-100 text-green-700',
  ON_ROUTE:    'bg-blue-100 text-blue-700',
  MAINTENANCE: 'bg-orange-100 text-orange-700',
};

const OWNERSHIP_LABEL: Record<string, string> = {
  OWNED:       'Propio',
  THIRD_PARTY: 'Tercerizado',
};

const OWNERSHIP_CLASS: Record<string, string> = {
  OWNED:       'bg-violet-100 text-violet-700',
  THIRD_PARTY: 'bg-blue-100 text-blue-700',
};

@Pipe({
  name: 'vehicleStatus',
  standalone: true,
})
export class VehicleStatusPipe implements PipeTransform {
  transform(value: string, type: 'label' | 'class' = 'label', mode: 'status' | 'ownership' = 'status'): string {
    if (mode === 'ownership') {
      return type === 'class'
        ? OWNERSHIP_CLASS[value] ?? ''
        : OWNERSHIP_LABEL[value] ?? value;
    }
    return type === 'class'
      ? STATUS_CLASS[value] ?? ''
      : STATUS_LABEL[value] ?? value;
  }
}