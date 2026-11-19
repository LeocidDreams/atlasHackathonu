export interface ExaminationOptions {
  questionsCount: number;
  difficulty: "easy" | "medium" | "hard" | "expert";
  questionFormat: "multiple-choice" | "true-false" | "short-answer";
  language?: "tr" | "en";
  topics?: string[];
  includeExplanations?: boolean;
  includeSourceReferences?: boolean;
}

/** Where a question's answer can be found in the uploaded material. */
export interface SourceReference {
  source: string;
  pageNumber?: number;
}

export interface ExamQuestion {
  question: string;
  /** Answer choices; empty for short-answer questions. */
  options: string[];
  /** The correct option text, or the expected answer for short-answer questions. */
  answer: string;
  explanation?: string;
  sourceReferences?: SourceReference[];
}

export interface Exam {
  questions: ExamQuestion[];
}
