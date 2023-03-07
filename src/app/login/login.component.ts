import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../shared/notification/service/notification.service';
import { AuthCodeHandler } from '../core/handlers/auth-code-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginInProgress: boolean = false;

  constructor(private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.notificationService.showError(
        AuthCodeHandler.convertToNotification('app/invalid-credentials')
      );
      this.loginForm.reset();
    } else {
      this.loginInProgress = true;
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password) // AuthGuard will automatically redirect the user
        .catch((error) => {
          this.notificationService.showError(AuthCodeHandler.convertToNotification(error.code));
          this.loginForm.reset();
        })
        .finally(() => {
          this.loginInProgress = false;
        });
    }
  }
}
