import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { colors, spacing, typography } from '@/constants/theme';

export function Header() {
  const { profile, signOut } = useAuth();
  return (
    <View style={styles.header}>
      <View style={styles.inner}>
        <View style={styles.brand}>
          <View style={styles.mark}><Text style={styles.markText}>HB</Text></View>
          <Text style={styles.brandText}>HBPlus Portal</Text>
        </View>
        <View style={styles.actions}>
          <Text style={styles.name}>{profile?.name || 'Member'}</Text>
          <Pressable accessibilityRole="button" onPress={() => void signOut()} style={styles.logout}>
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  inner: { width: '100%', maxWidth: 1080, alignSelf: 'center', minHeight: 72, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  mark: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent },
  markText: { color: colors.white, fontSize: 11, fontWeight: '800' },
  brandText: { ...typography.body, color: colors.text, fontWeight: '800' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  name: { ...typography.small, color: colors.mutedText, maxWidth: 180 },
  logout: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: 8, backgroundColor: colors.background },
  logoutText: { ...typography.small, color: colors.text, fontWeight: '700' },
});
