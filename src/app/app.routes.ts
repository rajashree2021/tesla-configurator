import { Routes } from '@angular/router';
import { step2Guard } from './core/guards/step-2.guard';
import { step3Guard } from './core/guards/step-3.guard';
import { Stage1Container } from './features/steps/stage-1/stage-1.container';
import { Stage2Container } from './features/steps/stage-2/stage-2.container';
import { Stage3Container } from './features/steps/stage-3/stage-3.container';

export const routes: Routes = [
  { path: '', redirectTo: 'stage-1', pathMatch: 'full' },
  { path: 'stage-1', title: 'Stage-1', component: Stage1Container },
  { path: 'stage-2', title: 'Stage-2', component: Stage2Container, canActivate: [step2Guard()] },
  { path: 'stage-3', title: 'Stage-3', component: Stage3Container, canActivate: [step3Guard()] },
];
