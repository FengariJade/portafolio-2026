import { Component, input, output, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ManagementUserService } from '../../../services/ManagementUserService'
import { USER_ROLE_LABELS, UserRole } from '../../../models/users-modal'
import { WarehouseManagementService } from '../../../../warehouses/services/WarehouseManagementService'
import { Warehouse } from '../../../../warehouses/models/warehouse-model'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-form.html',
})
export class UserForm {
  isOpen  = input<boolean>(false)
  close   = output<void>()
  created = output<void>()

  private svc = inject(ManagementUserService)
  private warehouseSvc = inject(WarehouseManagementService)

  warehouses = signal<Warehouse[]>([])

  loading    = signal(false)
  error      = signal('')
  roleLabels = USER_ROLE_LABELS
  roleKeys   = Object.keys(USER_ROLE_LABELS) as UserRole[]

  form = signal({
    firstName: '', lastName: '', email: '', password: '',
    confirmPassword: '', role: 'OPERATOR' as UserRole,
    phone: '', position: '', warehouseId: ''
  })

  ngOnInit() {
    this.warehouseSvc.getWarehouses({ limit: 100 }).subscribe(res => {
      this.warehouses.set(res.data ?? res)
    })
  }

  set(field: string, value: string) {
    this.form.update(f => ({ ...f, [field]: value }))
  }

  submit() {
    const f = this.form()
    if (!f.firstName || !f.email || !f.password) {
      this.error.set('Nombre, email y contraseña son obligatorios')
      return
    }
    if (f.password !== f.confirmPassword) {
      this.error.set('Las contraseñas no coinciden')
      return
    }
    this.loading.set(true)
    this.error.set('')
    this.svc.create({
      firstName:   f.firstName,
      lastName:    f.lastName,
      email:       f.email,
      password:    f.password,
      role:        f.role,
      phone:       f.phone   || undefined,
      position:    f.position || undefined,
      warehouseId: f.warehouseId || undefined,
    }).subscribe({
      next: () => {
        this.loading.set(false)
        this.form.set({
          firstName: '', lastName: '', email: '', password: '',
          confirmPassword: '', role: 'OPERATOR', phone: '', position: '', warehouseId: ''
        })
        this.created.emit()
      },
      error: err => {
        this.loading.set(false)
        this.error.set(err?.error?.message ?? 'Error al crear el usuario')
      }
    })
  }
}