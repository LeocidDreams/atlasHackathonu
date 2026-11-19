import { ApiResponse, HttpStatusCode } from "@atlas/shared";
import type { Request, Response } from "express";
import { supabase } from "@core/supabase/supabase.js";
import type { SignUpDto } from "@atlas/validators";

export class AuthController {
  constructor() {}

  public static async signUp(req: Request, res: Response) {
    const data: SignUpDto = req.body;

    supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    res.status(HttpStatusCode.CREATED).json(ApiResponse.created("created"));
  }
}
