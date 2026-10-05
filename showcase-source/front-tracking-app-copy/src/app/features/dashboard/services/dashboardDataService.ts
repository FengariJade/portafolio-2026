import { Injectable } from '@angular/core';
import { DASHBOARD_ALERTS, DASHBOARD_RECENT_DELIVERIES, DASHBOARD_STATS, DASHBOARD_WEEK_ACTIVITY } from '../models/dashboard.mock';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  getStats() {
    return of(DASHBOARD_STATS);
  }

  getRecentDeliveries() {
    return of(DASHBOARD_RECENT_DELIVERIES);
  }

  getAlerts() {
    return of(DASHBOARD_ALERTS);
  }

  getWeekActivity() {
    return of(DASHBOARD_WEEK_ACTIVITY);
  }

}
