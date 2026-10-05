import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { WarehouseManagementService } from '../../services/WarehouseManagementService';

@Component({
  selector: 'app-warehouse-delete-modal',
  imports: [
    CommonModule,
  ],
  templateUrl: './warehouse-delete-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WarehouseDeleteModal {

  @Input() warehouseId!:   string;
  @Input() warehouseName!: string;
  @Output() close   = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  private readonly svc = inject(WarehouseManagementService);
  loading = signal<boolean>(false);
  error   = signal<string>('');

  confirm(): void {
    this.loading.set(true);
    this.error.set('');
    this.svc.deleteWarehouse(this.warehouseId).subscribe({
      next:  () => { this.loading.set(false); this.deleted.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al eliminar'); this.loading.set(false); },
    });
  }

}
