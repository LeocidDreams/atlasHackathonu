import { instanceCachingFactory, registry } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import { LangchainChunker } from "@modules/rag/infrastructure/chunking/langchain-chunker.js";
import { GeminiEmbeddingGenerator } from "@modules/rag/infrastructure/embedding/gemini-embedding-generator.js";
import { IngestDocumentUseCase } from "@modules/rag/application/ingest-document.use-case.js";

@registry([
  {
    token: TOKENS.ChunkDocument,
    useFactory: instanceCachingFactory(() => new LangchainChunker()),
  },
  {
    token: TOKENS.EmbeddingGenerator,
    useFactory: instanceCachingFactory(() => new GeminiEmbeddingGenerator()),
  },
  {
    token: TOKENS.IngestDocumentUseCase,
    useFactory: instanceCachingFactory(
      (c) =>
        new IngestDocumentUseCase(
          c.resolve(TOKENS.ChunkDocument),
          c.resolve(TOKENS.EmbeddingGenerator),
        ),
    ),
  },
])
export class RagRegistry {}
