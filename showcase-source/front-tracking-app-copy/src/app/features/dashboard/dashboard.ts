import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusLabelPipe } from '../../shared/pipes/status-label-pipe';
import { Alert, RecentDelivery, StatCard } from './models/dashboard-model';
import { DashboardDataService } from './services/dashboardDataService';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    StatusLabelPipe,
  ],
  templateUrl: './dashboard.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {

  private dashboardService = inject(DashboardDataService);

  greeting: string = this.getGreeting();

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  stats: StatCard[] = [];
  recentDeliveries: RecentDelivery[] = [];
  alerts: Alert[] = [];
  weekActivity: any[] = [];

  ngOnInit() {
    this.dashboardService.getStats().subscribe(d => this.stats = d);
    this.dashboardService.getRecentDeliveries().subscribe(d => this.recentDeliveries = d);
    this.dashboardService.getAlerts().subscribe(d => this.alerts = d);
    this.dashboardService.getWeekActivity().subscribe(d => {
      this.weekActivity = d;
      this.maxActivity = Math.max(...d.map(x => x.delivered + x.failed));
    });
  }

  maxActivity = Math.max(...this.weekActivity.map(d => d.delivered + d.failed));

  today = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

}
