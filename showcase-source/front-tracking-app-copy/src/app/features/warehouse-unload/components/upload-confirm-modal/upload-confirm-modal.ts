import { Component, input, output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-unload-confirm-modal',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
        (click)="close.emit()">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
          (click)="$event.stopPropagation()">

          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <iconify-icon icon="mdi:check-circle" class="text-green-500 text-5xl"></iconify-icon>
          </div>

          <h3 class="text-2xl font-bold text-gray-800 mb-2">¡Carga Exitosa!</h3>
          <p class="text-gray-500 text-sm mb-2">
            Se confirmaron <span class="font-bold text-gray-800">{{ scannedCount() }}</span> paquetes.
          </p>
          <p class="text-gray-400 text-xs mb-8">
            Todos los paquetes escaneados han sido marcados como recibidos en el almacén.
          </p>

          <button (click)="close.emit()"
            class="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all">
            Finalizar
          </button>
        </div>
      </div>
    }
  `
})
export class UnloadConfirmModal {
  isOpen       = input<boolean>(false)
  scannedCount = input<number>(0)
  close        = output<void>()
}