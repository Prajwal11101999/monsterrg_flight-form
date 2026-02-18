import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Route guard that protects routes requiring authentication
 * Waits for Firebase auth state to be fully restored before checking
 * Redirects to login if user is not authenticated
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // authStateReady() resolves only after Firebase has fully restored
  // the persisted session — auth.currentUser is guaranteed accurate after this.
  return from(auth.authStateReady()).pipe(
    map(() => {
      if (auth.currentUser) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  );
};
