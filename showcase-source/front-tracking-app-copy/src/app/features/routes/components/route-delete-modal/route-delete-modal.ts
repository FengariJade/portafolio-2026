import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteTrackingService } from '../../services/RouteTrackingService';

@Component({
  selector: 'app-route-delete-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './route-delete-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RouteDeleteModal {

  @Input()  routeId!:   string;
  @Input()  routeName!: string;
  @Output() close   = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  private readonly svc = inject(RouteTrackingService);
  loading = signal<boolean>(false);
  error   = signal<string>('');

  confirm(): void {
    this.loading.set(true);
    this.svc.deleteRoute(this.routeId).subscribe({
      next:  () => { this.loading.set(false); this.deleted.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al eliminar'); this.loading.set(false); },
    });
  }

}
