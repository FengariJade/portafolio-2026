export interface Truck {
  id:             string;
  licensePlate:   string;
  brand:          string;
  model:          string;
  maxWeightKg:    number;
  maxVolumeM3:    number;
  ownershipType:  'OWNED' | 'THIRD_PARTY';
  providerName?:  string;
  status:         'AVAILABLE' | 'ON_ROUTE' | 'MAINTENANCE';
  createdAt:      string;
  updatedAt:      string;
  deletedAt?:     string;
}

export interface TrucksResponse {
  data: Truck[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface CreateTruckDto {
  licensePlate:  string;
  brand:         string;
  model:         string;
  maxWeightKg?:  number;
  maxVolumeM3?:  number;
  ownershipType: 'OWNED' | 'THIRD_PARTY';
  providerName?: string;
}