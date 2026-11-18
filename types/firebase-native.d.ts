declare module '@firebase/auth/dist/rn/index' {
  export function getReactNativePersistence(
    storage: typeof import('@react-native-async-storage/async-storage').default,
  ): NonNullable<Parameters<typeof import('firebase/auth').initializeAuth>[1]>['persistence'];
}
