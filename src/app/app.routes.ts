import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { FlightFormComponent } from './flight-form/flight-form';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flight-form', component: FlightFormComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
