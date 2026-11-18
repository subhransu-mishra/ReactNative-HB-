import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index';

export function getAuthPersistence(_storage: typeof AsyncStorage) {
  return getReactNativePersistence(AsyncStorage);
}
