import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { NotificationModule } from '../shared/notification/notification.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    NotificationModule,
    SpinnerModule,
    MatIconModule
  ]
})
export class ResetPasswordModule {}
