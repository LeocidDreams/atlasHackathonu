import * as z from "zod";

const STRONG_PASSWORD = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/;

export function createSignUpSchema() {
  const schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(128)
      .regex(STRONG_PASSWORD, "Password is not strong enough"),
  });
  return schema;
}

export function createSignInSchema() {
  const schema = createSignUpSchema().extend({});
  return schema;
}

export type SignUpDto = z.infer<ReturnType<typeof createSignUpSchema>>;
export type SignInDto = z.infer<ReturnType<typeof createSignInSchema>>;
