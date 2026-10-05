import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateManifestDto, CreateRemissionGuideDto, Manifest, ManifestsResponse, RemissionGuide } from '../models/manifest-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/manifests`;

  getManifests(params?: {
    limit?:    number;
    offset?:   number;
    search?:   string;
    status?:   string;
    driverId?: string;
    truckId?:  string;
  }): Observable<ManifestsResponse> {
    let p = new HttpParams()
      .set('limit',  params?.limit  ?? 10)
      .set('offset', params?.offset ?? 0);

    if (params?.search  ) p = p.set('search',   params.search);
    if (params?.status  ) p = p.set('status',   params.status);
    if (params?.driverId) p = p.set('driverId', params.driverId);
    if (params?.truckId ) p = p.set('truckId',  params.truckId);

    return this.http.get<ManifestsResponse>(this.base, { params: p });
  }

  getManifestById(id: string): Observable<Manifest> {
    return this.http.get<Manifest>(`${this.base}/${id}`);
  }

  createManifest(dto: CreateManifestDto): Observable<Manifest> {
    return this.http.post<Manifest>(this.base, dto);
  }

  deleteManifest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // Paquetes
  addPackage(manifestId: string, packageId: string): Observable<any> {
    return this.http.post(`${this.base}/${manifestId}/packages`, { packageId });
  }

  removePackage(manifestId: string, packageId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${manifestId}/packages/${packageId}`);
  }

  // Guías de remisión
  addRemissionGuide(manifestId: string, dto: CreateRemissionGuideDto): Observable<RemissionGuide> {
    return this.http.post<RemissionGuide>(`${this.base}/${manifestId}/remission-guides`, dto);
  }

  removeRemissionGuide(manifestId: string, guideId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${manifestId}/remission-guides/${guideId}`);
  }

}
