import { useState } from "react";
import { createSignUpSchema } from "@atlas/validators";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/features/auth/components/password-input";

export type SignUpValues = {
  email: string;
  password: string;
};

type SignUpErrors = Partial<Record<keyof SignUpValues, { message?: string }[]>>;

const signUpSchema = createSignUpSchema();

type SignUpFormProps = {
  onSubmit?: (values: SignUpValues) => Promise<void> | void;
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<SignUpErrors>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mismatch = submitted && confirm.length > 0 && confirm !== password;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const data = new FormData(event.currentTarget);
    const result = signUpSchema.safeParse({
      email: String(data.get("email") ?? "").trim(),
      password,
    });

    if (!result.success) {
      const errors: SignUpErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SignUpValues;
        (errors[key] ??= []).push({ message: issue.message });
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    if (confirm !== password) return;

    const values: SignUpValues = result.data;

    setError(null);
    setPending(true);
    try {
      await onSubmit?.(values);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign up failed. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={!!fieldErrors.email || undefined}>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            autoFocus
            aria-invalid={!!fieldErrors.email || undefined}
          />
          <FieldError errors={fieldErrors.email} />
        </Field>

        <Field data-invalid={!!fieldErrors.password || undefined}>
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <PasswordInput
            id="signup-password"
            name="password"
            autoComplete="new-password"
            maxLength={128}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!fieldErrors.password || undefined}
            aria-describedby="signup-password-hint"
          />
          <FieldDescription id="signup-password-hint">
            At least 8 characters with an uppercase letter, a lowercase letter,
            a number and one of ! @ # $ &amp; *.
          </FieldDescription>
          <FieldError errors={fieldErrors.password} />
        </Field>

        <Field data-invalid={mismatch || undefined}>
          <FieldLabel htmlFor="signup-confirm">Confirm password</FieldLabel>
          <PasswordInput
            id="signup-confirm"
            name="confirm"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={mismatch || undefined}
          />
          {mismatch && <FieldError>Passwords don't match.</FieldError>}
        </Field>

        {error && <FieldError>{error}</FieldError>}

        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Spinner />}
          {pending ? "Creating account" : "Create account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
