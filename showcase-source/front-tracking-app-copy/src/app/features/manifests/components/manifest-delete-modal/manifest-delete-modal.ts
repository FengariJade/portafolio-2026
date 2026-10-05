import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManifestService } from '../../services/ManifestService';

@Component({
  selector: 'app-manifest-delete-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manifest-delete-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManifestDeleteModal {

  @Input()  manifestId!:   string;
  @Input()  manifestCode!: string;
  @Output() close   = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  private readonly svc = inject(ManifestService);
  loading = signal<boolean>(false);
  error   = signal<string>('');

  confirm(): void {
    this.loading.set(true);
    this.svc.deleteManifest(this.manifestId).subscribe({
      next:  () => { this.loading.set(false); this.deleted.emit(); },
      error: (err) => { this.error.set(err.error?.message || 'Error al eliminar'); this.loading.set(false); },
    });
  }

}
