import { type User } from "@modules/auth/domain/user.js";

export interface IUserRepository {
  findUserById(id: string): Promise<User | undefined>;

  findUserByEmail(email: string): Promise<User | undefined>;

  /**
   * Throws if no user with the given id exists.
   */
  ensureUserExistById(id: string): Promise<User>;

  /**
   * Throws if no user with the given email exists.
   */
  ensureUserExistByEmail(email: string): Promise<User>;

  /**
   * Throws if a user with the given email already exists.
   */
  ensureUserNotExistByEmail(email: string): Promise<void>;

  /**
   * Throws if a user with the given id already exists.
   */
  ensureUserNotExistById(id: string): Promise<void>;
}
