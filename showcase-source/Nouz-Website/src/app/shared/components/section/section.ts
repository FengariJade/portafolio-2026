import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
   template: `
     <section
      class="relative overflow-hidden min-h-[80vh] flex items-center"
      [ngClass]="bgClass"
    >
      <!-- Imagen decorativa -->
      <div
        *ngIf="image"
        class="pointer-events-none absolute inset-y-0 right-[-10%]
              w-[60%] max-w-[900px]
              bg-no-repeat bg-right bg-contain
              opacity-90 z-0"
        [style.backgroundImage]="'url(' + image + ')'"
      ></div>

      <!-- Contenido -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styleUrl: './section.css',
})
export class Section {

   /** Clase Tailwind para el fondo */
  @Input() bgClass = 'bg-blanco';

  /** Imagen decorativa */
  @Input() image?: string;

}
