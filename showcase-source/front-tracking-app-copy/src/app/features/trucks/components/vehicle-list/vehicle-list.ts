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
import { VehicleForm } from '../vehicle-form/vehicle-form';
import { VehicleStatusPipe } from '../../../../shared/pipes/vehicle-status-pipe';
import { Truck } from '../../models/vehicle-model';
import { VehicleService } from '../../services/VehicleService';
import { VehicleDetailModal } from '../vehicle-detail-modal/vehicle-detail-modal';
import { VehicleEditModal } from '../vehicle-edit-modal/vehicle-edit-modal';
import { VehicleDeleteModal } from '../vehicle-delete-modal/vehicle-delete-modal';
import { isExpiringSoon } from '../../../../shared/utils/date-util';

@Component({
  selector: 'app-vehicle-list',
  imports: [
    CommonModule,
    VehicleForm,
    FormsModule,
    VehicleStatusPipe,
    VehicleDetailModal,
    VehicleEditModal,
    VehicleDeleteModal,
  ],
  templateUrl: './vehicle-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VehicleList implements OnInit {

  private readonly vehicleService = inject(VehicleService);
  private readonly destroy$       = inject(DestroyRef);
  private readonly searchInput$   = new Subject<string>();

  /* ── Data ───────────────────────────────────────────────── */
  trucks    = signal<Truck[]>([]);
  errorLoad = signal<string>('');

  /* ── Modals ─────────────────────────────────────────────── */
  showForm        = signal<boolean>(false);
  isDetailOpen    = signal<boolean>(false);
  selectedTruckId = signal<string | null>(null);
  openMenuId      = signal<string | null>(null);
  isEditOpen      = signal<boolean>(false);
  editingTruckId  = signal<string | null>(null);
  isDeletingId    = signal<string | null>(null);
  errorDelete     = signal<string>('');
  isDeleteOpen    = signal<boolean>(false);

  /* ── Filters ────────────────────────────────────────────── */
  searchQuery    = signal<string>('');
  selectedStatus = signal<string>('all');
  selectedType   = signal<string>('all');

  /* ── Pagination ─────────────────────────────────────────── */
  readonly pageSize = 10;
  currentPage       = signal<number>(1);
  totalItems        = signal<number>(0);

  /* ── Lifecycle ──────────────────────────────────────────── */

  ngOnInit(): void {
    this.searchInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroy$),
    ).subscribe(() => {
      this.currentPage.set(1);
      this.loadTrucks();
    });

    this.loadTrucks();
  }

  @HostListener('document:click')
  onDocumentClick(): void { this.closeMenu(); }

  /* ── Data loading ───────────────────────────────────────── */

  loadTrucks(): void {
    this.errorLoad.set('');
    const offset = (this.currentPage() - 1) * this.pageSize;

    this.vehicleService.getTrucks({
      limit:  this.pageSize,
      offset,
      search: this.searchQuery()    || undefined,
      status: this.selectedStatus() !== 'all' ? this.selectedStatus() : undefined,
      ownershipType: this.selectedType() !== 'all' ? this.selectedType() : undefined,
    }).subscribe({
      next:  (res) => { this.trucks.set(res.data); this.totalItems.set(res.meta.total); },
      error: (err)  => { this.trucks.set([]); this.errorLoad.set(err.error?.message || 'Error al cargar camiones'); },
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
    this.loadTrucks();
  }

  onTypeChange(value: string): void {
    this.selectedType.set(value);
    this.currentPage.set(1);
    this.loadTrucks();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.selectedType.set('all');
    this.currentPage.set(1);
    this.loadTrucks();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery()    !== '' ||
           this.selectedStatus() !== 'all' ||
           this.selectedType()   !== 'all';
  }

  // Solo devuelve la página actual — filtrado por API
  filteredTrucks = computed(() => this.trucks());

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
    this.loadTrucks();
  }

  /* ── Modal handlers ─────────────────────────────────────── */

  openDetail(truck: Truck): void { this.selectedTruckId.set(truck.id); this.isDetailOpen.set(true);  }
  closeDetail(): void            { this.isDetailOpen.set(false); this.selectedTruckId.set(null);      }

  openEdit(truck: Truck): void   { this.editingTruckId.set(truck.id); this.isEditOpen.set(true);      }
  closeEdit(): void              { this.isEditOpen.set(false); this.editingTruckId.set(null); this.loadTrucks(); }

  openDelete(truck: Truck): void { this.isDeletingId.set(truck.id); this.isDeleteOpen.set(true);      }
  closeDelete(): void            { this.isDeleteOpen.set(false); this.isDeletingId.set(null); this.errorDelete.set(''); }

  confirmDelete(): void {
    const id = this.isDeletingId();
    if (!id) return;
    this.vehicleService.deleteTruck(id).subscribe({
      next:  () => { this.closeDelete(); this.loadTrucks(); },
      error: (err) => this.errorDelete.set(err.error?.message || 'Error al eliminar'),
    });
  }

  toggleMenu(id: string): void { this.openMenuId.set(this.openMenuId() === id ? null : id); }
  closeMenu(): void            { this.openMenuId.set(null); }

  openForm():  void { this.showForm.set(true);  }
  closeForm(): void { this.showForm.set(false); this.loadTrucks(); }

  isExpiringSoon(date?: string): boolean { return isExpiringSoon(date, 30); }
}