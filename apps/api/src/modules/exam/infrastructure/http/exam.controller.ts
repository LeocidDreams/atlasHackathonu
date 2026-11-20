import { ApiResponse, HttpStatusCode } from "@atlas/shared";
import type { Request, Response } from "express";

export class ExamController {
  constructor() {}

  static async generateExam(req: Request, res: Response) {
    return res
      .status(HttpStatusCode.OK)
      .json(ApiResponse.ok(null, "exam generated successfully"));
  }
}
