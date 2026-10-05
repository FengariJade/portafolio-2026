import { Component, OnInit, signal, computed, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PermissionService } from '../../../services/permissionService'
import { MODULE_ICONS, MODULE_LABELS, Permission, PermissionModule, PermissionRole } from '../../../models/permission.model'


@Component({
  selector: 'app-permission-matrix',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './permission-matrix.html',
})
export class PermissionMatrix implements OnInit {

  private svc = inject(PermissionService)

  permissions  = signal<Permission[]>([])
  loading      = signal(false)
  saving       = signal(false)
  error        = signal('')
  successMsg   = signal('')

  readonly moduleLabels = MODULE_LABELS
  readonly moduleIcons  = MODULE_ICONS
  readonly roles: PermissionRole[]   = ['ADMIN', 'OPERATOR']
  readonly modules: PermissionModule[] = [
    'packages', 'manifests', 'fleet', 'routes',
    'warehouses', 'tracking', 'users', 'unload_sessions'
  ]
  readonly actions: { key: keyof Permission; label: string }[] = [
    { key: 'canCreate', label: 'C' },
    { key: 'canRead',   label: 'R' },
    { key: 'canUpdate', label: 'U' },
    { key: 'canDelete', label: 'D' },
  ]

  ngOnInit() { this.load() }

  load() {
    this.loading.set(true)
    this.error.set('')
    this.svc.getAll().subscribe({
      next: data => { this.permissions.set(data); this.loading.set(false) },
      error: err  => { this.loading.set(false); this.error.set(err?.error?.message ?? 'Error al cargar permisos') }
    })
  }

  getPermission(role: PermissionRole, module: PermissionModule): Permission | undefined {
    return this.permissions().find(p => p.role === role && p.module === module)
  }

  toggle(role: PermissionRole, module: PermissionModule, action: keyof Permission) {
    this.permissions.update(perms => perms.map(p =>
      p.role === role && p.module === module
        ? { ...p, [action]: !p[action] }
        : p
    ))
  }

  save() {
    this.saving.set(true)
    this.error.set('')
    this.successMsg.set('')
    const dto = {
      permissions: this.permissions().map(({ id, ...rest }) => rest)
    }
    this.svc.update(dto).subscribe({
      next: () => {
        this.saving.set(false)
        this.successMsg.set('Permisos actualizados correctamente')
        setTimeout(() => this.successMsg.set(''), 3000)
      },
      error: err => {
        this.saving.set(false)
        this.error.set(err?.error?.message ?? 'Error al guardar permisos')
      }
    })
  }

  isAdminModule(role: PermissionRole, module: PermissionModule, action: keyof Permission): boolean {
    return role === 'ADMIN'
  }
}