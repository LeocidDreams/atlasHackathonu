import { ChunkDocument } from "@modules/rag/application/chunking.js";
import { describe, it, expect } from "vitest";
describe("ChunkDocument", () => {
  it("should generate chunks from text", async () => {
    const chunkDocument = new ChunkDocument();
    const text = "This is a test document. It has multiple sentences.";
    const chunks = await chunkDocument.generateChunksFromText(text);
    expect(chunks).toBeInstanceOf(Array);
    expect(chunks.length).toBeGreaterThan(0);
  });
});
