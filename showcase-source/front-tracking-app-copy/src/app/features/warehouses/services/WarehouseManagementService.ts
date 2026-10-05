import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { CreateWarehouseDto, Warehouse, WarehousesResponse } from '../models/warehouse-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseManagementService {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/warehouses`;

  getWarehouses(params?: {
    limit?:         number;
    offset?:        number;
    search?:        string;
    warehouseType?: string;
    city?:          string;
    isActive?:      boolean;
  }): Observable<WarehousesResponse> {
    let p = new HttpParams()
      .set('limit',  params?.limit  ?? 10)
      .set('offset', params?.offset ?? 0);

    if (params?.search        ) p = p.set('search',        params.search);
    if (params?.warehouseType ) p = p.set('warehouseType', params.warehouseType);
    if (params?.city          ) p = p.set('city',          params.city);
    if (params?.isActive !== undefined) p = p.set('isActive', String(params.isActive));

    return this.http.get<WarehousesResponse>(this.base, { params: p });
  }

  /** GET /v1/warehouses/:id */
  getWarehouseById(id: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.base}/${id}`);
  }

  /** POST /v1/warehouses */
  createWarehouse(dto: CreateWarehouseDto): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.base, dto);
  }

  /** PUT /v1/warehouses/:id */
  updateWarehouse(id: string, dto: Partial<CreateWarehouseDto>): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.base}/${id}`, dto);
  }

  /** DELETE /v1/warehouses/:id */
  deleteWarehouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
