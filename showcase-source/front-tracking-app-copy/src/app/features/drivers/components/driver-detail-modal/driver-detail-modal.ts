import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, output, signal } from '@angular/core';
import { Driver } from '../../models/driver-model';
import { DriverManagementService } from '../../services/DriverManagementService';
import { DriverStatusPipe } from '../../../../shared/pipes/driver-status-pipe';

@Component({
  selector: 'app-driver-detail-modal',
  imports: [
    CommonModule,
    DriverStatusPipe
  ],
  templateUrl: './driver-detail-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DriverDetailModal {

  driverId = input.required<string>();
  close    = output<void>();

  driver   = signal<Driver | null>(null);
  loading  = signal<boolean>(true);

  private driverService = inject(DriverManagementService);

  ngOnInit() {
    this.driverService.getDriverById(this.driverId()).subscribe({
      next:  d  => { this.driver.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

}
