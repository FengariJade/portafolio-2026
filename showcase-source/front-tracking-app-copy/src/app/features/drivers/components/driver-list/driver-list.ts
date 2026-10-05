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
import { DriverForm } from '../driver-form/driver-form';
import { DriverStatusPipe } from '../../../../shared/pipes/driver-status-pipe';
import { Driver } from '../../models/driver-model';
import { DriverManagementService } from '../../services/DriverManagementService';
import { DriverDetailModal } from '../driver-detail-modal/driver-detail-modal';
import { DriverEditModal } from '../driver-edit-modal/driver-edit-modal';
import { DriverDeleteModal } from '../driver-delete-modal/driver-delete-modal';

@Component({
  selector: 'app-driver-list',
  imports: [
    CommonModule,
    DriverForm,
    FormsModule,
    DriverStatusPipe,
    DriverDetailModal,
    DriverEditModal,
    DriverDeleteModal,
  ],
  templateUrl: './driver-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DriverList implements OnInit {

  private readonly driverService = inject(DriverManagementService);
  private readonly destroy$      = inject(DestroyRef);
  private readonly searchInput$  = new Subject<string>();

  /* ── Data ───────────────────────────────────────────────── */
  drivers   = signal<Driver[]>([]);
  errorLoad = signal<string>('');

  /* ── Modals ─────────────────────────────────────────────── */
  showForm           = signal<boolean>(false);
  selectedDriverId   = signal<string | null>(null);
  selectedEditId     = signal<string | null>(null);
  selectedDeleteId   = signal<string | null>(null);
  selectedDeleteName = signal<string>('');
  activeMenu: string | null = null;

  /* ── Filters ────────────────────────────────────────────── */
  searchQuery      = signal<string>('');
  selectedStatus   = signal<string>('all');
  selectedLicense  = signal<string>('all');
  selectedEmployment = signal<string>('all');

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
      this.loadDrivers();
    });

    this.loadDrivers();
  }

  @HostListener('document:click')
  closeMenu() { this.activeMenu = null; }

  /* ── Data loading ───────────────────────────────────────── */

  loadDrivers(): void {
    this.errorLoad.set('');
    const offset = (this.currentPage() - 1) * this.pageSize;

    this.driverService.getDrivers({
      limit:          this.pageSize,
      offset,
      search:         this.searchQuery()        || undefined,
      status:         this.selectedStatus()     !== 'all' ? this.selectedStatus()     : undefined,
      employmentType: this.selectedEmployment() !== 'all' ? this.selectedEmployment() : undefined,
    }).subscribe({
      next: (res) => {
        this.drivers.set(res.data);
        this.totalItems.set(res.meta.total);
      },
      error: (err: any) => {
        this.drivers.set([]);
        this.errorLoad.set(err.error?.message || 'Error al cargar conductores');
      },
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
    this.loadDrivers();
  }

  onLicenseChange(value: string): void {
    this.selectedLicense.set(value);
    this.currentPage.set(1);
    this.loadDrivers();
  }

  onEmploymentChange(value: string): void {
    this.selectedEmployment.set(value);
    this.currentPage.set(1);
    this.loadDrivers();
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('all');
    this.selectedLicense.set('all');
    this.selectedEmployment.set('all');
    this.currentPage.set(1);
    this.loadDrivers();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery()        !== '' ||
           this.selectedStatus()     !== 'all' ||
           this.selectedLicense()    !== 'all' ||
           this.selectedEmployment() !== 'all';
  }

  // Solo devuelve la página actual — filtrado por API
  filteredDrivers = computed(() => this.drivers());

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
    this.loadDrivers();
  }

  /* ── Modal handlers ─────────────────────────────────────── */

  openForm()  { this.showForm.set(true);  }
  closeForm() { this.showForm.set(false); }

  openDetail(driver: Driver) { this.selectedDriverId.set(driver.id); }
  closeDetail()              { this.selectedDriverId.set(null);      }

  openEdit(driver: Driver) { this.selectedEditId.set(driver.id); }
  closeEdit()              { this.selectedEditId.set(null);      }

  openDelete(driver: Driver) {
    this.selectedDeleteId.set(driver.id);
    this.selectedDeleteName.set(`${driver.firstName} ${driver.lastName}`);
  }
  closeDelete() { this.selectedDeleteId.set(null); }

  onDriverCreated(): void { this.loadDrivers(); }
}