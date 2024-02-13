import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, filter, mergeMap, switchMap, take, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
   ROUTER_NAVIGATION,
  RouterNavigationAction,
} from '@ngrx/router-store';
import * as AppActions from '../actions/app.action';
import { Config, ConfigInformation, Step1FormInterface, Step2FormInterface, ModelInformation } from '../../models/tesla';
import { getStep1Form, getStep2Form } from '../selectors/app.selectors';
import { Store } from '@ngrx/store';
import { TeslaService } from '../../../shared/services/apis/tesla.service';

@Injectable()
export class AppEffect {
  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/stage-1')
      ),
      take(1),
      mergeMap(() =>
        this.teslaService.getModels()
          .pipe(
            map((payload: ModelInformation[]) =>
              AppActions.loadModelInformation({ payload })
            ),
        )
      )
    )
  );

  loadConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/stage-2')
      ),
      withLatestFrom(
        this.store.select(getStep1Form),
        this.store.select(getStep2Form),
      ),
      mergeMap(([_router, step1Form, step2Form]: [RouterNavigationAction, Step1FormInterface, Step2FormInterface]) => {
          if (!step1Form.selectedModel.code) {
            return EMPTY;
          }

          return this.teslaService.getOptionByModel(step1Form.selectedModel.code)
          .pipe(
            switchMap((payload: ConfigInformation) => {
              return [
                AppActions.loadConfigs({ payload }),
                AppActions.updateStep2Form({
                  step2Form: {
                    selectedConfig: !step1Form.isDirty ? step2Form.selectedConfig : {} as Config ,
                    currentConfig: !step1Form.isDirty  ? step2Form.currentConfig : '',
                    towHitch: !step1Form.isDirty && step2Form?.towHitch !== undefined ? step2Form?.towHitch : payload.towHitch,
                    yoke: !step1Form.isDirty && step2Form?.yoke !== undefined ? step2Form?.yoke : payload.yoke
                  },
                }),
                AppActions.setStep1FormDirty({ isDirty: false }),
              ]
            })
          )
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private teslaService: TeslaService,
    private store: Store
  ) {}
}
