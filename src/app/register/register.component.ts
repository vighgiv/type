import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../shared/notification/service/notification.service';
import { AuthCodeHandler } from '../core/handlers/auth-code-handler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerInProgress: boolean = false;

  constructor(private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  isInvalidAndTouched(field: string): boolean {
    return this.registerForm.get(field)!.invalid && this.registerForm.get(field)!.touched;
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.notificationService.showError(
        AuthCodeHandler.convertToNotification('app/invalid-register')
      );
    } else {
      this.registerInProgress = true;
      this.authService
        .register(this.registerForm.value)
        .then(() => {
          this.notificationService.showSuccess(
            AuthCodeHandler.convertToNotification('app/success-register')
          );
        })
        .catch((error) => {
          this.notificationService.showError(AuthCodeHandler.convertToNotification(error.code));
        })
        .finally(() => {
          this.registerInProgress = false;
        });
    }
  }
}
