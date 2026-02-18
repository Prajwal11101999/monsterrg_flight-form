/**
 * Production environment configuration
 * 
 * Security Notes:
 * - Firebase API keys are safe to expose in client-side code (they identify the project)
 * - Firebase Security Rules protect actual data access
 * - API tokens should ideally be injected via CI/CD environment variables
 * 
 * Production Optimizations:
 * - Debug logging is disabled (LoggerService respects production flag)
 * - Change detection and tree-shaking optimizations applied during build
 * - Source maps excluded from production builds
 * 
 * Usage:
 * - Used when building with `ng build --configuration production`
 * - Deployed to Firebase Hosting or other production environments
 */
export const environment = {
  /** Production mode flag - disables debug logging and enables optimizations */
  production: true,
  
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

