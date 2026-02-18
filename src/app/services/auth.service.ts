import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';

/**
 * Authentication service handling Firebase Auth operations
 * Provides methods for email/password and Google OAuth authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  /**
   * Observable stream of current authentication state
   */
  public user$: Observable<User | null> = authState(this.auth);

  /**
   * Registers a new user with email and password
   * @param email User's email address
   * @param password User's password (min 6 characters)
   * @returns Promise resolving to UserCredential
   */
  public register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs in existing user with email and password
   * @param email User's email address
   * @param password User's password
   * @returns Promise resolving to UserCredential
   */
  public login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs in user with Google OAuth popup
   * Forces account selection every time for better UX
   * @returns Promise resolving to UserCredential
   */
  public loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    // Force account selection every time (show all available Google accounts)
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this.auth, provider);
  }

  /**
   * Logs out the current user
   * @returns Promise that resolves when sign out is complete
   */
  public logout(): Promise<void> {
    return signOut(this.auth);
  }
}
