import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { NotificationComponent } from './component/notification.component';
import { NotificationService } from './service/notification.service';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatSnackBarModule, MatIconModule],
  providers: [NotificationService],
})
export class NotificationModule {}
