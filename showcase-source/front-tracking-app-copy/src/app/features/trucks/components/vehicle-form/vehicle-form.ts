import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../../shared/utils/form-util';
import { VehicleService } from '../../services/VehicleService';
import { CreateTruckDto } from '../../models/vehicle-model';

@Component({
  selector: 'app-vehicle-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './vehicle-form.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VehicleForm {

  isInvalid = isInvalid;

  private readonly fb             = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService);

  close = output<void>();

  isOwn   = signal<boolean>(false);
  loading = signal<boolean>(false);
  error   = signal<string>('');

  form = this.fb.group({
    licensePlate:  ['', Validators.required],
    brand:         ['', Validators.required],
    model:         ['', Validators.required],
    maxWeightKg:   [0, Validators.required],
    maxVolumeM3:   [0, Validators.required],
    ownershipType: ['OWNED', Validators.required],
    providerName:  [''],
  });

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');

    const raw = this.form.getRawValue();

    const dto: CreateTruckDto = {
      licensePlate:  raw.licensePlate  ?? '',
      brand:         raw.brand         ?? '',
      model:         raw.model         ?? '',
      maxWeightKg:   raw.maxWeightKg   ?? 0,
      maxVolumeM3:   raw.maxVolumeM3   ?? 0,
      ownershipType: raw.ownershipType as 'OWNED' | 'THIRD_PARTY',
      providerName:  raw.providerName  ?? undefined,
    };

    this.vehicleService.createTruck(dto).subscribe({  // ← createTruck, no updateTruck
      next:  () => { this.loading.set(false); this.close.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al registrar'); this.loading.set(false); },
    });
  }

}
