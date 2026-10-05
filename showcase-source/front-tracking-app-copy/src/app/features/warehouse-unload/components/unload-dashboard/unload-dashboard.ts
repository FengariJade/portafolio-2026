import { CommonModule } from '@angular/common'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { WarehouseUnloadService } from '../../services/WarehouseUnloadService'
import { PackageStatus, UnloadManifestDetail, UnloadPackage, UnloadSession } from '../../models/unload-model'
import { UnloadConfirmModal } from '../upload-confirm-modal/upload-confirm-modal'
import { UnloadReportModal } from '../unload-report-modal/unload-report-modal'

type ActiveTab = 'scanned' | 'missing' | 'unexpected'

interface ManifestState {
  detail:      UnloadManifestDetail
  scanned:     UnloadPackage[]
  missing:     UnloadPackage[]
  unexpected:  UnloadPackage[]
  activeTab:   ActiveTab
  barcodeInput: string
  scanError:   string
  lastScanned: string
  showContinue: boolean
  isDone:      boolean
  isConfirmOpen: boolean
  isReportOpen:  boolean
  reportLoading: boolean
  reportError:   string
}

@Component({
  selector: 'app-unload-dashboard',
  imports: [CommonModule, FormsModule, UnloadConfirmModal, UnloadReportModal],
  templateUrl: './unload-dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UnloadDashboard implements OnInit {

  private readonly svc = inject(WarehouseUnloadService)

  // ── Session ──────────────────────────────────────────────
  session      = signal<UnloadSession | null>(null)
  isActive     = signal(false)
  togglingLoad = signal(false)

  // ── Manifiestos múltiples ────────────────────────────────
  manifests    = signal<ManifestState[]>([])
  activeManifestIdx = signal(0)

  // ── Carga de manifiesto ──────────────────────────────────
  manifestQuery   = signal('')
  manifestLoading = signal(false)
  manifestError   = signal('')

  ngOnInit(): void {
    this.checkActiveSession()
  }

  // ── Sesión ───────────────────────────────────────────────

  checkActiveSession(): void {
    this.svc.getActiveSession().subscribe({
      next: session => {
        if (session && session.status === 'ACTIVE') {
          this.session.set(session)
          this.isActive.set(true)
        }
      },
      error: () => {}
    })
  }

  toggleSession(): void {
    this.togglingLoad.set(true)
    if (this.isActive()) {
      this.svc.closeSession(this.session()!.id).subscribe({
        next: () => {
          this.isActive.set(false)
          this.session.set(null)
          this.manifests.set([])
          this.togglingLoad.set(false)
        },
        error: () => this.togglingLoad.set(false)
      })
    } else {
      this.svc.createSession().subscribe({
        next: session => {
          this.session.set(session)
          this.isActive.set(true)
          this.togglingLoad.set(false)
        },
        error: () => this.togglingLoad.set(false)
      })
    }
  }

  // ── Cargar manifiesto ────────────────────────────────────

  loadManifest(): void {
    const query = this.manifestQuery().trim()
    if (!query || !this.session()) return

    this.manifestLoading.set(true)
    this.manifestError.set('')

    this.svc.loadManifest(this.session()!.id, { query }).subscribe({
      next: (res: any) => {
        const muId = res.id

        this.svc.getManifestDetail(this.session()!.id, muId).subscribe({
          next: (detail: any) => {
            const missing: UnloadPackage[] = (detail.missingPackages ?? []).map((p: any) => ({
              packageId:   p.packageId,
              packageCode: p.packageCode,
              status:      'EXPECTED' as PackageStatus,
            }))

            const scanned: UnloadPackage[] = (detail.scannedPackages ?? []).map((p: any) => ({
              packageId:   p.packageId,
              packageCode: p.packageCode,
              status:      'SCANNED' as PackageStatus,
              scannedAt:   p.scannedAt,
            }))

            const unexpected: UnloadPackage[] = (detail.unexpectedPackages ?? []).map((p: any) => ({
              packageId:   p.packageId ?? `ux-${Date.now()}`,
              packageCode: p.packageCode,
              status:      'UNEXPECTED' as PackageStatus,
              scannedAt:   p.scannedAt,
            }))

            const manifestDetail: UnloadManifestDetail = {
              id:              detail.manifestId,
              muId:            detail.id,
              manifestCode:    detail.manifestCode,
              manifestNumber:  detail.manifestCode,
              licensePlate:    detail.licensePlate,
              driverName:      detail.driverName,
              expectedCount:   detail.expectedPackageCount,
              scannedCount:    detail.scannedPackageCount,
              missingCount:    detail.missingPackageCount,
              unexpectedCount: detail.unexpectedPackageCount,
              packages:        missing,
              scanned,
              missing,
              unexpected,
            }

            const newState: ManifestState = {
              detail:        manifestDetail,
              scanned,
              missing,
              unexpected,
              activeTab:     'scanned',
              barcodeInput:  '',
              scanError:     '',
              lastScanned:   '',
              showContinue:  scanned.length > 0 || unexpected.length > 0,
              isDone:        false,
              isConfirmOpen: false,
              isReportOpen:  false,
              reportLoading: false,
              reportError:   '',
            }

            this.manifests.update(list => [...list, newState])
            this.activeManifestIdx.set(this.manifests().length - 1)
            this.manifestQuery.set('')
            this.manifestLoading.set(false)
          },
          error: () => {
            this.manifestError.set('Error al cargar el detalle del manifiesto')
            this.manifestLoading.set(false)
          }
        })
      },
      error: err => {
        if (err?.status === 409) {
          this.manifestError.set('Debes confirmar o reportar el manifiesto activo antes de cargar otro.')
        } else {
          this.manifestError.set(err?.error?.message ?? 'No se encontró el manifiesto')
        }
        this.manifestLoading.set(false)
      }
    })
  }

  removeManifest(idx: number): void {
    this.manifests.update(list => list.filter((_, i) => i !== idx))
    if (this.activeManifestIdx() >= this.manifests().length) {
      this.activeManifestIdx.set(Math.max(0, this.manifests().length - 1))
    }
  }

  // ── Escaneo ──────────────────────────────────────────────

  onBarcodeKeydown(event: KeyboardEvent, idx: number): void {
    if (event.key === 'Enter') this.scanBarcode(idx)
  }

  scanBarcode(idx: number): void {
    const state = this.manifests()[idx]
    const code  = state.barcodeInput.trim()
    if (!code || !this.session()) return

    this.updateManifest(idx, { scanError: '', lastScanned: '' })

    this.svc.scanPackage(this.session()!.id, state.detail.muId, { packageCode: code }).subscribe({
      next: (result: any) => {
        if (result.alreadyScanned) {
          this.updateManifest(idx, {
            scanError:    `⚠️ ${code} ya fue escaneado`,
            barcodeInput: ''
          })
          return
        }

        const scanType = result.scan?.scanType

        if (scanType === 'MATCHED') {
          const pkg = state.missing.find(p => p.packageCode === code)
          if (pkg) {
            this.updateManifest(idx, {
              missing:  state.missing.filter(p => p.packageCode !== code),
              scanned:  [...state.scanned, {
                ...pkg,
                status:    'SCANNED' as PackageStatus,
                scannedAt: result.scan.scannedAt,
              }],
              lastScanned: code,
            })
          }
        } else if (scanType === 'UNEXPECTED') {
          this.updateManifest(idx, {
            unexpected: [...state.unexpected, {
              packageId:   result.scan.packageId ?? `ux-${Date.now()}`,
              packageCode: code,
              status:      'UNEXPECTED' as PackageStatus,
              scannedAt:   result.scan.scannedAt,
            }],
            lastScanned: code,
          })
        }

        this.updateManifest(idx, { barcodeInput: '' })
        this.checkContinue(idx)
      },
      error: err => {
        this.updateManifest(idx, {
          scanError:    err?.error?.message ?? 'Error al escanear',
          barcodeInput: ''
        })
      }
    })
  }
  
  checkContinue(idx: number): void {
    const s = this.manifests()[idx]
    this.updateManifest(idx, { showContinue: s.scanned.length > 0 || s.unexpected.length > 0 })
  }

  // ── Confirmar ────────────────────────────────────────────

  openConfirm(idx: number): void {
    this.svc.confirmUnload(this.session()!.id, this.manifests()[idx].detail.muId).subscribe({
      next: () => this.updateManifest(idx, { isConfirmOpen: true }),
      error: err => this.updateManifest(idx, { reportError: err?.error?.message ?? 'Error al confirmar' })
    })
  }

  closeConfirm(idx: number): void {
    this.updateManifest(idx, { isConfirmOpen: false, isDone: true })
  }

  // ── Reportar ─────────────────────────────────────────────

  openReport(idx: number): void {
    this.updateManifest(idx, { isReportOpen: true })
  }

  onReportConfirm(idx: number, notes: { missingNotes: string; unexpectedNotes: string; driverTestimony: string }): void {
    const state = this.manifests()[idx]
    this.updateManifest(idx, { reportLoading: true, reportError: '' })

    this.svc.reportUnload(this.session()!.id, state.detail.muId, notes).subscribe({
      next: () => {
        this.updateManifest(idx, {
          reportLoading: false,
          isReportOpen:  false,
          isConfirmOpen: true,
        })
      },
      error: err => {
        this.updateManifest(idx, {
          reportLoading: false,
          reportError:   err?.error?.message ?? 'Error al reportar'
        })
      }
    })
  }

  // ── Helpers ──────────────────────────────────────────────

  updateManifest(idx: number, partial: Partial<ManifestState>): void {
    this.manifests.update(list =>
      list.map((m, i) => i === idx ? { ...m, ...partial } : m)
    )
  }

  setTab(idx: number, tab: ActiveTab): void {
    this.updateManifest(idx, { activeTab: tab })
  }

  resetManifest(idx: number): void {
    this.updateManifest(idx, {
      scanned: [], missing: [...this.manifests()[idx].detail.packages],
      unexpected: [], showContinue: false, isDone: false,
      barcodeInput: '', scanError: '', lastScanned: '',
    })
  }

  get activeManifest(): ManifestState | null {
    return this.manifests()[this.activeManifestIdx()] ?? null
  }

  get activeIdx(): number {
    return this.activeManifestIdx()
  }
}