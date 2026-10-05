export interface ApiProduct {
  id: string;
  productCode: string;
  name: string;
  quantity: number;
  weightKg: string;
  lengthCm: string;
  widthCm: string;
  heightCm: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPackage {
  id: string;
  packageCode: string;
  trackingCode: string | null;
  isFragile: boolean;
  internalStatus: string;
  trackingStatus: 'CREATED' | 'PICKED_UP' | 'AT_ORIGIN_WAREHOUSE' | 'IN_TRANSIT' |
                  'AT_DESTINATION_WAREHOUSE' | 'OUT_FOR_DELIVERY' | 'DELIVERED' |
                  'FAILED_ATTEMPT' | 'RETURNED_TO_SENDER' | 'EXCEPTION';
  senderName: string;
  senderAddress?: string;
  receiverName: string;
  receiverAddress?: string;
  weightKg: string;
  widthCm: string;
  heightCm: string;
  lengthCm: string;
  createdAt: string;
  updatedAt: string;
  products: ApiProduct[];
  notes?: string;
  pickupName?: string;
  pickupDocumentType?: string;
  pickupDocumentNumber?: string;
}

export interface UpdatePackageDto {
  internalStatus?: 'DRAFT' | 'RECEIVED' | 'STOWED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'RETURNED';
  trackingStatus?: 'CREATED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'EXCEPTION';
  notes?: string;
  pickupName?: string;
  pickupDocumentType?: string;
  pickupDocumentNumber?: string;
}

export interface UpdateStatusDto {
  internalStatus?: ApiPackage['internalStatus'];
  trackingStatus?:  ApiPackage['trackingStatus'];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface PackageListParams {
  limit?:          number;
  offset?:         number;
  search?:         string;
  trackingStatus?: string;
}