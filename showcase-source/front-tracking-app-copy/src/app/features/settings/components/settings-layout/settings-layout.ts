import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  template: `
    <div class="p-6 pt-40 flex flex-col gap-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Configuración</h2>
        <p class="text-sm text-gray-400 mt-0.5">Administra usuarios y permisos del sistema</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <a routerLink="users" routerLinkActive="bg-white text-violet-600 shadow-sm"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-500 hover:text-gray-700 flex items-center gap-2">
          <iconify-icon icon="mdi:account-multiple"></iconify-icon>
          Usuarios
        </a>
        <a routerLink="permissions" routerLinkActive="bg-white text-violet-600 shadow-sm"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-500 hover:text-gray-700 flex items-center gap-2">
          <iconify-icon icon="mdi:shield-lock-outline"></iconify-icon>
          Permisos
        </a>
      </div>

      <router-outlet />
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsLayout {}