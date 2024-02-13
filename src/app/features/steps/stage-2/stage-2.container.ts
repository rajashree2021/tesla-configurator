import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Stage2Component } from './stage-2.component';
import { Observable } from 'rxjs';
import { getConfigInformation, getStep1Form, getStep2Form } from '../../../core/store/selectors/app.selectors';
import { ConfigInformation, Step1FormInterface, Step2FormInterface } from '../../../core/models/tesla';
import { updateStep2Form } from '../../../core/store/actions/app.action';


@Component({
  selector: 'app-stage-2-container',
  standalone: true,
  imports: [
    AsyncPipe,
    Stage2Component
  ],
  templateUrl: './stage-2.container.html'
})
export class Stage2Container {
  configInformation$: Observable<ConfigInformation | null> = this.store.select(getConfigInformation);
  step1FormState$: Observable<Step1FormInterface | null> = this.store.select(getStep1Form);
  step2FormState$: Observable<Step2FormInterface | null> = this.store.select(getStep2Form);

  constructor(
    private store: Store
  ) {}

  onUpdateStep2Form(updateForm: Step2FormInterface) {
    this.store.dispatch(updateStep2Form( { step2Form: updateForm }))
  }
}
