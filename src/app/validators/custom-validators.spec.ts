import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('passwordsMatch', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = new FormGroup({
        password: new FormControl(''),
        confirmPassword: new FormControl('')
      });
    });

    it('should return null when passwords match', () => {
      formGroup.get('password')!.setValue('password123');
      formGroup.get('confirmPassword')!.setValue('password123');

      const validator = CustomValidators.passwordsMatch();
      const result = validator(formGroup as AbstractControl);

      expect(result).toBeNull();
    });

    it('should return passwordMismatch error when passwords do not match', () => {
      formGroup.get('password')!.setValue('password123');
      formGroup.get('confirmPassword')!.setValue('different');

      const validator = CustomValidators.passwordsMatch();
      const result = validator(formGroup as AbstractControl);

      expect(result).toEqual({ passwordMismatch: true });
    });

    it('should handle password controls correctly', () => {
      const confirmPasswordControl = formGroup.get('confirmPassword')!;
      const setErrorsSpy = vi.spyOn(confirmPasswordControl, 'setErrors');

      formGroup.get('password')!.setValue('password123');
      confirmPasswordControl.setValue('different');

      const validator = CustomValidators.passwordsMatch();
      validator(formGroup as AbstractControl);

      expect(setErrorsSpy).toHaveBeenCalled();
    });

    it('should return null when password controls are missing', () => {
      const emptyForm = new FormGroup({});
      
      const validator = CustomValidators.passwordsMatch();
      const result = validator(emptyForm as AbstractControl);

      expect(result).toBeNull();
    });
  });
});
