/**
 * Application entry point
 * 
 * Bootstraps the Angular application using standalone component architecture.
 * Initializes the root App component with the application configuration.
 * 
 * @see {@link appConfig} for provider configuration
 * @see {@link App} for root component definition
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
