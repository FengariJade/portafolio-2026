export interface CreatePackageDto {
  isFragile?:              boolean;
  price?:                  number;
  senderEntityType:        'NATURAL' | 'COMPANY';
  senderName:              string;
  senderDocumentType:      string;
  senderDocumentNumber:    string;
  senderPhone:             string;
  senderAddress:           string;
  senderPostalCode:        string;
  receiverEntityType:      'NATURAL' | 'COMPANY';
  receiverName:            string;
  receiverDocumentType:    string;
  receiverDocumentNumber:  string;
  receiverPhone:           string;
  receiverAddress:         string;
  receiverPostalCode:      string;
  pickupName?:             string;
  pickupDocumentType?:     string;
  pickupDocumentNumber?:   string;
  pickupPostalCode?:       string;
  weightKg:                number;
  lengthCm:                number;
  widthCm:                 number;
  heightCm:                number;
  volumeCubicMeters:       number;
  notes?:                  string;
  products:                CreateProductDto[];
}

export interface CreateProductDto {
  productCode: string;
  name:        string;
  quantity:    number;
  weightKg:    number;
  lengthCm:    number;
  widthCm:     number;
  heightCm:    number;
}

export interface PackageListParams {
  limit?:  number;
  offset?: number;
}

export interface UpdateProductDto {
  productCode?: string;
  name?:        string;
  quantity?:    number;
  weightKg?:    number;
  lengthCm?:    number;
  widthCm?:     number;
  heightCm?:    number;
}

export interface PackageItem {
  id:          number;
  description: string;
  weight:      number;
  width:       number;
  height:      number;
  length:      number;
  fragile:     boolean;
  category:    string;
  quantity:    number;
}