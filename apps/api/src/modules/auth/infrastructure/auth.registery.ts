import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { SupabaseUserRepository } from "@modules/auth/infrastructure/repository/supabase-user-repository.js";
import { SignUp } from "@modules/auth/infrastructure/application/sign-up.js";

@registry([
  {
    token: TOKENS.UserRepository,
    useFactory: instanceCachingFactory(() => new SupabaseUserRepository()),
  },
  {
    token: TOKENS.SignUp,
    useFactory: instanceCachingFactory(
      (c) => new SignUp(c.resolve(TOKENS.UserRepository)),
    ),
  },
])
export class AuthRegistry {}
