import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthCodeHandler } from '../core/handlers/auth-code-handler';
import { AuthCode } from '../core/handlers/enum/auth-codes';
import { AuthService } from '../core/services/auth.service';
import { emailValidator } from '../core/validators/email.validator';
import { NotificationService } from '../shared/notification/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginInProgress = false;

  constructor(private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.notificationService.showError(
        AuthCodeHandler.convertToNotification(AuthCode.INVALID_LOGIN_CREDENTIALS)
      );
    } else {
      this.loginInProgress = true;
      this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password) // AuthGuard will automatically redirect the user on success
        .catch((error) => {
          this.loginInProgress = false;
          this.notificationService.showError(AuthCodeHandler.convertToNotification(error.code));
          error.code === 'auth/wrong-password'
            ? this.loginForm.controls['password'].reset()
            : this.loginForm.reset();
        });
    }
  }
}
