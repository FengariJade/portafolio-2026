import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../../environments/environments'
import { Observable } from 'rxjs'
import {
  UnloadSession, UnloadManifestDetail,
  LoadManifestDto, ScanPackageDto, ScanResult, ReportUnloadDto
} from '../models/unload-model'

export interface UnloadHistoryItem {
  id:              string
  manifestNumber:  string
  licensePlate:    string
  driverName:      string
  status:          string
  totalExpected:   number
  totalScanned:    number
  totalMissing:    number
  totalUnexpected: number
  startedAt:       string
  completedAt?:    string
}

export interface UnloadHistoryResponse {
  data:  UnloadHistoryItem[]
  meta:  { total: number; limit: number; offset: number }
}

@Injectable({ providedIn: 'root' })
export class WarehouseUnloadService {

  private readonly http = inject(HttpClient)
  private readonly base = `${environment.apiUrl}/unload-sessions`

  // ── Sesión ───────────────────────────────────────────────

  createSession(): Observable<UnloadSession> {
    return this.http.post<UnloadSession>(this.base, {})
  }

  getActiveSession(): Observable<UnloadSession | null> {
    return this.http.get<UnloadSession | null>(`${this.base}/active`)
  }

  closeSession(sessionId: string): Observable<void> {
    return this.http.patch<void>(`${this.base}/${sessionId}/close`, {})
  }

  // ── Manifiesto ───────────────────────────────────────────

  loadManifest(sessionId: string, dto: LoadManifestDto): Observable<UnloadManifestDetail> {
    return this.http.post<UnloadManifestDetail>(`${this.base}/${sessionId}/manifests`, dto)
  }

  getManifestDetail(sessionId: string, muId: string): Observable<UnloadManifestDetail> {
    return this.http.get<UnloadManifestDetail>(`${this.base}/${sessionId}/manifests/${muId}`)
  }

  // ── Escaneo ──────────────────────────────────────────────

  scanPackage(sessionId: string, muId: string, dto: ScanPackageDto): Observable<ScanResult> {
    return this.http.post<ScanResult>(`${this.base}/${sessionId}/manifests/${muId}/scans`, dto)
  }

  // ── Confirmación / Reporte ───────────────────────────────

  confirmUnload(sessionId: string, muId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/${sessionId}/manifests/${muId}/confirm`, {})
  }

  reportUnload(sessionId: string, muId: string, dto: ReportUnloadDto): Observable<void> {
    return this.http.post<void>(`${this.base}/${sessionId}/manifests/${muId}/report`, dto)
  }

  // ── Historial ────────────────────────────────────────────

  getHistory(limit = 10, offset = 0): Observable<UnloadHistoryResponse> {
    const params = new HttpParams()
      .set('limit',  limit)
      .set('offset', offset)
    return this.http.get<UnloadHistoryResponse>(`${this.base}/history`, { params })
  }
}