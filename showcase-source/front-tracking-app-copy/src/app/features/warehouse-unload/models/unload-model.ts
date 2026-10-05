export type UnloadSessionStatus = 'IDLE' | 'ACTIVE' | 'COMPLETED' | 'CLOSED'
export type PackageStatus = 'EXPECTED' | 'SCANNED' | 'MISSING' | 'UNEXPECTED'

export interface UnloadPackage {
  packageId:     string
  packageCode:   string
  trackingCode?: string
  description?:  string
  weightKg?:     string
  status:        PackageStatus
  scannedAt?:    string
}

export interface ManifestUnload {
  id:           string
  manifestId:   string
  manifestCode: string
  status:       string
  packages:     UnloadPackage[]
}

export interface UnloadManifestDetail {
  id:              string
  muId:            string
  manifestCode:    string
  manifestNumber:  string
  licensePlate?:   string
  driverName?:     string
  expectedCount:   number
  scannedCount:    number
  missingCount:    number
  unexpectedCount: number
  packages:        UnloadPackage[]
  scanned:         UnloadPackage[]
  missing:         UnloadPackage[]
  unexpected:      UnloadPackage[]
}

export interface UnloadSession {
  id:              string
  warehouseId:     string
  operatorUserId?: string
  operatorName?:   string
  status:          UnloadSessionStatus
  startedAt?:      string
  closedAt?:       string
  manifestUnloads: ManifestUnload[]
}

export interface LoadManifestDto {
  query: string
}

export interface ScanPackageDto {
  packageCode: string
}

export interface ReportUnloadDto {
  missingNotes:    string
  unexpectedNotes: string
  driverTestimony: string
}

export interface ScanResult {
  alreadyScanned: boolean
  scan?: {
    id:          string
    packageCode: string
    packageId?:  string
    scanType:    'MATCHED' | 'UNEXPECTED'
    scannedAt:   string
  }
  message?: string
}