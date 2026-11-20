import {
  RecursiveCharacterTextSplitter,
  type RecursiveCharacterTextSplitterParams,
} from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import { type IChunkDocument, RagError, type Chunk } from "@rag/types.js";

const TEXT_EXTENSIONS = new Set([".txt", ".md"]);
export const SUPPORTED_FILE_EXTENSIONS = [".pdf", ".docx", ...TEXT_EXTENSIONS];

export interface ChunkOptions extends Partial<RecursiveCharacterTextSplitterParams> {
  /** Max characters per chunk. */
  chunkSize?: number;
  /** Characters shared between consecutive chunks, so context is not lost at the edges. */
  chunkOverlap?: number;
}

export class LangchainChunker implements IChunkDocument {
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

  public async generateChunksFromDocuments(
    documents: Chunk[],
  ): Promise<Chunk[]> {
    const nonEmpty = documents.filter((doc) => doc.content.trim());
    if (nonEmpty.length === 0) {
      return [];
    }

    // splitDocuments copies each source's metadata (plus loc line ranges) onto its chunks.
    const chunks = await this.splitter.splitDocuments(
      nonEmpty.map(
        (doc) =>
          new Document({ pageContent: doc.content, metadata: doc.metadata }),
      ),
    );
    return chunks
      .map((chunk) => ({
        content: chunk.pageContent.trim(),
        metadata: chunk.metadata,
      }))
      .filter((chunk) => chunk.content);
  }

  /**
   * Parse a file (path on disk or an uploaded File) and chunk its content.
   * The file type is picked from the extension of the path or the File's name.
   */
  public async generateChunksFromFile(file: string | File): Promise<Chunk[]> {
    const documents = await this.loadFile(file);
    return this.generateChunksFromDocuments(documents);
  }

  private async loadFile(file: string | File): Promise<Chunk[]> {
    const fileName = typeof file === "string" ? basename(file) : file.name;
    const extension = extname(fileName).toLowerCase();

    let documents: Document[];
    if (extension === ".pdf") {
      // One Document per page; the page number lands in metadata.loc.pageNumber.
      documents = await new PDFLoader(file).load();
    } else if (extension === ".docx") {
      documents = await new DocxLoader(file).load();
    } else if (TEXT_EXTENSIONS.has(extension)) {
      const text =
        typeof file === "string"
          ? await readFile(file, "utf-8")
          : await file.text();
      documents = [new Document({ pageContent: text, metadata: {} })];
    } else {
      throw new RagError(
        "UNSUPPORTED_FILE_TYPE",
        `Unsupported file type "${extension || fileName}". Supported: ${SUPPORTED_FILE_EXTENSIONS.join(", ")}`,
      );
    }

    // Loaders set source to "blob" for in-memory files; keep the real file name instead.
    return documents.map((doc) => ({
      content: doc.pageContent,
      metadata: { ...doc.metadata, source: fileName },
    }));
  }
}
