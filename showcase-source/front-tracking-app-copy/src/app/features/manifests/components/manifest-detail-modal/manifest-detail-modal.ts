import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManifestService } from '../../services/ManifestService';
import { PackageQueryService } from '../../../deliveries/services/PackageQueryService';
import { VehicleService } from '../../../trucks/services/VehicleService';
import { DriverManagementService } from '../../../drivers/services/DriverManagementService';
import { RouteTrackingService } from '../../../routes/services/RouteTrackingService';
import { Manifest, ManifestPackage } from '../../models/manifest-model';
import { Truck } from '../../../trucks/models/vehicle-model';
import { ApiPackage } from '../../../deliveries/models/package.model';
import { ManifestStatusPipe } from '../../../../shared/pipes/manifest-status-pipe';

@Component({
  selector: 'app-manifest-detail-modal',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManifestStatusPipe
  ],
  templateUrl: './manifest-detail-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManifestDetailModal implements OnInit {

  @Input()  manifestId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly svc        = inject(ManifestService);
  private readonly packageSvc = inject(PackageQueryService);
  private readonly vehicleSvc = inject(VehicleService);
  private readonly driverSvc  = inject(DriverManagementService);
  private readonly routeSvc   = inject(RouteTrackingService);
  private readonly fb         = inject(FormBuilder);

  manifest     = signal<Manifest | null>(null);
  truck        = signal<Truck | null>(null);
  driver       = signal<{ firstName: string; lastName: string } | null>(null);
  route        = signal<{ name: string; code: string } | null>(null);
  loading      = signal<boolean>(true);
  activeTab    = signal<'packages' | 'guides'>('packages');

  // Paquetes
  searchPackage = signal<string>('');
  foundPackage  = signal<ApiPackage | null>(null);
  searchError   = signal<string>('');
  searchLoading = signal<boolean>(false);

  // Guías de remisión
  addingGuide = signal<boolean>(false);
  errorGuide  = signal<string>('');

  guideForm = this.fb.group({
    packageId:        ['', Validators.required],
    guideNumber:      ['', Validators.required],
    guideType:        ['STANDARD', Validators.required],
    issuingAuthority: ['', Validators.required],
    issuedAt:         ['', Validators.required],
    expiresAt:        [''],
    documentUrl:      [''],
    description:      [''],
  });

  guideTypeLabel: Record<string, string> = {
    STANDARD:              'Estándar',
    CUSTOMS_AUTHORIZATION: 'Autorización Aduanas',
    HAZARDOUS_MATERIALS:   'Mat. Peligrosos',
    PHARMACEUTICAL:        'Farmacéutico',
    SPECIAL_CARGO:         'Carga Especial',
  };

  ngOnInit(): void { this.loadManifest(); }

  /* ── Data loading ───────────────────────────────────── */

  loadManifest(): void {
    this.loading.set(true);
    this.svc.getManifestById(this.manifestId).subscribe({
      next: (res) => {
        this.manifest.set(res);
        this.loading.set(false);
        this.loadRelations(res);
      },
      error: () => this.loading.set(false),
    });
  }

  private loadRelations(res: Manifest): void {
    // Driver
    if (res.driver) {
      this.driver.set(res.driver);
    } else if (res.driverId) {
      this.driverSvc.getDriverById(res.driverId).subscribe(d =>
        this.driver.set({ firstName: d.firstName, lastName: d.lastName })
      );
    }

    // Truck
    if (res.truck) {
      this.truck.set(res.truck as any);
    } else if (res.truckId) {
      this.vehicleSvc.getTruckById(res.truckId).subscribe(t => this.truck.set(t));
    }

    // Route
    if (res.route) {
      this.route.set(res.route);
    } else if (res.routeId) {
      this.routeSvc.getRouteById(res.routeId).subscribe(r =>
        this.route.set({ name: r.name, code: r.code })
      );
    }
  }

  /* ── Capacidad ──────────────────────────────────────── */

  get weightPct(): number {
    const m = this.manifest(); const t = this.truck();
    if (!m || !t || !t.maxWeightKg) return 0;
    return Math.min((Number(m.totalWeightKg) / t.maxWeightKg) * 100, 100);
  }

  get volumePct(): number {
    const m = this.manifest(); const t = this.truck();
    if (!m || !t || !t.maxVolumeM3) return 0;
    return Math.min((Number(m.totalVolumeM3) / t.maxVolumeM3) * 100, 100);
  }

  /* ── Búsqueda de paquetes ───────────────────────────── */

  searchByCode(): void {
    const q = this.searchPackage().trim();
    if (!q) return;
    this.searchLoading.set(true);
    this.searchError.set('');
    this.foundPackage.set(null);

    this.packageSvc.getPackages({ limit: 10, offset: 0, search: q }).subscribe({
      next: (res) => {
        const found = res.data.find(p => p.packageCode === q || p.trackingCode === q);
        if (found) {
          this.foundPackage.set(found);
        } else {
          this.searchError.set('No se encontró ningún paquete con ese código');
        }
        this.searchLoading.set(false);
      },
      error: () => { this.searchError.set('Error al buscar'); this.searchLoading.set(false); },
    });
  }

  addPackage(): void {
    const pkg = this.foundPackage();
    if (!pkg) return;
    this.svc.addPackage(this.manifestId, pkg.id).subscribe({
      next: () => { this.foundPackage.set(null); this.searchPackage.set(''); this.loadManifest(); },
      error: (err) => this.searchError.set(err.error?.message || 'Error al agregar'),
    });
  }

  // La API devuelve el packageCode como id del paquete en el array plano
  // Necesitamos el id real — lo buscamos por packageCode
  removePackage(pkg: ManifestPackage): void {
    // Si tiene packageId úsalo, si no usa el id del objeto (que es el id de la relación)
    const idToRemove = pkg.packageId ?? pkg.id;
    this.svc.removePackage(this.manifestId, idToRemove).subscribe({
      next: () => this.loadManifest(),
      error: (err) => this.searchError.set(err.error?.message || 'Error al eliminar'),
    });
  }

  /* ── Guías de remisión ──────────────────────────────── */

  submitGuide(): void {
    if (this.guideForm.invalid) { this.guideForm.markAllAsTouched(); return; }
    this.errorGuide.set('');
    const raw = this.guideForm.getRawValue();
    this.svc.addRemissionGuide(this.manifestId, {
      packageId:        raw.packageId!,
      guideNumber:      raw.guideNumber!,
      guideType:        raw.guideType as any,
      issuingAuthority: raw.issuingAuthority!,
      issuedAt:         raw.issuedAt!,
      expiresAt:        raw.expiresAt   || undefined,
      documentUrl:      raw.documentUrl || undefined,
      description:      raw.description || undefined,
    }).subscribe({
      next: () => { this.addingGuide.set(false); this.guideForm.reset({ guideType: 'STANDARD' }); this.loadManifest(); },
      error: (err) => this.errorGuide.set(err.error?.message || 'Error al registrar guía'),
    });
  }

  removeGuide(guideId: string): void {
    this.svc.removeRemissionGuide(this.manifestId, guideId).subscribe({
      next: () => this.loadManifest(),
    });
  }
}