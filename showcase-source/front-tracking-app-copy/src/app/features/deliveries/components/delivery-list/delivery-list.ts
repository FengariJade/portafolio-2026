import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PackageQueryService } from '../../services/PackageQueryService';
import { ApiPackage, UpdatePackageDto, UpdateStatusDto } from '../../models/package.model';
import { isInvalid } from '../../../../shared/utils/form-util';
import { DeliveryFilter } from '../delivery-filter/delivery-filter';
import { DeliveryTable } from '../delivery-table/delivery-table';
import { DeliveryDetailModal } from '../delivery-detail-modal/delivery-detail-modal';
import { DeliveryEditModal } from '../delivery-edit-modal/delivery-edit-modal';
import { DeliveryDeleteModal } from '../delivery-delete-modal/delivery-delete-modal';
import { DeliveryStatusModal } from '../delivery-status-modal/delivery-status-modal';

type PackageViewModel = ApiPackage & {
  origin:      string;
  destination: string;
  weight:      number;
  width:       number;
  height:      number;
  length:      number;
};

type EditFormField = 'notes' | 'pickupName' | 'pickupDocumentType' | 'pickupDocumentNumber';

@Component({
  selector: 'app-delivery-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeliveryFilter,
    DeliveryTable,
    DeliveryDetailModal,
    DeliveryEditModal,
    DeliveryDeleteModal,
    DeliveryStatusModal,
  ],
  templateUrl: './delivery-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DeliveryList implements OnInit {

  isInvalid = isInvalid;

  private readonly deliveriesSvc  = inject(PackageQueryService);
  private readonly destroy$       = inject(DestroyRef);
  private readonly searchInput$   = new Subject<string>();

  /* ── Data ───────────────────────────────────────────────── */
  packages        = signal<PackageViewModel[]>([]);

  /* ── Modals ─────────────────────────────────────────────── */
  selectedPackage  = signal<PackageViewModel | null>(null);
  editingPackage   = signal<PackageViewModel | null>(null);
  deletingPackage  = signal<PackageViewModel | null>(null);
  statusPackage    = signal<PackageViewModel | null>(null);
  isDetailOpen     = signal<boolean>(false);

  /* ── Loading & errors ───────────────────────────────────── */
  loadingEdit   = signal<boolean>(false);
  loadingStatus = signal<boolean>(false);
  loadingDetail = signal<boolean>(false);
  errorEdit     = signal<string>('');
  errorDelete   = signal<string>('');
  errorStatus   = signal<string>('');
  errorLoad     = signal<string>('');
  errorDetail   = signal<string>('');

  /* ── Filters ────────────────────────────────────────────── */
  searchQuery    = signal<string>('');
  selectedStatus = signal<string>('all');

  /* ── Context menu ───────────────────────────────────────── */
  openMenuId = signal<string | null>(null);

  /* ── Pagination ─────────────────────────────────────────── */
  readonly pageSize = 10;
  currentPage       = signal<number>(1);
  totalItems        = signal<number>(0);

  /* ── Lifecycle ──────────────────────────────────────────── */

  ngOnInit(): void {
    // Debounce 400ms para search — evita llamadas en cada tecla
    this.searchInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroy$),
    ).subscribe(() => {
      this.currentPage.set(1);
      this.loadPackages();
    });

    this.loadPackages();
  }

  /* ── Data loading ───────────────────────────────────────── */

  loadPackages(): void {
    this.errorLoad.set('');
    const offset = (this.currentPage() - 1) * this.pageSize;

    this.deliveriesSvc.getPackages({
      limit:          this.pageSize,
      offset,
      search:         this.searchQuery()    || undefined,
      trackingStatus: this.selectedStatus() !== 'all' ? this.selectedStatus() : undefined,
    }).subscribe({
      next: (res) => {
        this.packages.set(res.data.map(p => this.toViewModel(p)));
        this.totalItems.set(res.meta.total);
      },
      error: (err: any) => {
        this.packages.set([]);
        this.errorLoad.set(err.error?.message || 'Error al cargar los paquetes');
      },
    });
  }

  private toViewModel(pkg: ApiPackage): PackageViewModel {
    return {
      ...pkg,
      origin:      pkg.senderAddress   ? this.extractCity(pkg.senderAddress)   : '—',
      destination: pkg.receiverAddress ? this.extractCity(pkg.receiverAddress) : '—',
      weight:      Number(pkg.weightKg)  || 0,
      width:       Number(pkg.widthCm)   || 0,
      height:      Number(pkg.heightCm)  || 0,
      length:      Number(pkg.lengthCm)  || 0,
    };
  }

  private extractCity(address: string): string {
    if (!address) return '';
    const parts = address.split(',');
    return parts[parts.length - 1].trim();
  }

  /* ── Filters ────────────────────────────────────────────── */

  // Solo devuelve la página actual — el filtrado lo hace la API
  filteredPackages = computed(() => this.packages());

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.searchInput$.next(value);
  }

  onStatusChange(value: string): void {
    this.selectedStatus.set(value);
    this.currentPage.set(1);
    this.loadPackages();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.currentPage.set(1);
    this.loadPackages();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery() !== '' || this.selectedStatus() !== 'all';
  }

  /* ── Pagination ─────────────────────────────────────────── */

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize);
  }

  get pages(): number[] {
    const total   = this.totalPages;
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4)          return [1, 2, 3, 4, 5, 0, total];
    if (current >= total - 3)  return [1, 0, total-4, total-3, total-2, total-1, total];
    return [1, 0, current-1, current, current+1, 0, total];
  }

  get showingTo(): number {
    return Math.min(this.currentPage() * this.pageSize, this.totalItems());
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage()) return;
    this.currentPage.set(page);
    this.loadPackages();
  }

  /* ── Detail modal ───────────────────────────────────────── */

  openDetail(pkg: PackageViewModel): void {
    this.loadingDetail.set(true);
    this.errorDetail.set('');

    this.deliveriesSvc.getPackageById(pkg.id).subscribe({
      next: (res: ApiPackage) => {
        this.selectedPackage.set(this.toViewModel(res));
        this.loadingDetail.set(false);
      },
      error: (err: any) => {
        this.errorDetail.set(err.error?.message || 'Error al cargar el detalle');
        this.loadingDetail.set(false);
      },
    });
  }

  closeDetail(): void {
    this.selectedPackage.set(null);
  }

  /* ── Edit modal ─────────────────────────────────────────── */

  openEdit(pkg: PackageViewModel): void {
    this.errorEdit.set('');
    this.loadingEdit.set(true);

    this.deliveriesSvc.getPackageById(pkg.id).subscribe({
      next: (res: ApiPackage) => {
        this.editingPackage.set(this.toViewModel(res));
        this.loadingEdit.set(false);
      },
      error: (err: any) => {
        this.errorEdit.set(err.error?.message || 'Error al cargar el paquete');
        this.loadingEdit.set(false);
      },
    });
  }

  closeEdit(): void {
    this.editingPackage.set(null);
  }

  submitEdit(dto: UpdatePackageDto): void {
    const pkg = this.editingPackage();
    if (!pkg) return;

    this.loadingEdit.set(true);
    this.errorEdit.set('');

    this.deliveriesSvc.updatePackage(pkg.id, dto).subscribe({
      next: () => {
        this.loadingEdit.set(false);
        this.closeEdit();
        this.loadPackages();
      },
      error: (err: any) => {
        this.errorEdit.set(err.error?.message ?? 'Error al actualizar');
        this.loadingEdit.set(false);
      },
    });
  }

  /* ── Delete modal ───────────────────────────────────────── */

  openDeleteConfirm(pkg: PackageViewModel): void {
    this.deletingPackage.set(pkg);
    this.errorDelete.set('');
  }

  closeDeleteConfirm(): void {
    this.deletingPackage.set(null);
  }

  confirmDelete(): void {
    const pkg = this.deletingPackage();
    if (!pkg) return;

    this.deliveriesSvc.deletePackage(pkg.id).subscribe({
      next: () => {
        this.closeDeleteConfirm();
        this.loadPackages();
      },
      error: (err: any) => {
        this.errorDelete.set(err.error?.message || 'Error al eliminar el paquete');
        this.closeDeleteConfirm();
      },
    });
  }

  /* ── Status modal ───────────────────────────────────────── */

  openStatusModal(pkg: PackageViewModel): void {
    this.statusPackage.set(pkg);
    this.errorStatus.set('');
  }

  closeStatusModal(): void {
    this.statusPackage.set(null);
  }

  submitStatus(dto: UpdateStatusDto): void {
    const pkg = this.statusPackage();
    if (!pkg) return;

    this.loadingStatus.set(true);
    this.errorStatus.set('');

    this.deliveriesSvc.updateStatus(pkg.id, dto).subscribe({
      next: () => {
        this.loadingStatus.set(false);
        this.closeStatusModal();
        this.loadPackages();
      },
      error: (err: any) => {
        this.errorStatus.set(err.error?.message || 'Error al cambiar el estado');
        this.loadingStatus.set(false);
      },
    });
  }

  /* ── Context menu ───────────────────────────────────────── */

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openMenuId.set(this.openMenuId() === id ? null : id);
  }

  closeMenu(): void {
    this.openMenuId.set(null);
  }
}