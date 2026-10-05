import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-filter',
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  templateUrl: './delivery-filter.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryFilter {

  @Input() searchQuery: string = '';
  @Input() selectedStatus: string = 'all';
  @Input() hasActiveFilters: boolean = false;
  @Input() resultsCount: number = 0;

  @Output() searchChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
}
