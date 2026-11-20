import { type Chunk } from "@atlas/rag";
import {
  type Exam,
  type ExaminationOptions,
} from "@modules/exam/domain/exam.js";

export interface IExamGenerator {
  /**
   * Generate exam questions that are answerable from the given chunks only.
   */
  generateExam(chunks: Chunk[], examOptions: ExaminationOptions): Promise<Exam>;
}
