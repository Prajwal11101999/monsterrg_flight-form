import { Injectable, inject, OnDestroy } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

/**
 * Session timeout duration in milliseconds
 * @constant {number} SESSION_TIMEOUT_MS - 1 hour (3,600,000 ms)
 * 
 * @remarks
 * This timeout applies from the moment of login. After this duration,
 * the user is automatically logged out for security purposes.
 * 
 * Common timeout values:
 * - 15 minutes: 15 * 60 * 1000 (banking applications)
 * - 30 minutes: 30 * 60 * 1000 (standard web apps)
 * - 1 hour: 60 * 60 * 1000 (current setting)
 * - 8 hours: 8 * 60 * 60 * 1000 (productivity apps)
 */
const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

/**
 * Service for managing user session timeout
 * Automatically logs out users after 1 hour of inactivity
 * Initialized via APP_INITIALIZER in app.config.ts
 */
@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {

  private auth = inject(Auth);
  private timerHandle: ReturnType<typeof setTimeout> | null = null;
  private authSub: Subscription;

  constructor() {
    // Watch auth state — start timer on login, clear it on logout
    this.authSub = authState(this.auth).subscribe(user => {
      if (user) {
        this.startSessionTimer();
      } else {
        this.clearSessionTimer();
      }
    });
  }

  /**
   * Starts the session timeout timer
   */
  private startSessionTimer(): void {
    this.clearSessionTimer(); // prevent duplicates
    this.timerHandle = setTimeout(async () => {
      console.log('Session expired after 1 hour — logging out');
      await signOut(this.auth);
    }, SESSION_TIMEOUT_MS);
  }

  /**
   * Clears the session timeout timer
   */
  private clearSessionTimer(): void {
    if (this.timerHandle !== null) {
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }

  ngOnDestroy(): void {
    this.clearSessionTimer();
    this.authSub.unsubscribe();
  }
}
