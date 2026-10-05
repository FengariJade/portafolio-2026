import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MessageGlobalService } from '@services/generic/message-global.service';
import { ButtonSaveComponent } from '@shared/buttons/button-save/button-save.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { ManageEmailComponent } from './manage-email/manage-email.component';
import { EmailCampaignService } from '@services/email-campaign.service';
import { EmailCampaignStore } from '@stores/email-campaign.store';
import { TagModule } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CompleteTableComponent } from '@shared/table/complete-table/complete-table.component';
import { ColumnDefinition, SortField } from '@models/column-table.models';
import { PaginatorComponent } from '@shared/paginator/paginator.component';
@Component({
  selector: 'app-mail',
  imports: [
    TableModule,
    TagModule,
    Dialog,
    ButtonModule,
    RippleModule,
    CompleteTableComponent,
    PaginatorComponent
  ],
  templateUrl: './mail.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ``,
})
export class MailComponent implements OnInit {
  private readonly msg = inject(MessageGlobalService);
  private readonly dialogService = inject(DialogService);
  readonly emailCampaignStore = inject(EmailCampaignStore);
  readonly emailCampaignService = inject(EmailCampaignService);

  get totalItems(): number {
    return this.emailCampaignStore.totalItems();
  }

  listaCampaniasSMS: any[] = [];
  openModal: boolean = true;
  openModalEmail: boolean = true;
  visible: boolean = false;
  listPreview: any[] = [];
  expandedRows: { [key: string]: boolean } = {};
  limit = signal<number>(10);
  offset = signal<number>(0);
  total = signal(0);

  cols!: ColumnDefinition[];

  orderBy: SortField[] = [
    {
      name: 'Nombre',
      field: 'name',
      type: 'string',
    },
  ];

  private resetOnSuccessEffect = effect(() => {
    const error = this.emailCampaignStore.error();
    const action = this.emailCampaignStore.lastAction();

    // Manejo de errores
    if (!this.openModal && error) {
      console.log('error', error);
      this.msg.error(
        error ?? '¡Ups, ocurrió un error inesperado al eliminar la campaña!'
      );
      return; // Salimos si hay un error
    }

    // Si se ha creado o actualizado correctamente
    if (action === 'deleted') {
      this.msg.success('Campaña eliminada exitosamente!');

      this.emailCampaignStore.clearSelected();
      this.loadData();
      return;
    }
  });

  ngOnInit(): void {
    this.cols = [
      {
        fields: [{ field: 'id', textClass: 'text-sm font-light' }],
        header: 'ID',
        align: 'start',
        widthClass: '!w-12',
      },
      {
        fields: [{ field: 'name', textClass: 'text-sm font-light' }],
        header: 'Nombre',
        align: 'start',
      },
      {
        fields: [{ field: 'subject', textClass: 'text-sm font-light' }],
        header: 'Asunto',
        align: 'start',
      },
      {
        fields: [{ field: 'template.name', textClass: 'text-sm font-light' }],
        header: 'Plantilla',
        align: 'start',
      },
      {
        fields: [
          {
            field: 'totalRegistered',
            textClass: 'text-sm font-light text-center',
          },
        ],
        header: 'Registros',
        align: 'center',
      },
      {
        fields: [
          {
            field: 'createdAt',
            textClass: 'text-sm font-light text-center',
          },
        ],
        header: 'Fecha',
        align: 'center',
        type: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        field: 'campaignStatus',
        type: 'boolean',
        header: 'Estado',
        align: 'center',
        trueText: 'Aprobado',
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
            component: 'button-count',
            onClick: 'verResultados',
          },
          {
            component: 'btn-delete',
            onClick: 'remove',
          },
        ],
      },
    ];
    this.loadData();
  }

  loadData(q?: Record<string, any>) {
    this.emailCampaignService
      .getAll(this.limit(), this.offset(), q)
      .subscribe((res) => {
        this.total.set(res?.total ?? 0);
        this.listaCampaniasSMS = res.data;
      });
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
      case 'verResultados':
        this.verResultados(item);
        break;
      case 'remove':
        this.remove(item);
        break;
      default:
        console.warn(`Acción no manejada: ${action}`);
    }
  }

  onPageChange(event: { limit: number; offset: number }) {
    this.limit.set(event.limit);
    this.offset.set(event.offset);
    this.loadData();
  }

  openNew() {
    this.openModalEmail = true;
    const ref = this.dialogService.open(ManageEmailComponent, {
      header: 'Nueva Campaña - Correo',
      styleClass: 'modal-6xl !rounded-[30px]',
      modal: true,
      dismissableMask: false,
      closable: true,
    });
    ref.onClose.subscribe((res) => {
      this.openModalEmail = false;
      this.loadData();
    });
  }

  openTemplate() {
    this.openModal = true;
    const ref = this.dialogService.open(EmailTemplateComponent, {
      header: 'Configuración de plantilla de correo electrónico',
      styleClass: 'modal-6xl',
      modal: true,
      dismissableMask: false,
      closable: true,
    });
    ref.onClose.subscribe((res) => {
      this.openModal = false;
      this.loadData();
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Aprobado';
      case 2:
        return 'Cancelado';
      case 3:
        return 'Finalizado';
      default:
        return 'Desconocido';
    }
  }

  getStatusSeverity(status: number): string {
    switch (status) {
      case 1:
        return 'success'; // Verde (Aprobado)
      case 2:
        return 'danger'; // Rojo (Cancelado)
      case 3:
        return 'info'; // Azul (Finalizado)
      default:
        return 'secondary';
    }
  }

  edit(registro: any) {}

  visibleTemplate = false;
  selectedMessage: string = '';

  showTemplate(item: any) {
    this.selectedMessage = item.message;
    this.visibleTemplate = true;
  }

  remove(registro: any) {
    this.msg.confirm(
      `<div class='px-4 py-2'>
            <p class='text-center'> ¿Está seguro de eliminar la campaña <span class='uppercase font-bold'>${registro.name}</span>? </p>
            <p class='text-center'> Esta acción no se puede deshacer. </p>
          </div>`,
      () => {
        console.log('eliminar', registro);
        this.emailCampaignStore.delete(registro.id);
      }
    );
  }

  verResultados(registro: any) {
    this.visible = true;
    this.emailCampaignService.getEmailTemplate(registro.id).subscribe((res) => {
      this.listPreview = res.data;
    });
  }
}
