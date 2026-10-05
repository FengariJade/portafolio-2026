import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateTenantRequest, LoginRequest, RegisterRequest } from '../../models/auth.model';
import { isInvalid } from '../../../../shared/utils/form-util';
import { AuthenticationService } from '../../../../core/services/AuthenticationService';

type AuthMode = 'login' | 'register-step1' | 'register-step2';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Login {

  isInvalid = isInvalid;

  private fb          = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private router      = inject(Router);

  mode         = signal<AuthMode>('login');
  loading      = false;
  error        = '';
  showPassword = false;
  tenantId     = '';
  animating    = false;

  showTrackingModal = false;
  trackingCode      = '';
  trackingError     = false;

  // Login
  loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Registro paso 1 — Empresa
  tenantForm = this.fb.group({
    name:       ['', Validators.required],
    ruc:        ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    schemaName: ['', [Validators.required, Validators.pattern(/^[a-z0-9_]+$/)]],
  });

  // Registro paso 2 — Admin
  adminForm = this.fb.group({
    email:           ['', [Validators.required, Validators.email]],
    password:        ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  get passwordMismatch(): boolean {
    return this.adminForm.get('password')?.value !==
           this.adminForm.get('confirmPassword')?.value;
  }

  switchMode(target: AuthMode) {
    this.animating = true;
    this.error = '';
    setTimeout(() => {
      this.mode.set(target);
      this.animating = false;
    }, 250);
  }

  // LOGIN
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: () => this.router.navigate(['/packages']),
      error: (err: any) => {
        this.error = err.error?.message || 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }

  // REGISTRO PASO 1
  submitTenant() {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';

    this.authService.createTenant(this.tenantForm.value as CreateTenantRequest).subscribe({
      next: (res: any) => {
        this.tenantId = res.id;
        this.loading = false;
        this.switchMode('register-step2');
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Error al registrar la empresa';
        this.loading = false;
      }
    });
  }

  // REGISTRO PASO 2
  submitAdmin() {
    if (this.adminForm.invalid || this.passwordMismatch) {
      this.adminForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';

    this.authService.register({
      email:    this.adminForm.value.email!,
      password: this.adminForm.value.password!,
      tenantId: this.tenantId,
    } as RegisterRequest).subscribe({
      next: () => {
        this.loading = false;
        this.switchMode('login');
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Error al crear el usuario';
        this.loading = false;
      }
    });
  }

  goToTracking(): void {
    if (!this.trackingCode.trim()) {
      this.trackingError = true;
      return;
    }
    this.trackingError = false;
    this.showTrackingModal = false;
    this.router.navigate(['/track', this.trackingCode.trim()]);
  }

}