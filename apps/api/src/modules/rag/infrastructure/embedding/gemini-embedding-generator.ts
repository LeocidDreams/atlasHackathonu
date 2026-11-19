import { GoogleGenAI } from "@google/genai";
import { type IEmbeddingGenerator } from "@modules/rag/domain/Iembedding-generator.js";
import { AppError } from "@core/errors/app-error.js";
import type { Chunk } from "@modules/rag/domain/chunk.js";

const EMBEDDING_MODEL = "gemini-embedding-2";
// Must match the vector(N) column; pgvector's HNSW index supports at most 2000 dimensions.
export const EMBEDDING_DIMENSIONS = 1536;
const BATCH_SIZE = 100;

export class GeminiEmbeddingGenerator implements IEmbeddingGenerator {
  private readonly ai: GoogleGenAI;

  constructor(
    apiKey: string = process.env.GEMINI_API_KEY ??
      (() => {
        throw Error(`GEMINI_API_KEY is not defined`);
      })(),
  ) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  public async generateEmbeddingFromChunk(
    chunk: Chunk,
    title?: string,
  ): Promise<number[]> {
    const [embedding] = await this.embed([toDocumentPrompt(chunk, title)]);
    return embedding!;
  }

  public async generateEmbeddingsFromChunks(
    chunks: Chunk[],
    title?: string,
  ): Promise<number[][]> {
    const embeddings: number[][] = [];
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks
        .slice(i, i + BATCH_SIZE)
        .map((chunk) => toDocumentPrompt(chunk, title));
      embeddings.push(...(await this.embed(batch)));
    }
    return embeddings;
  }

  public async generateQueryEmbedding(query: string): Promise<number[]> {
    const [embedding] = await this.embed([
      `task: search result | query: ${query}`,
    ]);
    return embedding!;
  }

  private async embed(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) {
      return [];
    }

    const response = await this.ai.models.embedContent({
      model: EMBEDDING_MODEL,
      // One Content per text; parts inside a single Content would be merged into one embedding.
      contents: texts.map((text) => ({ parts: [{ text }] })),
      // gemini-embedding-2 re-normalizes truncated vectors itself.
      config: { outputDimensionality: EMBEDDING_DIMENSIONS },
    });

    const embeddings = (response.embeddings ?? []).map(
      (embedding) => embedding.values ?? [],
    );
    if (
      embeddings.length !== texts.length ||
      embeddings.some((values) => values.length !== EMBEDDING_DIMENSIONS)
    ) {
      throw AppError.internal(
        `Embedding response mismatch: expected ${texts.length} vectors of ${EMBEDDING_DIMENSIONS} dimensions`,
      );
    }
    return embeddings;
  }
}

// gemini-embedding-2 has no taskType option; the retrieval task goes into the text itself.
function toDocumentPrompt(chunk: Chunk, title?: string): string {
  return `title: ${title?.trim() || "none"} | text: ${chunk.content}, metadata: ${JSON.stringify(chunk.metadata)}`;
}
