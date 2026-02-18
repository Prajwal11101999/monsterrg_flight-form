import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ErrorMappingService } from '../../services/error-mapping.service';
import { LoggerService } from '../../services/logger.service';

/**
 * Login component with email/password and Google authentication
 * Implements OnPush change detection for optimal performance
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

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

  // Typed reactive form
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /**
   * Handles email/password login submission
   */
  async onSubmit(): Promise<void> {
    if (this.loading()) return;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.login(email.trim(), password);
      await this.router.navigate(['/flight-form']);
    } catch (error: unknown) {
      this.handleAuthError(error);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Handles Google OAuth login
   */
  async loginWithGoogle(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');

    // Detect popup close faster via window focus event
    const onWindowFocus = () => {
      setTimeout(() => {
        if (this.loading()) {
          this.loading.set(false);
          this.errorMessage.set('Google sign-in was cancelled.');
        }
      }, 300);
    };
    window.addEventListener('focus', onWindowFocus, { once: true });

    try {
      const credential = await this.authService.loginWithGoogle();
      window.removeEventListener('focus', onWindowFocus);
      
      // Check if user profile exists, create if not
      const userProfile = await this.userService.getUserProfile(credential.user.uid);
      
      if (!userProfile) {
        await this.userService.createProfileFromGoogleAuth(credential.user);
      }

      await this.router.navigate(['/flight-form']);
    } catch (error: unknown) {
      window.removeEventListener('focus', onWindowFocus);
      // Only update if the focus handler hasn't already shown the error
      if (this.loading()) {
        this.handleAuthError(error);
      }
    } finally {
      if (this.loading()) {
        this.loading.set(false);
      }
    }
  }

  /**
   * Centralized error handling with proper type guards
   */
  private handleAuthError(error: unknown): void {
    this.logger.error('Authentication error', error);
    
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
