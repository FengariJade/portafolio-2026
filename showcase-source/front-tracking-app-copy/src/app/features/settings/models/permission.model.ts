export type PermissionRole   = 'ADMIN' | 'OPERATOR'
export type PermissionModule = 
  | 'packages'
  | 'manifests'
  | 'fleet'
  | 'routes'
  | 'warehouses'
  | 'tracking'
  | 'users'
  | 'unload_sessions'

export interface Permission {
  id:        string
  role:      PermissionRole
  module:    PermissionModule
  canCreate: boolean
  canRead:   boolean
  canUpdate: boolean
  canDelete: boolean
}

export interface UpdatePermissionsDto {
  permissions: Omit<Permission, 'id'>[]
}

export const MODULE_LABELS: Record<PermissionModule, string> = {
  packages:        'Paquetes',
  manifests:       'Manifiestos',
  fleet:           'Camiones',
  routes:          'Rutas',
  warehouses:      'Almacenes',
  tracking:        'Tracking',
  users:           'Usuarios',
  unload_sessions: 'Descarga',
}

export const MODULE_ICONS: Record<PermissionModule, string> = {
  packages:        'mynaui:package-solid',
  manifests:       'mdi:file-document-multiple-outline',
  fleet:           'mdi:truck',
  routes:          'mdi:routes',
  warehouses:      'mdi:warehouse',
  tracking:        'mdi:map-marker-path',
  users:           'mdi:account-multiple',
  unload_sessions: 'mdi:package-down',
}