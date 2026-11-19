import { type SignUpDto } from "@atlas/validators";
import { type User } from "@modules/auth/domain/user.js";

export interface ISignUp {
  /**
   * Register a new user. Throws a conflict error if the email is already taken.
   */
  execute(dto: SignUpDto): Promise<User>;
}
