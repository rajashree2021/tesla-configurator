import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Stage3Component } from './stage-3.component';
import { Observable } from 'rxjs';
import { Step1FormInterface, Step2FormInterface } from '../../../core/models/tesla';
import { getStep1Form, getStep2Form } from '../../../core/store/selectors/app.selectors';


@Component({
  selector: 'app-stage-3-container',
  standalone: true,
  imports: [
    AsyncPipe,
    Stage3Component
  ],
  templateUrl: './stage-3.container.html'
})
export class Stage3Container {
  step1FormState$: Observable<Step1FormInterface | null> = this.store.select(getStep1Form);
  step2FormState$: Observable<Step2FormInterface | null> = this.store.select(getStep2Form);

  constructor(
    private store: Store
  ) {}
}
