import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Stage1Component } from './stage-1.component';
import { Observable } from 'rxjs';
import { getStep1Form, getTeslaModelInformation } from '../../../core/store/selectors/app.selectors';
import { ModelInformation, Step1FormInterface } from '../../../core/models/tesla';
import { updateStep1Form } from '../../../core/store/actions/app.action';


@Component({
  selector: 'app-stage-1-container',
  standalone: true,
  imports: [
    AsyncPipe,
    Stage1Component
  ],
  templateUrl: './stage-1.container.html'
})
export class Stage1Container {
  teslaModelInformation$: Observable<ModelInformation[] | null> = this.store.select(getTeslaModelInformation);
  step1FormState$: Observable<Step1FormInterface | null> = this.store.select(getStep1Form);

  constructor(
    private store: Store
  ) {}

  onUpdateStep1Form(updateForm: Step1FormInterface) {
    this.store.dispatch(updateStep1Form( { step1Form: updateForm }))
  }
}
