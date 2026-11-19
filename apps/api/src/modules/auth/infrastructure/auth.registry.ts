import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { SignUp } from "@modules/auth/infrastructure/application/sign-up.js";

@registry([
  {
    token: TOKENS.SignUp,
    useFactory: instanceCachingFactory(() => new SignUp()),
  },
])
export class AuthRegistry {}
