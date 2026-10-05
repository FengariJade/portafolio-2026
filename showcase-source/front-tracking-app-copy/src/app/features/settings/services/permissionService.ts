import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Permission, UpdatePermissionsDto } from '../models/permission.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  private http = inject(HttpClient)
  private base = `${environment.apiUrl}/permissions`

  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.base)
  }

  update(dto: UpdatePermissionsDto): Observable<void> {
    return this.http.put<void>(this.base, dto)
  }
  
}
