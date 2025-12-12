interface User {
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  age?: string;
  phone?: string;
  is_trial?: boolean;
  is_active?: boolean;
  [key: string]: unknown;
}


class SecureStorage {
  private readonly TOKEN_KEY = 'yuvax_auth_token';
  private readonly REFRESH_KEY = 'yuvax_refresh_token';
  private readonly USER_KEY = 'yuvax_user_data';

  private encrypt(data: string): string {
    const key = 'yuvax_secret_key_2025'; // In production, use env variable
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(encrypted); // Base64 encode
  }

  private decrypt(data: string): string {
    try {
      const decoded = atob(data);
      const key = 'yuvax_secret_key_2025';
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        decrypted += String.fromCharCode(
          decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      return decrypted;
    } catch {
      return '';
    }
  }

  // Store token with encryption
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      const encrypted = this.encrypt(token);
      localStorage.setItem(this.TOKEN_KEY, encrypted);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }

  // Get and decrypt token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      const encrypted = localStorage.getItem(this.TOKEN_KEY);
      if (!encrypted) return null;
      return this.decrypt(encrypted);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  // Store refresh token
  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    try {
      const encrypted = this.encrypt(token);
      localStorage.setItem(this.REFRESH_KEY, encrypted);
    } catch (error) {
      console.error('Error storing refresh token:', error);
    }
  }

  // Get refresh token
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      const encrypted = localStorage.getItem(this.REFRESH_KEY);
      if (!encrypted) return null;
      return this.decrypt(encrypted);
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  }

  // Store user data
  setUser(user: User): void {
    if (typeof window === 'undefined') return;
    try {
      const encrypted = this.encrypt(JSON.stringify(user));
      localStorage.setItem(this.USER_KEY, encrypted);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  // Get user data
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const encrypted = localStorage.getItem(this.USER_KEY);
      if (!encrypted) return null;
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted) as User;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  // Clear all auth data
  clearAuth(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  // Check if token exists
  hasToken(): boolean {
    return this.getToken() !== null;
  }
}

export const secureStorage = new SecureStorage();