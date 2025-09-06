export type UserRole = 'athlete' | 'coach' | 'official';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  district?: string;
  state?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  preferredLanguage: 'en' | 'hi';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}