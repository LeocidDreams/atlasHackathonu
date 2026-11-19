import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/features/auth/components/password-input";
import { PasswordRequirements } from "@/features/auth/components/password-requirements";
import { isStrongPassword } from "@/features/auth/lib/password-rules";

export type SignUpValues = {
  email: string;
  password: string;
};

type SignUpFormProps = {
  onSubmit?: (values: SignUpValues) => Promise<void> | void;
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weakPassword = submitted && !isStrongPassword(password);
  const mismatch = (submitted || confirm.length > 0) && confirm !== password;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!isStrongPassword(password) || confirm !== password) return;

    const data = new FormData(event.currentTarget);
    const values: SignUpValues = {
      email: String(data.get("email") ?? "").trim(),
      password,
    };

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
        <Field>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            autoFocus
          />
        </Field>

        <Field data-invalid={weakPassword || undefined}>
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <PasswordInput
            id="signup-password"
            name="password"
            autoComplete="new-password"
            maxLength={128}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={weakPassword || undefined}
            aria-describedby="signup-password-rules"
          />
          <PasswordRequirements id="signup-password-rules" value={password} />
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
