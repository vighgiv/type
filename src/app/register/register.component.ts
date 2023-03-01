import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        updateOn: 'blur',
      }
    );
  }

  isInvalidAndTouched(field: string): boolean {
    return (
      this.registerForm.get(field)!.invalid &&
      this.registerForm.get(field)!.touched
    );
  }

  onRegister() {}
}
