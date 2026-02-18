import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { FlightInfoPayload } from '../models/flight-info.model';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';

/**
 * Interface for flight submission record in Firestore
 */
export interface FlightSubmission {
  submitted: boolean;
  submittedAt: Date;
  email: string | null;
}

/**
 * Service for managing flight information submissions
 * Handles API communication and Firestore persistence
 */
@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private http = inject(HttpClient);
  private firestore = inject(Firestore);
  private logger = inject(LoggerService);

  private readonly API_URL = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';

  /**
   * Checks if user has already submitted flight information
   * @param userId Firebase Auth user ID
   * @returns True if already submitted, false otherwise
   */
  async hasUserSubmitted(userId: string): Promise<boolean> {
    try {
      const submissionDoc = doc(this.firestore, 'flight-submissions', userId);
      const snapshot = await getDoc(submissionDoc);
      return snapshot.exists();
    } catch (error) {
      this.logger.error('Failed to check submission status', error);
      return false;
    }
  }

  /**
   * Submits flight information to the API
   * @param payload Flight information data
   * @returns True if submission successful
   * @throws Error if submission fails
   */
  async submitFlightInfo(payload: FlightInfoPayload): Promise<boolean> {
    const headers = new HttpHeaders({
      token: environment.apiToken,
      candidate: environment.candidateName,
      'Content-Type': 'application/json'
    });

    try {
      // Using firstValueFrom instead of deprecated toPromise()
      // Note: API may take longer to process when comments are included
      const response = await firstValueFrom(
        this.http.post<boolean>(this.API_URL, payload, { headers })
      );

      this.logger.info('Flight info submitted successfully', payload);
      return response === true;
    } catch (error) {
      this.logger.error('Flight submission failed', error);
      throw error;
    }
  }

  /**
   * Records successful submission in Firestore
   * @param userId Firebase Auth user ID
   * @param email User's email address
   */
  async recordSubmission(userId: string, email: string | null): Promise<void> {
    try {
      const submission: FlightSubmission = {
        submitted: true,
        submittedAt: new Date(),
        email
      };

      await setDoc(doc(this.firestore, 'flight-submissions', userId), submission);
      this.logger.info('Submission record saved to Firestore');
    } catch (error) {
      this.logger.error('Failed to save submission record', error);
      throw error;
    }
  }
}
