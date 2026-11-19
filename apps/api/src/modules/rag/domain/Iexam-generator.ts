import { type Chunk } from "@modules/rag/domain/chunk.js";
import { type Exam, type ExaminationOptions } from "@modules/rag/domain/exam.js";

export interface IExamGenerator {
  /**
   * Generate exam questions that are answerable from the given chunks only.
   */
  generateExam(chunks: Chunk[], examOptions: ExaminationOptions): Promise<Exam>;
}
