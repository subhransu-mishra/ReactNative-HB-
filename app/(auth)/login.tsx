import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleLoginButton } from '@/components/GoogleLoginButton';
import { useAuth } from '@/hooks/useAuth';
import { colors, spacing, typography } from '@/constants/theme';

export default function LoginScreen() {
  const { error } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.card}>
          <View style={styles.brandMark} accessibilityLabel="HBPlus logo">
            <Text style={styles.brandMarkText}>HB</Text>
          </View>
          <Text style={styles.eyebrow}>HBPLUS PORTAL</Text>
          <Text style={styles.title}>Welcome to HBPlus</Text>
          <Text style={styles.subtitle}>
            Sign in with your official organization account to continue.
          </Text>

          <GoogleLoginButton />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Text style={styles.secureText}>Secure organization access</Text>
        </View>
        <Text style={styles.copyright}>HBPlus · Organization workspace</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 430,
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#182230',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  brandMark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    marginBottom: spacing.md,
  },
  brandMarkText: { color: colors.white, fontSize: 18, fontWeight: '800' },
  eyebrow: { ...typography.eyebrow, color: colors.accent, marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text, textAlign: 'center' },
  subtitle: {
    ...typography.body,
    color: colors.mutedText,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  error: {
    ...typography.small,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  secureText: { ...typography.small, color: colors.mutedText, marginTop: spacing.xl },
  copyright: { ...typography.small, color: colors.mutedText, marginTop: spacing.lg },
});
