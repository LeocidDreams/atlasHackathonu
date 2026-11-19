import type { IUserRepository } from "@modules/auth/domain/Iuser-repository.js";
import { injectable, inject } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import type { SignUpDto } from "@atlas/validators";
import { supabase } from "@core/supabase/supabase.js";
import type { User } from "@modules/auth/domain/user.js";
import { AppError } from "@core/errors/app-error.js";
import type { ISignUp } from "@modules/auth/domain/Isign-up.js";

@injectable()
export class SignUp implements ISignUp {
  constructor() {}

  public async execute(dto: SignUpDto): Promise<User> {
    const response = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (response.error) {
      throw AppError.internal(response.error.message);
    }

    const user: User = {
      id: response.data.user?.id ?? "",
      email: response.data.user?.email ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
      phone: response.data.user?.phone ?? undefined,
    };

    return user;
  }
}
