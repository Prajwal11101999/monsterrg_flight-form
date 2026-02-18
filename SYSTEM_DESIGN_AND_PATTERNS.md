# System Design & Design Patterns

## 📐 System Architecture Type

### **1. Client-Server Architecture**
```
┌──────────────────────┐
│   Angular Client     │  ← Frontend (Browser)
│   (SPA)              │
└──────────┬───────────┘
           │ HTTP/HTTPS
           │
┌──────────▼───────────┐
│  Firebase Backend    │  ← Backend Services
│  - Authentication    │
│  - Firestore DB      │
│  - Hosting           │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│  External CRM API    │  ← Third-party Service
└──────────────────────┘
```

**Characteristics:**
- **Client:** Angular SPA running in browser
- **Server:** Firebase services + External CRM API
- **Communication:** RESTful HTTP, WebSocket (Firebase real-time)
- **State Management:** Client-side (Angular signals)

---

### **2. Layered Architecture (N-Tier)**

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Components: Login, Register, Flight)  │
│  - UI rendering                         │
│  - User interactions                    │
│  - Form handling                        │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Business Logic Layer            │
│  (Services: Auth, User, Flight, etc.)   │
│  - Authentication logic                 │
│  - Validation                           │
│  - Business rules                       │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Data Access Layer               │
│  (Firebase SDK, HttpClient)             │
│  - Firebase Auth API                    │
│  - Firestore queries                    │
│  - HTTP requests                        │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Data Layer                      │
│  (Firebase Cloud, External CRM API)     │
│  - User authentication                  │
│  - Firestore collections                │
│  - CRM SDK endpoint                     │
└─────────────────────────────────────────┘
```

**Benefits:**
- ✅ Separation of concerns
- ✅ Testability (mock each layer)
- ✅ Maintainability
- ✅ Scalability

---

### **3. Single Page Application (SPA)**

**Architecture Pattern:** Angular SPA
- **Routing:** Client-side routing (no page reloads)
- **State:** In-memory state management
- **Rendering:** Dynamic DOM updates
- **Communication:** Asynchronous API calls

**Benefits:**
- Fast user experience (no full page reloads)
- Rich interactions
- Offline-capable (with service workers)

---

## 🎨 Design Patterns Used

### **1. Service Layer Pattern** ⭐

**Implementation:**
```typescript
// Services encapsulate business logic
@Injectable({ providedIn: 'root' })
export class AuthService {
  register(email, password) { ... }
  login(email, password) { ... }
  logout() { ... }
}
```

**Used In:**
- `AuthService` - Authentication operations
- `UserService` - User profile management
- `FlightService` - Flight submission logic
- `ErrorMappingService` - Error handling
- `LoggerService` - Logging
- `SessionService` - Session management

**Benefits:**
- Centralizes business logic
- Reusable across components
- Easier to test

---

### **2. Dependency Injection Pattern** ⭐

**Implementation:**
```typescript
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggerService);
}
```

**Used In:** Every component and service

**Benefits:**
- Loose coupling
- Testability (easy to mock dependencies)
- Angular's built-in DI container manages lifecycle

---

### **3. Singleton Pattern**

**Implementation:**
```typescript
@Injectable({ providedIn: 'root' })  // ← Creates singleton
export class AuthService { ... }
```

**Used In:** All services (`providedIn: 'root'`)

**Why:**
- Single instance shared across app
- Maintains consistent state (e.g., auth state)
- Memory efficient

---

### **4. Observer Pattern** ⭐

**Implementation:**
```typescript
// Observable stream of authentication state
public user$: Observable<User | null> = authState(this.auth);

// Components subscribe to changes
this.authService.user$.subscribe(user => {
  if (user) { /* logged in */ }
});
```

**Used In:**
- `AuthService.user$` - Authentication state changes
- HTTP requests (RxJS observables)
- Form value changes

**Benefits:**
- Reactive programming
- Automatic UI updates when data changes
- Decouples publishers from subscribers

---

### **5. Repository Pattern**

**Implementation:**
```typescript
export class UserService {
  // Abstracts Firestore operations
  async getUserProfile(userId: string) {
    const docRef = doc(this.firestore, 'users', userId);
    return await getDoc(docRef);
  }
  
  async createUserProfile(userId: string, data: UserProfile) {
    await setDoc(doc(this.firestore, 'users', userId), data);
  }
}
```

**Used In:**
- `UserService` - User data repository
- `FlightService` - Flight submission repository

**Benefits:**
- Abstracts data access
- Easy to switch databases
- Centralized data operations

---

### **6. Facade Pattern**

**Implementation:**
```typescript
export class AuthService {
  // Hides complexity of Firebase Auth SDK
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this.auth, provider);
  }
}
```

**Used In:** Service layer wraps complex Firebase SDK

**Benefits:**
- Simplified API for components
- Hides third-party SDK complexity
- Easy to replace Firebase with another provider

---

### **7. Guard Pattern** ⭐

**Implementation:**
```typescript
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  
  return from(auth.authStateReady()).pipe(
    map(() => auth.currentUser ? true : router.createUrlTree(['/login']))
  );
};

// Applied to routes
{ path: 'flight-form', component: FlightFormComponent, canActivate: [authGuard] }
```

**Used In:** Route protection

**Benefits:**
- Declarative security
- Prevents unauthorized access
- Clean separation of concerns

---

### **8. Strategy Pattern**

**Implementation:**
```typescript
// Multiple authentication strategies
class LoginComponent {
  // Strategy 1: Email/Password
  async onSubmit() {
    await this.authService.login(email, password);
  }
  
  // Strategy 2: Google OAuth
  async loginWithGoogle() {
    await this.authService.loginWithGoogle();
  }
}
```

**Used In:** Multiple auth methods

**Benefits:**
- Flexible authentication
- Easy to add new strategies (Facebook, GitHub, etc.)
- Interchangeable at runtime

---

### **9. Factory Pattern**

**Implementation:**
```typescript
export class FlightFormComponent {
  private fb = inject(FormBuilder);
  
  // FormBuilder creates form instances
  flightForm = this.fb.nonNullable.group({
    airline: ['', Validators.required],
    arrivalDate: ['', Validators.required],
    // ...
  });
}
```

**Used In:** Form creation with `FormBuilder`

**Benefits:**
- Consistent form creation
- Type-safe forms
- Encapsulates form logic

---

### **10. Template Method Pattern**

**Implementation:**
```typescript
export class FlightFormComponent implements OnInit {
  // Template method defining initialization steps
  async ngOnInit(): Promise<void> {
    await this.auth.authStateReady();          // Step 1
    const user = this.auth.currentUser;        // Step 2
    if (!user) return;                         // Step 3
    const hasSubmitted = await this.checkSubmission(user.uid);  // Step 4
    if (hasSubmitted) this.showModal.set(true); // Step 5
  }
}
```

**Used In:** Component lifecycle hooks

---

### **11. Error Handling Pattern (Centralized Error Mapping)**

**Implementation:**
```typescript
@Injectable({ providedIn: 'root' })
export class ErrorMappingService {
  mapFirebaseAuthError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'Email already registered';
      case 'auth/wrong-password': return 'Incorrect password';
      default: return 'Authentication failed';
    }
  }
}

// Components use centralized mapping
catch (error) {
  this.errorMessage = this.errorMapping.mapFirebaseAuthError(error.code);
}
```

**Benefits:**
- DRY principle (single source of truth)
- Consistent error messages
- Easy to update messages

---

### **12. Reactive State Management (Signal Pattern)**

**Implementation:**
```typescript
export class FlightFormComponent {
  // Reactive signals for state
  loading = signal(false);
  submitted = signal(false);
  errorMessage = signal('');
  
  async onSubmit() {
    this.loading.set(true);
    // ... logic
    this.loading.set(false);
  }
}

// Template automatically updates when signals change
@if (loading()) { <span>Loading...</span> }
```

**Used In:** All components for state management

**Benefits:**
- Fine-grained reactivity
- Better performance than zone.js
- Simpler than RxJS for local state

---

### **13. Smart/Presentational Components Pattern**

**Implementation:**
```typescript
// Smart Component (Container)
export class FlightFormComponent {
  private flightService = inject(FlightService);  // Business logic
  
  async onSubmit() {
    const success = await this.flightService.submitFlightInfo(payload);
    // Handle result
  }
}

// Presentational Component (would be used for reusable UI)
// Not heavily used in this app (could be added for input fields, buttons, etc.)
```

**Current Usage:** Components delegate to services (smart components)

---

### **14. Module Pattern (Standalone Components)**

**Implementation:**
```typescript
@Component({
  selector: 'app-login',
  standalone: true,  // ← Module pattern (self-contained)
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent { }
```

**Benefits:**
- Self-contained components
- Lazy loading
- Tree-shaking (smaller bundles)

---

## 🏛️ SOLID Principles Applied

### **S - Single Responsibility Principle** ✅
- Each service has one responsibility
- `AuthService` → Authentication only
- `ErrorMappingService` → Error mapping only
- `LoggerService` → Logging only

### **O - Open/Closed Principle** ✅
- Services are open for extension (inheritance)
- Closed for modification (add new services instead of changing existing)

### **L - Liskov Substitution Principle** ✅
- Services implement consistent interfaces
- Can be mocked/replaced in tests

### **I - Interface Segregation Principle** ✅
- Small, focused interfaces (`FlightInfoPayload`, `UserProfile`)
- Components only depend on what they need

### **D - Dependency Inversion Principle** ✅
- Components depend on service abstractions (DI)
- Not on concrete implementations

---

## 📊 Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **OnPush Change Detection** | Performance optimization (only update when inputs change) |
| **Signals over RxJS** | Simpler API for local state, better performance |
| **Service Layer** | Separation of concerns, reusability, testability |
| **Firestore Security Rules** | Enforce data integrity at database level |
| **Route Guards** | Declarative security, prevent unauthorized access |
| **Centralized Error Handling** | DRY principle, consistent UX |
| **Environment Variables** | Configuration management (dev vs prod) |

---

## 🔄 Data Flow Architecture

```
User Interaction (Template)
    ↓
Component (Presentation Layer)
    ↓
Service (Business Logic Layer)
    ↓
Firebase SDK / HttpClient (Data Access Layer)
    ↓
Firebase Cloud / External API (Data Layer)
    ↓
Response back through layers
    ↓
Signal/Observable updates
    ↓
Template re-renders (OnPush)
```

---

## 🎯 Summary

**System Architecture:**
- ✅ Client-Server Architecture
- ✅ Layered Architecture (4 layers)
- ✅ Single Page Application (SPA)
- ✅ Service-Oriented Architecture

**Design Patterns (14 total):**
1. ✅ Service Layer Pattern
2. ✅ Dependency Injection
3. ✅ Singleton Pattern
4. ✅ Observer Pattern
5. ✅ Repository Pattern
6. ✅ Facade Pattern
7. ✅ Guard Pattern
8. ✅ Strategy Pattern
9. ✅ Factory Pattern
10. ✅ Template Method Pattern
11. ✅ Centralized Error Handling
12. ✅ Reactive State (Signals)
13. ✅ Smart/Presentational Components
14. ✅ Module Pattern (Standalone)

**SOLID Principles:**
- ✅ All 5 principles applied

---

## 📚 Further Reading

- [Angular Architecture Guide](https://angular.dev/guide/architecture)
- [RxJS Patterns](https://rxjs.dev/guide/overview)
- [Firebase Architecture Patterns](https://firebase.google.com/docs/rules/best-practices)
- [Design Patterns (Gang of Four)](https://refactoring.guru/design-patterns)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
