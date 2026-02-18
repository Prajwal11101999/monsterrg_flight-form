import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Centralized logging service with environment-aware logging
 * Prevents console.log in production builds
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly isDevelopment = !environment.production;

  /**
   * Log error messages (always logged, even in production)
   */
  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error);
  }

  /**
   * Log warning messages (development only)
   */
  warn(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
  }

  /**
   * Log info messages (development only)
   */
  info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  /**
   * Log debug messages (development only)
   */
  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }
}
