export type ChunkMetadata = Record<string, unknown>;

/**
 * A piece of text plus where it came from (file name, page, line range...).
 * Whole parsed documents use the same shape before they are split.
 */
export interface Chunk {
  content: string;
  metadata: ChunkMetadata;
}

export interface EmbeddedChunk extends Chunk {
  embedding: number[];
}

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

export type RagErrorCode = "UNSUPPORTED_FILE_TYPE" | "EMBEDDING_MISMATCH";

export class RagError extends Error {
  public readonly code: RagErrorCode;

  constructor(code: RagErrorCode, message: string) {
    super(message);
    this.name = "RagError";
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
