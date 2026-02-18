import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  loading = signal(false);
  errorMessage = signal('');
  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore
  ) {
    this.registerForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async onSubmit() {

    if (this.loading()) return;
    if (this.registerForm.invalid) return;

    const {
      firstName,
      lastName,
      mobile,
      email,
      password,
      confirmPassword
    } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      // Create Firebase Auth account
      const credential = await this.authService.register(email.trim(), password);
      const user = credential.user;

      // Create Firestore profile
      await setDoc(doc(this.firestore, 'users', user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        createdAt: new Date()
      });

      this.loading.set(false);
      this.router.navigate(['/flight-form']);

    } catch (error: any) {
      console.error('Registration error:', error);
      console.log('Error code:', error?.code);
      
      this.loading.set(false);
      this.errorMessage.set(this.mapFirebaseError(error?.code));
      
      console.log('Loading:', this.loading());
      console.log('Error message:', this.errorMessage());
    }
  }

  // 🔥 Senior-Level Improvement: Centralized Error Mapping
  private mapFirebaseError(code: string | undefined): string {

    switch (code) {

      case 'auth/email-already-in-use':
        return 'This email is already registered. Please login instead.';

      case 'auth/invalid-email':
        return 'Please enter a valid email address.';

      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';

      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';

      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';

      default:
        return 'Registration failed. Please try again.';
    }
  }
}
