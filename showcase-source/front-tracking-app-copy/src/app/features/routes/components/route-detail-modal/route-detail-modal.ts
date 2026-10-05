import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, RouteNode } from '../../models/routes-model';
import { Warehouse } from '../../../warehouses/models/warehouse-model';
import { RouteTrackingService } from '../../services/RouteTrackingService';
import { WarehouseManagementService } from '../../../warehouses/services/WarehouseManagementService';
import { RouteStatusPipe } from '../../../../shared/pipes/route-status-pipe';

@Component({
  selector: 'app-route-detail-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouteStatusPipe,
  ],
  templateUrl: './route-detail-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RouteDetailModal implements OnInit {

  @Input()  routeId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly svc          = inject(RouteTrackingService);
  private readonly warehouseSvc = inject(WarehouseManagementService);
  private readonly fb           = inject(FormBuilder);

  route             = signal<Route | null>(null);
  nodes             = signal<RouteNode[]>([]);
  warehouses        = signal<Warehouse[]>([]);
  originWarehouse   = signal<Warehouse | null>(null);
  destWarehouse     = signal<Warehouse | null>(null);
  loading           = signal<boolean>(true);
  addingNode        = signal<boolean>(false);
  errorNode         = signal<string>('');

  nodeForm = this.fb.group({
    warehouseId:          ['', Validators.required],
    estimatedOffsetHours: [null as number | null],
    isOptional:           [false],
  });

  ngOnInit(): void {
    // Carga warehouses para el selector de paradas
    this.warehouseSvc.getWarehouses({ limit: 200, offset: 0 }).subscribe({
      next: (res) => this.warehouses.set(res.data),
    });

    this.loadRoute();
  }

  loadRoute(): void {
    this.loading.set(true);
    this.svc.getRouteById(this.routeId).subscribe({
      next: (res) => {
        this.route.set(res);
        this.nodes.set(res.nodes ?? []);
        this.loading.set(false);
        this.resolveWarehouses(res);
      },
      error: () => this.loading.set(false),
    });
  }

  private resolveWarehouses(r: Route): void {
    // Origen — si la API trae la relación embebida úsala, si no la busca por ID
    if (r.originWarehouse) {
      this.originWarehouse.set(r.originWarehouse as any);
    } else if (r.originWarehouseId) {
      this.warehouseSvc.getWarehouseById(r.originWarehouseId).subscribe(w =>
        this.originWarehouse.set(w)
      );
    }

    // Destino
    if (r.destinationWarehouse) {
      this.destWarehouse.set(r.destinationWarehouse as any);
    } else if (r.destinationWarehouseId) {
      this.warehouseSvc.getWarehouseById(r.destinationWarehouseId).subscribe(w =>
        this.destWarehouse.set(w)
      );
    }
  }

  get sortedNodes(): RouteNode[] {
    return [...this.nodes()].sort((a, b) => a.stopOrder - b.stopOrder);
  }

  warehouseName(id: string): string {
    return this.warehouses().find(w => w.id === id)?.name ?? id;
  }

  warehouseCity(id: string): string {
    return this.warehouses().find(w => w.id === id)?.city ?? '';
  }

  submitNode(): void {
    if (this.nodeForm.invalid) { this.nodeForm.markAllAsTouched(); return; }
    this.errorNode.set('');
    const raw = this.nodeForm.getRawValue();
    const nextOrder = this.nodes().length > 0
      ? Math.max(...this.nodes().map(n => n.stopOrder)) + 1
      : 1;

    this.svc.addNode(this.routeId, {
      warehouseId:          raw.warehouseId!,
      stopOrder:            nextOrder,
      estimatedOffsetHours: raw.estimatedOffsetHours ?? undefined,
      isOptional:           raw.isOptional ?? false,
    }).subscribe({
      next:  () => { this.addingNode.set(false); this.nodeForm.reset({ isOptional: false }); this.loadRoute(); },
      error: (err) => this.errorNode.set(err.error?.message || 'Error al agregar parada'),
    });
  }

  removeNode(nodeId: string): void {
    this.svc.removeNode(this.routeId, nodeId).subscribe({
      next: () => this.loadRoute(),
    });
  }
}