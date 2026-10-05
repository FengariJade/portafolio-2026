export interface Route {
  id:                      string;
  code:                    string;
  name:                    string;
  originWarehouseId:       string;
  destinationWarehouseId:  string;
  originWarehouse?:        { id: string; name: string; city: string; };
  destinationWarehouse?:   { id: string; name: string; city: string; };
  distanceKm?:             number;
  estimatedDurationHours?: number;
  status:                  'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  notes?:                  string;
  nodes?:                  RouteNode[];
  createdAt:               string;
  updatedAt:               string;
  deletedAt?:              string;
}

export interface RouteNode {
  id:                    string;
  routeId:               string;
  warehouseId:           string;
  warehouse?:            { id: string; name: string; city: string; };
  stopOrder:             number;
  estimatedOffsetHours?: number;
  isOptional:            boolean;
  createdAt:             string;
  updatedAt:             string;
}

export interface CreateRouteDto {
  code:                    string;
  name:                    string;
  originWarehouseId:       string;
  destinationWarehouseId:  string;
  distanceKm?:             number;
  estimatedDurationHours?: number;
  notes?:                  string;
}

export interface CreateRouteNodeDto {
  warehouseId:           string;
  stopOrder:             number;
  estimatedOffsetHours?: number;
  isOptional:            boolean;
}

export interface RoutesResponse {
  data: Route[];
  meta: { total: number; limit: number; offset: number; };
}