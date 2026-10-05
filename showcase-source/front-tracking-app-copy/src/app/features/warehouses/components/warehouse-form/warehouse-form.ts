import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseManagementService } from '../../services/WarehouseManagementService';
import { isInvalid } from '../../../../shared/utils/form-util';

@Component({
  selector: 'app-warehouse-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './warehouse-form.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WarehouseForm {

  isInvalid = isInvalid;

  @Output() close   = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  private readonly warehouseService = inject(WarehouseManagementService);
  private readonly fb  = inject(FormBuilder);

  loading = signal<boolean>(false);
  error   = signal<string>('');

  form = this.fb.group({
    code:          ['', Validators.required],
    name:          ['', Validators.required],
    warehouseType: ['ORIGIN', Validators.required],
    address:       ['', Validators.required],
    city:          ['', Validators.required],
    state:         ['', Validators.required],
    country:       ['Perú', Validators.required],
    postalCode:    [''],
    latitude:      [null as number | null],
    longitude:     [null as number | null],
    maxCapacityKg: [null as number | null],
    maxCapacityM3: [null as number | null],
    managerName:   [''],
    phone:         [''],
    email:         ['', Validators.email],
    notes:         [''],
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading.set(true);
    this.error.set('');

    const raw = this.form.getRawValue();

    this.warehouseService.createWarehouse({
      name:          raw.name!,
      code:          raw.code!,
      warehouseType: raw.warehouseType as any,
      address:       raw.address!,
      city:          raw.city!,
      state:         raw.state!,
      country:       raw.country!,
      postalCode:    raw.postalCode    || undefined,
      latitude:      raw.latitude      ?? undefined,
      longitude:     raw.longitude     ?? undefined,
      maxCapacityKg: raw.maxCapacityKg ?? undefined,
      maxCapacityM3: raw.maxCapacityM3 ?? undefined,
      managerName:   raw.managerName   || undefined,
      phone:         raw.phone         || undefined,
      email:         raw.email         || undefined,
      notes:         raw.notes         || undefined,
    }).subscribe({
      next:  () => { this.loading.set(false); this.created.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al registrar'); this.loading.set(false); },
    });
  }

}
