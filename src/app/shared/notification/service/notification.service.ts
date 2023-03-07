import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationComponent } from '../component/notification.component';
import { NotificationIcon } from '../enum/notification-icon';
import { NotificationContent } from '../model/notification-content';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  open(notificationIcon: NotificationIcon, notificationContent: NotificationContent) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        icon: notificationIcon,
        header: notificationContent.header,
        message: notificationContent.message
      },
      verticalPosition: 'top',
      duration: 6000,
      panelClass: ['glass', 'inverse']
    });
  }

  showSuccess(notificationContent: NotificationContent) {
    this.open(NotificationIcon.SUCCESS, notificationContent);
  }

  showError(notificationContent: NotificationContent) {
    this.open(NotificationIcon.ERROR, notificationContent);
  }
}
