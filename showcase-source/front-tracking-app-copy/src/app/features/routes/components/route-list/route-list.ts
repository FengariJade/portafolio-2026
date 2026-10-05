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
import { RouteTrackingService } from '../../services/RouteTrackingService';
import { Route } from '../../models/routes-model';
import { RouteForm } from '../route-form/route-form';
import { RouteDetailModal } from '../route-detail-modal/route-detail-modal';
import { RouteDeleteModal } from '../route-delete-modal/route-delete-modal';
import { WarehouseManagementService } from '../../../warehouses/services/WarehouseManagementService';
import { Warehouse } from '../../../warehouses/models/warehouse-model';
import { RouteStatusPipe } from '../../../../shared/pipes/route-status-pipe';

@Component({
  selector: 'app-route-list',
  imports: [
    CommonModule,
    FormsModule,
    RouteForm,
    RouteDetailModal,
    RouteDeleteModal,
    RouteStatusPipe,
  ],
  templateUrl: './route-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RouteList implements OnInit {

  private readonly routeService  = inject(RouteTrackingService);
  private readonly warehouseSvc  = inject(WarehouseManagementService);
  private readonly destroy$      = inject(DestroyRef);
  private readonly searchInput$  = new Subject<string>();

  /* ── Data ───────────────────────────────────────────────── */
  routes     = signal<Route[]>([]);
  warehouses = signal<Warehouse[]>([]);
  errorLoad  = signal<string>('');

  /* ── Modals ─────────────────────────────────────────────── */
  showForm     = signal<boolean>(false);
  selectedId   = signal<string | null>(null);
  deletingId   = signal<string | null>(null);
  deletingName = signal<string>('');
  activeMenu: string | null = null;

  /* ── Filters ────────────────────────────────────────────── */
  searchQuery    = signal<string>('');
  selectedStatus = signal<string>('all');

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
      this.load();
    });

    this.load();

    // Carga warehouses para resolver nombres en la tabla
    this.warehouseSvc.getWarehouses({ limit: 200, offset: 0 })
      .subscribe(res => this.warehouses.set(res.data));
  }

  @HostListener('document:click')
  closeMenu() { this.activeMenu = null; }

  /* ── Data loading ───────────────────────────────────────── */

  load(): void {
    this.errorLoad.set('');
    const offset = (this.currentPage() - 1) * this.pageSize;

    this.routeService.getRoutes({
      limit:  this.pageSize,
      offset,
      search: this.searchQuery()    || undefined,
      status: this.selectedStatus() !== 'all' ? this.selectedStatus() : undefined,
    }).subscribe({
      next:  (res) => { this.routes.set(res.data); this.totalItems.set(res.meta.total); },
      error: (err)  => { this.routes.set([]); this.errorLoad.set(err.error?.message || 'Error al cargar rutas'); },
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

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.currentPage.set(1);
    this.load();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery() !== '' || this.selectedStatus() !== 'all';
  }

  // Solo devuelve la página actual — filtrado por API
  filteredRoutes = computed(() => this.routes());

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

  /* ── Warehouse helpers ──────────────────────────────────── */

  warehouseName(id: string): string {
    return this.warehouses().find(w => w.id === id)?.name ?? '—';
  }

  warehouseCity(id: string): string {
    return this.warehouses().find(w => w.id === id)?.city ?? '';
  }

  /* ── Modal handlers ─────────────────────────────────────── */

  openForm()  { this.showForm.set(true);  }
  closeForm() { this.showForm.set(false); this.load(); }

  openDetail(r: Route)  { this.selectedId.set(r.id);  }
  closeDetail()         { this.selectedId.set(null);  }

  openDelete(r: Route) { this.deletingId.set(r.id); this.deletingName.set(r.name); }
  closeDelete()        { this.deletingId.set(null);  this.deletingName.set('');    }
  onDeleted()          { this.closeDelete(); this.load();                           }
}