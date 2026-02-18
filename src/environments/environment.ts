/**
 * Development environment configuration
 * 
 * Security Notes:
 * - Firebase API keys are safe to expose in client-side code (they identify the project)
 * - Firebase Security Rules protect actual data access
 * - API tokens should ideally be in environment variables in production
 * 
 * Usage:
 * - This file is used when running `ng serve` or building with `ng build`
 * - For production builds, use `ng build --configuration production`
 */
export const environment = {
  /** Development mode flag - enables debug logging and dev tools */
  production: false,
  
  /** Firebase project configuration for client SDK initialization */
  firebase: {
    apiKey: "AIzaSyCVO82Vn700wYU7zA_eO8iGn2C4SOz4Ikk",
    authDomain: "flight-info-challenge-62d1b.firebaseapp.com",
    projectId: "flight-info-challenge-62d1b",
    storageBucket: "flight-info-challenge-62d1b.firebasestorage.app",
    messagingSenderId: "884972445598",
    appId: "1:884972445598:web:cce2fe8ba4b5add9f0008f"
  },
  
  /** API token for flight information submission endpoint (base64 encoded) */
  apiToken: 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
  
  /** Candidate identifier for API submissions */
  candidateName: 'Prajwal Borawake'
};