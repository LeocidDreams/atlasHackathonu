import { ApiResponse, HttpStatusCode } from "@atlas/shared";
import type { Request, Response } from "express";
import type { SignUpDto } from "@atlas/validators";
import { container } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import type { ISignUp } from "@modules/auth/domain/Isign-up.js";

export class AuthController {
  constructor() {}

  public static async signUp(req: Request, res: Response) {
    const data: SignUpDto = req.body;

    const signUpService = container.resolve<ISignUp>(TOKENS.SignUp);
    await signUpService.execute(data);

    res.status(HttpStatusCode.CREATED).json(ApiResponse.created("created"));
  }
}
