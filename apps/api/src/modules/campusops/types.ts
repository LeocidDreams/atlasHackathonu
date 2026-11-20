import type { IEmbeddingGenerator } from "@atlas/rag";

export interface MatchedEmbedding {
  id: number;
  university: string;
  source_path: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

export interface SearchCampusEmbeddingParams {
  university: string;
  queryEmbedding: number[];
  matchCount: number;
}
