import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NotificationModule } from '../shared/notification/notification.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    SpinnerModule,
    NotificationModule
  ]
})
export class RegisterModule {}
