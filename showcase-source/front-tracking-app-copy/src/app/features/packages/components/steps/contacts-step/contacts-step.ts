import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsStepData, SenderType } from '../../../models/step-model';
import { isInvalid } from '../../../../../shared/utils/form-util';

@Component({
  selector: 'app-contacts-step',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contacts-step.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactsStep {

  isInvalid = isInvalid;

  @Input({ required: true }) senderType!: SenderType;
  @Input() initial: ContactsStepData | null = null;

  @Output() next = new EventEmitter<ContactsStepData>();
  @Output() prev = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  senderForm = this.fb.group({
    name:           ['', Validators.required],
    email:          ['', [Validators.required, Validators.email]],
    phone:          ['', Validators.required],
    documentType:   ['dni', Validators.required],
    documentNumber: ['', Validators.required],
    postalCode:     ['', Validators.required],
  });

  recipientForm = this.fb.group({
    entityType:            ['NATURAL', Validators.required],
    name:                  ['', Validators.required],
    email:                 ['', [Validators.required, Validators.email]],
    phone:                 ['', Validators.required],
    documentType:          ['dni', Validators.required],
    documentNumber:        ['', Validators.required],
    postalCode:            ['', Validators.required],
    pickupName:            [''],
    pickupDocumentType:    ['dni'],
    pickupDocumentNumber:  [''],
    pickupPostalCode:      [''],
  });

  ngOnInit(): void {
    if (this.initial) {
      this.senderForm.patchValue(this.initial.sender);
      this.recipientForm.patchValue(this.initial.recipient);
    }
    // Default documentType for company sender
    if (this.senderType === 'company') {
      this.senderForm.patchValue({ documentType: 'ruc' });
    }
  }

  onNext(): void {
    this.senderForm.markAllAsTouched();
    this.recipientForm.markAllAsTouched();
    if (this.senderForm.invalid || this.recipientForm.invalid) return;

    this.next.emit({
      sender:    this.senderForm.getRawValue() as ContactsStepData['sender'],
      recipient: this.recipientForm.getRawValue() as ContactsStepData['recipient'],
    });
  }

}
