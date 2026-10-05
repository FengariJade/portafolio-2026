import { Injectable } from '@angular/core';
import { GenericCrudService } from '@services/generic/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { Channel } from '@models/channel.model';
import { DashboardReport } from '@models/dashboard-report.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardReportService extends GenericCrudService<DashboardReport> {
  constructor(http: HttpClient) {
    super(http, 'dashboard-reports');
  }
}
