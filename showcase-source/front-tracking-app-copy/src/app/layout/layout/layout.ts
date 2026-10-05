import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    Sidebar,
  ],
  templateUrl: './layout.html',
})
export class Layout {

  sidebarExpanded = signal<boolean>(true);

  onSidebarChange(expanded: boolean) {
    this.sidebarExpanded.set(expanded);
  }

}
