import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, UserProfile } from '../../services/user.service';
import { ErrorMappingService } from '../../services/error-mapping.service';
import { LoggerService } from '../../services/logger.service';
import { SanitizationService } from '../../services/sanitization.service';
import { CustomValidators } from '../../validators/custom-validators';
import { COUNTRY_CODES, CountryCode } from '../../models/country-codes';

/**
 * Registration component with form validation and user profile creation
 * Implements OnPush change detection for optimal performance
 */
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  // Using inject() function - modern Angular DI pattern
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);
  private errorMapping = inject(ErrorMappingService);
  private logger = inject(LoggerService);
  private sanitization = inject(SanitizationService);

  // Signals for reactive state management
  loading = signal(false);
  errorMessage = signal('');
  selectedCountry = signal<CountryCode>(COUNTRY_CODES.find((c: CountryCode) => c.dialCode === '+1')!);

  // Country codes for phone number dropdown
  countryCodes = COUNTRY_CODES;

  // Typed reactive form with custom password match validator
  registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    countryCode: ['+1', Validators.required],
    mobile: ['', [Validators.required, this.createMobileValidator(10, 10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      CustomValidators.hasUpperCase(),
      CustomValidators.hasLowerCase(),
      CustomValidators.hasNumber(),
      CustomValidators.hasSpecialCharacter(),
      CustomValidators.noSpaces()
    ]],
    confirmPassword: ['', Validators.required]
  }, { validators: CustomValidators.passwordsMatch() });

  constructor() {
    // Update mobile validation when country code changes
    effect(() => {
      const countryCode = this.registerForm.controls.countryCode.value;
      const country = COUNTRY_CODES.find((c: CountryCode) => c.dialCode === countryCode);
      
      if (country) {
        this.selectedCountry.set(country);
        const mobileControl = this.registerForm.controls.mobile;
        mobileControl.setValidators([
          Validators.required,
          this.createMobileValidator(country.minLength, country.maxLength)
        ]);
        mobileControl.updateValueAndValidity();
      }
    });

    // Subscribe to countryCode changes to trigger effect
    this.registerForm.controls.countryCode.valueChanges.subscribe(() => {
      // This triggers the effect above
    });
  }

  /**
   * Creates a dynamic mobile validator based on country-specific length requirements
   */
  private createMobileValidator(minLength: number, maxLength: number) {
    return (control: any) => {
      const value = control.value?.replace(/\D/g, '') || '';
      
      if (!value) {
        return null; // Let required validator handle empty values
      }

      if (value.length < minLength || value.length > maxLength) {
        if (minLength === maxLength) {
          return { 
            mobileLength: { 
              required: minLength, 
              actual: value.length,
              message: `Mobile number must be exactly ${minLength} digits for ${this.selectedCountry().name}`
            } 
          };
        } else {
          return { 
            mobileLength: { 
              min: minLength,
              max: maxLength,
              actual: value.length,
              message: `Mobile number must be between ${minLength} and ${maxLength} digits for ${this.selectedCountry().name}`
            } 
          };
        }
      }

      return null;
    };
  }

  /**
   * Handles registration form submission
   */
  async onSubmit(): Promise<void> {
    if (this.loading()) return;
    if (this.registerForm.invalid) return;

    const {
      firstName,
      lastName,
      countryCode,
      mobile,
      email,
      password
    } = this.registerForm.getRawValue();

    // Sanitize all inputs before processing
    const sanitizedFirstName = this.sanitization.sanitizeName(firstName);
    const sanitizedLastName = this.sanitization.sanitizeName(lastName);
    const sanitizedMobile = this.sanitization.sanitizePhone(mobile);
    const sanitizedEmail = this.sanitization.sanitizeEmail(email);

    // Check for XSS attempts
    if (this.sanitization.containsXSS(firstName) || 
        this.sanitization.containsXSS(lastName) ||
        this.sanitization.containsXSS(email)) {
      this.errorMessage.set('Invalid input detected. Please remove special characters.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      // Create Firebase Auth account
      const credential = await this.authService.register(sanitizedEmail, password);

      // Create Firestore profile using UserService
      const userProfile: UserProfile = {
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        countryCode: countryCode,
        mobile: sanitizedMobile,
        email: sanitizedEmail,
        createdAt: new Date()
      };

      await this.userService.createUserProfile(credential.user.uid, userProfile);

      await this.router.navigate(['/flight-form']);
    } catch (error: unknown) {
      this.handleRegistrationError(error);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Centralized error handling with proper type guards
   */
  private handleRegistrationError(error: unknown): void {
    this.logger.error('Registration error', error);
    
    const errorCode = this.extractFirebaseErrorCode(error);
    this.errorMessage.set(this.errorMapping.mapFirebaseAuthError(errorCode));
  }

  /**
   * Type-safe extraction of Firebase error code
   */
  private extractFirebaseErrorCode(error: unknown): string | undefined {
    if (error && typeof error === 'object' && 'code' in error) {
      return (error as { code?: string }).code;
    }
    return undefined;
  }
}
