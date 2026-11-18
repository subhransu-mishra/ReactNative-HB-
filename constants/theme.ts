export const colors = {
  background: '#F6F8FB',
  surface: '#FFFFFF',
  text: '#1C2430',
  mutedText: '#667085',
  border: '#E3E8EF',
  accent: '#405A9A',
  accentDark: '#31477E',
  white: '#FFFFFF',
  error: '#B42318',
  success: '#16794A',
};

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 };

export const typography = {
  eyebrow: { fontSize: 11, fontWeight: '800' as const, letterSpacing: 1.2 },
  title: { fontSize: 30, lineHeight: 38, fontWeight: '800' as const },
  heading: { fontSize: 28, lineHeight: 36, fontWeight: '800' as const },
  subheading: { fontSize: 20, lineHeight: 28, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 23, fontWeight: '400' as const },
  small: { fontSize: 12, lineHeight: 18, fontWeight: '400' as const },
};
