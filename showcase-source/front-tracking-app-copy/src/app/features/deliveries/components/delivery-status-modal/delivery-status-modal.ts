import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, output } from '@angular/core';
import { PackageViewModel } from '../delivery-table/delivery-table';
import { ApiPackage, UpdateStatusDto } from '../../models/package.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-status-modal',
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './delivery-status-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DeliveryStatusModal {

  package = input<PackageViewModel | null>(null);
  loading = input<boolean>(false);
  error   = input<string>('');
  close   = output<void>();
  save    = output<UpdateStatusDto>();

  private readonly fb = inject(FormBuilder);

  statusForm = this.fb.group({
    internalStatus: [''],
    trackingStatus: [''],
  });

  constructor() {
    effect(() => {
      const pkg = this.package();
      if (pkg) {
        this.statusForm.patchValue({
          internalStatus: pkg.internalStatus,
          trackingStatus: pkg.trackingStatus,
        });
      }
    });
  }

  onSave(): void {
    const v = this.statusForm.value;
    const dto: UpdateStatusDto = {};
    if (v.internalStatus) dto.internalStatus = v.internalStatus as ApiPackage['internalStatus'];
    if (v.trackingStatus)  dto.trackingStatus  = v.trackingStatus  as ApiPackage['trackingStatus'];
    this.save.emit(dto);
  }
}