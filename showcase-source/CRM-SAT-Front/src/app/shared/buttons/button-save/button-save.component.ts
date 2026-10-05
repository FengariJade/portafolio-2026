import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { AuthStore } from '@stores/auth.store';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'button-save',
  imports: [CommonModule, ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <p-button
      *ngIf="canCreate"
      severity="primary"
      size="medium"
      [disabled]="disabled"
      [loading]="loading"
      [styleClass]="
      'bg-cuaternario !text-black hover:bg-accent-7 hover:!text-white ' +
      '!rounded-full transition-all duration-200 flex items-center gap-2 !px-6 !py-3 ' +
      styleClass"
      
    >
      <div class="flex justify-center items-center gap-1">
        <iconify-icon
          *ngIf="showIcon"
          [icon]="icon"
          class="text-lg"
        ></iconify-icon>
        <span pButtonLabel>{{ label }}</span>
      </div>
    </p-button>
  `,
  styles: ``,
})
export class ButtonSaveComponent {
  @Input() label: string = 'Guardar';
  @Input() icon: string = 'lucide:save';
  @Input() showIcon: boolean = true;
  @Input() disabled!: boolean;
  @Input() loading!: boolean;

  @Output() click = new EventEmitter<void>();

  authStore = inject(AuthStore);

  get canCreate(): boolean {
    return !!this.authStore.screenSelected()?.RoleScreenOffice?.canCreate;
  }
}
