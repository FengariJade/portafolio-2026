import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatePackageDto, CreateProductDto, PackageItem } from '../../models/package.model';
import { PackageCommandService } from '../../services/PackageCommandService';
import { PackageStep } from '../steps/package-step/package-step';
import { ConfirmStep } from '../steps/confirm-step/confirm-step';
import { ContactsStepData, PackageStepData, SenderType } from '../../models/step-model';
import { ContactsStep } from '../steps/contacts-step/contacts-step';
import { ShippingTicketData, ShippingTicketModal } from '../shipping-ticket-modal';

type Step       = 0 | 1 | 2 | 3 ;

@Component({
  selector: 'app-package-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactsStep,
    PackageStep,
    ConfirmStep,
    ShippingTicketModal,

  ],
  templateUrl: './package-form.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PackageForm {

  private router         = inject(Router);
  private packageService = inject(PackageCommandService);

  currentStep  = signal<Step>(0);
  senderType   = signal<SenderType | null>(null);
  loading      = signal<boolean>(false);
  error        = signal<string>('');

  // ── Ticket modal ──────────────────────────────────────
  ticketData   = signal<ShippingTicketData | null>(null);  // null = cerrad

  contactsData:  ContactsStepData | null = null;
  packageData:   PackageStepData  | null = null;

  steps = [
    { number: 1, label: 'Contactos'   },
    { number: 2, label: 'Paquete'     },
    { number: 3, label: 'Confirmación'},
  ];

  selectType(type: SenderType): void {
    this.senderType.set(type);
    this.currentStep.set(1);
  }

  onContactsNext(data: ContactsStepData): void {
    this.contactsData = data;
    this.currentStep.set(2);
  }

  onPackageNext(data: PackageStepData): void {
    this.packageData = data;
    this.currentStep.set(3);
  }

  onPrev(fromStep: number): void {
    if (fromStep === 1) { this.currentStep.set(0); this.senderType.set(null); }
    else this.currentStep.set((fromStep - 1) as Step);
  }

  closeTicket(): void {
    this.ticketData.set(null);
    this.router.navigate(['/deliveries']);
  }

  /**
 * Construye el DTO y registra el paquete en el backend.
 *
 * Flujo:
 *  1. Valida que existan datos de contactos y paquete.
 *  2. Calcula el peso total sumando `weight * quantity` de cada ítem.
 *  3. Calcula el volumen cúbico en m³ a partir del primer paquete (W×H×L / 1 000 000).
 *  4. Expande cada PackageItem en `quantity` productos individuales con código
 *     autogenerado: `{CATEGORY}-{id}-{índice}`.
 *  5. Arma el `CreatePackageDto` y llama al servicio.
 *  6. Si la respuesta es exitosa, abre el `ShippingTicketModal` con los datos
 *     del comprobante; al cerrarlo se navega a `/deliveries`.
 */
submit(): void {
  if (!this.contactsData || !this.packageData) return;

  this.loading.set(true);
  this.error.set('');

  const { sender, recipient } = this.contactsData;

  // Peso total = suma de (peso unitario × cantidad) por cada ítem
  const totalWeight = this.packageData.packages
    .reduce((s: number, p: PackageItem) => s + p.weight * p.quantity, 0);

  // Volumen basado en el primer ítem (asume dimensiones homogéneas en el envío)
  const firstPkg = this.packageData.packages[0] as PackageItem | undefined;
  const volume   = firstPkg
    ? +((firstPkg.width * firstPkg.height * firstPkg.length) / 1_000_000).toFixed(4)
    : 0;

  // Cada PackageItem se expande en `quantity` entradas de producto individual
  const products: CreateProductDto[] = this.packageData.packages.flatMap((pkg: PackageItem) =>
    Array.from({ length: pkg.quantity }, (_, i) => ({
      productCode: `${pkg.category.toUpperCase()}-${pkg.id}-${i + 1}`,
      name:        pkg.description,
      quantity:    pkg.quantity,
      weightKg:    pkg.weight,
      lengthCm:    pkg.length,
      widthCm:     pkg.width,
      heightCm:    pkg.height,
    }))
  );

  const payload: CreatePackageDto = {
    isFragile:               this.packageData.packages.some((p: PackageItem) => p.fragile),
    price:                   this.packageData.price,
    senderEntityType:        this.senderType() === 'person' ? 'NATURAL' : 'COMPANY',
    senderName:              sender.name,
    senderDocumentType:      sender.documentType,
    senderDocumentNumber:    sender.documentNumber,
    senderPhone:             sender.phone,
    senderAddress:           `${this.packageData.pickupAddress}, ${this.packageData.pickupCity}`,
    senderPostalCode:        sender.postalCode,
    receiverEntityType:      recipient.entityType,
    receiverName:            recipient.name,
    receiverDocumentType:    recipient.documentType,
    receiverDocumentNumber:  recipient.documentNumber,
    receiverPhone:           recipient.phone,
    receiverAddress:         `${this.packageData.deliveryAddress}, ${this.packageData.deliveryCity}`,
    receiverPostalCode:      recipient.postalCode,
    pickupName:              recipient.pickupName           || undefined,
    pickupDocumentType:      recipient.pickupDocumentType   || undefined,
    pickupDocumentNumber:    recipient.pickupDocumentNumber || undefined,
    pickupPostalCode:        recipient.pickupPostalCode     || undefined,
    weightKg:                totalWeight,
    lengthCm:                firstPkg?.length ?? 0,
    widthCm:                 firstPkg?.width  ?? 0,
    heightCm:                firstPkg?.height ?? 0,
    volumeCubicMeters:       volume,
    notes: this.packageData.pickupReference || this.packageData.deliveryReference || undefined,
    products,
  };

  this.packageService.createPackage(payload).subscribe({
    next: (created: any) => {
      this.loading.set(false);
      // Abre el modal de comprobante; al cerrarlo closeTicket() navega a /deliveries
      this.ticketData.set({
        packageCode:     created.packageCode  ?? payload.senderName,
        trackingCode:    created.trackingCode ?? '—',
        senderName:      payload.senderName,
        receiverName:    payload.receiverName,
        senderAddress:   payload.senderAddress,
        receiverAddress: payload.receiverAddress,
        weightKg:        payload.weightKg,
        price:           payload.price ?? null,
        createdAt:       created.createdAt ?? new Date().toISOString(),
        isFragile:       payload.isFragile,
      });
    },
    error: (err: any) => {
      this.error.set(err.error?.message || 'Error al registrar');
      this.loading.set(false);
    },
  });
}
}
