import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { isStep2Valid } from '../store/selectors/app.selectors';

export function step3Guard(): () => Observable<boolean | UrlTree> {
  return () => {
    const store: Store = inject(Store);
    const router: Router = inject(Router);

    return store.select(isStep2Valid)
      .pipe(
        map((isStep2Valid: boolean): boolean | UrlTree => isStep2Valid
          ? isStep2Valid
          : router.createUrlTree(['/stage-1']))
      );
  }
}
