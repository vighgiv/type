import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthCodeHandler } from '../core/handlers/auth-code-handler';
import { AuthCode } from '../core/handlers/enum/auth-codes';
import { AuthService } from '../core/services/auth.service';
import { emailValidator } from '../core/validators/email.validator';
import { NotificationService } from '../shared/notification/service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerInProgress = false;

  constructor(private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  isInvalidAndTouched(field: string): boolean {
    return this.registerForm.get(field)!.invalid && this.registerForm.get(field)!.touched;
  }

  getErrorMessage(field: string): string {
    if (this.registerForm.get(field)!.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} required`;
    }
    return this.registerForm.get(field)!.hasError('invalid') ? 'Email invalid' : '';
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.notificationService.showError(
        AuthCodeHandler.convertToNotification(AuthCode.INVALID_REGISTER_CREDENTIALS)
      );
    } else {
      this.registerInProgress = true;
      this.authService
        .register(this.registerForm.value)
        .then(() => {
          this.notificationService.showSuccess(
            AuthCodeHandler.convertToNotification(AuthCode.SUCCESS_REGISTRATION)
          );
        })
        .catch((error) => {
          this.registerInProgress = false;
          this.notificationService.showError(AuthCodeHandler.convertToNotification(error.code));
        });
    }
  }
}
