import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {

  private timerHandle: ReturnType<typeof setTimeout> | null = null;
  private authSub: Subscription;

  constructor(private auth: Auth) {
    // Watch auth state — start timer on login, clear it on logout
    this.authSub = authState(this.auth).subscribe(user => {
      if (user) {
        this.startSessionTimer();
      } else {
        this.clearSessionTimer();
      }
    });
  }

  private startSessionTimer(): void {
    this.clearSessionTimer(); // prevent duplicates
    this.timerHandle = setTimeout(async () => {
      console.log('Session expired after 1 hour — logging out');
      await signOut(this.auth);
    }, SESSION_TIMEOUT_MS);
  }

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
