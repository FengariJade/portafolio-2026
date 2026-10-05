import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '../../core/services/AuthenticationService';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Navbar {

  private router = inject(Router);
  private auth = inject(AuthenticationService);

  menuToggle = output<void>();

  showUserMenu = false;

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.getTitleFromUrl(this.router.url))
    ),
    { initialValue: this.getTitleFromUrl(this.router.url) }
  );

  private getTitleFromUrl(url: string): string {
    const titles: Record<string, string> = {
      '/dashboard':   'Dashboard',
      '/packages':    'Paquetes',
      '/trucks':      'Camiones',
      '/drivers':     'Conductores',
      '/deliveries':  'Entregas',
      '/tracking':    'Tracking en vivo',
      '/settings':    'Configuración',
      '/notifications': 'Notificaciones',
    };
    return titles[url] ?? 'Flotex';
  }

  logout() {
    this.auth.logout();
  }

}
