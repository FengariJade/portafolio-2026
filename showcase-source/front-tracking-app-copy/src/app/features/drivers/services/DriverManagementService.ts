import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Driver, DriverListParams, DriversResponse } from '../models/driver-model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DriverManagementService {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/drivers`;

  getDrivers(params?: DriverListParams): Observable<DriversResponse> {
    let httpParams = new HttpParams()
      .set('limit',  params?.limit  ?? 10)
      .set('offset', params?.offset ?? 0);

    if (params?.search         ) httpParams = httpParams.set('search',         params.search);
    if (params?.status && params.status !== 'all')
                                httpParams = httpParams.set('status',         params.status);
    if (params?.employmentType && params.employmentType !== 'all')
                                httpParams = httpParams.set('employmentType', params.employmentType);

    return this.http.get<DriversResponse>(this.base, { params: httpParams });
  }

  getDriverById(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.base}/${id}`);
  }

  createDriver(dto: Partial<Driver>): Observable<Driver> {
    return this.http.post<Driver>(this.base, dto);
  }

  updateDriver(id: string, dto: Partial<Driver>): Observable<Driver> {
    return this.http.put<Driver>(`${this.base}/${id}`, dto);
  }

  deleteDriver(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
