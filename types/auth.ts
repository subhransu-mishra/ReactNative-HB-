import type { FirebaseUser } from '@/services/firebase';
import type { UserProfile } from '@/types/user';

export interface AuthContextValue {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isSigningIn: boolean;
  error: string | null;
  signInWithGoogle: (idToken?: string) => Promise<void>;
  signOut: () => Promise<void>;
}
