import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { MenubarComponent } from './menubar.component';
import { Observable } from 'rxjs';
import { isStep1Valid, isStep2Valid } from '../../../store/selectors/app.selectors';


@Component({
  selector: 'app-menubar-container',
  standalone: true,
  imports: [
    AsyncPipe,
    MenubarComponent
  ],
  templateUrl: './menubar.container.html'
})
export class MenubarContainer {
  isStep1Valid$: Observable<boolean | null> = this.store.select(isStep1Valid);
  isStep2Valid$: Observable<boolean | null> = this.store.select(isStep2Valid);

  constructor(
    private store: Store
  ) {}
}
