import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../reducers/app.reducer';

export const app = 'app';

export const appState = createFeatureSelector<AppState>(app);

export const getTeslaModelInformation = createSelector(
  appState,
  (state: AppState) => state.teslaInformation
);

export const getConfigInformation = createSelector(
  appState,
  (state: AppState) => state.configInformation
);

export const getStep1Form = createSelector(
  appState,
  (state: AppState) => state.step1Form
);

export const getStep2Form = createSelector(
  appState,
  (state: AppState) => state.step2Form
);

export const isStep1Valid = createSelector(
  appState,
  (state: AppState) => !(!state.step1Form?.currentModel || !state.step1Form?.currentColor) || false
);

export const isStep2Valid = createSelector(
  appState,
  (state: AppState) => !!(state.step2Form?.selectedConfig?.id) || false
);
