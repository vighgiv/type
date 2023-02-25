import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from 'src/app/landing/landing.component';
import { UnauthComponent } from './unauth.component';

const routes: Routes = [
  {
    path: '',
    component: UnauthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../../../login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../../../register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        component: LandingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnauthRoutingModule {}
