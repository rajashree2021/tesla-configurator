import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { isStep1Valid } from '../store/selectors/app.selectors';

export function step2Guard(): () => Observable<boolean | UrlTree> {
  return () => {
    const store: Store = inject(Store);
    const router: Router = inject(Router);

    return store.select(isStep1Valid)
      .pipe(
        map((isStep1Valid: boolean): boolean | UrlTree => isStep1Valid
          ? isStep1Valid
          : router.createUrlTree(['/stage-1']))
      );
  }
}
