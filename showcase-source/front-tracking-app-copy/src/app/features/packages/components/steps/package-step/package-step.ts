import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PackageItem } from '../../../models/package.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isInvalid } from '../../../../../shared/utils/form-util';
import { PackageStepData } from '../../../models/step-model';

@Component({
  selector: 'app-package-step',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './package-step.html',
})
export class PackageStep {


  isInvalid = isInvalid;

  @Input() initial: PackageStepData | null = null;

  @Output() stepDone = new EventEmitter<PackageStepData>();
  @Output() prev     = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  packageList:    PackageItem[] = [];
  packageCounter: number        = 0;
  editingIndex:   number | null = null;

  packageForm = this.fb.group({
    description: ['', Validators.required],
    weight:      [0, Validators.required],
    width:       [0],
    height:      [0],
    length:      [0],
    fragile:     [false],
    category:    ['otro', Validators.required],
  });

  addressForm = this.fb.group({
    price:             [null as number | null],
    pickupAddress:     ['', Validators.required],
    pickupCity:        ['', Validators.required],
    pickupReference:   [''],
    deliveryAddress:   ['', Validators.required],
    deliveryCity:      ['', Validators.required],
    deliveryReference: [''],
  });

  ngOnInit(): void {
    if (this.initial) {
      this.packageList = [...this.initial.packages];
      this.addressForm.patchValue(this.initial);
    }
  }

  addPackage(): void {
    if (this.packageForm.invalid) {
      this.packageForm.markAllAsTouched();
      return;
    }
    const pkg: PackageItem = { id: ++this.packageCounter, quantity: 1, ...this.packageForm.value as any };
    if (this.editingIndex !== null) {
      this.packageList[this.editingIndex] = pkg;
      this.editingIndex = null;
    } else {
      this.packageList.push(pkg);
    }
    this.packageForm.reset({ category: 'otro', fragile: false });
  }

  editPackage(i: number):   void { this.packageForm.patchValue(this.packageList[i]); this.editingIndex = i; }
  removePackage(i: number): void { this.packageList.splice(i, 1); }
  increaseQty(i: number):   void { this.packageList[i].quantity++; }
  decreaseQty(i: number):   void { if (this.packageList[i].quantity > 1) this.packageList[i].quantity--; }

  getTotalWeight():   number { return this.packageList.reduce((s, p) => s + p.weight * p.quantity, 0); }
  getTotalPackages(): number { return this.packageList.reduce((s, p) => s + p.quantity, 0); }

  onNext(): void {
    if (this.packageList.length === 0) { this.packageForm.markAllAsTouched(); return; }
    if (this.addressForm.invalid)       { this.addressForm.markAllAsTouched(); return; }
    const a = this.addressForm.value;
    this.stepDone.emit({
      packages:          this.packageList,
      price:             a.price ?? undefined,
      pickupAddress:     a.pickupAddress!,
      pickupCity:        a.pickupCity!,
      pickupReference:   a.pickupReference ?? '',
      deliveryAddress:   a.deliveryAddress!,
      deliveryCity:      a.deliveryCity!,
      deliveryReference: a.deliveryReference ?? '',
    });
  }

}
