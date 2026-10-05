import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Section } from '../../shared/components/section/section';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Section,
    Button,
  ],
  templateUrl: './home.html',
})
export class Home {

  

  billingMode: 'annual' | 'monthly' = 'annual';

  setMode(mode: 'annual' | 'monthly') {
    this.billingMode = mode;
    console.log('Modo:', mode);
  }

}
