import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { AppEffect } from './core/store/effects/app.effect';
import { appReducer } from './core/store/reducers/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      HttpClientModule,
    ]),
    provideRouter(routes),
    provideStore({ app: appReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AppEffect),
    provideRouterStore()
  ]
};
