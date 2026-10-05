import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PackageStepData, RecipientData, SenderData, SenderType } from '../../../models/step-model';

@Component({
  selector: 'app-confirm-step',
  imports: [
    CommonModule,

  ],
  templateUrl: './confirm-step.html',
})
export class ConfirmStep {

  @Input({ required: true }) sender!:     SenderData;
  @Input({ required: true }) recipient!:  RecipientData;
  @Input({ required: true }) packageData!: PackageStepData;
  @Input({ required: true }) senderType!: SenderType;
  @Input() loading = false;
  @Input() error   = '';

  @Output() prev   = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  getTotalWeight():   number { return this.packageData.packages.reduce((s, p) => s + p.weight * p.quantity, 0); }
  getTotalPackages(): number { return this.packageData.packages.reduce((s, p) => s + p.quantity, 0); }

}
