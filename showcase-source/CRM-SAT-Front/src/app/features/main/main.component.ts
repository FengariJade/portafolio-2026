import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '@layouts/sidebar/sidebar.component';
import { HeaderComponent } from '@layouts/header/header.component';
import { FooterComponent } from '@layouts/footer/footer.component';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { ChatBubbleComponent } from './inbox-view/chat-bubble/chat-bubble.component';
import { SocketService } from '@services/socket.service';
import { MessageService } from 'primeng/api';
import { environment } from '@envs/environments';
import { MessageGlobalService } from '@services/generic/message-global.service';
import { AuthStore } from '@stores/auth.store';
import { User } from '@models/user.model';
import { Toast } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { SidebarService } from '@services/sidebar.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ParentMenuComponent } from '@shared/menu/menu/parent-menu/parent-menu.component';


@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ChatBubbleComponent,
    BreadcrumbComponent,
    ChatBubbleComponent,
    BreadcrumbComponent,
    ParentMenuComponent,
    Toast,
  ],
  template: `
    <div class="h-screen flex flex-col overflow-hidden bg-secundario">
      <div class="h-18 shrink-0">
        <app-header />
      </div>

      <div class="flex mt-6 h-[calc(100vh-48px)] w-full overflow-hidden bg-primario">
       
        <sidebar/>
        
        <section 
        [@contentShift]="sidebarState"
        class="flex flex-col flex-1 h-full rounded-tl-[80px] overflow-hidden"
        >

          <div class="h-[calc(100%-32px)] overflow-hidden">
            <div class="px-4 pt-4 pl-15 h-full flex flex-col gap-2 bg-secundario">
              <div class="h-14">
                <app-breadcrumb />
              </div>

              <div
                class="h-[calc(100%-56px)] w-full"
                [ngClass]="[isChatView() ? 'overflow-hidden' : 'overflow-auto']"
              >
                <router-outlet />
              </div>
            </div>
          </div>

          <div class="h-8 shrink-0">
            <app-footer />
          </div>
        </section>
      </div>
    </div>

    <app-chat-bubble *ngIf="!isOnBandeja()"></app-chat-bubble>

    <p-toast
      position="bottom-left"
      key="confirm"
      (onClose)="onReject()"
      [baseZIndex]="5000"
    >
      <ng-template let-message #message>
        <div class="flex flex-col items-start flex-auto">
          <div class="flex items-center gap-2">
            <span class="font-bold">{{ userCurrent.name }}</span>
          </div>
          <div class="font-medium text-md my-2">{{ message.summary }}</div>
        </div>
      </ng-template>
    </p-toast>
  `,
  styles: ``,
  animations: [
    trigger('contentShift', [
      state('collapsed', style({ marginLeft: '74px' })),
      state('expanded', style({ marginLeft: '270px' })),
      transition('collapsed <=> expanded', [
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
    ]),
  ],
})
export class MainComponent {

  audio = new Audio();

  readonly authStore = inject(AuthStore);

  private readonly msg = inject(MessageGlobalService);

  get userCurrent(): User {
    return this.authStore.user()!;
  }

  sidebarExpanded = false;

  get sidebarState() {
    return this.sidebarExpanded ? 'expanded' : 'collapsed';
  }

  constructor(
    public router: Router,
    private socketService: SocketService,
    private messageService: MessageService,
    public sidebarService: SidebarService
  ) {
    this.sidebarService.isExpanded$().subscribe(value => {
      this.sidebarExpanded = value;
    });
  }

  ngOnInit() {
    this.audio.src = '/assets/sound.mp3';
    if (this.userCurrent.roleId === environment.roleIdSupervisor) {
      this.socketService.onAlertas((data) => {
        this.messageService.add({
          key: 'confirm',
          sticky: true,
          severity: 'success',
          summary: data.mensaje,
        });
      });
    }
  }

  collapsed = false;
  private sub = new Subscription();

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isOnBandeja(): boolean {
    return this.router.url.includes('/inbox-view');
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  isChatView() {
    return this.router.url.startsWith('/inbox-multi-channel');
  }
  
}
