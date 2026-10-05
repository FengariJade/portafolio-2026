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
import { WarehouseForm } from '../warehouse-form/warehouse-form';
import { WarehouseDetailModal } from '../warehouse-detail-modal/warehouse-detail-modal';
import { WarehouseManagementService } from '../../services/WarehouseManagementService';
import { Warehouse } from '../../models/warehouse-model';
import { WarehouseDeleteModal } from '../warehouse-delete-modal/warehouse-delete-modal';
import { WarehouseTypePipe } from '../../../../shared/pipes/warehouse-status-pipe';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WarehouseForm,
    WarehouseDetailModal,
    WarehouseDeleteModal,
    WarehouseTypePipe
  ],
  templateUrl: './warehouse-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WarehouseList implements OnInit {

  private readonly warehouseService = inject(WarehouseManagementService);
  private readonly destroy$         = inject(DestroyRef);
  private readonly searchInput$     = new Subject<string>();

  /* ── Data ───────────────────────────────────────────── */
  warehouses = signal<Warehouse[]>([]);
  errorLoad  = signal<string>('');

  /* ── Modals ─────────────────────────────────────────── */
  showForm     = signal<boolean>(false);
  selectedId   = signal<string | null>(null);
  deletingId   = signal<string | null>(null);
  deletingName = signal<string>('');

  /* ── Context menu ───────────────────────────────────── */
  activeMenu: string | null = null;

  /* ── Filters ────────────────────────────────────────── */
  searchQuery    = signal<string>('');
  selectedStatus = signal<string>('all');
  selectedType   = signal<string>('all');
  selectedCity   = signal<string>('all');

  /* ── Pagination ─────────────────────────────────────── */
  readonly pageSize = 10;
  currentPage       = signal<number>(1);
  totalItems        = signal<number>(0);

  /* ── Lifecycle ──────────────────────────────────────── */

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
  }

  @HostListener('document:click')
  closeMenu() { this.activeMenu = null; }

  /* ── Data loading ───────────────────────────────────── */

  load(): void {
    this.errorLoad.set('');
    const offset = (this.currentPage() - 1) * this.pageSize;

    const isActive = this.selectedStatus() === 'ACTIVE'
      ? true
      : this.selectedStatus() === 'INACTIVE'
        ? false
        : undefined;

    this.warehouseService.getWarehouses({
      limit:         this.pageSize,
      offset,
      search:        this.searchQuery()   || undefined,
      warehouseType: this.selectedType()  !== 'all' ? this.selectedType()  : undefined,
      city:          this.selectedCity()  !== 'all' ? this.selectedCity()  : undefined,
      isActive,
    }).subscribe({
      next:  (res) => { this.warehouses.set(res.data); this.totalItems.set(res.meta.total); },
      error: (err)  => { this.warehouses.set([]); this.errorLoad.set(err.error?.message || 'Error al cargar almacenes'); },
    });
  }

  /* ── Filter handlers ────────────────────────────────── */

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.searchInput$.next(value);
  }

  onStatusChange(value: string): void {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
    this.load();
  }

  onTypeChange(value: string): void {
    this.selectedType.set(value);
    this.currentPage.set(1);
    this.load();
  }

  onCityChange(value: string): void {
    this.selectedCity.set(value);
    this.currentPage.set(1);
    this.load();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.selectedType.set('all');
    this.selectedCity.set('all');
    this.currentPage.set(1);
    this.load();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery()    !== '' ||
           this.selectedStatus() !== 'all' ||
           this.selectedType()   !== 'all' ||
           this.selectedCity()   !== 'all';
  }

  // Solo devuelve la página actual — filtrado por API
  filteredWarehouses = computed(() => this.warehouses());

  // Ciudades únicas de la página actual para el selector
  get cities(): string[] {
    return [...new Set(this.warehouses().map(w => w.city))].sort();
  }

  /* ── Pagination ─────────────────────────────────────── */

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

  /* ── Modal handlers ─────────────────────────────────── */

  openForm()  { this.showForm.set(true);  }
  closeForm() { this.showForm.set(false); this.load(); }

  openDetail(w: Warehouse) { this.selectedId.set(w.id); }
  closeDetail()            { this.selectedId.set(null); }

  openDelete(w: Warehouse) { this.deletingId.set(w.id); this.deletingName.set(w.name); }
  closeDelete()            { this.deletingId.set(null); this.deletingName.set('');     }
  onDeleted()              { this.closeDelete(); this.load();                           }
}