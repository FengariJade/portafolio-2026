import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, output, signal } from '@angular/core';
import { DriverManagementService } from '../../services/DriverManagementService';

@Component({
  selector: 'app-driver-delete-modal',
  imports: [
    CommonModule,
  ],
  templateUrl: './driver-delete-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DriverDeleteModal {

  driverId   = input.required<string>();
  driverName = input.required<string>();
  close      = output<void>();
  deleted    = output<void>();

  error = signal<string>('');

  deleting = signal<boolean>(false);

  private driverService = inject(DriverManagementService);

  confirm() {
    this.deleting.set(true);
    this.driverService.deleteDriver(this.driverId()).subscribe({
      next: () => {
        this.deleting.set(false);
        this.deleted.emit();
        this.close.emit();
      },
      error: (err) => {
        this.deleting.set(false);
        this.error.set(err.error?.message || 'Error al eliminar conductor');
      },
    });
  }

}
