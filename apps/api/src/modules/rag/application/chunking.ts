import {
  RecursiveCharacterTextSplitter,
  type RecursiveCharacterTextSplitterParams,
} from "@langchain/textsplitters";
import { type IChunkDocument } from "@modules/rag/domain/Ichunk-document.js";

export interface ChunkOptions extends Partial<RecursiveCharacterTextSplitterParams> {
  /** Max characters per chunk. */
  chunkSize?: number;
  /** Characters shared between consecutive chunks, so context is not lost at the edges. */
  chunkOverlap?: number;
}

export class ChunkDocument implements IChunkDocument {
  private readonly splitter: RecursiveCharacterTextSplitter;

  constructor(chunkOptions: ChunkOptions = {}) {
    // Tries paragraph, line, sentence, then word boundaries before cutting mid-word.
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: chunkOptions.chunkSize ?? 1000,
      chunkOverlap: chunkOptions.chunkOverlap ?? 200,
      separators: chunkOptions.separators ?? ["\n\n", "\n", ". ", " ", ""],
      // Drop the separator at cut points so chunks don't start with ". "
      keepSeparator: chunkOptions.keepSeparator ?? false,
    });
  }

  public async generateChunksFromText(document: string): Promise<string[]> {
    const text = document.trim();
    if (!text) {
      return [];
    }

    const chunks = await this.splitter.splitText(text);
    return chunks.map((chunk) => chunk.trim()).filter(Boolean);
  }
}
