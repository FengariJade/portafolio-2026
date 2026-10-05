export interface Warehouse {
  id:              string;
  code:            string;
  name:            string;
  warehouseType:   'ORIGIN' | 'DESTINATION' | 'TRANSIT' | 'DISTRIBUTION_CENTER';
  address:         string;
  city:            string;
  state:           string;
  country:         string;
  postalCode?:     string;
  latitude?:       number;
  longitude?:      number;
  maxCapacityKg:   number;
  maxCapacityM3:   number;
  managerName?:    string;
  phone?:          string;
  email?:          string;
  isActive:        boolean;
  notes?:          string;
  createdAt:       string;
  updatedAt:       string;
  deletedAt?:      string;
}

export interface CreateWarehouseDto {
  code:           string;
  name:           string;
  warehouseType:  Warehouse['warehouseType'];
  address:        string;
  city:           string;
  state:          string;
  country:        string;
  postalCode?:    string;
  latitude?:      number;
  longitude?:     number;
  maxCapacityKg?: number;
  maxCapacityM3?: number;
  managerName?:   string;
  phone?:         string;
  email?:         string;
  notes?:         string;
}

export interface WarehousesResponse {
  data: Warehouse[];
  meta: { total: number; limit: number; offset: number; };
}