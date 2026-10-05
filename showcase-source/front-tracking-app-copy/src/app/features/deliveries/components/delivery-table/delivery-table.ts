import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiPackage } from '../../models/package.model';
import { RouterLink } from '@angular/router';
import { StatusLabelPipe } from '../../../../shared/pipes/status-label-pipe';

export type PackageViewModel = ApiPackage & {
  origin: string;
  destination: string;
  weight: number;
  width: number;
  height: number;
  length: number;
};

@Component({
  selector: 'app-delivery-table',
  imports: [
    CommonModule,
    RouterLink,
    StatusLabelPipe,
    
  ],
  templateUrl: './delivery-table.html',
})
export class DeliveryTable {

  /* ───────── Inputs ───────── */

  @Input({ required: true }) packages: PackageViewModel[] = [];
  @Input() openMenuId: string | null = null;
  @Input() errorLoad: string = '';

  /* ───────── Outputs ───────── */

  @Output() detail = new EventEmitter<PackageViewModel>();
  @Output() edit = new EventEmitter<PackageViewModel>();
  @Output() delete = new EventEmitter<PackageViewModel>();
  @Output() status = new EventEmitter<PackageViewModel>();
  @Output() toggleMenu = new EventEmitter<{ id: string; event: MouseEvent }>();
  @Output() closeMenu = new EventEmitter<void>();

}
