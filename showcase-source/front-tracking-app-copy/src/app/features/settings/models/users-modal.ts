export type UserRole   = 'ADMIN' | 'OPERATOR'
export type UserStatus = 'ACTIVE' | 'INACTIVE'

export interface User {
  id:           string
  email:        string
  firstName:    string
  lastName:     string
  phone?:       string | null
  position?:    string | null
  role:         UserRole
  isActive:     boolean
  warehouseId?: string
  warehouseName?: string
  createdAt:    string
  lastLoginAt?: string
}

export interface CreateUserDto {
  email:       string
  password:    string
  role:        UserRole
  firstName:   string
  lastName:    string
  phone?:      string
  position?:   string
  warehouseId?: string
}

export interface UpdateUserDto {
  firstName?:   string
  lastName?:    string
  phone?:       string
  position?:    string
  warehouseId?: string
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN:    'Administrador',
  OPERATOR: 'Operador',
}

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  ADMIN:    'bg-violet-100 text-violet-700',
  OPERATOR: 'bg-blue-100 text-blue-700',
}