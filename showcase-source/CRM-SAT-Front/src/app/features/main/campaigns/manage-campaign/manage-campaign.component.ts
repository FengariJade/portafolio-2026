import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDetailComponent } from '@shared/buttons/button-detail/button-detail.component';
import { ButtonSaveComponent } from '@shared/buttons/button-save/button-save.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { MessageGlobalService } from '@services/generic/message-global.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AudioSettingsComponent } from './audio-settings/audio-settings.component';
import { ProgresoCampaniaComponent } from './progreso-campania/progreso-campania.component';
import { AudioCampaignStore } from '@stores/audio-campaign.store';
import { TagModule } from 'primeng/tag';
import { AudioCampaignService } from '@services/audio-campaign.service';
import { AudioCampaign } from '@models/audio-campaign.model';
import { CampaignDetalleComponent } from './campaign-detalle/campaign-detalle.component';
import { MultiCampaignAudioComponent } from './multi-campaign-audio/multi-campaign-audio.component';
import { BtnDeleteComponent } from '@shared/buttons/btn-delete/btn-delete.component';
import { AudioStoreService } from '@services/audio-store.service';
import { PaginatorComponent } from '@shared/paginator/paginator.component';
import { ColumnDefinition, SortField } from '@models/column-table.models';
import { CompleteTableComponent } from '@shared/table/complete-table/complete-table.component';

@Component({
  selector: 'app-manage-campaign',
  imports: [
    TableModule,
    InputTextModule,
    CommonModule,
    ColorPickerModule,
    ButtonModule,
    FormsModule,
    BreadcrumbModule,
    OverlayPanelModule,
    // ButtonProgressComponent,
    TagModule,
    CompleteTableComponent,
  ],
  templateUrl: './manage-campaign.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ``,
})
export class ManageMampaignComponent {
  campaniaList: AudioCampaign[] = [];
  campaniaListFiltradas: AudioCampaign[] = [];
  filtroNombre: string = '';
  openModal: boolean = false;
  openModalMultipy: boolean = false;
  openModalDetalle: boolean = false;
  private readonly msg = inject(MessageGlobalService);

  private readonly dialogService = inject(DialogService);
  private readonly audioStoreService = inject(AudioStoreService);
  private readonly campaignStore = inject(AudioCampaignStore);
  readonly campaignService = inject(AudioCampaignService);

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

  get totalItems(): number {
    return this.campaignStore.totalItems();
  }

  ngOnInit(): void {
    this.cols = [
      {
        fields: [{ field: 'vdlistId', textClass: 'text-sm font-light' }],
        header: 'Lista ID',
        align: 'start',
      },
      {
        fields: [{ field: 'name', textClass: 'text-sm font-light' }],
        header: 'Nombre Lista',
        align: 'start',
      },
      {
        fields: [{ field: 'typeLabel', textClass: 'text-sm font-light' }],
        header: 'Tipo Campaña',
        align: 'start',
      },
      {
        fields: [{ field: 'vdCampaignName', textClass: 'text-sm font-light' }],
        header: 'Nombre Campaña',
        align: 'start',
      },
      {
        fields: [{ field: 'department.name', textClass: 'text-sm font-light' }],
        header: 'Área',
        align: 'center',
      },
      {
        fields: [
          { field: 'startDate', textClass: 'text-sm text-center font-light' },
        ],
        header: 'Fecha de Inicio',
        align: 'center',
        type: 'date',
        format: 'dd/MM/yyyy',
      },
      {
        field: 'active',
        type: 'boolean',
        header: 'Estado',
        align: 'center',
        trueText: 'Activo',
        falseText: 'Inactivo',
        isTag: true,
        widthClass: '!w-32',
        onClick: 'updateStatus',
      },
      {
        fields: [{ field: 'advance', textClass: 'text-sm font-light' }],
        header: 'Avance',
        align: 'center',
      },
      {
        fields: [
          { field: 'createdByUser.name', textClass: 'text-sm font-light' },
        ],
        header: 'Creado por',
        align: 'center',
      },
      {
        header: '',
        type: 'custom-buttons',
        widthClass: '!w-32',
        buttons: [
          {
            component: 'button-detail',
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

  // loadData() {
  //   this.campaignService
  //     .getAll(this.limit(), this.offset())
  //     .subscribe((res) => {
  //       if (res) {
  //         this.total.set(res?.total ?? 0);
  //         this.campaniaList = res.data;
  //         this.campaniaListFiltradas = [...this.campaniaList];
  //       }
  //     });
  // }

  loadData(q?: Record<string, any>) {
    this.campaignService
      .getAll(this.limit(), this.offset(), q)
      .subscribe((res) => {
        if (res) {
          this.total.set(res?.total ?? 0);
          this.campaniaList = res.data.map((item) => ({
            ...item,
            typeLabel:
              item.type === 'I'
                ? 'Individual'
                : item.type === 'M'
                ? 'Múltiple'
                : 'Desconocido',
            advance: `${item.result?.numeros_discados ?? 0} / ${
              item.result?.total_leads ?? 0
            }`,
          }));
          this.campaniaListFiltradas = [...this.campaniaList];
        }
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
      case 'updateStatus':
        this.updateStatus(item);
        break;
      default:
        console.warn(`Acción no manejada: ${action}`);
    }
  }

  refresh() {
    this.loadData();
  }

  private resetOnSuccessEffect = effect(() => {
    const error = this.campaignStore.error();
    const action = this.campaignStore.lastAction();

    // Manejo de errores
    if (!this.openModal && !this.openModalDetalle && error) {
      console.log('error', error);
      this.msg.error(
        error ?? '¡Ups, ocurrió un error inesperado al eliminar la Campaña!'
      );
      return; // Salimos si hay un error
    }

    // Si se ha creado o actualizado correctamente
    if (action === 'deleted') {
      this.msg.success('¡La Campaña fue eliminado exitosamente!');
      this.campaignStore.clearSelected();
      this.loadData();
      return;
    }
  });

  onPageChange(event: { limit: number; offset: number }) {
    this.limit.set(event.limit);
    this.offset.set(event.offset);
    this.loadData();
  }

  filtrar() {
    const filtro = this.filtroNombre.toLowerCase();
    this.campaniaListFiltradas = this.campaniaList.filter((c) =>
      c.name.toLowerCase().includes(filtro)
    );
  }

  addNew() {
    this.campaignStore.clearSelected();
    this.openModal = true;
    const ref = this.dialogService.open(AudioSettingsComponent, {
      header: 'Nueva Campaña - Audio',
      styleClass: 'modal-8xl !text-black !rounded-[30px]',
      modal: true,
      dismissableMask: false,
      closable: true,
    });

    ref.onClose.subscribe((res) => {
      this.openModal = false;
      this.loadData();
    });
  }

  addNewMultiple() {
    this.openModalMultipy = true;
    const ref = this.dialogService.open(MultiCampaignAudioComponent, {
      header:
        'Sube tu Excel, elige variables y arma un mensaje único. ¡Fácil y rápido!',
      styleClass: 'modal-8xl !text-black !rounded-[30px]',
      modal: true,
      dismissableMask: false,
      closable: true,
    });

    ref.onClose.subscribe((res) => {
      this.openModalMultipy = false;
      this.loadData();
    });
  }

  menuAbierto: number | null = null;

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  cerrarMenu() {
    this.menuAbierto = null;
  }

  getContraste(color: string): string {
    // Convierte color hex a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calcular luminancia
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Retorna blanco si es oscuro, negro si es claro
    return luminancia > 0.5 ? '#000000' : '#ffffff';
  }

  edit(registro: any) {
    this.campaignStore.loadById(registro.id);
    this.openModal = true;
    const ref = this.dialogService.open(CreateCampaignComponent, {
      data: registro,
      header: 'Editar Campaña - ' + registro.nombre,
      styleClass: 'modal-8xl',
      modal: true,
      dismissableMask: false,
      closable: true,
    });

    ref.onClose.subscribe((res) => {
      this.openModal = false;
      this.loadData();
    });
  }

  remove(registro: any) {
    this.msg.confirm(
      `<div class='px-4 py-2'>
            <p class='text-center'> ¿Está seguro de eliminar la campaña <span class='uppercase font-bold'>${registro.name}</span>? </p>
            <p class='text-center'> Esta acción no se puede deshacer. </p>
          </div>`,
      () => {
        this.campaignStore.delete(registro.id);
      }
    );
  }

  copiarCampaniaId(registro: any) {
    navigator.clipboard
      .writeText(registro.campaniaId)
      .then(() => {
        registro.copiado = true;

        setTimeout(() => {
          registro.copiado = false;
        }, 1000);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  }

  verResultadosProgreso(registro: any) {
    const modal_item = this.dialogService.open(ProgresoCampaniaComponent, {
      data: registro,
      header: 'Progreso de Campaña ' + registro.name,
      styleClass: 'modal-lg',
      modal: true,
      dismissableMask: false,
      closable: true,
    });
    modal_item.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  verResultados(registro: any) {
    console.log(registro);
    const modal_item = this.dialogService.open(CampaignDetalleComponent, {
      data: registro,
      header: 'Gestionar ' + registro.name,
      styleClass: 'modal-lg',
      modal: true,
      dismissableMask: false,
      closable: true,
    });
    modal_item.onClose.subscribe((res) => {
      if (res) {
        this.loadData();
      }
    });
  }

  configurar(registro: any) {}

  updateStatus(registro: any) {
    const accion = registro.active === 'Y' ? 'DESACTIVAR' : 'ACTIVAR';
    const colorAccion =
      registro.active === 'Y' ? 'text-red-600' : 'text-green-600';

    this.msg.confirm(
      `<div class='px-4 py-3 text-center'>
        <p class='text-lg font-semibold'>
          ¿Desea <span class='${colorAccion} uppercase'>${accion}</span> la campaña
          <span class='font-bold uppercase text-gray-800'>${
            registro.name
          }</span>?
        </p>
        <p class='text-sm text-gray-500 mt-2'>
          Esta acción ${
            accion === 'DESACTIVAR'
              ? 'deshabilitará temporalmente'
              : 'habilitará nuevamente'
          } la campaña en el sistema.
        </p>
      </div>`,
      () => {
        //this.campaignService.update()

        const request = {
          active: registro.active === 'Y' ? 'N' : 'Y',
          vdlistId: registro.vdlistId,
        };

        this.audioStoreService
          .editarList(registro.id, request)
          .subscribe((res) => {
            if (res.status == 'updated') {
              this.msg.success('El estado fue actualizado correctamente.');
              this.loadData();
            }
          });
      }
    );
  }
}
