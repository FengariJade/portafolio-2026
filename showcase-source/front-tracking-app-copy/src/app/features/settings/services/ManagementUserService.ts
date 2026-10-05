import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, User } from '../models/users-modal';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ManagementUserService {

  private http = inject(HttpClient)
  private base = `${environment.apiUrl}/users`

  getAll(role?: string): Observable<User[]> {
    const params = role ? `?role=${role}` : ''
    return this.http.get<User[]>(`${this.base}${params}`)
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`)
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.base, dto)
  }

  update(id: string, dto: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}`, dto)
  }

  toggleStatus(id: string, isActive: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/${id}/status`, { isActive })
  }
  
}
