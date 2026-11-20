import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { SupabaseSignUp } from "@modules/auth/infrastructure/sign-up/supabase-sign-up.js";

@registry([
  {
    token: TOKENS.SignUp,
    useFactory: instanceCachingFactory(() => new SupabaseSignUp()),
  },
])
export class AuthRegistry {}
