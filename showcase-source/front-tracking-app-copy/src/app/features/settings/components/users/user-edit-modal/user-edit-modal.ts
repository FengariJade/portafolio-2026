import { Component, input, output, signal, inject, effect, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ManagementUserService } from '../../../services/ManagementUserService'
import { USER_ROLE_LABELS, UserRole } from '../../../models/users-modal'
import { WarehouseManagementService } from '../../../../warehouses/services/WarehouseManagementService'
import { Warehouse } from '../../../../warehouses/models/warehouse-model'


@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-edit-modal.html',
})
export class UserEditModal {
  isOpen = input<boolean>(false)
  userId = input<string | null>(null)
  close  = output<void>()
  updated = output<void>()

  private svc = inject(ManagementUserService)
  private warehouseSvc = inject(WarehouseManagementService)

  loading    = signal(false)
  error      = signal('')
  roleLabels = USER_ROLE_LABELS
  roleKeys   = Object.keys(USER_ROLE_LABELS) as UserRole[]
  warehouses = signal<Warehouse[]>([])
  userRole = signal<string>('')

  form = signal({
    firstName: '', lastName: '',
    phone: '', position: '', warehouseId: ''
  })

  ngOnInit() {
    this.warehouseSvc.getWarehouses({ limit: 100 }).subscribe(res => {
      this.warehouses.set(res.data ?? res)
    })
  }

  constructor() {
    effect(() => {
      const id = this.userId()
      if (id) this.svc.getById(id).subscribe(u => {
        this.userRole.set(u.role)
        this.form.set({
          firstName:   u.firstName,
          lastName:    u.lastName,
          phone:       u.phone     ?? '',
          position:    u.position  ?? '',
          warehouseId: u.warehouseId ?? '',
        })
      })
    })
  }

  submit() {
    const f = this.form()
    if (!f.firstName) {
      this.error.set('El nombre es obligatorio')
      return
    }
    this.loading.set(true)
    this.error.set('')
    this.svc.update(this.userId()!, {
      firstName:   f.firstName,
      lastName:    f.lastName,
      phone:       f.phone     || undefined,
      position:    f.position  || undefined,
      warehouseId: f.warehouseId || undefined,
    }).subscribe({
      next:  () => { this.loading.set(false); this.updated.emit() },
      error: err => { this.loading.set(false); this.error.set(err?.error?.message ?? 'Error') }
    })
  }

  set(field: string, value: string) {
    this.form.update(f => ({ ...f, [field]: value }))
  }

}