import { type Chunk } from "@modules/rag/domain/chunk.js";

export interface IChunkDocument {
  /**
   * Split a document into overlapping text chunks for embedding.
   */
  generateChunksFromText(document: string): Promise<string[]>;

  /**
   * Split parsed documents into chunks, keeping each source's metadata.
   */
  generateChunksFromDocuments(documents: Chunk[]): Promise<Chunk[]>;

  /**
   * Parse a PDF, DOCX, TXT or MD file (path on disk or an uploaded File) and chunk its content.
   */
  generateChunksFromFile(file: string | File): Promise<Chunk[]>;
}
