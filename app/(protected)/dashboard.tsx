import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { UserProfile } from '@/components/UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { colors, spacing, typography } from '@/constants/theme';

export default function DashboardScreen() {
  const { profile } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>OVERVIEW</Text>
        <Text style={styles.title}>Welcome back, {profile?.name?.split(' ')[0] || 'there'}</Text>
        <Text style={styles.subtitle}>Your HBPlus organization workspace is ready.</Text>
        <View style={styles.panel}>
          <View style={styles.panelCopy}>
            <Text style={styles.panelEyebrow}>YOUR ACCESS</Text>
            <Text style={styles.panelTitle}>Organization account verified</Text>
            <Text style={styles.panelText}>
              You are signed in with an approved HBPlus account and can access this portal.
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{profile?.role === 'admin' ? 'ADMIN' : 'USER'}</Text>
          </View>
        </View>
        <UserProfile />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 1080, alignSelf: 'center', padding: spacing.lg },
  eyebrow: { ...typography.eyebrow, color: colors.accent },
  title: { ...typography.heading, color: colors.text, marginTop: spacing.sm },
  subtitle: { ...typography.body, color: colors.mutedText, marginTop: spacing.xs },
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 18,
    backgroundColor: colors.accent,
  },
  panelCopy: { flex: 1, paddingRight: spacing.md },
  panelEyebrow: { ...typography.eyebrow, color: '#C8D7FF' },
  panelTitle: { ...typography.subheading, color: colors.white, marginTop: spacing.sm },
  panelText: { ...typography.body, color: '#E4EBFF', marginTop: spacing.xs },
  badge: {
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
});
