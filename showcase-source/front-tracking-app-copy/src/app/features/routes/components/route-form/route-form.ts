import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteTrackingService } from '../../services/RouteTrackingService';
import { WarehouseManagementService } from '../../../warehouses/services/WarehouseManagementService';
import { Warehouse } from '../../../warehouses/models/warehouse-model';
import { CommonModule } from '@angular/common';
import { isInvalid } from '../../../../shared/utils/form-util';

@Component({
  selector: 'app-route-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './route-form.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RouteForm {

  isInvalid = isInvalid;

  @Output() close   = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  private readonly svc          = inject(RouteTrackingService);
  private readonly warehouseSvc = inject(WarehouseManagementService);
  private readonly fb           = inject(FormBuilder);

  loading    = signal<boolean>(false);
  error      = signal<string>('');
  warehouses = signal<Warehouse[]>([]);

  form = this.fb.group({
    code:                    ['', Validators.required],
    name:                    ['', Validators.required],
    originWarehouseId:       ['', Validators.required],
    destinationWarehouseId:  ['', Validators.required],
    distanceKm:              [null as number | null],
    estimatedDurationHours:  [null as number | null],
    notes:                   [''],
  });

  ngOnInit(): void {
    this.warehouseSvc.getWarehouses({ limit: 200, offset: 0 }).subscribe({
      next: (res) => this.warehouses.set(res.data),
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    const raw = this.form.getRawValue();
    this.svc.createRoute({
      code:                   raw.code!,
      name:                   raw.name!,
      originWarehouseId:      raw.originWarehouseId!,
      destinationWarehouseId: raw.destinationWarehouseId!,
      distanceKm:             raw.distanceKm             ?? undefined,
      estimatedDurationHours: raw.estimatedDurationHours ?? undefined,
      notes:                  raw.notes                  || undefined,
    }).subscribe({
      next:  () => { this.loading.set(false); this.created.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al registrar'); this.loading.set(false); },
    });
  }

}
