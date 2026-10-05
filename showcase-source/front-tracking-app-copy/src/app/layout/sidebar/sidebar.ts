import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, output, signal } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NavItem } from './sidebar-model'

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sidebar {

  isExpanded    = signal<boolean>(true)
  expandedChange = output<boolean>()

  openMenus = signal<Set<string>>(new Set())

  navItems: NavItem[] = [
    { label: 'Paquetes',    icon: 'mynaui:package-solid',                    route: '/packages'         },
    { label: 'Camiones',    icon: 'mdi:truck',                               route: '/trucks'           },
    { label: 'Conductores', icon: 'mdi:account-group',                      route: '/drivers'          },
    { label: 'Entregas',    icon: 'mdi:package-variant',                    route: '/deliveries'       },
    { label: 'Rutas',       icon: 'mdi:routes',                             route: '/routes'           },
    { label: 'Almacenes',   icon: 'mdi:warehouse',                          route: '/warehouses'       },
    { label: 'Manifiestos', icon: 'mdi:file-document-multiple-outline',     route: '/manifests'        },
    { label: 'Descarga',    icon: 'mdi:package-down',                       route: '/warehouse-unload' },
  ]

  bottomItems: NavItem[] = [
    {
      label: 'Configuración',
      icon:  'basil:settings-solid',
      children: [
        { label: 'Usuarios', icon: 'mdi:account-multiple', route: '/settings/users' },
      ]
    },
  ]

  toggle() {
    this.isExpanded.update(v => !v)
    this.expandedChange.emit(this.isExpanded())
  }

  toggleMenu(label: string) {
    this.openMenus.update(set => {
      const next = new Set(set)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  isOpen(label: string): boolean {
    return this.openMenus().has(label)
  }
}