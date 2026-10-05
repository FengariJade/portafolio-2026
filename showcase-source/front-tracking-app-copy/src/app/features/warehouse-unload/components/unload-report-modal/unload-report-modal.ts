import { Component, input, output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UnloadPackage } from '../../models/unload-model'

@Component({
  selector: 'app-unload-report-modal',
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
        (click)="close.emit()">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          (click)="$event.stopPropagation()">

          <div class="flex items-center justify-between px-8 py-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div>
              <h3 class="text-xl font-bold text-gray-800">Reportar Incidencias</h3>
              <p class="text-sm text-gray-400 mt-0.5">Describe los paquetes faltantes o sobrantes</p>
            </div>
            <button (click)="close.emit()"
              class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-xl">✕</button>
          </div>

          <div class="px-8 py-6 flex flex-col gap-6">

            @if (missing().length > 0) {
              <div>
                <p class="text-sm font-semibold text-red-600 flex items-center gap-2 mb-3">
                  <iconify-icon icon="mdi:package-variant-remove" class="text-lg"></iconify-icon>
                  {{ missing().length }} paquete(s) faltante(s)
                </p>
                <div class="bg-red-50 rounded-xl p-4 flex flex-col gap-2 mb-3">
                  @for (pkg of missing(); track pkg.packageId) {
                    <div class="flex items-center gap-2 text-sm text-red-700">
                      <iconify-icon icon="mdi:barcode" class="text-base shrink-0"></iconify-icon>
                      <span class="font-mono font-semibold">{{ pkg.packageCode }}</span>
                    </div>
                  }
                </div>
                <label class="text-sm font-medium text-gray-700 block mb-2">Observaciones sobre faltantes</label>
                <textarea [(ngModel)]="missingNotes"
                  placeholder="Describe qué ocurrió con los paquetes faltantes..."
                  rows="3"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-none bg-gray-50">
                </textarea>
              </div>
            }

            @if (unexpected().length > 0) {
              <div>
                <p class="text-sm font-semibold text-orange-600 flex items-center gap-2 mb-3">
                  <iconify-icon icon="mdi:package-variant-plus" class="text-lg"></iconify-icon>
                  {{ unexpected().length }} paquete(s) sobrante(s)
                </p>
                <div class="bg-orange-50 rounded-xl p-4 flex flex-col gap-2 mb-3">
                  @for (pkg of unexpected(); track pkg.packageId) {
                    <div class="flex items-center gap-2 text-sm text-orange-700">
                      <iconify-icon icon="mdi:barcode" class="text-base shrink-0"></iconify-icon>
                      <span class="font-mono font-semibold">{{ pkg.packageCode }}</span>
                    </div>
                  }
                </div>
                <label class="text-sm font-medium text-gray-700 block mb-2">Observaciones sobre sobrantes</label>
                <textarea [(ngModel)]="unexpectedNotes"
                  placeholder="Describe qué ocurrió con los paquetes sobrantes..."
                  rows="3"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-none bg-gray-50">
                </textarea>
              </div>
            }

            <!-- Testimonio del conductor -->
            <div>
              <label class="text-sm font-medium text-gray-700 block mb-2 flex items-center gap-2">
                <iconify-icon icon="mdi:account-voice" class="text-base text-gray-400"></iconify-icon>
                Testimonio del conductor
                <span class="text-gray-400 font-normal">(opcional)</span>
              </label>
              <textarea [(ngModel)]="driverTestimony"
                placeholder="Declaración o comentario del conductor sobre las incidencias..."
                rows="3"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-none bg-gray-50">
              </textarea>
            </div>

          </div>

          @if (error()) {
            <div class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mx-8 mb-4">
              <span>⚠️</span><span>{{ error() }}</span>
            </div>
          }

          <div class="px-8 py-5 border-t border-gray-100 flex justify-between sticky bottom-0 bg-white">
            <button (click)="close.emit()"
              class="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
              Cancelar
            </button>
            <button (click)="emitConfirm()" [disabled]="loading()"
              class="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              [ngClass]="loading() ? 'bg-violet-400' : 'bg-violet-600 hover:bg-violet-700'">
              {{ loading() ? 'Enviando...' : '✓ Confirmar y reportar' }}
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class UnloadReportModal {
  isOpen      = input<boolean>(false)
  missing     = input<UnloadPackage[]>([])
  unexpected  = input<UnloadPackage[]>([])
  loading     = input<boolean>(false)
  error       = input<string>('')
  close       = output<void>()
  reportConfirmed = output<{ missingNotes: string; unexpectedNotes: string; driverTestimony: string }>()

  missingNotes    = ''
  unexpectedNotes = ''
  driverTestimony = ''

  emitConfirm(): void {
    this.reportConfirmed.emit({
      missingNotes:    this.missingNotes,
      unexpectedNotes: this.unexpectedNotes,
      driverTestimony: this.driverTestimony,
    })
  }
}