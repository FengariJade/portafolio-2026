import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LiveMap } from '../live-map/live-map';
import { StatusPanel } from '../status-panel/status-panel';
import { TrackingDelivery } from '../../models/tracking-model';
import { ShipmentTrackingService } from '../../services/ShipmentTrackingService';


@Component({
  selector: 'app-tracking-page',
  imports: [
    CommonModule,
    RouterModule,
    LiveMap,
    StatusPanel,

  ],
  templateUrl: './tracking-page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrackingPage {

  private route = inject(ActivatedRoute);

  deliveryId = signal<string>('');
  delivery = signal<TrackingDelivery | null>(null);

  // Mock data completa
  private trackingService = inject(ShipmentTrackingService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.trackingService.getById(id)
      .subscribe(d => this.delivery.set(d));
  }

}
