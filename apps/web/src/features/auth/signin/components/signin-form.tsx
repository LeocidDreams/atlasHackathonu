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

export type SignInValues = {
  email: string;
  password: string;
};

type SignInFormProps = {
  onSubmit?: (values: SignInValues) => Promise<void> | void;
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: SignInValues = {
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
    };

    setError(null);
    setPending(true);
    try {
      await onSubmit?.(values);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign in failed. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signin-email">Email</FieldLabel>
          <Input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            autoFocus
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signin-password">Password</FieldLabel>
          <PasswordInput
            id="signin-password"
            name="password"
            autoComplete="current-password"
            required
          />
        </Field>

        {error && <FieldError>{error}</FieldError>}

        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Spinner />}
          {pending ? "Signing in" : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
