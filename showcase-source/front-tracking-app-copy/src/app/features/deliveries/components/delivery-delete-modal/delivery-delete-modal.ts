import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, } from '@angular/core';
import { PackageViewModel } from '../delivery-table/delivery-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-delete-modal',
  imports: [
    CommonModule,

  ],
  templateUrl: './delivery-delete-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DeliveryDeleteModal{

  package = input<PackageViewModel | null>(null);
  error   = input<string>('');
  close   = output<void>();
  confirm = output<void>();

}
