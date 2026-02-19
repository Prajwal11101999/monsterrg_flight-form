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

  /**
   * Validates that password contains at least one uppercase letter
   * @returns Validator function
   */
  static hasUpperCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]/.test(value);
      return hasUpperCase ? null : { noUpperCase: true };
    };
  }

  /**
   * Validates that password contains at least one lowercase letter
   * @returns Validator function
   */
  static hasLowerCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasLowerCase = /[a-z]/.test(value);
      return hasLowerCase ? null : { noLowerCase: true };
    };
  }

  /**
   * Validates that password contains at least one number
   * @returns Validator function
   */
  static hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNumber = /[0-9]/.test(value);
      return hasNumber ? null : { noNumber: true };
    };
  }

  /**
   * Validates that password contains at least one special character
   * @returns Validator function
   */
  static hasSpecialCharacter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      return hasSpecialChar ? null : { noSpecialChar: true };
    };
  }

  /**
   * Validates that password does not contain spaces
   * @returns Validator function
   */
  static noSpaces(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasSpaces = /\s/.test(value);
      return hasSpaces ? { hasSpaces: true } : null;
    };
  }
}
