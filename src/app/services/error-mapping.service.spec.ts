import { TestBed } from '@angular/core/testing';
import { ErrorMappingService } from './error-mapping.service';

describe('ErrorMappingService', () => {
  let service: ErrorMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapFirebaseAuthError', () => {
    it('should return correct message for email-already-in-use', () => {
      const result = service.mapFirebaseAuthError('auth/email-already-in-use');
      expect(result).toBe('This email is already registered. Please login instead.');
    });

    it('should return correct message for invalid-email', () => {
      const result = service.mapFirebaseAuthError('auth/invalid-email');
      expect(result).toBe('Please enter a valid email address.');
    });

    it('should return correct message for user-not-found', () => {
      const result = service.mapFirebaseAuthError('auth/user-not-found');
      expect(result).toBe('No account found with this email. Please register.');
    });

    it('should return correct message for wrong-password', () => {
      const result = service.mapFirebaseAuthError('auth/wrong-password');
      expect(result).toBe('Incorrect password. Please try again.');
    });

    it('should return correct message for weak-password', () => {
      const result = service.mapFirebaseAuthError('auth/weak-password');
      expect(result).toBe('Password must be at least 6 characters long.');
    });

    it('should return correct message for network-request-failed', () => {
      const result = service.mapFirebaseAuthError('auth/network-request-failed');
      expect(result).toBe('Network error. Please check your internet connection.');
    });

    it('should return correct message for too-many-requests', () => {
      const result = service.mapFirebaseAuthError('auth/too-many-requests');
      expect(result).toBe('Too many attempts. Please try again later.');
    });

    it('should return correct message for popup-closed-by-user', () => {
      const result = service.mapFirebaseAuthError('auth/popup-closed-by-user');
      expect(result).toBe('Google sign-in was cancelled.');
    });

    it('should return default message for unknown error code', () => {
      const result = service.mapFirebaseAuthError('auth/unknown-error');
      expect(result).toBe('Authentication failed. Please try again.');
    });

    it('should return default message for undefined error code', () => {
      const result = service.mapFirebaseAuthError(undefined);
      expect(result).toBe('Authentication failed. Please try again.');
    });
  });
});
