import { TOKENS } from "@core/di/tokens.js";
import { ApiResponse, HttpStatusCode } from "@atlas/shared";
import type { Request, Response } from "express";
import { container } from "tsyringe";

export class RagController {
  constructor() {}

  static async upload(req: Request, res: Response) {
    return res
      .status(HttpStatusCode.OK)
      .json(ApiResponse.ok(null, "rag upload endpoint"));
  }
}
