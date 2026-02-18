import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { LoggerService } from './logger.service';

/**
 * Interface for user profile data stored in Firestore
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  mobile: string | null;
  email: string;
  createdAt: Date;
}

/**
 * Service for managing user profile operations in Firestore
 * Separates business logic from components for better testability
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore = inject(Firestore);
  private logger = inject(LoggerService);

  /**
   * Gets user profile from Firestore
   * @param userId Firebase Auth user ID
   * @returns User profile or null if not found
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      this.logger.error('Failed to get user profile', error);
      throw error;
    }
  }

  /**
   * Creates a user profile in Firestore
   * @param userId Firebase Auth user ID
   * @param profile User profile data
   */
  async createUserProfile(userId: string, profile: UserProfile): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      await setDoc(userDocRef, profile);
      this.logger.info('User profile created successfully');
    } catch (error) {
      this.logger.error('Failed to create user profile', error);
      throw error;
    }
  }

  /**
   * Creates user profile from Google authentication
   * Parses display name into first and last name
   * @param user Firebase Auth user
   */
  async createProfileFromGoogleAuth(user: User): Promise<void> {
    const displayName = user.displayName || '';
    const nameParts = displayName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const profile: UserProfile = {
      firstName,
      lastName,
      mobile: null,
      email: user.email || '',
      createdAt: new Date()
    };

    await this.createUserProfile(user.uid, profile);
  }
}
