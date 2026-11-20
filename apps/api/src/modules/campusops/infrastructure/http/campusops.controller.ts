import { GeminiEmbeddingGenerator, type IEmbeddingGenerator } from "@atlas/rag";
import { ApiResponse, HttpStatusCode } from "@atlas/shared";
import type { Request, Response } from "express";
import type { AskQueryDto } from "@atlas/validators";
import { GeminiAssistant } from "@modules/campusops/application/gemini-assistant.js";
import { container } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import type { ISearchCampusInfo } from "@modules/campusops/domain/Isearch-campus-info.js";

export class CampusOpsController {
  constructor() {}

  public static async askQuery(req: Request, res: Response) {
    const { university, query }: AskQueryDto = req.body;

    const embeddingGenerator: IEmbeddingGenerator =
      new GeminiEmbeddingGenerator();

    const searchCampusInfo: ISearchCampusInfo = container.resolve(
      TOKENS.SearchCampusInfo,
    );
    const geminiAssistant = new GeminiAssistant(searchCampusInfo);
    const answer = await geminiAssistant.answer({
      university,
      query,
      matchCount: 5,
      embeddingGenerator,
    });

    res.status(HttpStatusCode.OK).json(ApiResponse.ok(answer));
  }
}
