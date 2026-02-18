# Flight Information System - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Application                       │
│                    (Angular 21 SPA)                          │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │                              │
    ┌──────────▼─────────┐        ┌──────────▼─────────┐
    │  Firebase Auth     │        │  Cloud Firestore   │
    │  (Authentication)  │        │  (NoSQL Database)  │
    └────────────────────┘        └────────────────────┘
               │                              │
               │                              │
    ┌──────────▼──────────────────────────────▼────────┐
    │           Firebase SDK (Web)                     │
    └──────────────────────────────────────────────────┘
```

## Application Layers

### Presentation Layer (Components)
```
Components
├── Authentication Components
│   ├── LoginComponent
│   │   ├── Email/password login
│   │   └── Google OAuth login
│   └── RegisterComponent
│       └── User registration with validation
└── Feature Components
    └── FlightFormComponent
        ├── Flight information capture
        └── Submission tracking
```

**Characteristics:**
- OnPush change detection
- Signals for reactive state
- Minimal business logic
- UI and user interaction focus

### Business Logic Layer (Services)

```
Services
├── Core Services
│   ├── AuthService (Authentication operations)
│   ├── SessionService (Auto-logout management)
│   └── UserService (Profile management)
├── Feature Services
│   └── FlightService (Flight submission logic)
└── Utility Services
    ├── ErrorMappingService (Error handling)
    └── LoggerService (Logging)
```

**Responsibilities:**
- Business logic and data transformations
- API communication
- State management
- Error handling

### Data Access Layer (Firebase SDK)

```
Firebase Integration
├── Authentication
│   ├── Email/Password provider
│   └── Google OAuth provider
└── Firestore Collections
    ├── users/{userId} (User profiles)
    └── flight-submissions/{userId} (Submission tracking)
```

### Cross-Cutting Concerns

```
Cross-Cutting
├── Guards (Route protection)
│   └── authGuard
├── Validators (Form validation)
│   └── CustomValidators
└── Models (TypeScript interfaces)
    ├── UserProfile
    ├── FlightInfoPayload
    └── FlightSubmission
```

## Data Flow

### Authentication Flow

```
User Action → Component
              ↓
         AuthService
              ↓
       Firebase Auth
              ↓
    UserCredential
              ↓
       UserService
              ↓
    Firestore (Profile)
              ↓
    Navigation to Protected Route
```

### Flight Submission Flow

```
Form Submission → FlightFormComponent
                      ↓
  Validation Check (Angular Forms)
                      ↓
              FlightService
                      ↓
          API Call (HTTP Client)
                      ↓
          Response Handling
                      ↓
          Record in Firestore
                      ↓
          UI Update (Signals)
```

## State Management

### Component State (Signals)
```typescript
// Local component state using Angular signals
loading = signal(false);
errorMessage = signal('');
data = signal<Data | null>(null);
```

### Authentication State (Observable)
```typescript
// Shared authentication state via service
user$ = authState(this.auth);
```

### Form State (Reactive Forms)
```typescript
// Form state managed by Angular Forms
form = this.fb.group({
  field: ['', Validators.required]
});
```

## Security Architecture

### Authentication
- Firebase Authentication SDK
- Session persistence (browser session)
- Auto-logout after 1 hour
- Token-based authorization

### Route Protection
```typescript
routes = [
  {
    path: 'flight-form',
    component: FlightFormComponent,
    canActivate: [authGuard]  // Guards protected routes
  }
];
```

### Firestore Security Rules
```javascript
// User can only access their own data
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## Performance Optimizations

### Change Detection
- **OnPush Strategy**: All components use OnPush
- **Signals**: Reactive state updates
- **Immutable Data**: Prevents unnecessary re-renders

### Bundle Optimization
- **Lazy Loading**: Route-level code splitting
- **Tree Shaking**: Removes unused code
- **Production Build**: Minification and optimization

### Runtime Performance
- **HTTP Caching**: Strategic HTTP caching
- **Firestore Queries**: Optimized with indexes
- **Session Management**: Efficient auth state handling

## Error Handling Strategy

### Layers of Error Handling

```
1. Component Level
   ↓ (Catch presentation errors)
   
2. Service Level
   ↓ (Catch business logic errors)
   
3. Error Mapping Service
   ↓ (Convert to user-friendly messages)
   
4. Logger Service
   ↓ (Log in development mode)
   
5. User Notification
   (Display via signals)
```

## Testing Strategy

### Unit Testing
```
Services  → Mock dependencies, test logic
Components → TestBed, test interactions
Guards    → Test auth flows
Validators → Test validation rules
```

### Coverage Goals
- Services: 80%+ coverage
- Critical paths: 100% coverage
- Edge cases: Comprehensive testing

## Deployment Architecture

```
Development → GitHub → CI/CD Pipeline → Production
     ↓                      ↓               ↓
  ng serve           Lint/Test/Build    Firebase Hosting
                           ↓
                    Automated Checks
                     - Unit Tests
                     - Linting
                     - Build
                     - Security Audit
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Angular | 21.1 |
| Language | TypeScript | 5.9 |
| State | Signals | Native |
| Forms | Reactive Forms | Built-in |
| Auth | Firebase Auth | 20.0 |
| Database | Cloud Firestore | 20.0 |
| Testing | Vitest | 4.0 |
| Linting | ESLint | 9.18 |
| Formatting | Prettier | 3.4 |

## Design Patterns

### Dependency Injection
```typescript
// Modern inject() function
private service = inject(MyService);
```

### Observable Pattern
```typescript
// Reactive data streams
user$ = authState(this.auth);
```

### Repository Pattern
```typescript
// Services abstract data access
UserService → Firestore
FlightService → HTTP + Firestore
```

### Strategy Pattern
```typescript
// Different authentication strategies
- Email/Password auth
- Google OAuth
```

## Scalability Considerations

### Current Architecture
- ✅ Stateless frontend (scales horizontally)
- ✅ Serverless backend (auto-scaling)
- ✅ NoSQL database (horizontal scaling)

### Future Scalability
- Feature modules for code splitting
- State management library (NgRx) if needed
- CDN for static assets
- Service Workers for offline support
