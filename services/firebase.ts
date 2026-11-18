import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  type User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAuthPersistence } from '@/services/authPersistence';

export type { FirebaseUser };

const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

export const firebaseConfigMissing = Object.entries(config)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const auth = firebaseConfigMissing.length
  ? null
  : (() => {
      const app = getApps().length ? getApp() : initializeApp(config);
      return Platform.OS === 'web'
        ? getAuth(app)
        : initializeAuth(app, { persistence: getAuthPersistence(AsyncStorage) });
    })();

export const db = firebaseConfigMissing.length
  ? null
  : getFirestore(getApps().length ? getApp() : initializeApp(config));
