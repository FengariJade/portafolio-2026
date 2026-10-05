import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormSmsComponent } from './form-sms/form-sms.component';
import { ButtonSaveComponent } from '@shared/buttons/button-save/button-save.component';
import { TagModule } from 'primeng/tag';
import { Popover, PopoverModule } from 'primeng/popover';
import { MessageGlobalService } from '@services/generic/message-global.service';
import { SmsCampaignStore } from '@stores/sms-campaign.store';
import { SmsCampaignService } from '@services/sms-campaign.service';
import { Dialog } from 'primeng/dialog';
import { ColumnDefinition, SortField } from '@models/column-table.models';
import { CompleteTableComponent } from '@shared/table/complete-table/complete-table.component';
import { PaginatorComponent } from '@shared/paginator/paginator.component';

@Component({
  selector: 'app-sms',
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    BreadcrumbModule,
    TagModule,
    PopoverModule,
    Dialog,
    CompleteTableComponent,
    PaginatorComponent
  ],
  templateUrl: './sms.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ``,
})
export class SmsComponent implements OnInit {
  listaCampaniasSMS: any[] = [];

  openModal: boolean = false;
  visible: boolean = false;
  @ViewChild('op') op!: Popover;

  private readonly msg = inject(MessageGlobalService);
  private readonly dialogService = inject(DialogService);
  readonly smsStore = inject(SmsCampaignStore);

  listPreview: any[] = [];
  readonly smsCampaignService = inject(SmsCampaignService);

  cols!: ColumnDefinition[];

  orderBy: SortField[] = [
    {
      name: 'Nombre',
      field: 'name',
      type: 'string',
    },
  ];

  limit = signal(10);
  offset = signal(0);
  total = signal(0);

  ngOnInit() {
    this.cols = [
      {
        fields: [{ field: 'createdAt', textClass: 'text-sm font-light' }],
        header: 'Fecha de Creación',
        type: 'date',
        align: 'center',
        format: 'dd/MM/yyyy',
      },
      {
        fields: [{ field: 'name', textClass: 'text-sm font-light' }],
        header: 'Nombre',
        align: 'start',
      },
      {
        fields: [
          { field: 'sender', textClass: 'text-sm font-light text-center' },
        ],
        header: 'ID Remitente',
        align: 'center',
      },
      {
        fields: [{ field: 'message', textClass: 'text-sm font-light' }],
        header: 'Mensaje',
        align: 'center',
      },
      {
        field: 'status',
        type: 'boolean',
        header: 'Estado',
        align: 'center',
        trueText: 'Activo',
        falseText: 'Finalizado',
        isTag: true,
        widthClass: '!w-32',
      },
      {
        header: '',
        type: 'custom-buttons',
        widthClass: '!w-32',
        buttons: [
          {
            component: 'button-progress',
            onClick: 'count',
          },
          {
            component: 'button-count',
            onClick: 'downloadReport',
          },
        ],
      },
    ];

    this.loadData();
  }

  private loadData(q?: Record<string, any>) {
    this.smsStore.loadAll(this.limit(), this.offset(), q);
  }

  searchChange({
    limit,
    offset,
    q,
  }: {
    limit: number;
    offset: number;
    q: Record<string, any>;
  }) {
    this.limit.set(limit);
    this.offset.set(offset);
    this.loadData(q);
  }

  onTableAction(event: { action: string; item: any }) {
    const { action, item } = event;

    switch (action) {
      case 'count':
        this.count(item);
        break;
      case 'downloadReport':
        this.downloadReport(item);
        break;
      default:
        console.warn(`Acción no manejada: ${action}`);
    }
  }

  smsCampanias() {
    return this.smsStore.items().sort((a, b) => b.id - a.id);
  }

  get totalItems(): number {
    return this.smsStore.totalItems();
  }

  onPageChange(event: { limit: number; offset: number }) {
    this.limit.set(event.limit);
    this.offset.set(event.offset);
    this.loadData();
  }

  openNew() {
    this.openModal = true;
    const ref = this.dialogService.open(FormSmsComponent, {
      header: 'Nueva Campaña - SMS',
      styleClass: 'modal-6xl !rounded-[30px]',
      modal: true,
      dismissableMask: false,
      closable: true,
    });

    ref.onClose.subscribe((res) => {
      this.openModal = false;
      if (res) {
        this.loadData(); // método que vuelve a consultar las campañas
      }
    });
  }

  viewdata(item: any) {
    this.smsCampaignService
      .getMessagePreviewDetails(item.id)
      .subscribe((res) => {
        this.listPreview = res.messages;
        this.response = res;
      });
  }
  response: any;
  downloadReport(item: any) {
    this.viewdata(item);
    this.visible = true;
  }

  edit(id: number) {
    this.openModal = true;
    const ref = this.dialogService.open(FormSmsComponent, {
      header: 'Editar Campaña SMS',
      styleClass: 'modal-6xl',
      modal: true,
      dismissableMask: false,
      closable: true,
      data: id,
    });

    ref.onClose.subscribe((res) => {
      this.openModal = false;
      if (res) {
        this.loadData(); // método que vuelve a consultar las campañas
      }
    });
  }

  count(item: any) {
    this.op.toggle(event);
    this.viewdata(item);
  }
}
