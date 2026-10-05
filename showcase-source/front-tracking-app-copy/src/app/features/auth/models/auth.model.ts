//Logueo
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor';
  avatar?: string;
}


//Regitro / Register
export interface CreateTenantRequest {
  name: string;
  ruc: string;
  schemaName: string;
}

export interface CreateTenantResponse {
  id: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  tenantId: string;
}