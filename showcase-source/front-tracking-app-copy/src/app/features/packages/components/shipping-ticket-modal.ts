import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

export interface ShippingTicketData {
  packageCode:   string;
  trackingCode:  string;
  senderName:    string;
  receiverName:  string;
  senderAddress?: string;
  receiverAddress?: string;
  weightKg?:     string | number;
  price?:        string | number | null;
  createdAt?:    string;
  isFragile?:    boolean;
}

@Component({
  selector: 'app-shipping-ticket-modal',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      (click)="onBackdropClick($event)">

      <!-- Panel -->
      <div
        class="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-ticket-in"
        (click)="$event.stopPropagation()">

        <!-- Header strip -->
        <div class="bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <iconify-icon icon="mdi:package-variant-closed" class="text-white" style="font-size:28px"></iconify-icon>
            <div>
              <p class="text-violet-200 text-xs font-medium uppercase tracking-widest">Comprobante de envío</p>
              <p class="text-white font-bold text-lg leading-tight">{{ ticket.packageCode }}</p>
            </div>
          </div>
          <button
            (click)="close.emit()"
            class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
            <iconify-icon icon="mdi:close" class="text-white" style="font-size:18px"></iconify-icon>
          </button>
        </div>

        <!-- Body -->
        <div class="flex flex-col md:flex-row">

          <!-- Left — Ticket info -->
          <div class="flex-1 px-8 py-7 border-r border-dashed border-gray-200">

            <!-- Status badge -->
            <div class="mb-6 flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Paquete registrado
              </span>
              @if (ticket.isFragile) {
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold border border-amber-200">
                  <iconify-icon icon="mdi:glass-fragile" style="font-size:14px"></iconify-icon>
                  Frágil
                </span>
              }
            </div>

            <!-- From / To -->
            <div class="space-y-4 mb-6">
              <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <iconify-icon icon="mdi:map-marker-up" class="text-violet-600" style="font-size:16px"></iconify-icon>
                </div>
                <div>
                  <p class="text-xs text-gray-400 uppercase tracking-wider font-medium">Remitente</p>
                  <p class="text-gray-800 font-semibold">{{ ticket.senderName }}</p>
                  @if (ticket.senderAddress) {
                    <p class="text-gray-500 text-sm">{{ ticket.senderAddress }}</p>
                  }
                </div>
              </div>

              <div class="ml-4 flex items-center gap-2">
                <div class="w-px h-6 bg-gray-200"></div>
                <iconify-icon icon="mdi:arrow-down" class="text-gray-300" style="font-size:14px"></iconify-icon>
              </div>

              <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <iconify-icon icon="mdi:map-marker-check" class="text-violet-600" style="font-size:16px"></iconify-icon>
                </div>
                <div>
                  <p class="text-xs text-gray-400 uppercase tracking-wider font-medium">Destinatario</p>
                  <p class="text-gray-800 font-semibold">{{ ticket.receiverName }}</p>
                  @if (ticket.receiverAddress) {
                    <p class="text-gray-500 text-sm">{{ ticket.receiverAddress }}</p>
                  }
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-dashed border-gray-200 my-5"></div>

            <!-- Meta grid -->
            <div class="grid grid-cols-2 gap-4">
              @if (ticket.weightKg) {
                <div>
                  <p class="text-xs text-gray-400 uppercase tracking-wider">Peso</p>
                  <p class="text-gray-800 font-semibold">{{ ticket.weightKg }} kg</p>
                </div>
              }
              @if (ticket.price != null) {
                <div>
                  <p class="text-xs text-gray-400 uppercase tracking-wider">Precio</p>
                  <p class="text-gray-800 font-semibold">S/ {{ ticket.price }}</p>
                </div>
              }
              @if (ticket.createdAt) {
                <div class="col-span-2">
                  <p class="text-xs text-gray-400 uppercase tracking-wider">Fecha de registro</p>
                  <p class="text-gray-800 font-semibold">{{ ticket.createdAt | date:'dd MMM yyyy, HH:mm' }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Right — QR -->
          <div class="flex flex-col items-center justify-center px-8 py-7 gap-4 bg-gray-50 min-w-[220px]">
            <p class="text-xs text-gray-400 uppercase tracking-widest font-medium">Código de rastreo</p>

            <!-- QR container -->
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <canvas #qrCanvas width="160" height="160"></canvas>
            </div>

            <!-- Tracking code -->
            <div class="text-center">
              <p class="font-mono font-bold text-gray-800 text-lg tracking-widest">
                {{ ticket.trackingCode }}
              </p>
              <p class="text-xs text-gray-400 mt-1">Escanea para rastrear</p>
            </div>
          </div>
        </div>

        <!-- Footer actions -->
        <div class="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p class="text-xs text-gray-400">
            Guarda este comprobante para hacer seguimiento de tu envío.
          </p>
          <div class="flex gap-3">
            <button
              (click)="print()"
              class="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">
              <iconify-icon icon="mdi:printer" style="font-size:16px"></iconify-icon>
              Imprimir
            </button>
            <button
              (click)="close.emit()"
              class="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
              <iconify-icon icon="mdi:check" style="font-size:16px"></iconify-icon>
              Listo
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes ticket-in {
      from { opacity: 0; transform: scale(0.94) translateY(16px); }
      to   { opacity: 1; transform: scale(1)    translateY(0);    }
    }
    .animate-ticket-in {
      animation: ticket-in 0.28s cubic-bezier(.22,.68,0,1.2) forwards;
    }
  `],
})
export class ShippingTicketModal implements AfterViewInit {

  @Input()  ticket!: ShippingTicketData;
  @Output() close = new EventEmitter<void>();

  @ViewChild('qrCanvas') qrCanvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.drawQR(this.ticket.trackingCode);
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement) === e.currentTarget) this.close.emit();
  }

  print(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

   /**
   * Minimal QR code renderer using qrcode-generator loaded via CDN.
   * Falls back to drawing the tracking code as text if the lib isn't loaded.
   *
   * Dependency: qrcode-generator v1.4.4 (global `window.qrcode`)
   * Add this script tag in index.html BEFORE the app bundle:
   *
   *   <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qr.min.js"></script>
   *
   * If the script fails to load, a text fallback is rendered instead.
   */
  private drawQR(text: string): void {
    if (typeof window === 'undefined') return;   // guard SSR

    const canvas = this.qrCanvasRef?.nativeElement;
    if (!canvas) return;

    // Requiere qrcode-generator cargado vía CDN en index.html:
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qr.min.js"></script>
    const qr = (window as any)['qrcode'];
    if (!qr) {
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 160, 160);
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(text, 80, 85);
      return;
    }

    const q = qr(0, 'M');
    q.addData(text);
    q.make();

    const moduleCount = q.getModuleCount();
    const cellSize    = Math.floor(160 / moduleCount);
    const ctx         = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 160, 160);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 160, 160);

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        ctx.fillStyle = q.isDark(row, col) ? '#1e1b4b' : '#ffffff';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}