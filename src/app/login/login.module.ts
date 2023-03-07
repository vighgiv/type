import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NotificationModule } from '../shared/notification/notification.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    SpinnerModule,
    NotificationModule
  ]
})
export class LoginModule {}
