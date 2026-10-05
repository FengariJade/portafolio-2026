import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Warehouse } from '../../models/warehouse-model';
import { WarehouseManagementService } from '../../services/WarehouseManagementService';
import { WarehouseTypePipe } from '../../../../shared/pipes/warehouse-status-pipe';

@Component({
  selector: 'app-warehouse-detail-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WarehouseTypePipe,
  ],
  templateUrl: './warehouse-detail-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WarehouseDetailModal {

  @Input()  warehouseId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly warehouseService = inject(WarehouseManagementService);

  w       = signal<Warehouse | null>(null);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.warehouseService.getWarehouseById(this.warehouseId).subscribe({
      next:  (res) => { this.w.set(res); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

}
