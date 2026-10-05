import { Injectable } from '@angular/core';
import { mockDeliveries } from '../models/tracking.mock';
import { of } from 'rxjs';
import { activeTrucks } from '../models/live-map.mock';

@Injectable({
  providedIn: 'root',
})
export class ShipmentTrackingService {

  getAll() {
    return of(mockDeliveries);
  }

  getById(id: string) {
    const found = mockDeliveries.find(d => d.id === id);
    return of(found ?? null);
  }

  getActiveTrucks() {
    return of(activeTrucks);
  }
  
}
