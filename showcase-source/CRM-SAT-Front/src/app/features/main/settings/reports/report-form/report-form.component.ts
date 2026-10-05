import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonCancelComponent } from '@shared/buttons/button-cancel/button-cancel.component';
import { ButtonSaveComponent } from '@shared/buttons/button-save/button-save.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DashboardReport } from '@models/dashboard-report.model';

interface ReportType {
  label: string;
  value: 'metabase' | 'vicidial' | 'custom';
}

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonCancelComponent,
    ButtonSaveComponent,
  ],
  templateUrl: './report-form.component.html',
  styles: []
})
export class ReportFormComponent {
  private ref = inject(DynamicDialogRef);
  public data = inject(DynamicDialogConfig).data as { report?: DashboardReport };
  reportTypes: ReportType[] = [
    { label: 'Metabase', value: 'metabase' },
    { label: 'Vicidial', value: 'vicidial' },
    { label: 'Custom / Otros', value: 'custom' },
  ];

  form = new FormGroup({
    dashboardId: new FormControl<number | null>(null, [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    type: new FormControl<'metabase' | 'vicidial' | 'custom'>('metabase', [Validators.required]),
  });

  constructor()
  {
    this.form.get('type')?.setValue('metabase');
    this.form.get('type')?.disable();
    if (this.data?.report) {
      this.form.patchValue({
        dashboardId: this.data.report.dashboardId,
        name: this.data.report.name,
        description: this.data.report.description || '',
        type: this.data.report.type as any,
      });
    }
  }

  onCancel() {
    this.ref.close(null);
  }

  onSubmit() {

    if (this.form.valid) {
      const data = this.form.getRawValue();
      this.ref.close(data);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
