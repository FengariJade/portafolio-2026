import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRouteDto, CreateRouteNodeDto, Route, RouteNode, RoutesResponse } from '../models/routes-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RouteTrackingService {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/routes`;

  getRoutes(params?: {
    limit?:  number;
    offset?: number;
    search?: string;
    status?: string;
  }): Observable<RoutesResponse> {
    let p = new HttpParams()
      .set('limit',  params?.limit  ?? 10)
      .set('offset', params?.offset ?? 0);

    if (params?.search) p = p.set('search', params.search);
    if (params?.status) p = p.set('status', params.status);

    return this.http.get<RoutesResponse>(this.base, { params: p });
  }

  getRouteById(id: string): Observable<Route> {
    return this.http.get<Route>(`${this.base}/${id}`);
  }

  createRoute(dto: CreateRouteDto): Observable<Route> {
    return this.http.post<Route>(this.base, dto);
  }

  updateRoute(id: string, dto: Partial<CreateRouteDto>): Observable<Route> {
    return this.http.put<Route>(`${this.base}/${id}`, dto);
  }

  deleteRoute(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getRouteNodes(routeId: string): Observable<RouteNode[]> {
    return this.http.get<RouteNode[]>(`${this.base}/${routeId}/nodes`);
  }

  addNode(routeId: string, dto: CreateRouteNodeDto): Observable<RouteNode> {
    return this.http.post<RouteNode>(`${this.base}/${routeId}/nodes`, dto);
  }

  removeNode(routeId: string, nodeId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${routeId}/nodes/${nodeId}`);
  }

}
