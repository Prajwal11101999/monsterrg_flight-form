import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlightInfoPayload } from '../models/flight-info.model';
import { AuthService } from '../auth/auth.service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-form.html',
  styleUrls: ['./flight-form.scss']
})
export class FlightFormComponent implements OnInit {

  loading = signal(false);
  submitted = signal(false);   // true after a successful submission — blocks re-submit
  showModal = signal(false);   // show modal when user already submitted in the past
  successMessage = signal('');
  errorMessage = signal('');

  flightForm;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.flightForm = this.fb.nonNullable.group({
      airline: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numOfGuests: [1, [Validators.required, Validators.min(1)]],
      comments: ['']
    });
  }

  async ngOnInit() {
    // Wait for Firebase to restore the auth session (critical for page refresh / re-login)
    await this.auth.authStateReady();
    
    // Now auth.currentUser is guaranteed to be accurate
    const user = this.auth.currentUser;
    if (!user) return;

    const submissionDoc = doc(this.firestore, 'flight-submissions', user.uid);
    const snapshot = await getDoc(submissionDoc);

    if (snapshot.exists()) {
      this.submitted.set(true);
      this.showModal.set(true);  // Show modal popup
    }
  }

  closeModal() {
    this.showModal.set(false);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  async onSubmit() {
    if (this.submitted()) {
      this.errorMessage.set('Flight information has already been submitted. You cannot submit again.');
      return;
    }
    if (this.loading() || this.flightForm.invalid) return;

    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const payload: FlightInfoPayload = this.flightForm.getRawValue();

    const headers = new HttpHeaders({
      token: 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
      candidate: 'Prajwal Borawake'
    });

    try {
      const response: any = await this.http.post(
        'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge',
        payload,
        { headers }
      ).toPromise();

      if (response === true) {
        // Mark as submitted in memory
        this.submitted.set(true);
        this.successMessage.set('Flight information submitted successfully.');

        // Store submission status in Firestore (persistent)
        const user = this.auth.currentUser;
        if (user) {
          try {
            await setDoc(doc(this.firestore, 'flight-submissions', user.uid), {
              submitted: true,
              submittedAt: new Date(),
              email: user.email
            });
            console.log('✅ Submission record saved to Firestore');
          } catch (firestoreError) {
            console.error('❌ Firestore write failed:', firestoreError);
            console.error('Check your Firestore security rules!');
          }
        }
      } else {
        this.errorMessage.set('Submission failed. Please check your input.');
      }

    } catch (error) {
      this.errorMessage.set('Server error occurred.');
    } finally {
      this.loading.set(false);
    }
  }
}
