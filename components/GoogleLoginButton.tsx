import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';
import { googleClientIds } from '@/constants/config';
import { colors, spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

export function GoogleLoginButton() {
  const { isSigningIn, signInWithGoogle } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: googleClientIds.web,
    androidClientId: googleClientIds.android,
    iosClientId: googleClientIds.ios,
    selectAccount: true,
  });

  useEffect(() => {
    if (Platform.OS !== 'web' && response?.type === 'success' && response.authentication?.idToken) {
      void signInWithGoogle(response.authentication.idToken);
    }
  }, [response, signInWithGoogle]);

  const handlePress = () => {
    if (Platform.OS === 'web') {
      void signInWithGoogle();
      return;
    }
    void promptAsync();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      disabled={isSigningIn || (!request && Platform.OS !== 'web')}
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {isSigningIn ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.label}>Continue with Google</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  pressed: { opacity: 0.75 },
  googleIcon: { fontSize: 19, fontWeight: '800', color: '#4285F4' },
  label: { color: colors.text, fontSize: 15, fontWeight: '700' },
});
