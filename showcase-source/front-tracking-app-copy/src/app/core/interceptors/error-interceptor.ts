import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth   = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 401:
          // Token expirado o inválido — cierra sesión y redirige
          auth.logout();
          break;

        case 403:
          // Sin permisos
          router.navigate(['/dashboard']);
          break;

        case 0:
          // Sin conexión al servidor
          console.error('Sin conexión al servidor');
          break;
      }

      return throwError(() => error);
    })
  );
};
