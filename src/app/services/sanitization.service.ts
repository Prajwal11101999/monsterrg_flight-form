import { Injectable } from '@angular/core';

/**
 * Input sanitization service to prevent XSS attacks and ensure data cleanliness
 * Provides methods for sanitizing various types of user input
 */
@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  /**
   * Sanitizes general text input (names, airline, etc.)
   * - Trims whitespace
   * - Removes HTML tags
   * - Removes dangerous characters that could be used for XSS
   * - Preserves common punctuation
   * @param input Raw user input
   * @returns Sanitized string
   */
  sanitizeText(input: string): string {
    if (!input) return '';
    
    return input
      .trim()                                    // Remove leading/trailing whitespace
      .replace(/<[^>]*>/g, '')                   // Remove HTML tags
      .replace(/[<>{}]/g, '')                    // Remove dangerous characters
      .replace(/javascript:/gi, '')              // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '')                // Remove event handlers (onclick=, etc.)
      .replace(/\s+/g, ' ')                      // Normalize whitespace
      .substring(0, 1000);                       // Limit length to prevent abuse
  }

  /**
   * Sanitizes name input (first name, last name)
   * - Only allows letters, spaces, hyphens, and apostrophes
   * - Trims whitespace
   * - Capitalizes first letter of each word
   * @param name Raw name input
   * @returns Sanitized name
   */
  sanitizeName(name: string): string {
    if (!name) return '';
    
    return name
      .trim()
      .replace(/[^a-zA-Z\s'-]/g, '')             // Only allow letters, spaces, hyphens, apostrophes
      .replace(/\s+/g, ' ')                      // Normalize multiple spaces
      .replace(/^[\s'-]+|[\s'-]+$/g, '')         // Remove leading/trailing special chars
      .substring(0, 50)                          // Limit length
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Sanitizes email input
   * - Trims whitespace
   * - Converts to lowercase
   * - Removes invalid characters
   * @param email Raw email input
   * @returns Sanitized email
   */
  sanitizeEmail(email: string): string {
    if (!email) return '';
    
    return email
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9@._+-]/g, '')            // Only allow valid email characters
      .substring(0, 254);                        // RFC 5321 max length
  }

  /**
   * Sanitizes multi-line text input (comments, descriptions)
   * - Trims whitespace
   * - Removes HTML tags
   * - Preserves line breaks
   * - Removes dangerous content
   * @param input Raw text input
   * @returns Sanitized text
   */
  sanitizeMultilineText(input: string): string {
    if (!input) return '';
    
    return input
      .trim()
      .replace(/<[^>]*>/g, '')                   // Remove HTML tags
      .replace(/javascript:/gi, '')              // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '')                // Remove event handlers
      .replace(/[<>{}]/g, '')                    // Remove dangerous characters
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .substring(0, 5000);                       // Limit length
  }

  /**
   * Sanitizes alphanumeric input (flight numbers, airline codes)
   * - Trims whitespace
   * - Removes special characters except hyphens and spaces
   * - Converts to uppercase
   * @param input Raw input
   * @returns Sanitized alphanumeric string
   */
  sanitizeAlphanumeric(input: string): string {
    if (!input) return '';
    
    return input
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9\s-]/g, '')              // Only allow letters, numbers, spaces, hyphens
      .replace(/\s+/g, ' ')                      // Normalize spaces
      .substring(0, 50);                         // Limit length
  }

  /**
   * Sanitizes phone number input
   * - Removes all non-digit characters
   * - Preserves only numbers
   * @param phone Raw phone input
   * @returns Sanitized phone number (digits only)
   */
  sanitizePhone(phone: string): string {
    if (!phone) return '';
    
    return phone
      .replace(/\D/g, '')                        // Remove all non-digits
      .substring(0, 15);                         // International max length
  }

  /**
   * Sanitizes numeric input
   * - Removes all non-numeric characters
   * - Returns valid number or 0
   * @param input Raw input
   * @returns Sanitized number
   */
  sanitizeNumber(input: string | number): number {
    if (typeof input === 'number') return Math.max(0, Math.floor(input));
    
    const cleaned = String(input).replace(/\D/g, '');
    const num = parseInt(cleaned, 10);
    return isNaN(num) ? 0 : Math.max(0, num);
  }

  /**
   * Checks if string contains potential XSS patterns
   * @param input String to check
   * @returns true if suspicious patterns detected
   */
  containsXSS(input: string): boolean {
    if (!input) return false;
    
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<embed/i,
      /<object/i,
      /eval\(/i,
      /expression\(/i
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }
}
