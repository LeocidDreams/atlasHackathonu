import { AppError } from "@core/errors/app-error.js";
import { supabase } from "@core/supabase/supabase.js";
import type { User } from "@modules/auth/domain/user.js";
import type { IUserRepository } from "@modules/auth/domain/Iuser-repository.js";

export class SupabaseUserRepository implements IUserRepository {
  constructor() {}

  public async findUserById(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new AppError(error.message);
    }

    return data as User;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      throw new AppError(error.message);
    }

    return data as User;
  }

  public async ensureUserExistById(id: string): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new AppError(`User with ID ${id} does not exist`);
    }
    return user;
  }

  public async ensureUserExistByEmail(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new AppError(`User with email ${email} does not exist`);
    }
    return user;
  }

  public async ensureUserNotExistByEmail(email: string): Promise<void> {
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new AppError(`User with email ${email} already exists`);
    }
  }

  public async ensureUserNotExistById(id: string): Promise<void> {
    const user = await this.findUserById(id);
    if (user) {
      throw new AppError(`User with ID ${id} already exists`);
    }
  }
}
