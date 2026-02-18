import { AbstractControl, FormGroup } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('passwordsMatch', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = new FormGroup({
        password: { value: '' } as any,
        confirmPassword: { value: '', setErrors: vi.fn(), hasError: vi.fn() } as any
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

      formGroup.get('password')!.setValue('password123');
      confirmPasswordControl.setValue('different');

      const validator = CustomValidators.passwordsMatch();
      validator(formGroup as AbstractControl);

      expect(confirmPasswordControl.setErrors).toHaveBeenCalled();
    });

    it('should return null when password controls are missing', () => {
      const emptyForm = new FormGroup({});
      
      const validator = CustomValidators.passwordsMatch();
      const result = validator(emptyForm as AbstractControl);

      expect(result).toBeNull();
    });
  });
});
