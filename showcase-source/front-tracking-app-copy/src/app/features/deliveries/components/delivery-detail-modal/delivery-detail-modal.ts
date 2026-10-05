import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ApiPackage } from '../../models/package.model';

@Component({
  selector: 'app-delivery-detail-modal',
  imports: [
    CommonModule,
  ],
  templateUrl: './delivery-detail-modal.html',
})
export class DeliveryDetailModal {
  package = input<ApiPackage | null>(null);
  loading = input<boolean>(false);
  error   = input<string>('');
  close   = output<void>();
}