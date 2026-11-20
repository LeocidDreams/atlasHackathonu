import "reflect-metadata";
import { container } from "tsyringe";
import { TOKENS } from "@core/di/tokens.js";
import "@modules/rag/infrastructure/rag.registry.js";
import { LangchainChunker } from "@modules/rag/infrastructure/chunking/langchain-chunker.js";
import { type IChunkDocument } from "@modules/rag/domain/Ichunk-document.js";
import { describe, it, expect } from "vitest";

describe("RagRegistry", () => {
  it("should resolve the chunker as a singleton", () => {
    const chunker = container.resolve<IChunkDocument>(TOKENS.ChunkDocument);
    expect(chunker).toBeInstanceOf(LangchainChunker);
    expect(container.resolve(TOKENS.ChunkDocument)).toBe(chunker);
  });
});
