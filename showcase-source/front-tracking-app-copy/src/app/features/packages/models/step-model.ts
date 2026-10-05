import { PackageItem } from "./package.model";

export type SenderType = 'person' | 'company';

export interface SenderData {
  name:           string;
  email:          string;
  phone:          string;
  documentType:   string;
  documentNumber: string;
  postalCode:     string;
}

export interface RecipientData {
  name:           string;
  email:          string;
  phone:          string;
  documentType:   string;
  documentNumber: string;
  postalCode:     string;
  entityType:     'NATURAL' | 'COMPANY';
  // Campos opcionales de persona que recoge (pickup)
  pickupName?:           string;
  pickupDocumentType?:   string;
  pickupDocumentNumber?: string;
  pickupPostalCode?:     string;
}

export interface ContactsStepData {
  sender:    SenderData;
  recipient: RecipientData;
}

export interface PackageStepData {
  packages:          PackageItem[];
  price?:            number;
  pickupAddress:     string;
  pickupCity:        string;
  pickupReference:   string;
  deliveryAddress:   string;
  deliveryCity:      string;
  deliveryReference: string;
}