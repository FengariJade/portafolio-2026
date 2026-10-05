import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, output, signal } from '@angular/core';
import { isInvalid } from '../../../../shared/utils/form-util';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverManagementService } from '../../services/DriverManagementService';
import { Driver } from '../../models/driver-model';

@Component({
  selector: 'app-driver-edit-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './driver-edit-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DriverEditModal {


  driverId = input.required<string>();
  close    = output<void>();
  updated  = output<void>();

  isInvalid = isInvalid;
  loading   = signal<boolean>(true);
  saving    = signal<boolean>(false);
  error = signal<string>('');

  private fb            = inject(FormBuilder);
  private driverService = inject(DriverManagementService);

  licenseCategories = ['A-I', 'A-IIa', 'A-IIb', 'A-IIIa', 'A-IIIb', 'A-IIIc', 'B-I', 'B-IIa', 'B-IIb'];
  employmentTypes   = [
    { value: 'INTERNAL',   label: 'Permanente'  },
    { value: 'OUTSOURCED', label: 'Tercerizado' },
  ];
  documentTypes = [
    { value: 'DNI',      label: 'DNI'                  },
    { value: 'CE',       label: 'Carnet de Extranjería' },
    { value: 'PASSPORT', label: 'Pasaporte'             },
  ];
  statusTypes = [
    { value: 'AVAILABLE', label: 'Disponible' },
    { value: 'ON_ROUTE',  label: 'En ruta'    },
    { value: 'OFF_DUTY',  label: 'Inactivo'   },
  ];

  form = this.fb.group({
    firstName:       ['', Validators.required],
    lastName:        ['', Validators.required],
    documentType:    ['DNI', Validators.required],
    documentNumber:  ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    phone:           ['', Validators.required],
    licenseCategory: ['A-IIIb', Validators.required],
    licenseNumber:   ['', Validators.required],
    employmentType:  ['INTERNAL', Validators.required],
    status:          ['AVAILABLE', Validators.required],
  });

  ngOnInit() {
    this.driverService.getDriverById(this.driverId()).subscribe({
      next: (driver: Driver) => {
        this.form.patchValue({
          firstName:       driver.firstName,
          lastName:        driver.lastName,
          documentType:    driver.documentType,
          documentNumber:  driver.documentNumber,
          phone:           driver.phone,
          licenseCategory: driver.licenseCategory,
          licenseNumber:   driver.licenseNumber,
          employmentType:  driver.employmentType,
          status:          driver.status,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.driverService.updateDriver(this.driverId(), this.form.getRawValue() as Partial<Driver>).subscribe({
      next: () => {
        this.saving.set(false);
        this.updated.emit();
        this.close.emit();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message || 'Error al actualizar conductor');
      },
    });
  }

}
