import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then((m) => m.TypeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
    canActivate: [GuestGuard]
  },
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, GuestGuard]
})
export class AppRoutingModule {}
