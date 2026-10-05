import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TitleSatComponent } from '@shared/title-sat/title-sat.component';
import { ButtonSaveComponent } from '@shared/buttons/button-save/button-save.component';
import { DashboardReportService } from '@services/dashboard-reports.service';
import { DashboardReport } from '@models/dashboard-report.model';
import { PaginatedResponse } from '@interfaces/paginated-response.interface';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { MetabaseReportsService } from '@services/metabase-reports.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportFormComponent } from './report-form/report-form.component';
import { MessageGlobalService } from '@services/generic/message-global.service';
import { CardModule } from 'primeng/card';
import { ButtonEditComponent } from '@shared/buttons/button-edit/button-edit.component';
import { BtnDeleteComponent } from '@shared/buttons/btn-delete/btn-delete.component';

@Component({
  selector: 'app-dashboard-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    IconField,
    CardModule,
    TitleSatComponent,
    ButtonSaveComponent,
    ButtonEditComponent,
    BtnDeleteComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService],
  templateUrl: './dashboard-reports.component.html',
  styles: ``,
})
export class DashboardReportsComponent implements OnInit {
  private readonly msg = inject(MessageGlobalService);
  reports: DashboardReport[] = [];

  selectedReport: DashboardReport | null = null;
  iframeUrl: SafeResourceUrl | null = null;
  isLoading = false;
  searchTerm = '';

  private filters$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private metabaseReportsService: MetabaseReportsService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private readonly dashboardReportService: DashboardReportService
  ) {
    this.filters$
      .pipe(
        debounceTime(300),
        switchMap(() => {
          this.isLoading = true;
          return this.dashboardReportService.getAll(20, 0, {
            searchText: this.searchTerm,
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response: PaginatedResponse<DashboardReport>) => {
        this.reports = response.data;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.loadReportsFilter();
  }

  loadReportsFilter() {
    this.filters$.next();
  }

  selectReport(report: DashboardReport): void {
    this.selectedReport = report;
    this.isLoading = true;
    this.iframeUrl = null;
    if (report.type == 'metabase') {
      this.metabaseReportsService
        .getDashboardAlosat((report.dashboardId ?? '')?.toString())
        .subscribe((res) => {
          const rawUrl = res?.url;
          if (rawUrl?.startsWith('http')) {
            this.iframeUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
            this.isLoading = false;
          } else {
            console.warn('URL insegura o malformada:', rawUrl);
            this.isLoading = false;
          }
        });
    }
  }

  addNew() {
    const ref = this.dialogService.open(ReportFormComponent, {
      header: 'Crear Nuevo Reporte',
      styleClass: 'modal-lg !rounded-[30px]',
      modal: true,
      focusOnShow: false,
      dismissableMask: true,
      closable: true,
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.dashboardReportService.create(result).subscribe({
          next: () => {
            this.loadReportsFilter();
          },
          error: (err) => {
            console.error('Error creando reporte', err);
          },
        });
      }
    });
  }

  editReport(report: DashboardReport) {
    const ref = this.dialogService.open(ReportFormComponent, {
      header: 'Editar Reporte',
      styleClass: 'modal-lg',
      modal: true,
      focusOnShow: false,
      dismissableMask: true,
      closable: true,
      data: { report },
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.dashboardReportService.update(report.id!, result).subscribe({
          next: () => {
            this.loadReportsFilter();
            // Si el reporte editado era el seleccionado, recargamos el iframe
            if (this.selectedReport?.id === report.id) {
              this.selectReport({ ...report, ...result });
            }
          },
          error: (err) => {
            console.error('Error actualizando reporte', err);
          },
        });
      }
    });
  }

  deleteReport(report: DashboardReport) {
    this.msg.confirm(
      'Esta acción es irreversible',
      () => {
        this.dashboardReportService.delete(report.id!).subscribe({
          next: () => {
            this.loadReportsFilter();

            if (this.selectedReport?.id === report.id) {
              this.selectedReport = null;
              this.iframeUrl = null;
            }
          },
          error: (err) => {
            console.error('Error eliminando reporte', err);
            alert('No se pudo eliminar el reporte');
          },
        });
      },
      () => {
        return;
      },
      '¿Desea eliminar este reporte?'
    );
  }
}
