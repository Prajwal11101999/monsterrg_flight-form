import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FlightInfoPayload } from '../models/flight-info.model';
import { AuthService } from '../services/auth.service';
import { FlightService } from '../services/flight.service';
import { LoggerService } from '../services/logger.service';

/**
 * Flight information form component with submission tracking
 * Implements OnPush change detection for optimal performance
 * Prevents duplicate submissions using Firestore persistence
 */
@Component({
  selector: 'app-flight-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-form.html',
  styleUrls: ['./flight-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightFormComponent implements OnInit {

  // Using inject() function - modern Angular DI pattern
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth = inject(Auth);
  private flightService = inject(FlightService);
  private logger = inject(LoggerService);

  // Signals for reactive state management
  loading = signal(false);
  submitted = signal(false);   // true after a successful submission — blocks re-submit
  showModal = signal(false);   // show modal when user already submitted in the past
  successMessage = signal('');
  errorMessage = signal('');

  // Typed reactive form
  flightForm = this.fb.nonNullable.group({
    airline: ['', Validators.required],
    arrivalDate: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    flightNumber: ['', Validators.required],
    numOfGuests: [1, [Validators.required, Validators.min(1)]],
    comments: ['']
  });

  /**
   * Checks if user has already submitted on component initialization
   */
  async ngOnInit(): Promise<void> {
    // Wait for Firebase to restore the auth session (critical for page refresh)
    await this.auth.authStateReady();
    
    const user = this.auth.currentUser;
    if (!user) return;

    const hasSubmitted = await this.flightService.hasUserSubmitted(user.uid);
    
    if (hasSubmitted) {
      this.submitted.set(true);
      this.showModal.set(true);
    }
  }

  /**
   * Closes the already-submitted modal
   */
  closeModal(): void {
    this.showModal.set(false);
  }

  /**
   * Logs out the user and navigates to login
   */
  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }

  /**
   * Handles flight information form submission
   */
  async onSubmit(): Promise<void> {
    if (this.submitted()) {
      this.errorMessage.set('Flight information has already been submitted. You cannot submit again.');
      return;
    }
    
    if (this.loading() || this.flightForm.invalid) return;

    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    // Get form values and clean the payload
    const formValues = this.flightForm.getRawValue();
    const payload: FlightInfoPayload = {
      airline: formValues.airline,
      arrivalDate: formValues.arrivalDate,
      arrivalTime: formValues.arrivalTime,
      flightNumber: formValues.flightNumber,
      numOfGuests: formValues.numOfGuests,
      // Always include comments field (empty string if no value to avoid API delay)
      comments: formValues.comments ? formValues.comments.trim() : ''
    };

    try {
      // Submit flight info via FlightService
      const success = await this.flightService.submitFlightInfo(payload);

      if (success) {
        this.submitted.set(true);
        this.successMessage.set('Flight information submitted successfully.');

        // Record submission in Firestore
        const user = this.auth.currentUser;
        if (user) {
          try {
            await this.flightService.recordSubmission(user.uid, user.email);
          } catch (firestoreError: unknown) {
            this.logger.error('Failed to save submission record', firestoreError);
            // Don't show error to user - submission was successful
          }
        }
      } else {
        this.errorMessage.set('Submission failed. Please check your input.');
      }
    } catch (error: unknown) {
      this.logger.error('Flight submission error', error);
      this.errorMessage.set('Server error occurred. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }
}
