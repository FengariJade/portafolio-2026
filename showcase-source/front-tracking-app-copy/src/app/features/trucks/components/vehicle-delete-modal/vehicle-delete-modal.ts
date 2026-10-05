import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, } from '@angular/core';

@Component({
  selector: 'app-vehicle-delete-modal',
  imports: [
    CommonModule,

  ],
  templateUrl: './vehicle-delete-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VehicleDeleteModal {

  isOpen  = input<boolean>(false);
  error   = input<string>('');
  close   = output<void>();
  confirm = output<void>();

}
