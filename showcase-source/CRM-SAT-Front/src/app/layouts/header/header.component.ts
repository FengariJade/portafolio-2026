import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ClockComponent } from '@shared/clock/clock.component';
import { LogoComponent } from '@shared/logo/logo.component';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { BtnCustomComponent } from '@shared/buttons/btn-custom/btn-custom.component';
import { AuthStore } from '@stores/auth.store';
import { AuthService } from '@services/auth.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SidebarService } from '@services/sidebar.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { NotificationService } from '@services/notification.service';
import { SocketService } from '@services/socket.service';
import { User } from '@models/user.model';
import { AvatarModule } from 'primeng/avatar';
import { MessageEventsService } from '@services/message-events.service';
import { Reminder } from '@models/reminder.model';
import { ReminderService } from '@services/reminder.service';
import { MessageGlobalService } from '@services/generic/message-global.service';
import { MenuHeaderComponent } from '@shared/menu/menu/menu-header/menu-header.component';
import { SidebarModule } from 'primeng/sidebar';
import { ThemeSettingsComponent } from '@features/main/settings/theme-settings/theme-settings';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  description?: string;
}

interface NotificationItem {
  id: number;
  text: string;
  idUser?: number;
  date?: Date;
  checked?: boolean; // true = leído/checado
}

const DEFAULT_LOGO_PATH = 'M0,742v-140.02c.61-.8,1.49-.89,2.36-.82,8.19.67,16.41-.04,24.59.66.37.03.75.05,1.12.04,11.57-.25,23.13.31,34.69.47,8.95.12,17.91-.04,26.85.38,7.34.34,14.68,0,22,.31,11.25.48,22.52.01,33.76.44,10.26.39,20.52.06,30.78.29,27.43.6,54.86.57,82.29.26,16.17-.18,32.34.07,48.5-.33,10.63-.26,21.22-1.21,31.36-4.94,5.51-2.03,10.38-5.05,14.78-8.89,10.39-9.08,16.28-20.87,20.1-33.85,2.29-7.79,3.41-15.75,3.88-23.87.75-13.02-.98-25.68-4.88-38.06-2.98-9.45-7.34-18.24-13.82-25.83-8.01-9.38-17.95-15.38-30.35-17.05-6.66-.9-13.33-1.5-20.06-1.48-7.71.03-15.43.18-23.14-.04-10.51-.3-21.02-.05-31.52-.43-7.96-.29-15.93.09-23.87-.33-8.71-.46-17.42.05-26.11-.4-8.03-.41-16.05.07-24.05-.35-8.64-.46-17.3.06-25.92-.39-8.09-.43-16.18.08-24.24-.35-8.58-.46-17.17.06-25.73-.39-8.15-.43-16.3.08-24.43-.36-8.65-.47-17.3.07-25.92-.39-8.15-.43-16.3.08-24.43-.37-7.03-.38-14.06-.12-21.08-.37-2.31-.61-4.73-.38-7.05-.92-.17-.18-.26-.39-.27-.64-.02-48.73,0-97.46,0-146.19,0-.25,0-.5.03-.74.36-.83,1.1-.92,1.86-.96,1.24-.06,2.49-.04,3.73-.04,94.89,0,189.77.07,284.66-.07,16.37-.02,31.6-4.51,44.8-14.61,7.25-5.54,13.03-12.41,17.53-20.37,5.94-10.52,9.16-21.87,10.43-33.81,2.18-20.51-1.59-39.93-11.47-57.99-8.23-15.03-20.83-25.14-36.96-30.84-7.25-2.56-14.72-4.09-22.41-4.59-10.26-.67-20.53-.5-30.77-.19-9.33.28-18.67.45-27.98.16-16.48-.51-32.97.1-49.44-.34-11.63-.31-23.27.02-34.88-.41-8.65-.32-17.3.09-25.92-.34-8.46-.42-16.92.05-25.36-.4-7.09-.37-14.19.06-21.26-.35-7.28-.42-14.56.03-21.82-.4-6.35-.37-12.69.04-19.02-.35-6.47-.4-12.94-.02-19.39-.39-4.48-.26-8.95-.2-13.42-.31-2.52-.06-2.73-.3-2.75-2.84-.17-21.4-.22-42.81-.19-64.21,0-7.79,0-15.58,0-23.37,0-7.7,0-15.4,0-23.1,0-5.26,0-10.52,0-15.77.07-.59.46-.84,1.01-.89.43-.04.87-.02,1.31-.02C42.14-.1,81.77.1,121.4.06c24.95-.03,49.9-.15,74.85.05,16.92.13,33.84-.08,50.76.18,9.52.15,19.04-.15,28.54.2,6.66.25,13.32-.12,19.95.3,6.52.42,13.05.03,19.55.73,9.59,1.04,19.06,2.7,28.35,5.34,9.47,2.69,18.64,6.18,27.6,10.24,11.07,5.02,21.62,10.97,31.67,17.79,8.44,5.73,16.45,12.02,23.99,18.91,15.37,14.04,28.91,29.62,40.03,47.24,8.8,13.94,15.91,28.72,20.91,44.44,3.59,11.27,6.17,22.78,7.61,34.55.65,5.32.86,10.65.93,15.98.11,8.95.2,17.92-.18,26.87-.41,9.77-2.04,19.38-3.95,28.95-3.43,17.2-8.74,33.82-15.34,50.04-6.04,14.83-13.15,29.12-22.21,42.38-2.49,3.65-5.24,7.11-7.83,10.68-2.63,3.63-4.51,7.58-4.99,12.1-.33,3.13.61,6.01,1.82,8.83,1.91,4.47,5.13,8.06,7.95,11.92,12.77,17.42,22.95,36.2,30.07,56.63,4.48,12.84,7.59,26.01,9.43,39.47.84,6.15,1.31,12.34,1.69,18.54.45,7.47.43,14.93.19,22.38-.26,7.99-1.02,15.97-2.03,23.93-1.94,15.33-5.07,30.41-9.11,45.29-3.65,13.45-7.6,26.82-13.27,39.59-5.6,12.61-12.64,24.38-21.24,35.2-10.29,12.94-22.28,24.04-35.77,33.57-9.42,6.66-19.38,12.39-29.76,17.39-18.56,8.93-38.03,14.93-58.35,18.26-9.44,1.54-18.92,2.69-28.47,3.38-5.58.4-11.17.47-16.75.56-24.14.39-48.28.2-72.42.23-67.75,0-135.5,0-203.24-.01-.79,0-1.62.19-2.39-.18Z`'

@Component({
  selector: 'app-header',
  imports: [
    //LogoComponent,
    CommonModule,
    MenuModule,
    ButtonModule,
    //ClockComponent,
    //BtnCustomComponent,
    AvatarModule,
    MenuHeaderComponent,
    SidebarModule,
    ThemeSettingsComponent
  ],
  templateUrl: './header.component.html',
  styles: `
  .custom-scrollbar::-webkit-scrollbar {
  width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(55, 95, 149, 0.2);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(55, 95, 149, 0.4);
  }
`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '150ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  readonly authStore = inject(AuthStore);
  private readonly store = inject(AuthStore);
  readonly  authService = inject(AuthService);
  readonly  sidebarService = inject(SidebarService);
  readonly  notificationService= inject(NotificationService);
  readonly  reminderService = inject(ReminderService);
  readonly  socketService = inject(SocketService);
  readonly  messageEvents = inject(MessageEventsService);
  private readonly msg = inject(MessageGlobalService);
  get userCurrent(): User {
      return this.authStore.user()!;
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  dateHoy: Date = new Date();
  timeHoy: Date = new Date();

  hasNotification: boolean = true;

  isDropdownOpen = false;
  isNotificationsOpen = signal<boolean>(false);
  isRemindersOpen= signal<boolean>(false);

  isThemeOpen = false;

  openThemeSettings() {
    this.isThemeOpen = true;
    this.isDropdownOpen = false; // opcional: cierra el menú
  }

  // datos (ejemplos, reemplaza por tus datos reales)
  calendarEvents: CalendarEvent[] = [
    {
      id: 1,
      title: 'Cierre de mes',
      date: new Date(2025, 7, 31),
      description: 'Cierre contable mensual',
    },
    {
      id: 2,
      title: 'Mantenimiento servidor',
      date: new Date(2025, 7, 15),
      description: 'Mantenimiento programado 02:00-04:00',
    },
    {
      id: 3,
      title: 'Reunión equipo',
      date: new Date(2025, 7, 12),
      description: 'Revisión sprints',
    },
  ];

  notifications: any[] = [];
  reminders: Reminder[] = [];

  hasCalendarNotification = this.calendarEvents.length > 0;
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelect(option: string): void {
    console.log('Seleccionaste:', option);
    this.isDropdownOpen = false;
  }

  ngOnInit(): void {
      const now = new Date();
      this.dateHoy = now;
      this.timeHoy = now;

      this.renderer.listen('window', 'click', (event: Event) => {
        if (!this.elRef.nativeElement.contains(event.target)) {
          this.isDropdownOpen = false;
          this.isRemindersOpen.set(false);
          this.isNotificationsOpen.set(false);
        }
      });

      this.socketService.onMessage((msg) => {
        if (msg.senderId != this.userCurrent.id) {
            msg.senderId = false;
            this.allNotification();
        }
      });

      this.socketService.onNewReminder((res)=>{
        console.log("event received", res)
        this.allReminders()
      })

      this.allNotification();
      this.allReminders()

      const saved = localStorage.getItem('app-logo-path');
      if (saved) {
        this.logoPath = saved;
      }
  }

  allNotification(){
    this.notificationService.findAllByuserId().subscribe((res:any) => {
      this.notifications = res.data;
    })
  }
  allReminders(){
    this.reminderService.findAllByuserId().subscribe((res:any) => {
       this.reminders = res.data;
    })
  }

  viewMessage(n:any){
     this.isNotificationsOpen.set(false);
     this.markAsRead(n.id)
     this.messageEvents.sendMessageSelected(n);
  }

  get name(): string | undefined {
    return this.store.user()?.name;
  }

  // En tu componente
  get todayReminders(): Reminder[] {
    if (!this.reminders) return [];

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    return this.reminders.filter(r => {
      const d = new Date(r.reminderAt!);
      const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      return dateStr === todayStr;
    });
  }

  get pastReminders(): Reminder[] {
    if (!this.reminders) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.reminders.filter(r => {
      const d = new Date(r.reminderAt!);
      d.setHours(0, 0, 0, 0);
      return d.getTime() < today.getTime();
    });
  }

  get upcomingReminders(): Reminder[] {
    if (!this.reminders) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.reminders.filter(r => {
      const d = new Date(r.reminderAt!);
      d.setHours(0, 0, 0, 0);
      return d.getTime() > today.getTime();
    });
  }
  get allRemindersRead()
  {
    return this.todayRemindersRead?.length + this.pastRemindersRead?.length + this.upcomingRemindersRead?.length
  }

  get upcomingRemindersRead(): Reminder[]
  {
    return this.upcomingReminders.filter(x => x.status)
  }
  get pastRemindersRead(): Reminder[]
  {
    return this.pastReminders.filter(x => x.status)
  }
  get todayRemindersRead(): Reminder[]
  {
    return this.todayReminders.filter(x => x.status)
  }

  deleteReminder(reminder: Reminder): void {
    this.reminderService.delete(reminder.id).subscribe(x => {
      this.reminders = this.reminders.filter(remainingReminder => remainingReminder.id != reminder.id)
      this.msg.success("El recordatorio fue eliminado correctamente.", "Recordatorios", 3000)
    })
  }


  markAllRemindersAsRead(reminder: Reminder | null = null): void {
    let remindersUnread: number[] = [];
    if (reminder) {
      this.msg.confirm(
        "¿Desea marcar este recordatorio como leído?",
        () => {
          remindersUnread = [reminder.id];
          this.sendMarkAsReadRequest(remindersUnread);
        },
        () => {},
        "Recordatorios"
      );
    }else{
      remindersUnread = this.reminders
        .filter(r => r.status)
        .map(r => r.id);

      this.sendMarkAsReadRequest(remindersUnread);
    }
  }
  private sendMarkAsReadRequest(ids: number[]): void {
    this.reminderService.markRemindersAsRead(ids).subscribe(response => {
      if (!response.success) {
        this.msg.error(response.message, "Recordatorios", 3000);
        console.error(response?.error);
      } else {
        this.msg.success(response.message, "Recordatorios", 3000);
      }

      this.allReminders();
    });
  }


  get displayName(): string | undefined {
    return this.store.user()?.displayName;
  }

  get role(): string | undefined {
    return this.store.user()?.role?.name;
  }

  get initials(): string | undefined {
    return this.store.user()?.name.charAt(0);
  }

  get connected(): boolean {
    return !!this.store.user()?.connected;
  }

  logout() {
    this.store.logout();
  }

  toggleReminders(): void {
    this.isRemindersOpen.set(!this.isRemindersOpen());
    // asegurar que no queden otros menus abiertos
    if (this.isNotificationsOpen) {
      this.isNotificationsOpen.set(false);
    }
  }

  // Notificaciones
  toggleNotifications(): void {
    this.isNotificationsOpen.set(!this.isNotificationsOpen());
    if (this.isRemindersOpen) {
      this.isRemindersOpen.set(false);
    }
  }

  // marcar/desmarcar notificación individual
  toggleNotificationChecked(item: NotificationItem): void {
    item.checked = !item.checked;
    // si se marcaron todas, no mostramos el indicador (lo maneja unreadCount getter)
  }

  // marcar todas (opcional)
  markAllAsRead(): void {
    this.notificationService.allAsReadNotification({}).subscribe((res:any) => {
        this.allNotification();
    })
  }
  markAsRead(id:number): void {
    this.notificationService.markAsRead(id).subscribe((res:any) => {
        this.allNotification();
    })
  }

  // cantidad de no leídas
  get unreadCount(): number {
    return this.notifications.filter((n) => !n.checked).length;
  }
  get unreadRemindersCount(): number {
    return this.notifications.filter((n) => !n.checked).length;
  }

  // helper para mostrar fecha legible
  formatDate(d?: Date): string {
    if (!d) return '';
    const dt = new Date(d);
    return dt.toLocaleDateString(); // puedes adaptar formato si quieres DatePipe
  }



isLogoEditorOpen = false;

logoPath = `M0,742v-140.02c.61-.8,1.49-.89,2.36-.82,8.19.67,16.41-.04,24.59.66.37.03.75.05,1.12.04,11.57-.25,23.13.31,34.69.47,8.95.12,17.91-.04,26.85.38,7.34.34,14.68,0,22,.31,11.25.48,22.52.01,33.76.44,10.26.39,20.52.06,30.78.29,27.43.6,54.86.57,82.29.26,16.17-.18,32.34.07,48.5-.33,10.63-.26,21.22-1.21,31.36-4.94,5.51-2.03,10.38-5.05,14.78-8.89,10.39-9.08,16.28-20.87,20.1-33.85,2.29-7.79,3.41-15.75,3.88-23.87.75-13.02-.98-25.68-4.88-38.06-2.98-9.45-7.34-18.24-13.82-25.83-8.01-9.38-17.95-15.38-30.35-17.05-6.66-.9-13.33-1.5-20.06-1.48-7.71.03-15.43.18-23.14-.04-10.51-.3-21.02-.05-31.52-.43-7.96-.29-15.93.09-23.87-.33-8.71-.46-17.42.05-26.11-.4-8.03-.41-16.05.07-24.05-.35-8.64-.46-17.3.06-25.92-.39-8.09-.43-16.18.08-24.24-.35-8.58-.46-17.17.06-25.73-.39-8.15-.43-16.3.08-24.43-.36-8.65-.47-17.3.07-25.92-.39-8.15-.43-16.3.08-24.43-.37-7.03-.38-14.06-.12-21.08-.37-2.31-.61-4.73-.38-7.05-.92-.17-.18-.26-.39-.27-.64-.02-48.73,0-97.46,0-146.19,0-.25,0-.5.03-.74.36-.83,1.1-.92,1.86-.96,1.24-.06,2.49-.04,3.73-.04,94.89,0,189.77.07,284.66-.07,16.37-.02,31.6-4.51,44.8-14.61,7.25-5.54,13.03-12.41,17.53-20.37,5.94-10.52,9.16-21.87,10.43-33.81,2.18-20.51-1.59-39.93-11.47-57.99-8.23-15.03-20.83-25.14-36.96-30.84-7.25-2.56-14.72-4.09-22.41-4.59-10.26-.67-20.53-.5-30.77-.19-9.33.28-18.67.45-27.98.16-16.48-.51-32.97.1-49.44-.34-11.63-.31-23.27.02-34.88-.41-8.65-.32-17.3.09-25.92-.34-8.46-.42-16.92.05-25.36-.4-7.09-.37-14.19.06-21.26-.35-7.28-.42-14.56.03-21.82-.4-6.35-.37-12.69.04-19.02-.35-6.47-.4-12.94-.02-19.39-.39-4.48-.26-8.95-.2-13.42-.31-2.52-.06-2.73-.3-2.75-2.84-.17-21.4-.22-42.81-.19-64.21,0-7.79,0-15.58,0-23.37,0-7.7,0-15.4,0-23.1,0-5.26,0-10.52,0-15.77.07-.59.46-.84,1.01-.89.43-.04.87-.02,1.31-.02C42.14-.1,81.77.1,121.4.06c24.95-.03,49.9-.15,74.85.05,16.92.13,33.84-.08,50.76.18,9.52.15,19.04-.15,28.54.2,6.66.25,13.32-.12,19.95.3,6.52.42,13.05.03,19.55.73,9.59,1.04,19.06,2.7,28.35,5.34,9.47,2.69,18.64,6.18,27.6,10.24,11.07,5.02,21.62,10.97,31.67,17.79,8.44,5.73,16.45,12.02,23.99,18.91,15.37,14.04,28.91,29.62,40.03,47.24,8.8,13.94,15.91,28.72,20.91,44.44,3.59,11.27,6.17,22.78,7.61,34.55.65,5.32.86,10.65.93,15.98.11,8.95.2,17.92-.18,26.87-.41,9.77-2.04,19.38-3.95,28.95-3.43,17.2-8.74,33.82-15.34,50.04-6.04,14.83-13.15,29.12-22.21,42.38-2.49,3.65-5.24,7.11-7.83,10.68-2.63,3.63-4.51,7.58-4.99,12.1-.33,3.13.61,6.01,1.82,8.83,1.91,4.47,5.13,8.06,7.95,11.92,12.77,17.42,22.95,36.2,30.07,56.63,4.48,12.84,7.59,26.01,9.43,39.47.84,6.15,1.31,12.34,1.69,18.54.45,7.47.43,14.93.19,22.38-.26,7.99-1.02,15.97-2.03,23.93-1.94,15.33-5.07,30.41-9.11,45.29-3.65,13.45-7.6,26.82-13.27,39.59-5.6,12.61-12.64,24.38-21.24,35.2-10.29,12.94-22.28,24.04-35.77,33.57-9.42,6.66-19.38,12.39-29.76,17.39-18.56,8.93-38.03,14.93-58.35,18.26-9.44,1.54-18.92,2.69-28.47,3.38-5.58.4-11.17.47-16.75.56-24.14.39-48.28.2-72.42.23-67.75,0-135.5,0-203.24-.01-.79,0-1.62.19-2.39-.18Z`; // default
tempPath = '';


  // ✅ AQUÍ VA
  isValidPath(path: string): boolean {
    return /^[MmLlHhVvCcSsQqTtAaZz0-9,\s.-]+$/.test(path);
  }

  openLogoEditor() {
    this.tempPath = this.logoPath;
    this.isLogoEditorOpen = true;
  }

  closeLogoEditor() {
    this.isLogoEditorOpen = false;
  }

  savePath() {
    // ⬇️ SE USA AQUÍ
    if (!this.isValidPath(this.tempPath)) {
      alert('Path SVG inválido');
      return;
    }

    this.logoPath = this.tempPath.trim();
    localStorage.setItem('app-logo-path', this.logoPath);
    this.closeLogoEditor();
  }

  resetPath() {
    localStorage.removeItem('app-logo-path');
    this.logoPath = DEFAULT_LOGO_PATH;
    this.tempPath = this.logoPath;
  }


}
