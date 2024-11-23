import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.passwordConfirmation
    ? null
    : { PasswordNoMatch: true };
};

export function ValidateConfirmPassword(control: AbstractControl) {
  if (!control.value.password || !control.value.passwordConfirmation) {
    return { passwordNotMatch: true };
  }
  return null;
}
