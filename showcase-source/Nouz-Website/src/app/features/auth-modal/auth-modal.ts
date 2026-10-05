import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  imports: [
    CommonModule
  ],
  templateUrl: './auth-modal.html',
})
export class AuthModal {

  @Output() close = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  isRegister = false;

  toggleMode() {
    this.isRegister = !this.isRegister;
  }

  closeModal() {
    this.close.emit();
  }

  login() {
    this.loginSuccess.emit();
    this.close.emit();
  }

  register() {
    this.loginSuccess.emit();
    this.close.emit();
  }

}
