import { FormControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: FormControl): ValidationErrors | null {
  let validationErrors = null;
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
    validationErrors = {
      invalid: true
    };
  }
  return validationErrors;
}
