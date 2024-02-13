import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { Config, ConfigInformation, Step1FormInterface, Step2FormInterface } from '../../../core/models/tesla';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { FindModelService } from '../../../shared/services/utilities/find-model.service';

export interface Step2Form {
  selectedConfig: FormControl<Config | null>,
  currentConfig: FormControl<string>,
  towHitch: FormControl<boolean>,
  yoke: FormControl<boolean>,
}

@Component({
  selector: 'app-stage-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ImageComponent,
    CurrencyFormatPipe
  ],
  templateUrl: './stage-2.component.html',
  styleUrl: './stage-2.component.scss'
})
export class Stage2Component implements OnInit, OnChanges {
  

  @Input() configInformation: ConfigInformation | null = null;
  @Input() step1FormState: Step1FormInterface | null = null;
  @Input() step2FormState: Step2FormInterface | null = null;
  @Output() updateStep2Form: EventEmitter<Step2FormInterface> = new EventEmitter<Step2FormInterface>();

  selectedConfig: Config | null = null;

  step2Form: FormGroup = this.formBuilder.group<Step2Form>({
    selectedConfig: new FormControl<Config | null>( null),
    currentConfig: new FormControl<string>('', { nonNullable: true }),
    towHitch: new FormControl<boolean>(false, { nonNullable: true }),
    yoke: new FormControl<boolean>(false, { nonNullable: true }),
  });

  constructor(private formBuilder: FormBuilder, private findModel: FindModelService) {}

  onModelChange(event: Event): void {
    if (!event) return;

    const selectConfig: string = (event.target as HTMLInputElement).value;
    const config: Config | undefined = this.findModel.findCurrentElement<Config>(selectConfig, this.configInformation?.configs);

    if (!config) {
      this.resetConfig();
      return;
    }

    // I set a variable to do not use a getter which is going to trigger a lot of calls
    this.selectedConfig = config;
    this.step2Form.get('selectedConfig')?.patchValue(this.selectedConfig);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['configInformation']?.currentValue !== changes?.['configInformation']?.previousValue) {
      // fill the form with existing values
      this.step2Form.patchValue({
        selectedConfig: this.step2FormState?.selectedConfig,
        currentConfig: this.step2FormState?.currentConfig,
        towHitch: this.step2FormState?.towHitch,
        yoke: this.step2FormState?.yoke,
      }, { emitEvent: false }); // emitEvent to false because we do not want to trigger valueChanges and update the current store

      this.selectedConfig = this.step2Form.get('selectedConfig')?.value || null;
    }
  }

  ngOnInit(): void {
    this.step2Form.valueChanges.pipe(
      tap((value: Step2FormInterface) => {
        this.updateStep2Form.next(value);
      })
    ).subscribe();
  }

  private resetConfig(): void {
    this.step2Form.get('selectedConfig')?.patchValue('');
    this.selectedConfig = null;
  }
}
