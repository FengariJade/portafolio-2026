import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, CreateTenantRequest, CreateTenantResponse, LoginRequest, RegisterRequest, User } from '../../features/auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  private http   = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly TOKEN_KEY = 'auth_token';

  currentUser     = signal<User | null>(null);
  isAuthenticated = signal<boolean>(this.hasToken());

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(credentials: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (this.isBrowser()) {
            localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          }
          this.isAuthenticated.set(true);
        })
      );
  }

  createTenant(data: CreateTenantRequest) {
    return this.http.post<CreateTenantResponse>(
      `${environment.apiUrl}/admin/tenants`, data
    );
  }

  register(data: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Verifica si el token JWT almacenado está expirado.
   *
   * Supuestos:
   * - El token tiene formato JWT estándar: header.payload.signature.
   * - El payload está codificado en Base64.
   * - El payload contiene la propiedad "exp" (timestamp en segundos).
   *
   * Si el token es inválido, está mal formado o no contiene "exp",
   * se considera expirado por seguridad.
   */
  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const parts = token.split('.');

      // Se espera un JWT con 3 segmentos
      if (parts.length !== 3) return true;

      const payload = JSON.parse(atob(parts[1]));

      // Se espera que el payload contenga "exp"
      if (!payload?.exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      // Si el token no puede decodificarse, se considera inválido/expirado
      return true;
    }
  }

  private hasToken(): boolean {
    if (!this.isBrowser()) return false;
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;
    if (this.isTokenExpired()) {
      localStorage.removeItem(this.TOKEN_KEY);
      return false;
    }
    return true;
  }

}
