import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';
import { EMPTY } from 'rxjs';

import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockAuth = {
    currentUser: null
  };
  const mockFirestore = {};
  const mockRouter = { 
    navigate: vi.fn(),
    events: EMPTY,
    createUrlTree: vi.fn(() => ({ toString: () => '/mock-url' })),
    serializeUrl: vi.fn((tree) => tree.toString())
  };
  const mockActivatedRoute = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Auth, useValue: mockAuth },
        { provide: Firestore, useValue: mockFirestore },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
