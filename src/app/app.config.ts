import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { SessionService } from './services/session.service';

/**
 * Application configuration with providers
 * Includes SessionService initialization for automatic session timeout
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      // Use sessionStorage — session is cleared automatically when window/tab closes
      setPersistence(auth, browserSessionPersistence);
      return auth;
    }),
    provideFirestore(() => getFirestore()),
    // Initialize SessionService to start session timeout monitoring
    {
      provide: APP_INITIALIZER,
      useFactory: (sessionService: SessionService) => () => {
        // SessionService is injected and initialized here
        // Its constructor will start monitoring auth state
      },
      deps: [SessionService],
      multi: true
    }
  ]
};
