import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../../shared/utils/form-util';
import { DriverManagementService } from '../../services/DriverManagementService';
import { Driver } from '../../models/driver-model';

@Component({
  selector: 'app-driver-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-form.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DriverForm {

  isInvalid = isInvalid;

  private readonly fb            = inject(FormBuilder);
  private readonly driverService = inject(DriverManagementService);

  close   = output<void>();
  created = output<void>();

  loading = signal<boolean>(false);
  error   = signal<string>('');

  licenseCategories = ['A-I', 'A-IIa', 'A-IIb', 'A-IIIa', 'A-IIIb', 'A-IIIc', 'B-I', 'B-IIa', 'B-IIb'];
  employmentTypes   = [
    { value: 'INTERNAL',   label: 'Permanente'  },
    { value: 'OUTSOURCED', label: 'Tercerizado' },
  ];
  documentTypes = [
    { value: 'DNI',      label: 'DNI'                   },
    { value: 'CE',       label: 'Carnet de Extranjería' },
    { value: 'PASSPORT', label: 'Pasaporte'              },
  ];

  form = this.fb.group({
    documentType:    ['DNI',     Validators.required],
    documentNumber:  ['',        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    firstName:       ['',        Validators.required],
    lastName:        ['',        Validators.required],
    phone:           ['',        Validators.required],
    licenseCategory: ['A-IIIb',  Validators.required],
    licenseNumber:   ['',        Validators.required],
    employmentType:  ['INTERNAL', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');

    this.driverService.createDriver(this.form.getRawValue() as Partial<Driver>).subscribe({
      next: () => { this.loading.set(false); this.created.emit(); this.close.emit(); },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al registrar conductor');
      },
    });
  }
}