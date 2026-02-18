import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);

    // Mock console methods using Vitest
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('error', () => {
    it('should always log errors', () => {
      const message = 'Test error';
      const error = new Error('error object');
      
      service.error(message, error);
      
      expect(console.error).toHaveBeenCalledWith('[ERROR] Test error', error);
    });
  });

  describe('development mode logging', () => {
    it('should log warnings in development mode', () => {
      const message = 'Test warning';
      
      service.warn(message);
      
      if (!environment.production) {
        expect(console.warn).toHaveBeenCalled();
      }
    });

    it('should log info in development mode', () => {
      const message = 'Test info';
      const data = { key: 'value' };
      
      service.info(message, data);
      
      if (!environment.production) {
        expect(console.info).toHaveBeenCalled();
      }
    });

    it('should log debug in development mode', () => {
      const message = 'Test debug';
      
      service.debug(message);
      
      if (!environment.production) {
        expect(console.debug).toHaveBeenCalled();
      }
    });
  });
});
