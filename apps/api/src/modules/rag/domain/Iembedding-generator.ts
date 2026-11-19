import type { Chunk } from "@modules/rag/domain/chunk.js";

export interface IEmbeddingGenerator {
  /**
   * Embed a single document chunk for storage in the vector store.
   */
  generateEmbeddingFromChunk(chunk: Chunk, title?: string): Promise<number[]>;

  /**
   * Embed many document chunks; the result keeps the input order.
   */
  generateEmbeddingsFromChunks(
    chunks: Chunk[],
    title?: string,
  ): Promise<number[][]>;

  /**
   * Embed a search query, to match it against stored document chunks.
   */
  generateQueryEmbedding(query: string): Promise<number[]>;
}
