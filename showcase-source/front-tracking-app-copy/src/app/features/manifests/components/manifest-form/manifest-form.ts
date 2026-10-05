import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManifestService } from '../../services/ManifestService';
import { RouteTrackingService } from '../../../routes/services/RouteTrackingService';
import { VehicleService } from '../../../trucks/services/VehicleService';
import { DriverManagementService } from '../../../drivers/services/DriverManagementService';
import { WarehouseManagementService } from '../../../warehouses/services/WarehouseManagementService';
import { Route } from '../../../routes/models/routes-model';
import { Truck } from '../../../trucks/models/vehicle-model';
import { Driver } from '../../../drivers/models/driver-model';
import { Warehouse } from '../../../warehouses/models/warehouse-model';
import { isInvalid } from '../../../../shared/utils/form-util';

@Component({
  selector: 'app-manifest-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manifest-form.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManifestForm {

  isInvalid = isInvalid;

  @Output() close   = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  private readonly svc          = inject(ManifestService);
  private readonly routeSvc     = inject(RouteTrackingService);
  private readonly vehicleSvc   = inject(VehicleService);
  private readonly driverSvc    = inject(DriverManagementService);
  private readonly warehouseSvc = inject(WarehouseManagementService);
  private readonly fb           = inject(FormBuilder);

  loading    = signal<boolean>(false);
  error      = signal<string>('');
  routes     = signal<Route[]>([]);
  trucks     = signal<Truck[]>([]);
  drivers    = signal<Driver[]>([]);
  warehouses = signal<Warehouse[]>([]);

  form = this.fb.group({
    manifestCode:           ['', [Validators.required, Validators.maxLength(50)]],  // ← nuevo
    routeId:                ['', Validators.required],
    truckId:                ['', Validators.required],
    driverId:               ['', Validators.required],
    originWarehouseId:      ['', Validators.required],
    destinationWarehouseId: ['', Validators.required],
    scheduledDepartureAt:   [''],
    scheduledArrivalAt:     [''],
    sealNumber:             [''],
    notes:                  [''],
  });

  ngOnInit(): void {
    this.routeSvc.getRoutes({ limit: 200, offset: 0 }).subscribe(res => this.routes.set(res.data));
    this.vehicleSvc.getTrucks({ limit: 200, offset: 0 }).subscribe(res => this.trucks.set(res.data));
    this.driverSvc.getDrivers({ limit: 200, offset: 0 }).subscribe(res => this.drivers.set(res.data));
    this.warehouseSvc.getWarehouses({ limit: 200, offset: 0 }).subscribe(res => this.warehouses.set(res.data));
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    const raw = this.form.getRawValue();
    this.svc.createManifest({
      manifestCode:           raw.manifestCode!,
      routeId:                raw.routeId!,
      truckId:                raw.truckId!,
      driverId:               raw.driverId!,
      originWarehouseId:      raw.originWarehouseId!,
      destinationWarehouseId: raw.destinationWarehouseId!,
      scheduledDepartureAt:   raw.scheduledDepartureAt || undefined,
      scheduledArrivalAt:     raw.scheduledArrivalAt   || undefined,
      sealNumber:             raw.sealNumber           || undefined,
      notes:                  raw.notes                || undefined,
    }).subscribe({
      next:  () => { this.loading.set(false); this.created.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al crear manifiesto'); this.loading.set(false); },
    });
  }

}
