import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTruck, TrackingDelivery } from '../../models/tracking-model';
import { ShipmentTrackingService } from '../../services/ShipmentTrackingService';

@Component({
  selector: 'app-live-map',
  imports: [
    CommonModule
  ],
  templateUrl: './live-map.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class LiveMap {

  
  // Opcional — si viene desde tracking individual
  delivery = input<TrackingDelivery | null>(null);

  private trackingService = inject(ShipmentTrackingService);

  activeTrucks: ActiveTruck[] = [];

  ngOnInit() {
    this.trackingService.getActiveTrucks()
      .subscribe(t => this.activeTrucks = t);
  }

  /**
   * Coordenadas relativas usadas para posicionar ciudades
   * dentro del mapa mock renderizado en la vista.
   *
   * IMPORTANTE:
   * - No representan coordenadas geográficas reales (lat/lng).
   * - Son valores porcentuales (0–100) relativos al contenedor del mapa.
   * - Se utilizan únicamente para posicionamiento visual en el mock.
   *
   * Si en el futuro se integra un mapa real (Google Maps, Leaflet, etc.),
   * este sistema deberá reemplazarse por coordenadas geográficas reales.
   */
  /* ── Sistema de coordenadas (Mock UI Map) ────────────────── */
  cityPositions: Record<string, { x: number; y: number }> = {
    'Lima':       { x: 22, y: 52 },
    'Trujillo':   { x: 20, y: 33 },
    'Piura':      { x: 18, y: 20 },
    'Arequipa':   { x: 38, y: 72 },
    'Cusco':      { x: 42, y: 63 },
    'Iquitos':    { x: 55, y: 28 },
    'Pucallpa':   { x: 52, y: 48 },
    'Abancay':    { x: 38, y: 60 },
  };

  // Modo: 'global' si no hay delivery input, 'single' si lo hay
  get isGlobalMode(): boolean {
    return this.delivery() === null;
  }

  get originPos() {
    const d = this.delivery();
    if (!d) return { x: 22, y: 52 };
    return this.cityPositions[d.origin] ?? { x: 22, y: 52 };
  }

  get destPos() {
    const d = this.delivery();
    if (!d) return { x: 42, y: 63 };
    return this.cityPositions[d.destination] ?? { x: 42, y: 63 };
  }

  get currentPos() {
    const d = this.delivery();
    if (!d) return this.originPos;
    return this.cityPositions[d.currentLocation.split(' ')[0]] ?? this.originPos;
  }

  get currentCity(): string {
    return this.delivery()?.currentLocation.split(' ')[0] ?? '';
  }

  get isCurrentDifferent(): boolean {
    const d = this.delivery();
    if (!d) return false;
    return this.currentCity !== d.origin && this.currentCity !== d.destination;
  }

  getTruckPos(city: string) {
    return this.cityPositions[city] ?? { x: 22, y: 52 };
  }

  truckStatusColor: Record<string, string> = {
    in_transit: '#3b82f6',
    active:     '#22c55e',
  };

  statusColor: Record<string, string> = {
    pending:    '#f59e0b',
    in_transit: '#3b82f6',
    delivered:  '#22c55e',
    failed:     '#ef4444',
  };

  selectedTruck: string | null = null;

  selectTruck(id: string) {
    this.selectedTruck = this.selectedTruck === id ? null : id;
  }

}
