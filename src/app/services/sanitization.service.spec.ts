import { TestBed } from '@angular/core/testing';
import { SanitizationService } from './sanitization.service';

describe('SanitizationService', () => {
  let service: SanitizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanitizationService]
    });
    service = TestBed.inject(SanitizationService);
  });

  describe('sanitizeText', () => {
    it('should return empty string for empty input', () => {
      expect(service.sanitizeText('')).toBe('');
      expect(service.sanitizeText(null as any)).toBe('');
    });

    it('should trim whitespace', () => {
      expect(service.sanitizeText('  hello  ')).toBe('hello');
    });

    it('should remove HTML tags', () => {
      expect(service.sanitizeText('Hello <script>alert("XSS")</script>')).toBe('Hello alert("XSS")');
      expect(service.sanitizeText('<b>Bold</b> text')).toBe('Bold text');
    });

    it('should remove dangerous characters', () => {
      expect(service.sanitizeText('Hello<>{}World')).toBe('HelloWorld');
    });

    it('should remove javascript: protocol', () => {
      expect(service.sanitizeText('Click javascript:alert(1)')).toBe('Click alert(1)');
    });

    it('should remove event handlers', () => {
      expect(service.sanitizeText('Hello onclick=alert(1)')).toBe('Hello alert(1)');
    });

    it('should normalize whitespace', () => {
      expect(service.sanitizeText('Hello    World')).toBe('Hello World');
    });

    it('should limit length to 1000 characters', () => {
      const longText = 'a'.repeat(2000);
      expect(service.sanitizeText(longText)).toHaveLength(1000);
    });
  });

  describe('sanitizeName', () => {
    it('should return empty string for empty input', () => {
      expect(service.sanitizeName('')).toBe('');
    });

    it('should capitalize first letter of each word', () => {
      expect(service.sanitizeName('john doe')).toBe('John Doe');
      // Note: split on space only, so Mary-jane is one "word"
      expect(service.sanitizeName('MARY-JANE')).toBe('Mary-jane');
    });

    it('should allow hyphens and apostrophes', () => {
      // Note: Apostrophe/hyphen parts are treated as single word
      expect(service.sanitizeName("O'Connor")).toBe("O'connor");
      expect(service.sanitizeName('Jean-Paul')).toBe('Jean-paul');
    });

    it('should remove numbers and special characters', () => {
      expect(service.sanitizeName('John123')).toBe('John');
      expect(service.sanitizeName('Mary@Test')).toBe('Marytest');
    });

    it('should limit length to 50 characters', () => {
      const longName = 'a'.repeat(100);
      expect(service.sanitizeName(longName)).toHaveLength(50);
    });

    it('should normalize multiple spaces', () => {
      expect(service.sanitizeName('John    Doe')).toBe('John Doe');
    });
  });

  describe('sanitizeEmail', () => {
    it('should return empty string for empty input', () => {
      expect(service.sanitizeEmail('')).toBe('');
    });

    it('should convert to lowercase', () => {
      expect(service.sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      expect(service.sanitizeEmail('  test@example.com  ')).toBe('test@example.com');
    });

    it('should remove invalid characters', () => {
      expect(service.sanitizeEmail('test#$%@example.com')).toBe('test@example.com');
    });

    it('should preserve valid email characters', () => {
      expect(service.sanitizeEmail('test.user+tag@example.com')).toBe('test.user+tag@example.com');
    });

    it('should limit length to 254 characters', () => {
      const longEmail = 'a'.repeat(300) + '@example.com';
      expect(service.sanitizeEmail(longEmail).length).toBeLessThanOrEqual(254);
    });
  });

  describe('sanitizeMultilineText', () => {
    it('should return empty string for empty input', () => {
      expect(service.sanitizeMultilineText('')).toBe('');
    });

    it('should preserve line breaks', () => {
      const input = 'Line 1\nLine 2\nLine 3';
      const result = service.sanitizeMultilineText(input);
      expect(result).toBe('Line 1\nLine 2\nLine 3');
    });

    it('should remove HTML tags', () => {
      expect(service.sanitizeMultilineText('Hello <b>World</b>')).toBe('Hello World');
    });

    it('should remove javascript: protocol', () => {
      expect(service.sanitizeMultilineText('Click javascript:alert(1)')).toBe('Click alert(1)');
    });

    it('should remove event handlers', () => {
      expect(service.sanitizeMultilineText('Text onclick=alert(1)')).toBe('Text alert(1)');
    });

    it('should limit length to 5000 characters', () => {
      const longText = 'a'.repeat(6000);
      expect(service.sanitizeMultilineText(longText)).toHaveLength(5000);
    });
  });

  describe('sanitizeAlphanumeric', () => {
    it('should return empty string for empty input', () => {
      expect(service.sanitizeAlphanumeric('')).toBe('');
    });

    it('should convert to uppercase', () => {
      expect(service.sanitizeAlphanumeric('abc123')).toBe('ABC123');
    });

    it('should preserve hyphens and spaces', () => {
      expect(service.sanitizeAlphanumeric('Flight-123 A')).toBe('FLIGHT-123 A');
    });

    it('should remove special characters', () => {
      expect(service.sanitizeAlphanumeric('ABC@#$123')).toBe('ABC123');
    });

    it('should normalize spaces', () => {
      expect(service.sanitizeAlphanumeric('AA   123')).toBe('AA 123');
    });

    it('should limit length to 50 characters', () => {
      const longInput = 'a'.repeat(100);
      expect(service.sanitizeAlphanumeric(longInput)).toHaveLength(50);
    });
  });

  describe('sanitizePhone', () => {
    it('should return empty string for empty input', () => {
      expect(service.sanitizePhone('')).toBe('');
    });

    it('should extract only digits', () => {
      expect(service.sanitizePhone('(555) 123-4567')).toBe('5551234567');
      expect(service.sanitizePhone('+1-555-123-4567')).toBe('15551234567');
    });

    it('should remove all non-digit characters', () => {
      expect(service.sanitizePhone('abc 123 def 456')).toBe('123456');
    });

    it('should limit length to 15 characters', () => {
      const longPhone = '1234567890123456789';
      expect(service.sanitizePhone(longPhone)).toHaveLength(15);
    });
  });

  describe('sanitizeNumber', () => {
    it('should return 0 for empty string', () => {
      expect(service.sanitizeNumber('')).toBe(0);
    });

    it('should handle numeric input', () => {
      expect(service.sanitizeNumber(123)).toBe(123);
      expect(service.sanitizeNumber(0)).toBe(0);
    });

    it('should extract digits from string', () => {
      expect(service.sanitizeNumber('123')).toBe(123);
      expect(service.sanitizeNumber('abc123def')).toBe(123);
    });

    it('should return 0 for negative numbers', () => {
      expect(service.sanitizeNumber(-5)).toBe(0);
    });

    it('should floor decimal numbers', () => {
      expect(service.sanitizeNumber(123.7)).toBe(123);
    });

    it('should return 0 for NaN inputs', () => {
      expect(service.sanitizeNumber('abc')).toBe(0);
      expect(service.sanitizeNumber('!!!')).toBe(0);
    });
  });

  describe('containsXSS', () => {
    it('should return false for safe input', () => {
      expect(service.containsXSS('Hello World')).toBe(false);
      expect(service.containsXSS('Normal text with 123')).toBe(false);
    });

    it('should return false for empty input', () => {
      expect(service.containsXSS('')).toBe(false);
      expect(service.containsXSS(null as any)).toBe(false);
    });

    it('should detect script tags', () => {
      expect(service.containsXSS('<script>alert(1)</script>')).toBe(true);
      expect(service.containsXSS('<SCRIPT>alert(1)</SCRIPT>')).toBe(true);
    });

    it('should detect javascript: protocol', () => {
      expect(service.containsXSS('javascript:alert(1)')).toBe(true);
      expect(service.containsXSS('JAVASCRIPT:alert(1)')).toBe(true);
    });

    it('should detect event handlers', () => {
      expect(service.containsXSS('onclick=alert(1)')).toBe(true);
      expect(service.containsXSS('onload=malicious()')).toBe(true);
    });

    it('should detect iframe tags', () => {
      expect(service.containsXSS('<iframe src="evil.com"></iframe>')).toBe(true);
    });

    it('should detect embed tags', () => {
      expect(service.containsXSS('<embed src="malicious.swf">')).toBe(true);
    });

    it('should detect object tags', () => {
      expect(service.containsXSS('<object data="evil.pdf"></object>')).toBe(true);
    });

    it('should detect eval calls', () => {
      expect(service.containsXSS('eval(maliciousCode)')).toBe(true);
    });

    it('should detect expression calls', () => {
      expect(service.containsXSS('expression(alert(1))')).toBe(true);
    });
  });
});
