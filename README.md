# ✈️ Flight Information System

> A modern Angular application for managing flight arrival information with Firebase authentication and real-time data persistence.

[![Angular](https://img.shields.io/badge/Angular-21.1-red?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-20.0-orange?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [System Design & Patterns](SYSTEM_DESIGN_AND_PATTERNS.md)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Authentication
- 🔐 **Email/Password Authentication** - Secure user registration and login
- 🌐 **Google OAuth Integration** - One-click sign-in with Google
- 🔒 **Route Guards** - Protected routes with authentication checks
- ⏱️ **Auto Session Timeout** - Automatic logout after 1 hour of inactivity
- 💾 **Session Persistence** - Maintains login state across browser sessions

### Flight Management
- ✈️ **Flight Information Submission** - Capture arrival details (airline, date, time, guests)
- 🚫 **Duplicate Prevention** - Users can only submit once (enforced via Firestore)
- 📝 **Form Validation** - Comprehensive client-side validation with user feedback
- 💬 **Real-time Feedback** - Loading states, success messages, and error handling

### User Experience
- 🎨 **Modern UI/UX** - Clean, responsive design with SCSS styling
- ⚡ **Performance Optimized** - OnPush change detection, signals, lazy loading
- 📱 **Mobile Responsive** - Works seamlessly on all device sizes
- ♿ **Accessible** - WCAG AA compliant forms and navigation

## 🏗️ Architecture

### Design Principles
- **SOLID Principles** - Single responsibility, dependency inversion
- **DRY (Don't Repeat Yourself)** - Centralized error handling, shared services
- **Separation of Concerns** - Components for UI, services for business logic
- **OnPush Change Detection** - Optimized performance across all components

### Key Architectural Decisions

```
┌─────────────────┐
│   Components    │  ← UI Layer (OnPush, Signals)
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │  ← Business Logic Layer
└────────┬────────┘
         │
┌────────▼────────┐
│  Firebase SDK   │  ← Data Persistence Layer
└─────────────────┘
```

**Service Layer:**
- `AuthService` - Authentication operations (login, register, logout)
- `UserService` - User profile management in Firestore
- `FlightService` - Flight submission and tracking
- `SessionService` - Auto-logout session management
- `ErrorMappingService` - Centralized error message handling
- `LoggerService` - Environment-aware logging (dev only)

**Guard Layer:**
- `authGuard` - Functional route guard for protected routes

**Validation Layer:**
- `CustomValidators` - Reusable form validators (password matching)

## 🛠️ Tech Stack

### Core
- **Angular 21.1** - Latest Angular with standalone components
- **TypeScript 5.9** - Strict type checking enabled
- **RxJS 7.8** - Reactive programming with observables

### Firebase
- **Firebase Auth** - User authentication (email/password, Google OAuth)
- **Cloud Firestore** - NoSQL database for user profiles and submissions
- **@angular/fire 20.0** - Official Angular Firebase library

### Development Tools
- **Vitest** - Fast unit testing with Vite
- **Angular CLI 21.1** - Scaffolding and build tools
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 11.x or higher
- **Angular CLI** 21.x (`npm install -g @angular/cli`)
- **Firebase Account** (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd flight-info-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   
   Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   
   Enable the following:
   - Authentication → Email/Password provider
   - Authentication → Google provider
   - Firestore Database
   
   Update `src/environments/environment.ts` and `environment.prod.ts` with your Firebase config:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       // ... other config
     },
     apiToken: 'YOUR_API_TOKEN',
     candidateName: 'Your Name'
   };
   ```

4. **Firestore Security Rules**
   
   Set up these rules in Firebase Console → Firestore → Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /flight-submissions/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

5. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```
   
   Navigate to `http://localhost:4200/`

## 📁 Project Structure

```
src/app/
├── auth/                      # Authentication feature
│   ├── login/                # Login component
│   └── register/             # Registration component
├── flight-form/              # Flight information form
├── guards/                   # Route guards
│   └── auth.guard.ts        # Authentication guard
├── models/                   # TypeScript interfaces
│   └── flight-info.model.ts # Flight data model
├── services/                 # Business logic layer
│   ├── auth.service.ts      # Authentication operations
│   ├── user.service.ts      # User profile management
│   ├── flight.service.ts    # Flight submission logic
│   ├── session.service.ts   # Session timeout management
│   ├── error-mapping.service.ts  # Error message mapping
│   └── logger.service.ts    # Environment-aware logging
├── validators/               # Custom form validators
│   └── custom-validators.ts # Password match validator
└── styles/                   # Global styles
```

## 💻 Development

### Code Scaffolding

Generate new components:
```bash
ng generate component features/my-feature
```

Generate services:
```bash
ng generate service services/my-service
```

### Code Standards

- **TypeScript Strict Mode** - All type checking enabled
- **OnPush Change Detection** - Required for all components
- **Signals for State** - Use `signal()`, `computed()` for reactive state
- **JSDoc Comments** - Document all public methods
- **inject()** - Use inject() function, not constructor injection
- **No `any` types** - Use proper types or `unknown`

### Available Scripts

```bash
npm start          # Start dev server (http://localhost:4200)
npm run build      # Build for production
npm test           # Run unit tests
npm run watch      # Build in watch mode
```

## 🧪 Testing

### Unit Tests

Run tests with Vitest:
```bash
ng test
```

Watch mode:
```bash
ng test --watch
```

### Test Coverage

Generate coverage report:
```bash
ng test --coverage
```

### Testing Strategy

- **Services** - Mock Firebase dependencies, test business logic
- **Components** - Test user interactions, form validation
- **Guards** - Test authentication flow and redirects

## 📦 Deployment

### Build for Production

```bash
npm run build:prod
```

Output will be in `dist/flight-info-app/browser/` directory.

### Firebase Hosting Deployment

**One-time setup:**
```bash
npm install -g firebase-tools
firebase login
```

**Deploy to Firebase Hosting:**
```bash
npm run deploy
```

This builds the production bundle and deploys to Firebase Hosting in one command.

**Live URL:** https://flight-info-challenge-62d1b.web.app

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Environment Variables

Ensure production environment file has correct values:
- `src/environments/environment.prod.ts`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Checklist

- [ ] All tests passing
- [ ] Code follows Angular style guide
- [ ] JSDoc comments added
- [ ] No console.log statements
- [ ] TypeScript strict mode compliant
- [ ] OnPush change detection used

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Prajwal Borawake**

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Firebase for backend services
- Challenge provided by CRM SDK team

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
