import { Component, input, output, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ManagementUserService } from '../../../services/ManagementUserService'


@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-delete-modal.html',
})
export class UserDeleteModal {
  isOpen = input<boolean>(false)
  userId = input<string | null>(null)
  close  = output<void>()
  deleted = output<void>()

  private svc = inject(ManagementUserService)
  loading     = signal(false)
  error       = signal('')

  confirm() {
    const id = this.userId()
    if (!id) return
    this.loading.set(true)
    this.svc.toggleStatus(id, false).subscribe({
      next: () => { this.loading.set(false); this.deleted.emit() },
      error: err => { this.loading.set(false); this.error.set(err?.error?.message ?? 'Error') }
    })
  }
}