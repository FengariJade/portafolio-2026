import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Theme } from '@services/theme';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'theme-settings',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="grid gap-8">

      <!-- 🎨 Color de acento -->
      <div>
        <span class="block mb-3 font-medium">Color de acento</span>

        <div class="flex flex-wrap gap-3">
          <button
            *ngFor="let color of accentColors"
            (click)="setAccent(color)"
            class="w-7 h-7 rounded-full transition-all cursor-pointer"
            [style.background]="color"
            [ngClass]="{
              'ring-2 ring-black ring-offset-2': accentSelected === color
            }"
          ></button>
        </div>
      </div>

      <!-- 🧱 Color secundario (fondos) -->
      <div>
        <span class="block mb-3 font-medium">Fondo secundario</span>

        <div class="flex flex-wrap gap-3">
          <button
            *ngFor="let color of secondaryColors"
            (click)="setSecondary(color)"
            class="w-7 h-7 rounded-full transition-all cursor-pointer border"
            [style.background]="color"
            [ngClass]="{
              'ring-2 ring-black ring-offset-2': secondarySelected === color
            }"
          ></button>
        </div>
      </div>

      <!-- 🌙 Modo oscuro -->
      <!--    <button
        class="flex items-center gap-3 px-4 py-3 rounded-xl
              hover:bg-cuaternario transition text-inherit"
        (click)="toggleDarkMode()"
      >
        <iconify-icon icon="mdi:weather-night" class="text-xl" />
        <span>Modo oscuro</span>
      </button> -->
     
    </div>
  `,
})
export class ThemeSettingsComponent {

  /* 🎨 Paleta ACCENT */
  accentColors: string[] = [
    '#1F2937',
    '#10B981',
    '#22C55E',
    '#EAB308',
    '#F97316',
    '#06B6D4',
    '#0EA5E9',
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#F43F5E',
  ];

  /* 🧱 Paleta SECUNDARIO (fondos) */
  secondaryColors: string[] = [
    '#E6EAF3',
    '#ECEBF0',
    '#E5E7EB',
    '#D0CCD5',
  ];

  accentSelected!: string;
  secondarySelected!: string;

  isDark = false;

  constructor(private theme: Theme) {}

  ngOnInit() {
    this.accentSelected = this.theme.getColor('--sat-Accent');
    this.secondarySelected = this.theme.getColor('--sat-Secundario');
  }

  setAccent(color: string) {
    this.accentSelected = color;
    this.theme.setColor('--sat-Accent', color);
  }

  setSecondary(color: string) {
    this.secondarySelected = color;
    this.theme.setColor('--sat-Secundario', color);
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    this.theme.setDarkMode(this.isDark);
  }
}
