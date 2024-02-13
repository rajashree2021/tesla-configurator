import { createAction, props } from '@ngrx/store';
import { ConfigInformation, ModelInformation, Step1FormInterface, Step2FormInterface } from '../../models/tesla';

export const loadModelInformation = createAction(
  '[TESLA] load model information',
  props<{ payload: ModelInformation[] }>()
);

export const loadConfigs = createAction(
  '[TESLA] load config information',
  props<{ payload: ConfigInformation }>()
);

export const updateStep1Form = createAction(
  '[FORM] update step 1 form',
  props<{ step1Form: Step1FormInterface }>()
);

export const setStep1FormDirty = createAction(
  '[FORM] set step1 dirty',
  props<{ isDirty: boolean }>()
);

export const updateStep2Form = createAction(
  '[FORM] update step 2 form',
  props<{ step2Form: Step2FormInterface }>()
);
