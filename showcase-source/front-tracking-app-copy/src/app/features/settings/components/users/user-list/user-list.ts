import { Component, OnInit, signal, computed, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UserForm } from '../user-form/user-form'
import { UserEditModal } from '../user-edit-modal/user-edit-modal'
import { UserDeleteModal } from '../user-delete-modal/user-delete-modal'
import { ManagementUserService } from '../../../services/ManagementUserService'
import { User, USER_ROLE_COLORS, USER_ROLE_LABELS, UserRole } from '../../../models/users-modal'
import { WarehouseManagementService } from '../../../../warehouses/services/WarehouseManagementService'
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UserForm, 
    UserEditModal, 
    UserDeleteModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {

  private svc = inject(ManagementUserService)
  private warehouseSvc = inject(WarehouseManagementService)

  items   = signal<User[]>([])
  loading = signal(false)
  error   = signal('')
  searchQuery = signal('')
  filterRole  = signal('')

  showForm = signal(false)
  editId   = signal<string | null>(null)
  deleteId = signal<string | null>(null)

  readonly roleLabels   = USER_ROLE_LABELS
  readonly roleColors   = USER_ROLE_COLORS
  readonly roleKeys     = Object.keys(USER_ROLE_LABELS) as UserRole[]

  filtered = computed(() => {
    let list = this.items()
    const q  = this.searchQuery().toLowerCase()
    if (q) list = list.filter(u =>
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q)  ||
      u.email.toLowerCase().includes(q)
    )
    if (this.filterRole()) list = list.filter(u => u.role === this.filterRole())
    return list
  })


  ngOnInit() { this.load() }

  load() {
    this.loading.set(true)
    this.error.set('')
    
    forkJoin({
      users:      this.svc.getAll(),
      warehouses: this.warehouseSvc.getWarehouses({ limit: 100 })
    }).subscribe({
      next: ({ users, warehouses }) => {
        const warehouseMap = new Map(
          warehouses.data.map((w: any) => [w.id, w.name])
        )
        const enriched = users.map(u => ({
          ...u,
          warehouseName: u.warehouseId
            ? (warehouseMap.get(u.warehouseId) ?? '—')
            : '—'
        }))
        this.items.set(enriched)
        this.loading.set(false)
      },
      error: err => {
        this.loading.set(false)
        this.error.set(err?.error?.message ?? 'Error al cargar usuarios')
      }
    })
  }

  toggleStatus(user: User) {
    this.svc.toggleStatus(user.id, !user.isActive).subscribe({
      next: () => this.load()
    })
  }

  fullName(user: User): string {
    return `${user.firstName} ${user.lastName}`.trim() || user.email
  }

  onCreated() { this.showForm.set(false); this.load() }
  onUpdated() { this.editId.set(null);   this.load() }
  onDeleted() { this.deleteId.set(null); this.load() }
}