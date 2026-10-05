import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthModal } from '../../features/auth-modal/auth-modal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    AuthModal,
  ],
  templateUrl: './header.html',
})
export class Header {

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isLoggedIn = false;
  showProfileMenu = false;
  showAuthModal = false;

  user = {
    name: 'Usuario 1'
  };

  openAuthModal() {
    this.showAuthModal = true;
  }

  closeAuthModal() {
    this.showAuthModal = false;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this.isLoggedIn = false;
    this.showProfileMenu = false;
  }

  onLoginSuccess() {
    this.isLoggedIn = true;
    this.showAuthModal = false;
  }

  showMobileMenu = false;

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

}