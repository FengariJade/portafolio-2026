import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTruckDto, Truck, TrucksResponse } from '../models/vehicle-model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/trucks`;

  getTrucks(params?: {
    limit?:         number;
    offset?:        number;
    search?:        string;
    status?:        string;
    ownershipType?: string;
  }): Observable<TrucksResponse> {
    let httpParams = new HttpParams()
      .set('limit',  params?.limit  ?? 10)
      .set('offset', params?.offset ?? 0);

    if (params?.search        ) httpParams = httpParams.set('search',        params.search);
    if (params?.status        ) httpParams = httpParams.set('status',        params.status);
    if (params?.ownershipType ) httpParams = httpParams.set('ownershipType', params.ownershipType);

    return this.http.get<TrucksResponse>(this.base, { params: httpParams });
  }
  
  getTruckById(id: string): Observable<Truck> {
    return this.http.get<Truck>(`${this.base}/${id}`);
  }

  createTruck(dto: CreateTruckDto): Observable<Truck> {
    return this.http.post<Truck>(this.base, dto);
  }

  updateTruck(id: string, dto: Partial<CreateTruckDto>): Observable<Truck> {
    return this.http.put<Truck>(`${this.base}/${id}`, dto);
  }

  deleteTruck(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
