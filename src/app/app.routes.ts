import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { FlightFormComponent } from './flight-form/flight-form';
import { authGuard } from './guards/auth.guard';

/**
 * Application route configuration
 * 
 * Route Protection:
 * - Public routes: /login, /register
 * - Protected routes: /flight-form (requires authentication via authGuard)
 * 
 * Default Behavior:
 * - Root path ('') redirects to /login
 * - Unauthenticated users attempting to access protected routes are redirected to /login
 */
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'flight-form', 
    component: FlightFormComponent, 
    canActivate: [authGuard] // Requires user to be authenticated
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
