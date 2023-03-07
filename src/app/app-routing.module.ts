import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuestGuard } from './core/guards/guest.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/layout/unauth/unauth.module').then((m) => m.UnauthModule),
    canActivate: [GuestGuard]
  },
  {
    path: '',
    loadChildren: () => import('./shared/layout/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GuestGuard, AuthGuard]
})
export class AppRoutingModule {}
