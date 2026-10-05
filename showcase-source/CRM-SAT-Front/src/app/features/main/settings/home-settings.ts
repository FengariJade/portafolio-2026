import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParentMenuComponent } from '@shared/menu/menu/parent-menu/parent-menu.component';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, RouterModule, ParentMenuComponent],
  template: `<parent-menu /> `,
  styles: ` `,
})
export class HomeSettingsComponent {
}
