import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthComponent } from './unauth.component';
import { LandingComponent } from 'src/app/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: UnauthComponent,
    children: [
      {
        path: 'signin',
        loadChildren: () => import('../../../login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../../../register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: '',
        loadChildren: () => import('../../../landing/landing.module').then((m) => m.LandingModule),
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnauthRoutingModule {}
