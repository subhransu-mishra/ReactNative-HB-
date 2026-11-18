import {
  GoogleAuthProvider,
  browserPopupRedirectResolver,
  signInWithCredential,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { Platform } from 'react-native';
import { ALLOWED_EMAIL_DOMAIN } from '@/constants/config';
import { auth, firebaseConfigMissing } from '@/services/firebase';
import { upsertUserProfile } from '@/services/userService';

export const UNAUTHORIZED_MESSAGE =
  'Access restricted. Please login using your official domain email.';

export function isAllowedDomain(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const parts = normalized.split('@');
  return parts.length === 2 && parts[0].length > 0 && parts[1] === ALLOWED_EMAIL_DOMAIN;
}

function assertFirebaseConfiguration() {
  if (firebaseConfigMissing.length > 0) {
    throw new Error(
      `Firebase configuration is incomplete. Add these environment variables: ${firebaseConfigMissing.join(', ')}`,
    );
  }
  if (!auth) {
    throw new Error('Firebase is not configured. Add the values from .env.example.');
  }
}

async function validateAndPersist(user: Parameters<typeof upsertUserProfile>[0]) {
  if (!auth) {
    throw new Error('Firebase is not configured. Add the values from .env.example.');
  }
  if (!user.email || !isAllowedDomain(user.email)) {
    await firebaseSignOut(auth);
    throw new Error(UNAUTHORIZED_MESSAGE);
  }

  const currentUser = auth.currentUser;
  if (!currentUser?.emailVerified) {
    await firebaseSignOut(auth);
    throw new Error(UNAUTHORIZED_MESSAGE);
  }

  await upsertUserProfile(user);
}

export async function signInWithGooglePopup() {
  assertFirebaseConfiguration();
  const currentAuth = auth;
  if (!currentAuth) throw new Error('Firebase is not configured. Add the values from .env.example.');
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(currentAuth, provider, browserPopupRedirectResolver);
  await validateAndPersist({
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
  });
}

export async function signInWithGoogleToken(idToken: string) {
  assertFirebaseConfiguration();
  const currentAuth = auth;
  if (!currentAuth) throw new Error('Firebase is not configured. Add the values from .env.example.');
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(currentAuth, credential);
  await validateAndPersist({
    uid: result.user.uid,
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
  });
}

export async function signInWithGoogle(idToken?: string) {
  if (Platform.OS === 'web') {
    await signInWithGooglePopup();
  } else if (idToken) {
    await signInWithGoogleToken(idToken);
  } else {
    throw new Error('Google sign-in did not return an ID token. Please try again.');
  }
}

export async function signOut() {
  if (auth) await firebaseSignOut(auth);
}
