export interface IEmbeddingGenerator {
  /**
   * Embed a single document chunk for storage in the vector store.
   */
  generateEmbeddingFromText(chunk: string, title?: string): Promise<number[]>;

  /**
   * Embed many document chunks; the result keeps the input order.
   */
  generateEmbeddingsFromTexts(chunks: string[], title?: string): Promise<number[][]>;

  /**
   * Embed a search query, to match it against stored document chunks.
   */
  generateQueryEmbedding(query: string): Promise<number[]>;
}
