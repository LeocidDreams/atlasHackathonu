export interface IChunkDocument {
  /**
   * Split a document into overlapping text chunks for embedding.
   */
  generateChunksFromText(document: string): Promise<string[]>;
}
