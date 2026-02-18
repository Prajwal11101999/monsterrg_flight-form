# Contributing to Flight Information System

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 11.x or higher
- Git
- Firebase account (for testing auth features)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/flight-info-app.git
   cd flight-info-app
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/flight-info-app.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Set up Firebase (create your own test project):
   - Copy `src/environments/environment.ts` to `environment.local.ts`
   - Add your Firebase config
   - Add `environment.local.ts` to `.gitignore`

6. Start development server:
   ```bash
   npm start
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `hotfix/issue-name` - Urgent production fixes

### Creating a Feature Branch

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

### Keeping Your Branch Updated

```bash
git checkout develop
git pull upstream develop
git checkout feature/your-feature-name
git rebase develop
```

## Coding Standards

### TypeScript

- **Strict Type Checking**: Always enabled
- **No `any` types**: Use proper types or `unknown`
- **Explicit return types**: All functions must have return types
- **Access modifiers**: Always specify `public`, `private`, or `protected`

Example:
```typescript
public getUserById(id: string): Observable<User | null> {
  return this.http.get<User>(`/api/users/${id}`);
}
```

### Angular Specific

#### Components
- Use `ChangeDetectionStrategy.OnPush`
- Use `inject()` for dependency injection
- Use signals for reactive state
- Keep components focused on UI logic

```typescript
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  private myService = inject(MyService);
  public data = signal<Data | null>(null);
}
```

#### Services
- Single responsibility principle
- Comprehensive JSDoc comments
- Proper error handling

```typescript
/**
 * Service for managing user data
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  
  /**
   * Fetches user by ID
   * @param id User identifier
   * @returns Observable of user or null if not found
   */
  public getUserById(id: string): Observable<User | null> {
    // Implementation
  }
}
```

### File Organization

```
src/app/
├── features/           # Feature modules
├── guards/            # Route guards
├── models/            # TypeScript interfaces
├── services/          # Business logic services
├── validators/        # Custom validators
└── styles/           # Global styles
```

### Naming Conventions

- **Files**: `kebab-case.ts`
- **Classes**: `PascalCase`
- **Interfaces**: `PascalCase` (no 'I' prefix)
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Private members**: prefix with underscore `_privateField`

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(auth): add Google OAuth login

Implement Google OAuth authentication flow with automatic
profile creation for new users.

Closes #123
```

```bash
fix(flight-form): prevent duplicate submissions

Add Firestore-based submission tracking to prevent users
from submitting flight information multiple times.

Fixes #456
```

## Pull Request Process

### Before Submitting

1. **Update your branch**:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout your-branch
   git rebase develop
   ```

2. **Run all checks**:
   ```bash
   npm run lint          # Check code quality
   npm test              # Run tests
   npm run format:check  # Check formatting
   npm run build:prod    # Ensure it builds
   ```

3. **Fix any issues**:
   ```bash
   npm run lint:fix      # Auto-fix linting issues
   npm run format        # Auto-format code
   ```

### PR Checklist

- [ ] Code follows project coding standards
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated (if needed)
- [ ] No console.log statements
- [ ] TypeScript strict mode compliant
- [ ] Components use OnPush change detection
- [ ] JSDoc comments on all public methods
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with develop

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests passing
```

## Testing Requirements

### Unit Tests

- **Required**: All new services must have tests
- **Coverage**: Aim for 80%+ code coverage
- **Framework**: Vitest (Jasmine-compatible)

Example:
```typescript
describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', async () => {
    const result = await service.getUserById('123');
    expect(result).toBeDefined();
  });
});
```

### Running Tests

```bash
npm test              # Run tests
npm run test:coverage # Run with coverage
```

### Component Tests

Test user interactions and form validation:

```typescript
it('should validate email input', () => {
  const emailControl = component.form.get('email');
  emailControl?.setValue('invalid-email');
  
  expect(emailControl?.hasError('email')).toBe(true);
});
```

## Code Review Guidelines

### As a Reviewer

- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve when ready, request changes when needed
- Focus on:
  - Correctness
  - Performance
  - Security
  - Maintainability

### As a Contributor

- Respond to all comments
- Ask questions if feedback is unclear
- Make requested changes or discuss alternatives
- Don't take criticism personally

## Questions?

- Open an issue with the `question` label
- Reach out to maintainers

## Thank You!

Your contributions make this project better! 🎉
