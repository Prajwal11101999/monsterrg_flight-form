import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { vi } from 'vitest';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockAuth: { currentUser: any; authStateReady: () => Promise<void> };
  let mockRouter: { createUrlTree: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockAuth = {
      currentUser: null,
      authStateReady: vi.fn()
    };

    mockRouter = {
      createUrlTree: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: mockAuth },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should allow access when user is authenticated', async () => {
    // Arrange
    mockAuth.currentUser = { uid: 'test-uid', email: 'test@example.com' };
    mockAuth.authStateReady = vi.fn().mockResolvedValue(undefined);

    // Act
    const result = await TestBed.runInInjectionContext(async () => {
      const guard = authGuard({} as any, {} as any);
      return new Promise<boolean | UrlTree>((resolve) => {
        if (typeof guard === 'boolean' || guard instanceof Promise) {
          Promise.resolve(guard).then(resolve as any);
        } else {
          (guard as any).subscribe(resolve);
        }
      });
    });

    // Assert
    expect(result).toBe(true);
    expect(mockAuth.authStateReady).toHaveBeenCalled();
  });

  it('should redirect to login when user is not authenticated', async () => {
    // Arrange
    mockAuth.currentUser = null;
    mockAuth.authStateReady = vi.fn().mockResolvedValue(undefined);
    const mockUrlTree = { toString: () => '/login' } as unknown as UrlTree;
    mockRouter.createUrlTree.mockReturnValue(mockUrlTree);

    // Act
    const result = await TestBed.runInInjectionContext(async () => {
      const guard = authGuard({} as any, {} as any);
      return new Promise<boolean | UrlTree>((resolve) => {
        if (typeof guard === 'boolean' || guard instanceof Promise) {
          Promise.resolve(guard).then(resolve as any);
        } else {
          (guard as any).subscribe(resolve);
        }
      });
    });

    // Assert
    expect(result).toBe(mockUrlTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(mockAuth.authStateReady).toHaveBeenCalled();
  });

  it('should wait for auth state to be ready before checking', async () => {
    // Arrange
    let authReady = false;
    mockAuth.authStateReady = vi.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          authReady = true;
          resolve();
        }, 10);
      });
    });
    mockAuth.currentUser = { uid: 'test-uid' };

    // Act
    const result = await TestBed.runInInjectionContext(async () => {
      const guard = authGuard({} as any, {} as any);
      return new Promise<boolean | UrlTree>((resolve) => {
        if (typeof guard === 'boolean' || guard instanceof Promise) {
          Promise.resolve(guard).then(resolve as any);
        } else {
          (guard as any).subscribe(resolve);
        }
      });
    });

    // Assert
    expect(authReady).toBe(true);
    expect(result).toBe(true);
  });
});
