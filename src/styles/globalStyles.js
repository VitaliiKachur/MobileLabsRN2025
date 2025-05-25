import { StyleSheet } from "react-native";

export const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#10b981',
  secondaryDark: '#059669',
  danger: '#ef4444',
  dangerDark: '#dc2626',
  warning: '#f59e0b',
  gray: '#6b7280',
  grayLight: '#f3f4f6',
  grayDark: '#374151',
  white: '#ffffff',
  black: '#111827',
  background: '#f9fafb',
  surface: '#ffffff',
  border: '#d1d5db',
  text: '#111827',
  textSecondary: '#6b7280',
  success: '#10b981',
  error: '#ef4444'
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  warningButton: {
    backgroundColor: colors.warning,
  },
  grayButton: {
    backgroundColor: colors.gray,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outlineButtonText: {
    color: colors.primary,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  successText: {
    color: colors.success,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },
  linkText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});