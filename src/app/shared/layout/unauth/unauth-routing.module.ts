import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestGuard } from 'src/app/core/guards/guest.guard';
import { UnauthComponent } from './unauth.component';

const routes: Routes = [
  {
    path: '',
    component: UnauthComponent,
    children: [
      {
        path: 'signin',
        loadChildren: () => import('../../../login/login.module').then((m) => m.LoginModule),
        canActivate: [GuestGuard]
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('../../../reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
        canActivate: [GuestGuard]
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../../../register/register.module').then((m) => m.RegisterModule),
        canActivate: [GuestGuard]
      },
      {
        path: '',
        loadChildren: () => import('../../../landing/landing.module').then((m) => m.LandingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GuestGuard]
})
export class UnauthRoutingModule {}
