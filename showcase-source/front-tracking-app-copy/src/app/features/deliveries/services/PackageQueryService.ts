import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { ApiPackage, PackageListParams, PaginatedResponse, UpdatePackageDto } from '../models/package.model';

@Injectable({
  providedIn: 'root',
})
export class PackageQueryService {

  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/packages`;


  /** GET /v1/packages */
  getPackages(params?: PackageListParams) {
    let httpParams = new HttpParams();
    if (params?.limit)          httpParams = httpParams.set('limit',          params.limit);
    if (params?.offset !== undefined) httpParams = httpParams.set('offset',   params.offset);
    if (params?.search)         httpParams = httpParams.set('search',         params.search);
    if (params?.trackingStatus && params.trackingStatus !== 'all')
                                httpParams = httpParams.set('trackingStatus', params.trackingStatus);
    return this.http.get<PaginatedResponse<ApiPackage>>(this.base, { params: httpParams });
  }
  
  /** GET /v1/packages/:id */
  getPackageById(id: string) {
    return this.http.get<ApiPackage>(`${this.base}/${id}`);
  }

  /** PUT /v1/packages/:id */
  updatePackage(id: string, dto: UpdatePackageDto) {
    return this.http.put(`${this.base}/${id}`, dto);
  }

  /** DELETE /v1/packages/:id */
  deletePackage(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }

  /** PATCH /v1/packages/:id/status */
  updateStatus(id: string, dto: { internalStatus?: string; trackingStatus?: string }) {
    return this.http.patch(`${this.base}/${id}/status`, dto);
  }

}
