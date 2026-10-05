export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  licenseNumber: string;
  licenseCategory: string;
  employmentType: 'OUTSOURCED' | 'INTERNAL' | string;
  status: 'AVAILABLE' | 'ON_ROUTE' | 'OFF_DUTY';
}

export interface DriversResponse {
  data: Driver[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface DriverListParams {
  limit?:          number;
  offset?:         number;
  search?:         string;
  status?:         string;
  employmentType?: string;
}