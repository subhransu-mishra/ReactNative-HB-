export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  role: UserRole;
  createdAt?: unknown;
  lastLoginAt?: unknown;
}
