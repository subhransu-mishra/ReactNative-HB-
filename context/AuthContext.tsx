import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { auth, db, type FirebaseUser } from '@/services/firebase';
import { signInWithGoogle, signOut as signOutService } from '@/services/authService';
import type { AuthContextValue } from '@/types/auth';
import type { UserProfile } from '@/types/user';
import { AuthContext } from '@/hooks/useAuth';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (idToken?: string) => {
    setIsSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle(idToken);
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : 'Unable to sign in. Please try again.',
      );
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await signOutService();
  }, []);

  useEffect(() => {
    const currentAuth = auth;
    const currentDb = db;
    if (!currentAuth || !currentDb) {
      setError('Firebase is not configured. Copy .env.example to .env and add your project values.');
      setIsLoading(false);
      return;
    }

    return onAuthStateChanged(currentAuth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        const snapshot = await getDoc(doc(currentDb, 'users', nextUser.uid));
        setProfile(snapshot.exists() ? (snapshot.data() as UserProfile) : null);
      } catch {
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isLoading,
      isSigningIn,
      error,
      signInWithGoogle: signIn,
      signOut,
    }),
    [error, isLoading, isSigningIn, profile, signIn, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
