import { Injectable } from '@angular/core';

/**
 * Centralized service for mapping Firebase error codes to user-friendly messages
 * Following DRY principle - single source of truth for error messages
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorMappingService {

  /**
   * Maps Firebase authentication error codes to user-friendly messages
   * @param code Firebase error code
   * @returns User-friendly error message
   */
  mapFirebaseAuthError(code: string | undefined): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please login instead.';
      
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
