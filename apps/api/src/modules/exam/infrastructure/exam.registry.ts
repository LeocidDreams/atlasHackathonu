import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { GeminiExamGenerator } from "@modules/exam/infrastructure/exam/gemini-exam-generator.js";
import { IngestDocumentUseCase } from "@modules/exam/application/ingest-document.use-case.js";

@registry([
  {
    token: TOKENS.ExamGenerator,
    useFactory: instanceCachingFactory(() => new GeminiExamGenerator()),
  },
])
export class RagRegistry {}
