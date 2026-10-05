import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../../shared/utils/form-util';
import { VehicleService } from '../../services/VehicleService';
import { CreateTruckDto } from '../../models/vehicle-model';

@Component({
  selector: 'app-vehicle-edit-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle-edit-modal.html',
})
export class VehicleEditModal {

  isOpen  = input<boolean>(false);
  truckId = input<string | null>(null);
  close   = output<void>();

  isInvalid = isInvalid;

  private readonly fb             = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService);

  isOwn   = signal<boolean>(true);
  loading = signal<boolean>(false);
  error   = signal<string>('');

  form = this.fb.group({
    licensePlate:  ['', Validators.required],
    brand:         ['', Validators.required],
    model:         ['', Validators.required],
    maxWeightKg:   [0,  Validators.required],
    maxVolumeM3:   [0,  Validators.required],
    ownershipType: ['OWNED',     Validators.required],
    providerName:  [''],
    status:        ['AVAILABLE', Validators.required],
  });

  constructor() {
    effect(() => {
      const id     = this.truckId();
      const isOpen = this.isOpen();
      if (id && isOpen) {
        this.loading.set(true);
        this.vehicleService.getTruckById(id).subscribe({
          next: (truck) => {
            this.isOwn.set(truck.ownershipType === 'OWNED');
            this.form.patchValue(truck);
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err.error?.message || 'Error al cargar datos');
            this.loading.set(false);
          },
        });
      }
    });
  }

  toggleType(value: boolean): void {
    this.isOwn.set(value);
    this.form.patchValue({ ownershipType: value ? 'OWNED' : 'THIRD_PARTY' });
    if (!value) {
      this.form.get('providerName')?.setValidators(Validators.required);
    } else {
      this.form.get('providerName')?.clearValidators();
    }
    this.form.get('providerName')?.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const id = this.truckId();
    if (!id) {
      this.error.set('No se encontró el ID del vehículo.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const raw = this.form.getRawValue() as {
      licensePlate:  string | null; brand:         string | null;
      model:         string | null; maxWeightKg:   number | null;
      maxVolumeM3:   number | null; ownershipType: string | null;
      providerName:  string | null; status:        string | null;
    };

    const dto: Partial<CreateTruckDto> = {
      licensePlate:  raw.licensePlate  ?? undefined,
      brand:         raw.brand         ?? undefined,
      model:         raw.model         ?? undefined,
      maxWeightKg:   raw.maxWeightKg   ?? undefined,
      maxVolumeM3:   raw.maxVolumeM3   ?? undefined,
      ownershipType: raw.ownershipType as 'OWNED' | 'THIRD_PARTY',
      providerName:  raw.providerName  ?? undefined,
    };

    this.vehicleService.updateTruck(id, dto).subscribe({
      next:  () => { this.loading.set(false); this.close.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al actualizar'); this.loading.set(false); },
    });
  }
}