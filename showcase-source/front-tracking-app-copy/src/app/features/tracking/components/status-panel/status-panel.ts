import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusLabelPipe } from '../../../../shared/pipes/status-label-pipe';
import { TrackingDelivery } from '../../models/tracking-model';

@Component({
  selector: 'app-status-panel',
  imports: [
    CommonModule,
    StatusLabelPipe
  ],
  templateUrl: './status-panel.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StatusPanel {

  delivery = input.required<TrackingDelivery>();

  timelineIcon: Record<string, string> = {
    registered: 'mdi:clipboard-check',
    picked_up:  'mdi:package-up',
    in_transit: 'mdi:truck-delivery',
    arrived:    'mdi:map-marker-check',
    delivered:  'mdi:check-circle',
    failed:     'mdi:close-circle',
  };

}
