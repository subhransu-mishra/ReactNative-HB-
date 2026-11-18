import { Image, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { colors, spacing, typography } from '@/constants/theme';

export function UserProfile() {
  const { profile } = useAuth();
  return (
    <View style={styles.card}>
      {profile?.photoURL ? (
        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}><Text style={styles.initial}>{profile?.name?.charAt(0) || 'H'}</Text></View>
      )}
      <View style={styles.details}>
        <Text style={styles.name}>{profile?.name || 'HBPlus member'}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>
      <View style={styles.role}><Text style={styles.roleText}>{profile?.role === 'admin' ? 'Admin' : 'User'}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  avatarFallback: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DEE6FA' },
  initial: { color: colors.accent, fontSize: 18, fontWeight: '800' },
  details: { flex: 1, marginLeft: spacing.md },
  name: { ...typography.body, color: colors.text, fontWeight: '700' },
  email: { ...typography.small, color: colors.mutedText, marginTop: 2 },
  role: { paddingHorizontal: spacing.sm, paddingVertical: 5, borderRadius: 12, backgroundColor: '#EEF2FF' },
  roleText: { color: colors.accent, fontSize: 11, fontWeight: '800' },
});
