import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validators for reactive forms
 */
export class CustomValidators {

  /**
   * Validates that password and confirm password fields match
   * Should be applied to the FormGroup, not individual controls
   * @returns Validator function
   */
  static passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        // Set error on confirmPassword control for UI display
        confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        // Clear the passwordMismatch error if passwords match
        if (confirmPassword.hasError('passwordMismatch')) {
          const errors = { ...confirmPassword.errors };
          delete errors['passwordMismatch'];
          confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
        }
        return null;
      }
    };
  }
}
