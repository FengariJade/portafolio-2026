import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule,
  ],
   template: `
    <button
      [ngClass]="buttonClasses"
      class="inline-flex items-center justify-center gap-2
             rounded-full px-6 py-2 text-sm font-poppins
             transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class Button {
  @Input() variant: 'solid' | 'outline' = 'solid';

  get buttonClasses(): string {
    return this.variant === 'solid'
      ? `
        bg-violetaA text-blanco
        hover:bg-violetaA/90
        `
      : `
        border border-violetaA text-violetaA
        hover:bg-violetaA hover:text-blanco
        `;
  }
}
