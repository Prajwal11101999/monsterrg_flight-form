import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, UserProfile } from '../../services/user.service';
import { ErrorMappingService } from '../../services/error-mapping.service';
import { LoggerService } from '../../services/logger.service';
import { CustomValidators } from '../../validators/custom-validators';
import { COUNTRY_CODES } from '../../models/country-codes';

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

  // Signals for reactive state management
  loading = signal(false);
  errorMessage = signal('');

  // Country codes for phone number dropdown
  countryCodes = COUNTRY_CODES;

  // Typed reactive form with custom password match validator
  registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    countryCode: ['+1', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: CustomValidators.passwordsMatch() });

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

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      // Create Firebase Auth account
      const credential = await this.authService.register(email.trim(), password);

      // Create Firestore profile using UserService
      const userProfile: UserProfile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        countryCode: countryCode,
        mobile: mobile.trim(),
        email: email.trim(),
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
