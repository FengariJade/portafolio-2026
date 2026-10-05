export interface Manifest {
  id:                     string;
  manifestCode:           string;
  status:                 'DRAFT' | 'READY_TO_DISPATCH' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
  truckId:                string;
  driverId:               string;
  routeId:                string;
  originWarehouseId:      string;
  destinationWarehouseId: string;
  scheduledDepartureAt?:  string;
  actualDepartureAt?:     string;
  scheduledArrivalAt?:    string;
  actualArrivalAt?:       string;
  totalWeightKg:          number;
  totalVolumeM3:          number;
  sealNumber?:            string;
  notes?:                 string;
  packages?:              ManifestPackage[];
  remissionGuides?:       RemissionGuide[];
  // Relaciones opcionales que puede traer la API
  truck?:                 { id: string; licensePlate: string; brand: string; model: string; };
  driver?:                { id: string; firstName: string; lastName: string; };
  route?:                 { id: string; name: string; code: string; };
  originWarehouse?:       { id: string; name: string; city: string; };
  destinationWarehouse?:  { id: string; name: string; city: string; };
  createdAt:              string;
  updatedAt:              string;
  deletedAt?:             string;
}

export interface ManifestPackage {
  id:                 string;
  packageCode:        string;
  trackingCode:       string;
  internalStatus:     string;
  weightKg:           string;
  volumeCubicMeters:  string;
  // La API no trae packageId ni package anidado en este endpoint
  packageId?:         string;
  package?:           { id: string; packageCode: string; trackingCode: string; senderName: string; receiverName: string; weightKg: string; };
  addedAt?:           string;
}

export interface RemissionGuide {
  id:               string;
  manifestId:       string;
  packageId:        string;
  guideNumber:      string;
  guideType:        'STANDARD' | 'CUSTOMS_AUTHORIZATION' | 'HAZARDOUS_MATERIALS' | 'PHARMACEUTICAL' | 'SPECIAL_CARGO';
  issuingAuthority: string;
  issuedAt:         string;
  expiresAt?:       string;
  documentUrl?:     string;
  description?:     string;
  createdAt:        string;
  updatedAt:        string;
}

export interface CreateManifestDto {
  manifestCode:           string;
  truckId:                string;
  driverId:               string;
  routeId:                string;
  originWarehouseId:      string;
  destinationWarehouseId: string;
  scheduledDepartureAt?:  string;
  scheduledArrivalAt?:    string;
  sealNumber?:            string;
  notes?:                 string;
}

export interface CreateRemissionGuideDto {
  packageId:        string;
  guideNumber:      string;
  guideType:        RemissionGuide['guideType'];
  issuingAuthority: string;
  issuedAt:         string;
  expiresAt?:       string;
  documentUrl?:     string;
  description?:     string;
}

export interface ManifestsResponse {
  data: Manifest[];
  meta: { total: number; limit: number; offset: number; };
}