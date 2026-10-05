import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoaderComponent } from '@layouts/loader/loader.component';
import { AloSatService } from '@services/alo-sat.service';
import { Theme } from '@services/theme';
import { AuthStore } from '@stores/auth.store';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    ConfirmDialog,
    ToastModule,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'SAT';

  private readonly authStore = inject(AuthStore);
  private readonly aloSatService = inject(AloSatService);
  private readonly Theme = inject(Theme);

  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });

    if (this.isAloSat) {
      // this.aloSatService.startKeepalive();
    }
  }

  get isAloSat(): boolean {
    return this.authStore.user()?.officeId === 1;
  }

  ngOnInit() {
    this.Theme.initTheme();
  }

}
