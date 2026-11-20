import type {
  IChunkDocument,
  IEmbeddingGenerator,
  EmbeddedChunk,
} from "@atlas/rag";

/**
 * Turns an uploaded file into embedded chunks: parse -> chunk -> embed.
 */
export class IngestDocumentUseCase {
  constructor(
    private readonly chunker: IChunkDocument,
    private readonly embedder: IEmbeddingGenerator,
  ) {}

  public async execute(file: string | File): Promise<EmbeddedChunk[]> {
    const chunks = await this.chunker.generateChunksFromFile(file);
    const source = chunks[0]?.metadata.source;
    const embeddings = await this.embedder.generateEmbeddingsFromChunks(
      chunks,
      typeof source === "string" ? source : undefined,
    );

    // TODO: persist to document_chunks once the Supabase schema exists.
    return chunks.map((chunk, i) => ({ ...chunk, embedding: embeddings[i]! }));
  }
}
