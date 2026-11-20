import type { IEmbeddingGenerator } from "@atlas/rag";

export interface AnswerParams {
  university: string;
  query: string;
  matchCount: number;
  embeddingGenerator: IEmbeddingGenerator;
}

export interface IAssistant {
  answer(params: AnswerParams): Promise<string>;
}
