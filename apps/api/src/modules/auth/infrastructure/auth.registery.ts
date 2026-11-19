import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { SupabaseUserRepository } from "./repository/supabase-user-repository.js";

@registry([
  {
    token: TOKENS.UserRepository,
    useFactory: instanceCachingFactory(() => new SupabaseUserRepository()),
  },
])
export class AuthRegistry {}
