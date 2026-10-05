import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, output, signal } from '@angular/core';
import { Truck } from '../../models/vehicle-model';
import { VehicleService } from '../../services/VehicleService';
import { VehicleStatusPipe } from '../../../../shared/pipes/vehicle-status-pipe';

@Component({
  selector: 'app-vehicle-detail-modal',
  imports: [
    CommonModule, 
    VehicleStatusPipe
  ],
  templateUrl: './vehicle-detail-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VehicleDetailModal {

  isOpen  = input<boolean>(false);
  truckId = input<string | null>(null);
  close   = output<void>();

  private readonly vehicleService = inject(VehicleService);

  truck   = signal<Truck | null>(null);
  loading = signal<boolean>(false);
  error   = signal<string>('');

  constructor() {
    effect(() => {
      const id = this.truckId();
      if (id) {
        this.loading.set(true);
        this.error.set('');
        this.vehicleService.getTruckById(id).subscribe({
          next:  (res) => { this.truck.set(res); this.loading.set(false); },
          error: (err) => { this.error.set(err.error?.message || 'Error al cargar detalle'); this.loading.set(false); },
        });
      } else {
        this.truck.set(null);
      }
    });
  }
}