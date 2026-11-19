// Mirrors the strong password rule in @atlas/validators.
export const PASSWORD_RULES = [
  { label: "8 characters or more", test: (v: string) => v.length >= 8 },
  { label: "An uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "A lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "A number", test: (v: string) => /[0-9]/.test(v) },
  { label: "One of ! @ # $ & *", test: (v: string) => /[!@#$&*]/.test(v) },
] as const;

export function isStrongPassword(value: string) {
  return value.length <= 128 && PASSWORD_RULES.every((r) => r.test(value));
}
