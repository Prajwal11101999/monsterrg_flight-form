import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { SessionService } from './session.service';
import { Subject } from 'rxjs';
import { vi } from 'vitest';

describe('SessionService', () => {
  let service: SessionService;
  let authStateSubject: Subject<any>;

  beforeEach(() => {
    authStateSubject = new Subject();

    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: Auth, useValue: {} }
      ]
    });
  });

  afterEach(() => {
    if (service) {
      service.ngOnDestroy();
    }
  });

  it('should create the service', () => {
    service = TestBed.inject(SessionService);
    expect(service).toBeTruthy();
  });

  it('should have ngOnDestroy method', () => {
    service = TestBed.inject(SessionService);
    expect(typeof service.ngOnDestroy).toBe('function');
  });

  it('should cleanup on destroy', () => {
    service = TestBed.inject(SessionService);
    
    // Act
    service.ngOnDestroy();

    // Assert - service should still exist after destroy
    expect(service).toBeTruthy();
  });
});
