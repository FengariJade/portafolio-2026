import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './profile.html',
})
export class Profile {

  user = {
    name: 'Usuario 1',
    email: 'usuario@gmail.com',
    phone: ''
  };

}
