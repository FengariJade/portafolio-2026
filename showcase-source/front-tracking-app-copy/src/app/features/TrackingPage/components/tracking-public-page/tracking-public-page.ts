import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TrackingResult } from '../../models/tracking-public-model';

@Component({
  selector: 'app-tracking-public-page',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

  ],
  templateUrl: './tracking-public-page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrackingPublicPage {

  private readonly route  = inject(ActivatedRoute);
  private readonly http   = inject(HttpClient);

  searchCode  = signal<string>('');
  result      = signal<TrackingResult | null>(null);
  loading     = signal<boolean>(false);
  error       = signal<string>('');
  searched    = signal<boolean>(false);

  statusLabel: Record<string, string> = {
    CREATED:                'Creado',
    PICKED_UP:              'Recogido',
    AT_ORIGIN_WAREHOUSE:    'En almacén origen',
    IN_TRANSIT:             'En tránsito',
    AT_DESTINATION_WAREHOUSE: 'En almacén destino',
    OUT_FOR_DELIVERY:       'En reparto',
    DELIVERED:              'Entregado',
    FAILED_ATTEMPT:         'Intento fallido',
    RETURNED_TO_SENDER:     'Devuelto al remitente',
    EXCEPTION:              'Incidencia',
  };

  statusIcon: Record<string, string> = {
    CREATED:                  'mdi:package-variant',
    PICKED_UP:                'mdi:hand-extended',
    AT_ORIGIN_WAREHOUSE:      'mdi:warehouse',
    IN_TRANSIT:               'mdi:truck-delivery',
    AT_DESTINATION_WAREHOUSE: 'mdi:warehouse',
    OUT_FOR_DELIVERY:         'mdi:map-marker-radius',
    DELIVERED:                'mdi:check-circle',
    FAILED_ATTEMPT:           'mdi:alert-circle-outline',
    RETURNED_TO_SENDER:       'mdi:package-variant-remove',
    EXCEPTION:                'mdi:alert-circle',
  };

  statusColor: Record<string, string> = {
    CREATED:                  'text-gray-500    bg-gray-100',
    PICKED_UP:                'text-violet-600  bg-violet-50',
    AT_ORIGIN_WAREHOUSE:      'text-violet-600  bg-violet-50',
    IN_TRANSIT:               'text-amber-600   bg-amber-50',
    AT_DESTINATION_WAREHOUSE: 'text-blue-600    bg-blue-50',
    OUT_FOR_DELIVERY:         'text-blue-600    bg-blue-50',
    DELIVERED:                'text-emerald-600 bg-emerald-50',
    FAILED_ATTEMPT:           'text-orange-600  bg-orange-50',
    RETURNED_TO_SENDER:       'text-red-600     bg-red-50',
    EXCEPTION:                'text-red-600     bg-red-50',
  };

  dotColor: Record<string, string> = {
    CREATED:                  'bg-gray-400',
    PICKED_UP:                'bg-violet-500',
    AT_ORIGIN_WAREHOUSE:      'bg-violet-500',
    IN_TRANSIT:               'bg-amber-500',
    AT_DESTINATION_WAREHOUSE: 'bg-blue-500',
    OUT_FOR_DELIVERY:         'bg-blue-600',
    DELIVERED:                'bg-emerald-500',
    FAILED_ATTEMPT:           'bg-orange-500',
    RETURNED_TO_SENDER:       'bg-red-500',
    EXCEPTION:                'bg-red-500',
  };

  // Timeline — flujo normal (sin FAILED_ATTEMPT, RETURNED, EXCEPTION que son ramas)
  get timeline(): { status: string; label: string; done: boolean; active: boolean; }[] {
    const order = [
      'CREATED',
      'PICKED_UP',
      'AT_ORIGIN_WAREHOUSE',
      'IN_TRANSIT',
      'AT_DESTINATION_WAREHOUSE',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
    ];

    const current = this.result()?.trackingStatus ?? '';

    // Si el estado es una rama especial, lo mostramos aparte
    const isException = ['FAILED_ATTEMPT', 'RETURNED_TO_SENDER', 'EXCEPTION'].includes(current);
    const currentIdx  = isException ? -1 : order.indexOf(current);

    return order.map((s, i) => ({
      status: s,
      label:  this.statusLabel[s] ?? s,
      done:   i < currentIdx,
      active: i === currentIdx,
    }));
  }

  // Getter para estados de excepción
  get isExceptionStatus(): boolean {
    const s = this.result()?.trackingStatus ?? '';
    return ['FAILED_ATTEMPT', 'RETURNED_TO_SENDER', 'EXCEPTION'].includes(s);
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.searchCode.set(code);
      this.search(code);
    }
  }

  search(code?: string): void {
    const q = (code ?? this.searchCode()).trim();
    if (!q) return;

    this.loading.set(true);
    this.error.set('');
    this.result.set(null);
    this.searched.set(true);

    this.http.get<TrackingResult>(`${environment.apiUrl}/tracking/${q}`)
      .subscribe({
        next:  (res) => { this.result.set(res); this.loading.set(false); },
        error: (err) => {
          this.error.set(err.status === 404
            ? 'No encontramos ningún paquete con ese código.'
            : 'Error al consultar. Intenta nuevamente.');
          this.loading.set(false);
        },
      });
  }

}
