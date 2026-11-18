# HBPlus Portal

HBPlus Portal is a single Expo + React Native Web application for secure organization access across web, Android, and iOS. It uses Firebase Authentication with Google OAuth and only permits verified accounts whose exact email domain is `hbplus.fit`.

## Features

- Shared responsive React Native UI for web, Android, and iOS
- Google sign-in using Firebase Authentication
- Strict, case-insensitive `@hbplus.fit` domain validation
- Persistent Firebase sessions (browser local persistence and native AsyncStorage persistence)
- Protected Expo Router navigation
- Firestore user profiles with trusted Admin/User role handling
- Firestore rules requiring verified organization accounts
- Static Expo web export prepared for Netlify

## Tech stack and structure

Expo SDK 54, React Native, React Native Web, TypeScript, Expo Router, Expo AuthSession, Firebase Auth, Cloud Firestore, and AsyncStorage.

```text
app/                 Expo Router routes
components/          Shared UI components
constants/            Theme and environment-derived configuration
context/              Centralized AuthContext
hooks/                Auth hook
services/             Firebase, authentication, and profile services
types/                Shared TypeScript types
firestore.rules       Backend access rules
netlify.toml          Netlify build and SPA fallback
```

## Prerequisites

- Node.js LTS and npm
- A Firebase project with Authentication and Firestore enabled
- Google Cloud OAuth client IDs for Web, Android, and iOS
- Android Studio and an Android emulator for Android development
- macOS with Xcode and an iOS simulator for iOS development. The iOS simulator cannot run locally on Windows.

Install dependencies:

```bash
npm install
```

## Firebase setup

1. Create a Firebase project and register a Web app.
2. Enable Authentication > Sign-in method > Google.
3. Create a Firestore database.
4. Deploy `firestore.rules` using the Firebase CLI or paste it into the Firestore Rules editor.
5. Add your local and production web hosts in Authentication > Settings > Authorized domains. Include `localhost` and your Netlify hostname.
6. Configure Admin users through a trusted server/admin process by setting the `admin` custom claim. Never let a client write its own Admin role.

## Google OAuth configuration

Create OAuth 2.0 client IDs in Google Cloud Console:

- Web client: use the Firebase Auth web flow. Add `http://localhost:8081` and the deployed Netlify origin as authorized JavaScript origins. Firebase's OAuth handler/redirect is managed by Firebase; ensure the Firebase auth domain is authorized.
- Android client: use the Android package `fit.hbplus.portal` and your signing certificate SHA-1/SHA-256.
- iOS client: use the bundle identifier `fit.hbplus.portal`.

Do not put client secrets in this app. Client IDs are public identifiers. Native OAuth should be tested in an Expo development build; some native redirect flows are not supported by Expo Go.

## Environment variables

Copy `.env.example` to `.env` and replace every value with your Firebase web configuration and OAuth client IDs. Expo exposes only variables prefixed with `EXPO_PUBLIC_` to the client. Never add service-account JSON, private keys, or OAuth client secrets.

## Authentication and domain restriction

The app restores Firebase state before rendering a route. After Google sign-in, it requires a non-empty, verified email and checks the exact normalized domain with `isAllowedDomain`. Any unauthorized or unverified account is immediately signed out and shown:

> Access restricted. Please login using your official domain email.

Authorized profiles are created/updated at `users/{uid}`. New profiles receive `user`; an existing trusted Admin role is preserved. The client never grants Admin privileges.

## Run on web

```bash
npx expo start --web
```

For a production export:

```bash
npx expo export --platform web
```

## Run on Android

Start Metro and press `a`, or use an Android development build:

```bash
npx expo start
```

Native Google OAuth is most reliable in a development build with the Android OAuth client configured. For a build:

```bash
npx eas build --platform android
```

## Run on iOS

On macOS with Xcode and a configured simulator:

```bash
npx expo start
```

Then press `i`. iOS development and simulator tooling are not available locally on Windows.

## Netlify deployment

The included `netlify.toml` uses:

- Build command: `npx expo export --platform web`
- Publish directory: `dist`
- SPA fallback: all paths rewrite to `/index.html`

Set all `.env.example` values as Netlify environment variables, deploy, then add the exact Netlify production domain to Firebase Authorized domains and Google OAuth authorized origins. Rebuild after changing environment variables.

## Testing checklist

Test with a verified `@hbplus.fit` account, a Gmail account, an unverified organization account, a missing-email account, page refresh, direct `/dashboard` access while signed out, logout, Android native OAuth, web OAuth, and Firestore Rules Simulator cases. Confirm that non-organization accounts are signed out and that rules reject reads/writes for unauthorized users.
