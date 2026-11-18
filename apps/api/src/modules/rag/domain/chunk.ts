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
