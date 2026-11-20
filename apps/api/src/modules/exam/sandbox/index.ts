import dotenv from "dotenv";
import { IngestDocumentUseCase } from "@modules/rag/application/ingest-document.use-case.js";
import { GeminiEmbeddingGenerator } from "@modules/rag/infrastructure/embedding/gemini-embedding-generator.js";
import path from "node:path";
import { LangchainChunker } from "@modules/rag/infrastructure/chunking/langchain-chunker.js";
import { GeminiExamGenerator } from "@modules/rag/infrastructure/exam/gemini-exam-generator.js";
import fs from "fs";

// apps/api/.env; same depth from src/ and dist/. Runs before any class reads process.env.
dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../../.env"),
});

const ingestDocumentUseCase = new IngestDocumentUseCase(
  new LangchainChunker(),
  new GeminiEmbeddingGenerator(),
);

const embeddedChunks = await ingestDocumentUseCase.execute(
  path.resolve(import.meta.dirname, "./matrix-multiplication.pdf"),
);

const examGenerator = new GeminiExamGenerator();
const exam = await examGenerator.generateExam(embeddedChunks, {
  difficulty: "medium",
  questionFormat: "multiple-choice",
  questionsCount: 5,
  includeExplanations: false,
  language: "en",
  includeSourceReferences: false,
  topics: ["matrix multiplication"],
});

console.log(exam.questions);

fs.writeFileSync(
  path.resolve(import.meta.dirname, "./exam.json"),
  JSON.stringify(exam, null, 2),
);
