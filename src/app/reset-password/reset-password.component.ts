import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { convertToNotification } from '../core/handlers/auth-code-handler';
import { AuthCode } from '../core/handlers/enum/auth-codes';
import { AuthService } from '../core/services/auth.service';
import { emailValidator } from '../core/validators/email.validator';
import { NotificationService } from '../shared/notification/service/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  resetInProgress = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator])
    });
  }

  onReset() {
    this.resetForm.markAllAsTouched();
    if (this.resetForm.invalid) {
      this.notificationService.showError(convertToNotification(AuthCode.INVALID_EMAIL));
    } else {
      this.resetInProgress = true;
      this.authService
        .resetPassword(this.resetForm.value.email)
        .then(() => {
          this.notificationService.showSuccess(convertToNotification(AuthCode.SUCCESS_RESET));
          this.router.navigate(['/signin']);
        })
        .catch((error) => {
          this.notificationService.showError(convertToNotification(error.code));
        })
        .finally(() => {
          this.resetInProgress = false;
        });
    }
  }
}
