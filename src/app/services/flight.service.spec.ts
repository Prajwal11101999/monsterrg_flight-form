import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { FlightService } from './flight.service';
import { LoggerService } from './logger.service';
import { FlightInfoPayload } from '../models/flight-info.model';

describe('FlightService', () => {
  let service: FlightService;
  let mockHttp: { post: ReturnType<typeof vi.fn> };
  let mockLogger: { info: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockHttp = {
      post: vi.fn()
    };

    mockLogger = {
      info: vi.fn(),
      error: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        FlightService,
        { provide: HttpClient, useValue: mockHttp },
        { provide: Firestore, useValue: {} },
        { provide: LoggerService, useValue: mockLogger }
      ]
    });

    service = TestBed.inject(FlightService);
  });

  describe('hasUserSubmitted', () => {
    it('should handle hasUserSubmitted method', () => {
      // Service method exists
      expect(typeof service.hasUserSubmitted).toBe('function');
    });
  });

  describe('submitFlightInfo', () => {
    it('should submit flight info successfully', async () => {
      // Arrange
      const payload: FlightInfoPayload = {
        airline: 'Delta',
        arrivalDate: '2024-12-01',
        arrivalTime: '14:30',
        flightNumber: 'DL100',
        numOfGuests: 2,
        comments: 'Test flight'
      };
      mockHttp.post.mockReturnValue(of(true));

      // Act
      const result = await service.submitFlightInfo(payload);

      // Assert
      expect(result).toBe(true);
      expect(mockHttp.post).toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalledWith('Flight info submitted successfully', payload);
    });

    it('should throw error and log on submission failure', async () => {
      // Arrange
      const payload: FlightInfoPayload = {
        airline: 'Delta',
        arrivalDate: '2024-12-01',
        arrivalTime: '14:30',
        flightNumber: 'DL100',
        numOfGuests: 2
      };
      const error = new Error('Network error');
      mockHttp.post.mockReturnValue(throwError(() => error));

      // Act & Assert
      await expect(service.submitFlightInfo(payload)).rejects.toThrow('Network error');
      expect(mockLogger.error).toHaveBeenCalledWith('Flight submission failed', error);
    });

    it('should include correct headers in API request', async () => {
      // Arrange
      const payload: FlightInfoPayload = {
        airline: 'Delta',
        arrivalDate: '2024-12-01',
        arrivalTime: '14:30',
        flightNumber: 'DL100',
        numOfGuests: 2
      };
      mockHttp.post.mockReturnValue(of(true));

      // Act
      await service.submitFlightInfo(payload);

      // Assert
      const callArgs = mockHttp.post.mock.calls[0];
      expect(callArgs[2].headers.get('Content-Type')).toBe('application/json');
    });
  });

  describe('recordSubmission', () => {
    it('should handle recordSubmission method', () => {
      // Service method exists
      expect(typeof service.recordSubmission).toBe('function');
    });
  });
});
