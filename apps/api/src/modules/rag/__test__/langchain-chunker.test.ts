import { LangchainChunker } from "@modules/rag/infrastructure/chunking/langchain-chunker.js";
import { describe, it, expect } from "vitest";
describe("LangchainChunker", () => {
  it("should generate chunks from text", async () => {
    const chunkDocument = new LangchainChunker();
    const text = "This is a test document. It has multiple sentences.";
    const chunks = await chunkDocument.generateChunksFromText(text);
    expect(chunks).toBeInstanceOf(Array);
    expect(chunks.length).toBeGreaterThan(0);
  });

  it("should generate chunks from documents and keep metadata", async () => {
    const chunkDocument = new LangchainChunker({ chunkSize: 30, chunkOverlap: 0 });
    const documents = [
      {
        content: "First paragraph of the file.\n\nSecond paragraph of the file.",
        metadata: { source: "a.txt" },
      },
      { content: "   ", metadata: { source: "empty.txt" } },
    ];
    const chunks = await chunkDocument.generateChunksFromDocuments(documents);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.content).toBe(chunk.content.trim());
      expect(chunk.metadata.source).toBe("a.txt");
    }
  });

  it("should parse an uploaded text file and tag chunks with its name", async () => {
    const chunkDocument = new LangchainChunker();
    const file = new File(["Notes for the exam. Chapter one."], "notes.txt");
    const chunks = await chunkDocument.generateChunksFromFile(file);
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[0]?.metadata.source).toBe("notes.txt");
  });

  it("should reject unsupported file types", async () => {
    const chunkDocument = new LangchainChunker();
    const file = new File(["a,b"], "sheet.xlsx");
    await expect(chunkDocument.generateChunksFromFile(file)).rejects.toThrow(/Unsupported file type/);
  });
});
