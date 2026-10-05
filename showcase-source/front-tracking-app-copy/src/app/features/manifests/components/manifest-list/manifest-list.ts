import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Manifest } from '../../models/manifest-model';
import { ManifestService } from '../../services/ManifestService';
import { DriverManagementService } from '../../../drivers/services/DriverManagementService';
import { VehicleService } from '../../../trucks/services/VehicleService';
import { Driver } from '../../../drivers/models/driver-model';
import { Truck } from '../../../trucks/models/vehicle-model';
import { ManifestDetailModal } from '../manifest-detail-modal/manifest-detail-modal';
import { ManifestDeleteModal } from '../manifest-delete-modal/manifest-delete-modal';
import { ManifestForm } from '../manifest-form/manifest-form';
import { ManifestStatusPipe } from '../../../../shared/pipes/manifest-status-pipe';

@Component({
  selector: 'app-manifest-list',
  imports: [
    CommonModule,
    FormsModule,
    ManifestForm,
    ManifestDetailModal,
    ManifestDeleteModal,
    ManifestStatusPipe
  ],
  templateUrl: './manifest-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManifestList implements OnInit {

  private readonly manifestSvc  = inject(ManifestService);
  private readonly driverSvc    = inject(DriverManagementService);
  private readonly vehicleSvc   = inject(VehicleService);
  private readonly destroy$     = inject(DestroyRef);
  private readonly searchInput$ = new Subject<string>();

  /* ── Data ───────────────────────────────────────────────── */
  manifests = signal<Manifest[]>([]);
  drivers   = signal<Driver[]>([]);
  trucks    = signal<Truck[]>([]);
  errorLoad = signal<string>('');
  

  /* ── Modals ─────────────────────────────────────────────── */
  showForm     = signal<boolean>(false);
  selectedId   = signal<string | null>(null);
  deletingId   = signal<string | null>(null);
  deletingCode = signal<string>('');
  activeMenu: string | null = null;

  /* ── Filters ────────────────────────────────────────────── */
  searchQuery      = signal<string>('');
  selectedStatus   = signal<string>('all');
  selectedDriverId = signal<string>('all');
  selectedTruckId  = signal<string>('all');

  /* ── Pagination ─────────────────────────────────────────── */
  readonly pageSize = 10;
  currentPage       = signal<number>(1);
  totalItems        = signal<number>(0);

  /* ── KPI ────────────────────────────────────────────────── */
  readonly statusKeys = ['DRAFT', 'READY_TO_DISPATCH', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED'] as const;

  // Conteos por estado — se calculan sobre todos los manifiestos de la página actual
  countByStatus(status: string): number {
    return this.manifests().filter(m => m.status === status).length;
  }

  /* ── Lifecycle ──────────────────────────────────────────── */

  ngOnInit(): void {
    this.searchInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroy$),
    ).subscribe(() => {
      this.currentPage.set(1);
      this.load();
    });

    this.load();

    // Choferes y camiones para los selectores de filtro
    this.driverSvc.getDrivers({ limit: 200, offset: 0 }).subscribe(res => this.drivers.set(res.data));
    this.vehicleSvc.getTrucks({ limit: 200, offset: 0 }).subscribe(res => this.trucks.set(res.data));
  }

  @HostListener('document:click')
  closeMenu() { this.activeMenu = null; }

  /* ── Data loading ───────────────────────────────────────── */

  load(): void {
    this.errorLoad.set('');
    const offset = (this.currentPage() - 1) * this.pageSize;

    this.manifestSvc.getManifests({
      limit:    this.pageSize,
      offset,
      search:   this.searchQuery()      || undefined,
      status:   this.selectedStatus()   !== 'all' ? this.selectedStatus()   : undefined,
      driverId: this.selectedDriverId() !== 'all' ? this.selectedDriverId() : undefined,
      truckId:  this.selectedTruckId()  !== 'all' ? this.selectedTruckId()  : undefined,
    }).subscribe({
      next:  (res) => { this.manifests.set(res.data); this.totalItems.set(res.meta.total); },
      error: (err)  => { this.manifests.set([]); this.errorLoad.set(err.error?.message || 'Error al cargar manifiestos'); },
    });
  }

  /* ── Filter handlers ────────────────────────────────────── */

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.searchInput$.next(value);
  }

  onStatusChange(value: string): void {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
    this.load();
  }

  onDriverChange(value: string): void {
    this.selectedDriverId.set(value);
    this.currentPage.set(1);
    this.load();
  }

  onTruckChange(value: string): void {
    this.selectedTruckId.set(value);
    this.currentPage.set(1);
    this.load();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.selectedDriverId.set('all');
    this.selectedTruckId.set('all');
    this.currentPage.set(1);
    this.load();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery()      !== '' ||
           this.selectedStatus()   !== 'all' ||
           this.selectedDriverId() !== 'all' ||
           this.selectedTruckId()  !== 'all';
  }

  // Solo devuelve la página actual — filtrado por API
  filteredManifests = computed(() => this.manifests());

  /* ── Pagination ─────────────────────────────────────────── */

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize);
  }

  get pages(): number[] {
    const total   = this.totalPages;
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4)         return [1, 2, 3, 4, 5, 0, total];
    if (current >= total - 3) return [1, 0, total-4, total-3, total-2, total-1, total];
    return [1, 0, current-1, current, current+1, 0, total];
  }

  get showingTo(): number {
    return Math.min(this.currentPage() * this.pageSize, this.totalItems());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage()) return;
    this.currentPage.set(page);
    this.load();
  }

  /* ── Helpers ────────────────────────────────────────────── */

  driverName(id: string): string {
    const d = this.drivers().find(d => d.id === id);
    return d ? `${d.firstName} ${d.lastName}` : '—';
  }

  truckPlate(id: string): string {
    return this.trucks().find(t => t.id === id)?.licensePlate ?? '—';
  }

  /* ── Modal handlers ─────────────────────────────────────── */

  openForm()  { this.showForm.set(true);  }
  closeForm() { this.showForm.set(false); this.load(); }

  openDetail(m: Manifest) { this.selectedId.set(m.id);  }
  closeDetail()           { this.selectedId.set(null);  }

  openDelete(m: Manifest) { this.deletingId.set(m.id); this.deletingCode.set(m.manifestCode); }
  closeDelete()           { this.deletingId.set(null);                                         }
  onDeleted()             { this.closeDelete(); this.load();                                   }
}