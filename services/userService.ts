import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase';
import type { UserProfile } from '@/types/user';

export async function upsertUserProfile(user: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}): Promise<UserProfile> {
  if (!db) {
    throw new Error('Firebase is not configured. Add the values from .env.example.');
  }
  const reference = doc(db, 'users', user.uid);
  const existing = await getDoc(reference);
  const existingProfile = existing.exists() ? (existing.data() as Partial<UserProfile>) : undefined;
  const profile: UserProfile = {
    uid: user.uid,
    name: user.displayName || 'HBPlus member',
    email: user.email || '',
    photoURL: user.photoURL,
    role: existingProfile?.role === 'admin' ? 'admin' : 'user',
    createdAt: existingProfile?.createdAt || serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  };

  await setDoc(reference, profile, { merge: true });
  return profile;
}
