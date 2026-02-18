import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  // Register new user
  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login existing user
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Google login
  loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    // Force account selection every time (show all available Google accounts)
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this.auth, provider);
  }

  // Logout
  logout(): Promise<void> {
    return signOut(this.auth);
  }

}
