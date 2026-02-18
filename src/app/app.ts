import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './auth/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('flight-info-app');

  // Injecting here ensures the service is created at app startup
  // and begins watching auth state immediately.
  constructor(private _session: SessionService) {}
}
