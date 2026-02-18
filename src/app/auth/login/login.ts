import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private firestore = inject(Firestore);

  loading = signal(false);
  errorMessage = signal('');

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.loading()) return;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.login(email.trim(), password);
      this.loading.set(false);
      this.router.navigate(['/flight-form']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.loading.set(false);
      this.errorMessage.set(this.mapFirebaseError(error?.code));
    }
  }

  async loginWithGoogle() {
    this.loading.set(true);
    this.errorMessage.set('');

    // Detect popup close faster via window focus event.
    // When the Google popup closes, focus returns to our window almost instantly.
    // We wait 300ms to allow a successful login to resolve first before showing error.
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
      const user = credential.user;

      // Check if user profile exists in Firestore
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // If profile doesn't exist, create it
      if (!userDoc.exists()) {
        // Split display name into first and last name
        const displayName = user.displayName || '';
        const nameParts = displayName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        await setDoc(userDocRef, {
          firstName,
          lastName,
          mobile: null,
          email: user.email || '',
          createdAt: new Date()
        });
      }

      this.loading.set(false);
      this.router.navigate(['/flight-form']);
    } catch (error: any) {
      window.removeEventListener('focus', onWindowFocus);
      // Only update if the focus handler hasn't already shown the error
      if (this.loading()) {
        this.loading.set(false);
        this.errorMessage.set(this.mapFirebaseError(error?.code));
      }
    }
  }

  // Error mapping for user-friendly messages
  private mapFirebaseError(code: string | undefined): string {
    switch (code) {
      
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      
      case 'auth/user-not-found':
        return 'No account found with this email. Please register.';
      
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled.';
      
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using a different sign-in method.';
      
      default:
        return 'Authentication failed. Please try again.';
    }
  }
}
