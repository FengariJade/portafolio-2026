import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PackageViewModel } from '../delivery-table/delivery-table';
import { UpdatePackageDto } from '../../models/package.model';
import { StatusLabelPipe } from '../../../../shared/pipes/status-label-pipe';

@Component({
  selector: 'app-delivery-edit-modal',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    StatusLabelPipe
  ],
  templateUrl: './delivery-edit-modal.html',
})
export class DeliveryEditModal {

  package = input<PackageViewModel | null>(null);
  loading = input<boolean>(false);
  error   = input<string>('');
  close   = output<void>();
  save    = output<UpdatePackageDto>();

  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    notes:                [''],
    pickupName:           [''],
    pickupDocumentType:   [''],
    pickupDocumentNumber: [''],
  });

  constructor() {
    effect(() => {
      const pkg = this.package();
      if (pkg) {
        this.editForm.patchValue({
          notes:                pkg.notes                ?? '',
          pickupName:           pkg.pickupName           ?? '',
          pickupDocumentType:   pkg.pickupDocumentType   ?? '',
          pickupDocumentNumber: pkg.pickupDocumentNumber ?? '',
        });
      }
    });
  }

  onSave(): void {
    const v = this.editForm.value;
    this.save.emit({
      notes:                v.notes                ?? '',
      pickupName:           v.pickupName           ?? '',
      pickupDocumentType:   v.pickupDocumentType   ?? '',
      pickupDocumentNumber: v.pickupDocumentNumber ?? '',
    });
  }
}